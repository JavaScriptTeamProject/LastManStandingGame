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

    var images = preloadImages(heroImages);
    var character = new createCharacter(position, healthPoints, movingSpeed, attack, images);
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

var update = function (character, enemies, ctx, canvas, keysDown, modifier) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

<<<<<<< HEAD
    if (!isPaused) {
        update(character, enemies, ctx, canvas, keysDown, delta / 1000);
=======
    ctx.clearRect(0, 0, 640, 640); //Hardcoded width and height.
    character.move(keysDown, delta / 1000);
    character.draw(ctx);
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].move(character, delta / 1000);
        enemies[i].draw(ctx);
>>>>>>> origin/master
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

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);
