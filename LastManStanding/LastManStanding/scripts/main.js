/// <reference path="references.js" />
window.onload = function () {
    document.getElementById('svg-container').style.position = 'absolute';
    document.getElementById('canvas-container').style.position = 'absolute';

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 640;
    document.getElementById('canvas-container').appendChild(canvas);
    
    // Handle keyboard controls
    var keysDown = {};

    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);

    var enemies = [];
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
    var character = initializeCharacter(canvas.width / 2, canvas.height / 2, 100, 250, 10, 1.5, heroImages);
    var enemy = initializeEnemy(0, 0, 100, 40, 10, 1.5, enemyImages);
    enemies.push(character);
    enemies.push(enemy);
    run(character, enemies, ctx, keysDown, Date.now());

    var paper = Raphael('svg-container', 512, 512);
    paper.image('../images/terain_grass.png', 0, 0, 512, 512);   

    var gameScreen = document.getElementsByTagName('svg');
    gameScreen.addEventListener('onmouseout', function (e) {
        window.alert('Mouse left the game field!')
    });
}
