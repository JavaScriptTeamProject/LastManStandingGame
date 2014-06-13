var Position = function (x, y) {
    this.x = x;
    this.y = y;
};

var Attack = function (damage, speed) {
    this.damage = damage;
    this.speed = speed;
};


var createLivingBeing = function (position, healthPoints, movingSpeed, attack, images) {
    var livingBeing = {
        position: position,
        hp: healthPoints,
        movingSpeed: movingSpeed,
        attack: attack,
        images: images,
        imageIndex: 0,
        draw: function (ctx) {
            ctx.drawImage(this.images[this.imageIndex], this.position.x, this.position.y);
        }
    }

    return livingBeing;
};

var createCharacter = function (position, healthPoints, movingSpeed, attack, images) {
    var character = createLivingBeing(position, healthPoints, movingSpeed, attack, images);
    character.move = function (keysDown, modifier) {
        if (37 in keysDown) { // The player is moving left
            this.position.x -= this.movingSpeed * modifier;
        }

        if (38 in keysDown) { // The player is moving up
            this.position.y -= this.movingSpeed * modifier;
        }

        if (39 in keysDown) { // The player is moving right
            this.position.x += this.movingSpeed * modifier;
        }

        if (40 in keysDown) { // The player is moving down
            this.position.y += this.movingSpeed * modifier;
        }
    };

    return character;
};

var createEnemy = function (podition, healthPoints, movingSpeed, attack, images) {
    var enemy = createLivingBeing(position, healthPoints, movingSpeed, attack, images);
    enemy.move = function (character, modifier) {
        if ((enemy.position.x - character.position.x) > 0) {
            enemy.position.x -= enemy.movingSpeed * modifier;
        }
        if ((enemy.position.x - character.position.x) < 0) {
            enemy.position.x += enemy.movingSpeed * modifier;
        }
        if ((enemy.position.y - character.position.y) > 0) {
            enemy.position.y -= enemy.movingSpeed * modifier;
        }
        if ((enemy.position.y - character.position.y) < 0) {
            enemy.position.y += enemy.movingSpeed * modifier;
        }
    }
    enemy.attackHero = function (character) {
        if (character.position.x <= (enemy.position.x + 28)
            && enemy.position.x <= (character.position.x + 28)
            && character.position.y <= (enemy.position.y + 34)
            && enemy.position.y <= (character.position.y + 34)) {
            character.hp -= enemy.attack.demege;
        }
    }

    return enemy;
}
