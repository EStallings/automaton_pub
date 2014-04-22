App.PlanningGraphics = function(){

	var that = this;

	this.lmb = ['up',-1,-1,-1,-1,-1]; // [button state, scrnX, scrnY, cell x, cell y, cell c]
	this.mmb = ['up',-1,-1,-1,-1,-1];
	this.rmb = ['up',-1,-1,-1,-1,-1];
	this.mousePos = [-1,-1,-1,-1,-1]; // current mouse position [scrnX, scrnY, cellX, cellY, cellC]

	this.moving = false;

	this.mouseMove = function(cellX, cellY){
		that.mousePos[0] = App.InputHandler.mouseX;
		that.mousePos[1] = App.InputHandler.mouseY;
		that.mousePos[2] = cellX;
		that.mousePos[3] = cellY;
		that.mousePos[4] = App.GameRenderer.mouseC;

		if( (that.mousePos[2] !== that.mmb[3] || that.mousePos[3] !== that.mmb[4]) && that.lmb[0] === 'down'){
			that.moving = true;
		}
		else{ that.moving = false; }
	}

	this.mouseDown = function(button, cellX, cellY){
		if(button === 'lmb'){
			that.lmb[0] = 'down';
			that.lmb[1] = App.InputHandler.mouseX;
			that.lmb[2] = App.InputHandler.mouseY;
			that.lmb[3] = cellX;
			that.lmb[4] = cellY;
			that.lmb[5] = App.GameRenderer.mouseC;
		}
		else if(button === 'mmb'){
			that.mmb[0] = 'down';
			that.mmb[1] = App.InputHandler.mouseX;
			that.mmb[2] = App.InputHandler.mouseY;
			that.mmb[3] = cellX;
			that.mmb[4] = cellY;
			that.mmb[5] = App.GameRenderer.mouseC;
		}
		else{
			that.rmb[0] = 'down';
			that.rmb[1] = App.InputHandler.mouseX;
			that.rmb[2] = App.InputHandler.mouseY;
			that.rmb[3] = cellX;
			that.rmb[4] = cellY;
			that.rmb[5] = App.GameRenderer.mouseC;
		}
	}

	this.mouseUp = function(button, cellX, cellY){
		if(button === 'lmb'){
			that.lmb[0] = 'up';
			that.lmb[1] = App.InputHandler.mouseX;
			that.lmb[2] = App.InputHandler.mouseY;
			that.lmb[3] = cellX;
			that.lmb[4] = cellY;
			that.lmb[5] = App.GameRenderer.mouseC;
		}
		else if(button === 'mmb'){
			that.mmb[0] = 'up';
			that.mmb[1] = App.InputHandler.mouseX;
			that.mmb[2] = App.InputHandler.mouseY;
			that.mmb[3] = cellX;
			that.mmb[4] = cellY;
			that.mmb[5] = App.GameRenderer.mouseC;
		}
		else{
			that.rmb[0] = 'up';
			that.rmb[1] = App.InputHandler.mouseX;
			that.rmb[2] = App.InputHandler.mouseY;
			that.rmb[3] = cellX;
			that.rmb[4] = cellY;
			that.rmb[5] = App.GameRenderer.mouseC;
		}
	}

	this.staticRender = function(gfx){}

	this.selectionOverlay = function(gfx){

		var currentSelection = App.Game.currentPlanningLevel.currentSelection;
		gfx.fillStyle = 'rgba(100,100,100,.5)';
		gfx.strokeStyle = '#ffffff';

		var gridX, gridY, color, size, scrnX, scrnY, offsetX, offsetY;		
		var i = 0;

		App.GameRenderer.translateCanvas(gfx);
		do{
			gfx.fillStyle = 'rgba(100,100,100,.5)';
			gfx.strokeStyle = '#ffffff';

			gridX = currentSelection[i].x;
			gridY = currentSelection[i].y;
			color = currentSelection[i].color;
			size = App.GameRenderer.cellSize;
			scrnX = size * gridX;
			scrnY = size * gridY;
			size = size / 2; // TODO: ask about cellSizeFactor

			offsetX;
			offsetY;

			if(color == 0){
				offsetX = 0; offsetY = 0;
			}else if(color == 1){
				offsetX = size; offsetY = 0;
			}else if(color == 2){
				offsetX = 0; offsetY = size;
			}else{
				offsetX = size; offsetY = size;
			}

			// TODO: get rid of clear rect for efficiency
			if(App.Game.currentPlanningLevel.grid[gridX][gridY][color] !== null){
				gfx.strokeRect(scrnX+offsetX, scrnY+offsetY, size, size);
				gfx.clearRect(scrnX+offsetX+5, scrnY+offsetY-2, size-10, size+4);
				gfx.clearRect(scrnX+offsetX-2, scrnY+offsetY+5, size+4, size-10);
			}

			++i;
		}while(i < currentSelection.length);
		gfx.restore();
	}

	this.dynamicRender = function(gfx){
		App.GameRenderer.tempGfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

		// selection overlay
		if(App.Game.currentPlanningLevel.currentSelection.length !== 0
			&& App.Game.currentPlanningLevel.currentSelection[0] !== null ){ that.selectionOverlay(gfx); } // TODO: move to static render?

		// drag selection box
		if(App.InputHandler.mmb === true){ that.drawSelectionBox(gfx); }

		// move / copy graphics
		if(App.Game.currentPlanningLevel.currentSelection.length !== 0
			&& that.moving){ that.moveCopy(gfx); }
	}

	this.moveCopy = function(gfx){
		var mX = that.mousePos[0];
		var mY = that.mousePos[1];
		gfx.strokeStyle = 'rgba(200,200,200,.5)';
		gfx.beginPath();
		gfx.moveTo(that.lmb[1], that.lmb[2]);
		gfx.lineTo(mX, mY);
		gfx.stroke();
	}

	this.drawSelectionBox = function(gfx){	
		var curX = that.mousePos[0];
		var curY = that.mousePos[1];
		var downX = that.mmb[1];
		var downY = that.mmb[2];
		gfx.fillStyle = 'rgba(255,255,255,0.1)';
		gfx.fillRect(curX, curY, (downX-curX), (downY-curY) );
		gfx.strokeStyle = '#ffffff';
		gfx.lineWidth = 2;
		gfx.strokeRect(curX, curY, (downX-curX), (downY-curY) );
	}
}
