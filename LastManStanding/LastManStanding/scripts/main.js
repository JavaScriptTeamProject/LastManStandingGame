/// <reference path="references.js" />
window.onload = function () {
    document.getElementById('svg-container').style.position = 'absolute';
    document.getElementById('canvas-container').style.position = 'absolute';

    var gameScreenWidth = 640;
    var gameScreenHeight = 640;
    initializeGameScreen('canvas-container', 'svg-container', gameScreenWidth, gameScreenHeight);

    var enemies = [];

    var character = initializeCharacter(canvas.width / 2, canvas.height / 2, 100, 250, 10, 1.5);
    var enemy = initializeEnemy(0, 0, 100, 40, 10, 1.5);
    enemies.push(character);
    enemies.push(enemy);

    run(character, enemies, ctx, canvas, keysDown, Date.now());
};