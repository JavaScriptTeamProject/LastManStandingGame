/// <reference path="references.js" />
window.onload = function () {
    document.getElementById('svg-container').style.position = 'absolute';
   // document.getElementById('canvas-container').style.position = 'absolute';

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    
    var images = ['../images/hero.png'];
    var character = initializeCharacter(canvas.width / 2, canvas.height / 2, 100, 250, 10, 1.5, images);

    var paper = Raphael('svg-container', 512, 480);
    paper.image('../images/background.png', 0, 0, 512, 480);
}