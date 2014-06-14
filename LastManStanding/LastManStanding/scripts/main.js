/// <reference path="references.js" />
window.onload = function () {
    document.getElementById('svg-container').style.position = 'absolute';
    document.getElementById('canvas-container').style.position = 'absolute';

    var gameScreenWidth = 640;
    var gameScreenHeight = 640;
    initializeGameScreen('canvas-container', 'svg-container', gameScreenWidth, gameScreenHeight);

    var enemies = [];

    var character = initializeCharacter(canvas.width / 2, canvas.height / 2, 100, 250, 10, 1.5);
    for (var i = 0; i < 4; i++) { //To Do!
        setInterval(enemies.push(spawnEnemy()), 3000);
    }

    run(character, enemies, ctx, canvas, keysDown, Date.now());
};