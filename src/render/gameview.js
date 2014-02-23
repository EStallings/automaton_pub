
//NOT intended for the GUI!!!
//Leading underscore to emphasize there should only be one at a time
_GameView = function(){

	//where we get data about what to draw!
	this.level = null;

	this.mouseX = 0;
	this.mouseY = 0;

	this.baseGridSize = 50;

	this.scaleFactor = 2;
	this.currentScale = 1;
	this.offsetX = 0;
	this.offsetY = 0;

	this.canvas = document.getElementById('automatonCanvas');
  	this.context = this.canvas.getContext('2d');

  	trackTransforms(this.context);


  	this.loadLevel = function(level){
  		this.level = level;
  		this.drawObjects = [[],[],[],[],[]];
  		this.scaleFactor = 2;
  		this.currentScale = 1;
  	}

	this.zoom = function(amount){
		var pt = this.context.transformedPoint(this.mouseX, this.mouseY);
		this.context.translate(pt.x, pt.y);

		var factor = Math.pow(this.scaleFactor, amount);
		this.currentScale *= factor;
		this.context.scale(factor, factor);
		this.context.translate(-pt.x, -pt.y);
	}

	this.draw = function(){
		//Clear artifacts
		var p1 = this.context.transformedPoint(0,0);
		var p2 = this.context.transformedPoint(this.canvas.width, this.canvas.height);
		this.context.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
		//Will have to do more obviously. Does not yet account for offset...
		if(this.level){
			for(var i = 0; i < this.level.tokens.length; i++){
				this.level.tokens[i].drawSelf(this.context, this.offsetX, this.offsetY, this.currentScale);
			}
			for(var i = 0; i < this.level.streams.length; i++){
				this.level.streams[i].drawSelf(this.context, this.offsetX, this.offsetY, this.currentScale);
			}
			for(var i = 0; i < this.level.automatons.length; i++){
				this.level.automatons[i].drawSelf(this.context, this.offsetX, this.offsetY, this.currentScale);
			}
			for(var i = 0; i < this.level.instructions.length; i++){
				this.level.instructions[i].drawSelf(this.context, this.offsetX, this.offsetY, this.currentScale);
			}
		}

		

		this.drawGrid();
	}

	this.drawGrid = function(){
		this.context.strokeStyle = "#000000";
		var oX = (this.offsetX & this.baseGridSize);
		var oY = (this.offsetY & this.baseGridSize);

		var p1 = this.context.transformedPoint(0 - oX, 0 - oY);
		var p2 = this.context.transformedPoint(this.canvas.width + oX, this.canvas.height + oY);


		for(var x = p1.x; x < p2.x; x += this.baseGridSize * this.currentScale){
			
			this.context.beginPath();
			this.context.moveTo(x, p1.y);
			this.context.lineTo(x, p2.y);
			this.context.stroke();
		}

		for(var y = p1.y; y < p2.y; y += this.baseGridSize * this.currentScale){
			this.context.beginPath()
			this.context.moveTo(p1.x, y);
			this.context.lineTo(p2.x, y);
			this.context.stroke();
		}
	}

	this.translate = function(x, y){
		this.context.translate(x, y);
		this.offsetX -=x;
		this.offsetY -=y;
	}


	this.resize = function(width, height){
		this.canvas.width = width;
		this.canvas.height = height;
	}

	this.findCellAtPoint = function(x, y){
		//TODO write me!
	}


}

