(function() {
	//Here we will make our characters.

    var Position = function (x, y) {
        this.x = x;
        this.y = y;
    };

    var LivingBeing = function (position, healthPoints, movingSpeed, images, imageIndex) {
        this.position = position;
        this.hp = healthPoints;
        this.speed = movingSpeed;
        this.images = images;
        this.imageIndex = imageIndex;

        this.draw = function (ctx) {
            ctx.drawImage(this.images[this.imageIndex], this.x, this.y)
        }

        this.move = function (direction) {
            //TO DO!
            //We could get direction from the events.
        }
    };
}());