/// <reference path="references.js" />
var showMenu = function () {
    isPaused = true;
    $('#game-menu').css('z-index', 1).show();

    if (isGameActive) {
        $restartButton.parent().show(); // Show restart button
    }
}

var $buttons = $('.menu-button');

var $playButton = $($buttons[0]);
var $restartButton = $($buttons[1]);
var $controlsButton = $($buttons[2]);
var $loreButton = $($buttons[3]);
var $creditsButton = $($buttons[4]);

var $controls = $($('#game-info').children()[0]);
var $lore = $($('#game-info').children()[1]);
var $credits = $($('#game-info').children()[2]);

$buttons.on('mouseover', function () {
    $(this).css('color', '#FF3E22');
});

$buttons.on('mouseout', function () {
    $(this).css('color', '');
});

$buttons.on('click', function () {
    //$(this).css('background-color', '#FF3E22');
});

$playButton.on('click', function () {
    $('#game-menu').hide();
    isPaused = false;

    if (!isGameActive) {
        startGame();
    }
});

$restartButton.on('click', function () {
    $('#game-menu').hide();
    isPaused = false;
    startGame();
});

$controlsButton.on('click', function () {
    $('#game-menu').css('z-index', -1).hide();
    $('#game-info').css('z-index', 1).show();
    $controls.show();
});