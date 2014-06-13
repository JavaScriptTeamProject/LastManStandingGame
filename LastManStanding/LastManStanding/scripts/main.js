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

    var objects = [];
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
    var character = initializeCharacter(canvas.width / 2, canvas.height / 2, 100, 250, 10, 1.5, heroImages);
    objects.push(character);
    ctx.drawImage(character.images[0], 50, 50);
    run(objects, ctx, keysDown, Date.now());

    var paper = Raphael('svg-container', 512, 512);
    paper.image('../images/terain_grass.png', 0, 0, 512, 512);
}