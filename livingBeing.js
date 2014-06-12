(function() {
	//Here we will make our characters.

	function LivingBeing(x, y, healthPoints, movingSpeed, appearance, imageIndex) {
		this.x = x; 
		this.y = y;
		//These are the coordinates on which we will position the instances of this object.
		this.hp = healthPoints;
		this.speed = movingSpeed;
		this.appearance = appearance;
		//The appearance could be an arrey of canvas images.
		//If so we need an index.
		this.imgIndex = imageIndex;

		this.draw = function(ctx) {
			ctx.drawImage(this.appearance[this.imageIndex], this.x, this.y)
		}

		this.move = function(direction) {
			//TO DO!
			//We could get direction from the events.
		}
	}
}());