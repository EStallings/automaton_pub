
//NOT intended for the GUI!!!
//Leading underscore to emphasize there should only be one at a time
_GameView = function(){

	//where we get data about what to draw!
	this.level = null;

	this.mouseX = 0;
	this.mouseY = 0;

	this.baseGridSize = 50;
	this.currentGridSize = 50;
	this.maxZoom = 10;
	this.curZoom = 0;

	this.scaleFactor = 1.1;
	this.currentScale = 1;
	this.offsetX = 0;
	this.offsetY = 0;

	this.safeZone = 100; //amount extra to draw to avoid jumpiness

	this.canvas = document.getElementById('automatonCanvas');
  	this.context = this.canvas.getContext('2d');

  	

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
		if(Math.abs(this.curZoom + amount) > this.maxZoom) return;
		this.curZoom += amount;

		var pt = this.context.transformedPoint(InputHandler.lastX, InputHandler.lastY);
		this.context.translate(pt.x, pt.y);

		var factor = Math.pow(this.scaleFactor, amount);
		this.currentScale *= factor;
		this.context.scale(factor, factor);
		this.context.translate(-pt.x, -pt.y);
	}

	this.draw = function(){
		 // if(RMB_DOWN){
	  //     this.translate(-(MOVE_POINT.x - CLICK_POINT.x)/(this.canvas.width/2), 
	  //     	-(MOVE_POINT.y - CLICK_POINT.y)/(this.canvas.height/2));
	  //   }
		
		//Clear artifacts
		var p1 = this.context.transformedPoint(0,0);
		var p2 = this.context.transformedPoint(this.canvas.width, this.canvas.height);
		this.context.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

		var img = new Image;
		img.src = 'http://phrogz.net/tmp/grid_512.png'
		this.context.drawImage(img, 0, 0);


		this.hudText1.t = "oX = " + this.offsetX.toFixed(2) + ", oY = " + this.offsetY.toFixed(2) + 
		"\n p1 " + p1.x.toFixed(2) + "," + p1.y.toFixed(2) + "; p2 " + p2.x.toFixed(2) + "," + p2.y.toFixed(2);
		//Will have to do more obviously. Does not yet account for offset...
		if(this.level){
			for(var i = 0; i < this.level.tokens.length; i++){
				this.level.tokens[i].drawSelf(this.context, this.currentScale);
			}
			for(var i = 0; i < this.level.streams.length; i++){
				this.level.streams[i].drawSelf(this.context, this.currentScale);
			}
			for(var i = 0; i < this.level.automatons.length; i++){
				this.level.automatons[i].drawSelf(this.context, this.currentScale);
			}
			for(var i = 0; i < this.level.instructions.length; i++){
				this.level.instructions[i].drawSelf(this.context, this.currentScale);
			}
		}

		

		this.drawGrid();
	}

	this.drawGrid = function(){
		this.context.strokeStyle = "#000000";
		var off = this.baseGridSize * this.currentScale * this.currentScale;
		var oX = (this.offsetX) % (off);
		var oY = (this.offsetY) % (off);

		var p1 = this.context.transformedPoint(0 - oX, 0 - oY);
		var p2 = this.context.transformedPoint(this.canvas.width + oX, this.canvas.height + oY);

		this.hudText2.t = "oX = " + oX.toFixed(2) + ", oY = " + oY.toFixed(2) + 
		"\n p1 " + p1.x.toFixed(2) + "," + p1.y.toFixed(2) + "; p2 " + p2.x.toFixed(2) + "," + p2.y.toFixed(2);

		var step = this.baseGridSize * this.currentScale;

		for(var x = p1.x - step; x < p2.x + step; x += step){
			
			this.context.beginPath();
			this.context.moveTo(x, p1.y - this.safeZone);
			this.context.lineTo(x, p2.y + this.safeZone);
			this.context.stroke();
		}

		for(var y = p1.y - step; y < p2.y + step; y += step){
			this.context.beginPath()
			this.context.moveTo(p1.x - this.safeZone, y);
			this.context.lineTo(p2.x + this.safeZone, y);
			this.context.stroke();
		}
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

