
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

	this.safeZone = 100; //amount extra to draw to avoid jumpiness

	this.canvas = document.getElementById('automatonCanvas');
  	this.context = this.canvas.getContext('2d');

  	trackTransforms(this.context);

	//

	//for testing
	this.hudText1 = new GuiRawText(new Rect(100,100), Rgba(0,0,0,1), "", Font(20));

	this.hudText2 = new GuiRawText(new Rect(100,200), Rgba(0,0,0,1), "", Font(20));
	//

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
		 if(RMB_DOWN){
	      this.translate(-(MOVE_POINT.x - CLICK_POINT.x)/(this.canvas.width/2), 
	      	-(MOVE_POINT.y - CLICK_POINT.y)/(this.canvas.height/2));
	    }
		
		//Clear artifacts
		var p1 = this.context.transformedPoint(0,0);
		var p2 = this.context.transformedPoint(this.canvas.width, this.canvas.height);
		this.context.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

		this.hudText1.t = "oX = " + this.offsetX + ", oY = " + this.offsetY + 
		"\n p1 " + p1.x + "," + p1.y + "; p2 " + p2.x + "," + p2.y;
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
		var oX = (this.offsetX % this.baseGridSize) * this.currentScale;
		var oY = (this.offsetY % this.baseGridSize) * this.currentScale;

		var p1 = this.context.transformedPoint(0 - oX, 0 - oY);
		var p2 = this.context.transformedPoint(this.canvas.width + oX, this.canvas.height + oY);

		this.hudText2.t = "oX = " + oX + ", oY = " + oY + 
		"\n p1 " + p1.x + "," + p1.y + "; p2 " + p2.x + "," + p2.y;

		for(var x = p1.x; x < p2.x; x += this.baseGridSize * this.currentScale){
			
			this.context.beginPath();
			this.context.moveTo(x, p1.y - this.safeZone);
			this.context.lineTo(x, p2.y + this.safeZone);
			this.context.stroke();
		}

		for(var y = p1.y; y < p2.y; y += this.baseGridSize * this.currentScale){
			this.context.beginPath()
			this.context.moveTo(p1.x - this.safeZone, y);
			this.context.lineTo(p2.x + this.safeZone, y);
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


	this.doClicking = function(x, y, lmb, rmb, evt){
		if(lmb){
		}
		else if (rmb){
		}
	}


}

