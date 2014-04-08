App.PlanningGraphics = function(){

	var that = this;

	this.staticRender = function(gfx){
		if(App.Game.currentPlanningLevel.currentSelection.length !== 0
				&& App.Game.currentPlanningLevel.currentSelection[0] !== null ){ that.selectionOverlay(gfx); }
	}

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
		gfx.fillStyle = '#ffffff';

		// TODO
	}

	this.dynamicRender = function(gfx){
		App.Game.tempGfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
		//if(App.Game.currentPlanningLevel.currentSelection[0] !== null &&
				//App.Game.currentPlanningLevel.currentSelection.length !== 0){ that.debug(gfx); }
		if(App.Game.currentPlanningLevel.input.isDown){ that.drawSelectionBox(gfx); }
	}

	this.drawSelectionBox = function(gfx){
		var mouseData = App.Game.currentPlanningLevel.input;
		var curX = mouseData.curX;
		var curY = mouseData.curY;
		var downX = App.Game.currentPlanningLevel.input.downScrnX;
		var downY = App.Game.currentPlanningLevel.input.downScrnY;
		gfx.fillStyle = '#ffffff';
		gfx.fillRect(curX, curY, (downX-curX), (downY-curY) );

		if(curX < downX && curY < downY){ gfx.clearRect(curX+2, curY+2, (downX-curX)-4, (downY-curY)-4); }
		if(curX > downX && curY < downY){ gfx.clearRect(curX-2, curY+2, (downX-curX)+4, (downY-curY)-4); }
		if(curX < downX && curY > downY){ gfx.clearRect(curX+2, curY-2, (downX-curX)-4, (downY-curY)+4); }
		if(curX > downX && curY > downY){ gfx.clearRect(curX-2, curY-2, (downX-curX)+4, (downY-curY)+4); }
	}
}
