var Position = function (x, y) {
    this.x = x;
    this.y = y;
};

var Attack = function (damage, speed) {
    this.damage = damage;
    this.speed = speed;
};


var LivingBeing = function (position, healthPoints, movingSpeed, attack, images) {
    this.position = position;
    this.hp = healthPoints;
    this.movingSpeed = movingSpeed;
    this.attack = attack;
    this.images = images;
    this.imageIndex = 0;

    this.draw = function (ctx) {
        ctx.drawImage(this.images[this.imageIndex], this.x, this.y)
    }

    this.move = function (keysDown, modifier) {
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
    }
};