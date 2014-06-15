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
        damage = 30,
        attackSpeed = 250;

    var spawnTimer = 1300,
        spawnRate = 0.015;

    var character = initializeCharacter(canvas.width / 2, canvas.height / 2,
        healthPoints, movingSpeed, damage, attackSpeed);

    run(character, enemies, ctx, canvas, keysDown, Date.now(), 0, spawnTimer, spawnRate);
};