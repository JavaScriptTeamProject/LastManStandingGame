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

var createCharacter = function (position, healthPoints, movingSpeed, attack, images, attackImage) {
    var character = createLivingBeing(position, healthPoints, movingSpeed, attack, images);

    character.attackImage = attackImage;
    character.shots = [];

    character.move = function (keysDown, modifier) {
        // Arrows
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

        // WASD
        if (65 in keysDown) { // The player is moving left
            this.position.x -= this.movingSpeed * modifier;
        }

        if (87 in keysDown) { // The player is moving up
            this.position.y -= this.movingSpeed * modifier;
        }

        if (68 in keysDown) { // The player is moving right
            this.position.x += this.movingSpeed * modifier;
        }

        if (83 in keysDown) { // The player is moving down
            this.position.y += this.movingSpeed * modifier;
        }
    };

    character.fire = function (targetPositionX, targetPositionY) {
        var shot = {
            startPosition: new Position(character.position.x + images[0].width / 2,
                character.position.y + images[0].height / 2),
            currPosition: new Position(character.position.x + images[0].width / 2,
                character.position.y + images[0].height / 2),
            targetPosition: new Position(targetPositionX, targetPositionY),
        };

        shot.delta = {
            x: Math.abs(shot.startPosition.x - shot.targetPosition.x),
            y: Math.abs(shot.startPosition.y - shot.targetPosition.y)
        };

        shot.damage = this.attack.damage,
        shot.speed = {
            x: this.attack.speed / Math.sqrt(shot.delta.x * shot.delta.x + shot.delta.y * shot.delta.y) * shot.delta.x,
            y: this.attack.speed / Math.sqrt(shot.delta.x * shot.delta.x + shot.delta.y * shot.delta.y) * shot.delta.y
        };

        shot.draw = function (ctx) {
            ctx.drawImage(character.attackImage, shot.currPosition.x, shot.currPosition.y,
                character.attackImage.width, character.attackImage.height);
        };

        shot.move = function (modifier) {
            if ((shot.startPosition.x - shot.targetPosition.x) > 0) {
                shot.currPosition.x -= shot.speed.x * modifier;
            }

            if ((shot.startPosition.x - shot.targetPosition.x) < 0) {
                shot.currPosition.x += shot.speed.x * modifier;
            }

            if ((shot.startPosition.y - shot.targetPosition.y) > 0) {
                shot.currPosition.y -= shot.speed.y * modifier;
            }

            if ((shot.startPosition.y - shot.targetPosition.y) < 0) {
                shot.currPosition.y += shot.speed.y * modifier;
            }
        }

        this.shots.push(shot);        
    };

    return character;
};

var createEnemy = function (position, healthPoints, movingSpeed, attack, images) {
    var enemy = createLivingBeing(position, healthPoints, movingSpeed, attack, images);
    enemy.move = function (character, modifier) {
        if ((this.position.x - character.position.x) > 0) {
            this.position.x -= this.movingSpeed * modifier;
        }

        if ((this.position.x - character.position.x) < 0) {
            this.position.x += this.movingSpeed * modifier;
        }

        if ((this.position.y - character.position.y) > 0) {
            this.position.y -= this.movingSpeed * modifier;
        }

        if ((this.position.y - character.position.y) < 0) {
            this.position.y += this.movingSpeed * modifier;
        }
    }

    enemy.attackHero = function (character) {
        if (character.position.x <= (this.position.x + 28)
            && this.position.x <= (character.position.x + 28)
            && character.position.y <= (this.position.y + 34)
            && this.position.y <= (character.position.y + 34)) {
            character.hp -= this.attack.damage * this.attack.speed;

            if (character.hp < 0) {
                character.hp = 0;
            }
        }
    }

    return enemy;
};