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
<<<<<<< HEAD
  
    run(character, enemies, ctx, canvas, keysDown, Date.now());
}
=======
    run(character, enemies, ctx, keysDown, Date.now());

    var paper = Raphael('svg-container', canvas.width, canvas.height);  //Shouldn't be same as the canvas???
    paper.image('../images/terain_grass.png', 0, 0, paper.width, paper.width);

    var gameScreen = document.getElementById('svg-container');
    gameScreen.addEventListener('mouseout', function (e) {
        window.alert('Mouse left the game field!')
    });
}
>>>>>>> origin/master
