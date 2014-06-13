/// <reference path="references.js" />
var initializeCharacter = function (x, y, healthPoints, movingSpeed, damage, attackSpeed, images) {
    var position = new Position(x, y);
    var attack = new Attack(damage, attackSpeed);

    var images = preloadImages(images);
    var character = new createCharacter(position, healthPoints, movingSpeed, attack, images);
    return character;
};

var initializeEnemy = function (x, y, healthPoints, movingSpeed, damage, attackSpeed, images) {
    var position = new Position(x, y);
    var attack = new Attack(damage, attackSpeed);

    var images = preloadImages(images);
    var enemy = new createEnemy(position, healthPoints, movingSpeed, attack, images);
    return enemy;
};

var preloadImages = function (images) {
    var loaded = [];

    for (var i = 0; i < images.length; i++) {
        var url = images[i],
            img = new Image();

        img.src = url;
        loaded.push(img);
    }

    return loaded;
};

// 'then' should be passed as Date.now()
var run = function (character, enemies, ctx, keysDown, then) {
    var now = Date.now();
    var delta = now - then;

    ctx.clearRect(0, 0, 512, 512);
    character.move(keysDown, delta / 1000);
    character.draw(ctx);
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].move(character, delta / 1000);
        enemies[i].draw(ctx);
    }

    then = now;
    requestAnimationFrame(function () {
        run(character, enemies, ctx, keysDown, then);
    });
};