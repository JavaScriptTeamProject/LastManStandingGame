/// <reference path="references.js" />
var initializeGameScreen = function (canvasContainer, svgContainer, width, height) {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    document.getElementById(canvasContainer).appendChild(canvas);

    paper = Raphael('svg-container', width, height);
    paper.image('../images/terain_grass.png', 0, 0, width, height);
};

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

var updateShots = function (character, ctx, canvas, modifier) {
    for (var i = 0; i < character.shots.length; i++) {
        var currShot = character.shots[i];

        currShot.draw(ctx);
        currShot.move(modifier);

        if ((currShot.currPosition.x < 0 || currShot.currPosition.x > canvas.width)
                || (currShot.currPosition.y < 0 || currShot.currPosition.y > canvas.height)) {
            character.shots.splice(i, 1);
        }
    }
};

var update = function (character, enemies, ctx, canvas, keysDown, modifier) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateShots(character, ctx, canvas, modifier);

    character.move(keysDown, modifier);
    character.draw(ctx);

    for (var i = 0; i < enemies.length; i++) {
        enemies[i].move(character, modifier);
        enemies[i].draw(ctx);
    }
};

// 'then' should be passed as Date.now()
var run = function (character, enemies, ctx, canvas, keysDown, then) {
    var now = Date.now();
    var delta = now - then;

    if (!isPaused) {
        update(character, enemies, ctx, canvas, keysDown, delta / 1000);
    }

    then = now;
    requestAnimationFrame(function () {
        run(character, enemies, ctx, canvas, keysDown, then);
    });
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