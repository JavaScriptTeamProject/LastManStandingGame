/// <reference path="references.js" />
window.onload = function () {
    var gameScreenWidth = 640;
    var gameScreenHeight = 640;
    initializeGameScreen('canvas-container', 'svg-container', gameScreenWidth, gameScreenHeight);
    showMenu();
};