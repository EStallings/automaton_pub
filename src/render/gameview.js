
//NOT intended for the GUI!!!
//Leading underscore to emphasize there should only be one at a time
_GameView = function(){

	//where we get data about what to draw!
	this.level = null;

	this.mouseX = 0;
	this.mouseY = 0;

	this.baseGridSize = 50;

	this.gridSize = 50;
	this.maxZoom = 10;
	this.curZoom = 0;

	this.scaleFactor = 1.1;
	this.currentScale = 1;

	this.safeZone = 50; //amount extra to draw to avoid jumpiness. Dynamic

	this.canvas = document.getElementById('automatonCanvas');
  	this.context = this.canvas.getContext('2d');

  	

	//

	//for testing
	this.hudText1 = new GuiRawText(new Rect(10,500), Rgba(0,0,0,1), "", Font(20));

	this.hudText2 = new GuiRawText(new Rect(10,550), Rgba(0,0,0,1), "", Font(20));
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

		var pt = this.context.transformedPoint(InputHandler.mousePosition.x, InputHandler.mousePosition.y);
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
		//this.context.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
		this.context.fillStyle = '#000000';
		this.context.fillRect(p1.x, p1.y, p2.x-p1.x, p2.y-p1.y);

		//very reference image, just in case much want to make sure things are such scaling/moving right
		// var wow = new Image;
		// wow.src = 'https://pbs.twimg.com/profile_images/378800000822867536/3f5a00acf72df93528b6bb7cd0a4fd0c.jpeg'
		// this.context.drawImage(wow, 0, 0);

		var mpos = InputHandler.mousePosition;
		var wCoord = this.worldCoord(mpos.x, mpos.y);
		var gCoord = this.gridCoord(wCoord.x, wCoord.y);

		this.gridSize = this.baseGridSize * this.currentScale;
		this.safeZone = (this.baseGridSize * this.baseGridSize) / this.currentScale;
		
		
		//Non-critical
		this.hudText1.t = "mpos: " + mpos.x + "," + mpos.y;
		this.hudText2.t = "adj: " + wCoord.x.toFixed(2) + "," + wCoord.y.toFixed(2) + "    cell(only works for zoomed at 1x): " + gCoord.x + " ," + gCoord.y;
		

		//Will have to do more obviously. Does not yet account for offset...
		if(this.level){
			for(var i = 0; i < this.level.tokens.length; i++){
				this.level.tokens[i].drawSelf(this.context, this.currentScale, this.gridSize);
			}
			for(var i = 0; i < this.level.streams.length; i++){
				this.level.streams[i].drawSelf(this.context, this.currentScale, this.gridSize);
			}
			for(var i = 0; i < this.level.automatons.length; i++){
				this.level.automatons[i].drawSelf(this.context, this.currentScale, this.gridSize);
			}
			for(var i = 0; i < this.level.instructions.length; i++){
				this.level.instructions[i].drawSelf(this.context, this.currentScale, this.gridSize);
			}
		}

		

		this.drawGrid();
	}


	//NOTE: worldCoord, and gridCoord do NOT work for zooming just yet

	//returns the world coordinates (X, Y) when given screen coordinates (x, y)
	this.worldCoord = function(x, y){
		return this.context.transformedPoint(x, y);
	}

	//returns the cell (X, Y) when given world coordinates (x,y)
	this.gridCoord = function(x, y){
		x = Math.floor(x/this.gridSize);
		y = Math.floor(y/this.gridSize);
		return {x:x, y:y};
	}

	//returns the upper left corner of the cell specified in world coordinates
	this.gridToWorld = function(x, y){
		var f = this.gridCoord(x, y);
		return {x:f.x * this.gridSize, y:f.y * this.gridSize};
	}

	this.drawGrid = function(){
		var p1 = this.context.transformedPoint(0, 0);
		var m2 = this.gridToWorld(p1.x, p1.y);

		this.context.strokeStyle = '#2f122f';

		for(var x = m2.x; x < m2.x + (this.canvas.width + this.safeZone); x += this.gridSize){
			this.context.beginPath();
			this.context.moveTo(x, m2.y);
			this.context.lineTo(x, m2.y + this.canvas.height + this.safeZone);
			this.context.stroke();
		}
		for(var y = m2.y; y < m2.y + (this.canvas.height + this.safeZone); y += this.gridSize){
			this.context.beginPath();
			this.context.moveTo(m2.x, y);
			this.context.lineTo(m2.x + this.canvas.width + this.safeZone, y);
			this.context.stroke();
		}		

		
	}


	this.doClicking = function(x, y, lmb, rmb, evt){
		if(lmb){
		}
		else if (rmb){
		}
	}


}

