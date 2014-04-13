App.PlanningGraphics = function(){

	// TODO: graphics for move
	// TODO: graphics for copy

	var that = this;

	this.staticRender = function(gfx){}

	this.debug = function(gfx){
		gfx.fillStyle = '#ffffff';
		gfx.font='20px Georgia';
		
		gfx.fillText('mouse x: ' + App.Game.currentPlanningLevel.input.downX +
			'     mouse y: ' + App.Game.currentPlanningLevel.input.downY +
			'     mouse c: ' + App.Game.currentPlanningLevel.input.downC,
			 100,100);
		
		var instruction = App.Game.currentPlanningLevel.currentSelection[0];
		gfx.fillText('instruction x: ' + instruction.x + '     instruction y: ' + instruction.y +
			'     instruction c: ' + instruction.color, 100,122);

	}

	this.selectionOverlay = function(gfx){
		var currentSelection = App.Game.currentPlanningLevel.currentSelection;
		gfx.fillStyle = 'rgba(100,100,100,.5)';
		gfx.strokeStyle = '#ffffff';

		var gridX, gridY, color, size, scrnX, scrnY, offsetX, offsetY;		
		var i = 0;

		App.Game.translateCanvas(gfx);
		do{
			gfx.fillStyle = 'rgba(100,100,100,.5)';
			gfx.strokeStyle = '#ffffff';

			gridX = currentSelection[i].x;
			gridY = currentSelection[i].y;
			color = currentSelection[i].color;
			size = App.Game.cellSize;
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

			if(App.Game.currentPlanningLevel.grid[gridX][gridY][color] !== null){
				// this is extremely inefficient...
				gfx.strokeRect(scrnX+offsetX, scrnY+offsetY, size, size);
			//	gfx.strokeRect(scrnX+offsetX-1, scrnY+offsetY-1, size+2, size+2);
				gfx.clearRect(scrnX+offsetX+5, scrnY+offsetY-2, size-10, size+4);
				gfx.clearRect(scrnX+offsetX-2, scrnY+offsetY+5, size+4, size-10);
			//	gfx.fillRect(scrnX+offsetX, scrnY+offsetY, size, size);
			}

			++i;
		}while(i < currentSelection.length);
		gfx.restore();
	}

	this.dynamicRender = function(gfx){
		App.Game.tempGfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
		//if(App.Game.currentPlanningLevel.currentSelection[0] !== null &&
				//App.Game.currentPlanningLevel.currentSelection.length !== 0){ that.debug(gfx); }
		if(App.Game.currentPlanningLevel.currentSelection.length !== 0
			&& App.Game.currentPlanningLevel.currentSelection[0] !== null ){ that.selectionOverlay(gfx); } // TODO: move to static render?

		if(App.Game.currentPlanningLevel.input.mmb[0] === 'down'){ that.drawSelectionBox(gfx); }
	}

	this.drawSelectionBox = function(gfx){
		var mouseData = App.Game.currentPlanningLevel.input;
		var curX = mouseData.scrnX;
		var curY = mouseData.scrnY;
		var downX = App.Game.currentPlanningLevel.input.mmb[1];
		var downY = App.Game.currentPlanningLevel.input.mmb[2];
		gfx.fillStyle = 'rgba(255,255,255,0.1)';
		gfx.fillRect(curX, curY, (downX-curX), (downY-curY) );
		gfx.strokeStyle = '#ffffff';
		gfx.lineWidth = 2;
		gfx.strokeRect(curX, curY, (downX-curX), (downY-curY) );
	//	gfx.strokeRect(curX-1, curY-1, (downX-curX)-1, (downY-curY)-1 );
	}
}
