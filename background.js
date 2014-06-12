(function() {
	//Here we will draw our background.

	function Background() {
		this.paper = Raphael(10, 10, 10, 10); 
		//Paper's size should be same as the canvas size(which we should consider).
		
		this.draw = function() {
			this.paper.setStart();
			//Here goes background objects. TO DO!
			var backgroundImg = this.paper.setFinish();
			//Puts every drawn object in a set called "backgroundImg".
		}
	}
}());