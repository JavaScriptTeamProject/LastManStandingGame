/// <reference path="references.js" />
window.onload = function () {
    document.getElementById('svg-container').style.position = 'absolute';
    document.getElementById('canvas-container').style.position = 'absolute';

    var gameScreenWidth = 640;
    var gameScreenHeight = 640;
    initializeGameScreen('canvas-container', 'svg-container', gameScreenWidth, gameScreenHeight);

    var enemies = [];

    var healthPoints = 100,
        movingSpeed = 150,
        damage = 10,
        attackSpeed = 200;

    var character = initializeCharacter(canvas.width / 2, canvas.height / 2,
        healthPoints, movingSpeed, damage, attackSpeed);

    var enemy = initializeEnemy(0, 0, 100, 40, 10, 1.5);
    enemies.push(enemy);

    run(character, enemies, ctx, canvas, keysDown, Date.now());
};