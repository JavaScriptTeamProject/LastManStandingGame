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
            ctx.drawImage(this.images[this.imageIndex], this.x, this.y);
        }
    }

    return livingBeing;
};

var Character = function (position, healthPoints, movingSpeed, attack, images) {
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
};