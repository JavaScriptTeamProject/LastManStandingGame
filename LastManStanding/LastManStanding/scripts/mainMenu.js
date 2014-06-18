/// <reference path="references.js" />
var $buttons = $('.menu-button')

$buttons.on('mouseover', function () {
    $(this).css('color', '#FF3E22');
});

$buttons.on('mouseout', function () {
    $(this).css('color', '');
});

$buttons.on('click', function () {
    //$(this).css('background-color', '#FF3E22');
});