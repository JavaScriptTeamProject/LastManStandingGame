/// <reference path="references.js" />
var initializeGameScreen = function (canvasContainer, svgContainer, width, height) {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    document.getElementById(canvasContainer).appendChild(canvas);

    paper = Raphael('svg-container', width, height);
    paper.image('../images/terain_grass.png', 0, 0, width, height);

    var hpDiv = document.createElement('div');
    hpDiv.id = 'hpDiv';
    hpDiv.style.position = 'absolute';
    hpDiv.style.top = '660px';
    document.body.appendChild(hpDiv);

    var score = document.createElement('div');
    score.id = 'scoreDiv';
    score.style.position = 'absolute';
    score.style.top = '660px';
    score.style.left = '100px';
    document.body.appendChild(score);

    var timeLived = document.createElement('div');

    timeLived.id = 'timeSurvivedDiv';
    timeLived.style.position = 'absolute';
    timeLived.style.top = '660px';
    timeLived.style.left = '250px';
    document.body.appendChild(timeLived);
};

var endScreen = function () {
    paper.image('../images/end_screen.png', 0, 0, 640, 640);
    stopAnimation = true;
}

var initializeCharacter = function (x, y, healthPoints, movingSpeed, damage, attackSpeed) {
    var position = new Position(x, y);
    var attack = new Attack(damage, attackSpeed);

    var heroImages = [
        '../images/hero/hero_down_one.png',
        '../images/hero/hero_down_two.png',
        '../images/hero/hero_down_three.png',
        '../images/hero/hero_left_one.png',
        '../images/hero/hero_left_two.png',
        '../images/hero/hero_left_three.png',
        '../images/hero/hero_right_one.png',
        '../images/hero/hero_right_two.png',
        '../images/hero/hero_right_three.png',
        '../images/hero/hero_up_one.png',
        '../images/hero/hero_up_two.png',
        '../images/hero/hero_up_three.png'
    ];

    var heroAttackImage = new Image();
    heroAttackImage.src = '../images/fireball.png';

    var images = preloadImages(heroImages);
    var character = new createCharacter(position, healthPoints, movingSpeed, attack, images, heroAttackImage);

    // Handle firing shots
    document.querySelector('#canvas-container').addEventListener('mousedown', function (ev) {
        character.fire(ev.layerX, ev.layerY);
    });

    return character;
};

var initializeEnemy = function (x, y, healthPoints, movingSpeed, damage, attackSpeed) {
    var position = new Position(x, y);
    var attack = new Attack(damage, attackSpeed);

    var enemyImages = [
        '../images/enemy/enemy_down_one.png',
        '../images/enemy/enemy_down_two.png',
        '../images/enemy/enemy_down_three.png',
        '../images/enemy/enemy_left_one.png',
        '../images/enemy/enemy_left_two.png',
        '../images/enemy/enemy_left_three.png',
        '../images/enemy/enemy_right_one.png',
        '../images/enemy/enemy_right_two.png',
        '../images/enemy/enemy_right_three.png',
        '../images/enemy/enemy_up_one.png',
        '../images/enemy/enemy_up_two.png',
        '../images/enemy/enemy_up_three.png'
    ];

    var images = preloadImages(enemyImages);
    var enemy = new createEnemy(position, healthPoints, movingSpeed, attack, images);
    return enemy;
};

var preloadImages = function (images) {
    var loaded = [];

    for (var i = 0; i < images.length; i++) {
        var url = images[i],
            img = new Image();

        img.src = url;
        loaded.push(img);
    }

    return loaded;
};

var score = 0;
var updateShots = function (character, enemies, ctx, canvas, modifier) {
    for (var i = 0; i < character.shots.length; i++) {
        var currShot = character.shots[i];

        currShot.draw(ctx);
        currShot.move(modifier);

        if ((currShot.currPosition.x < 0 || currShot.currPosition.x > canvas.width)
                || (currShot.currPosition.y < 0 || currShot.currPosition.y > canvas.height)) {
            character.shots.splice(i, 1);
        }

        // Check if shots hit enemy
        for (var j = 0; j < enemies.length; j++) {
            if (currShot.currPosition.x <= enemies[j].position.x + character.attackImage.width + 25
                    && enemies[j].position.x <= currShot.currPosition.x + character.attackImage.width
                    && currShot.currPosition.y <= enemies[j].position.y + character.attackImage.height + 30
                    && enemies[j].position.y <= currShot.currPosition.y + character.attackImage.height) {
                enemies[j].hp -= currShot.damage;
                character.shots.splice(i, 1);
            }

            if (enemies[j].hp <= 0) {
                enemies.splice(j, 1);
                score++;
            }
        }
    }
};

var update = function (character, enemies, ctx, canvas, keysDown, modifier, elapsed) {
    ifOutField(character, canvas);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateShots(character, enemies, ctx, canvas, modifier);

    if (character.hp >= 1) {
        character.move(keysDown, modifier);
        character.draw(ctx);
    }
    else {
        endScreen();
    }

    for (var i = 0; i < enemies.length; i++) {
        enemies[i].move(character, modifier);
        enemies[i].draw(ctx);
        enemies[i].attackHero(character);
    }

    updateInfo(character);
};

var request;
var stopAnimation = false;
var elapsedForScore = 0;
// 'then' should be passed as Date.now(), 'elapsed' as 0
var run = function (character, enemies, ctx, canvas, keysDown, then, elapsed, spawnTimer, spawnRate) {
    var now = Date.now();
    var delta = now - then;
    elapsed += delta;
    elapsedForScore += delta;

    if (!isPaused) {
        update(character, enemies, ctx, canvas, keysDown, delta / 1000);

        if (elapsed >= spawnTimer) {
            enemies.push(spawnEnemy());
            elapsed -= spawnTimer;
            spawnTimer -= spawnTimer * spawnRate;

            if (spawnTimer < 600) {
                spawnTimer = 600; // min time for spawning
            }
        }
    }

    then = now;
    request = requestAnimationFrame(function () {
        run(character, enemies, ctx, canvas, keysDown, then, elapsed, spawnTimer, spawnRate);
    });

    if (stopAnimation) {
        cancelAnimationFrame(request);
    }
};

var getTimeSurvived = function (elapsedForScore) {
    var seconds = elapsedForScore / 1000;
    var minutes = seconds / 60 < 10 ? '0' + (seconds / 60).toFixed(0) : (seconds / 60).toFixed(0);
    var secondsLeft = seconds % 60 < 10 ? '0' + (seconds % 60).toFixed(0) : (seconds % 60).toFixed(0);

    var timeSurvived = minutes + ':' + secondsLeft;
    return timeSurvived;
};

var updateInfo = function (character) {
    document.getElementById('hpDiv').innerHTML = 'HP: ' + Math.ceil(character.hp);
    document.getElementById('scoreDiv').innerHTML = 'Score: ' + score;
    document.getElementById('timeSurvivedDiv').innerHTML = 'Time survived: ' + getTimeSurvived(elapsedForScore);
};

var ifOutField = function (character, canvas) {
    if (character.position.x < 0) {
        character.position.x = 0;
    }

    if (character.position.x > canvas.width - character.images[0].width) {
        character.position.x = canvas.width - character.images[0].width;
    }

    if (character.position.y < 0) {
        character.position.y = 0;
    }

    if (character.position.y > canvas.height - character.images[0].height) {
        character.position.y = canvas.height - character.images[0].height;
    }
};

var isPaused = false;
window.addEventListener('keydown', function (e) {
    if (e.keyCode === 80) {
        if (!isPaused) {
            isPaused = true;
        }
        else {
            isPaused = false;
        }
    }
});

// Handle keyboard controls
var keysDown = {};

window.addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
});

window.addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
});
