App.PlanningControls = function(){
	var that = this;
	var lvl = App.Game.currentPlanningLevel;

	this.scrnX; this.scrnY; // current mouse position on screen
	this.cellX; this.cellY; this.cellC // current mouse position on the grid
	this.lmb = ['up',-1,-1,-1,-1,-1]; // [button state, scrnX, scrnY, cell x, cell y, cell c]
	this.mmb = ['up',-1,-1,-1,-1,-1];
	this.rmb = ['up',-1,-1,-1,-1,-1];
	this.lmbDrag = false;
	this.mmbDrag = false;
	this.rmbDrag = false;
	this.selectStart = [-1,-1,-1]; // x,y,c where the mmb was pressed down
	this.moveStart = [-1,-1,-1]; // x,y,c where the move started

	this.mouseMove = function(scrnX, scrnY, cellX, cellY, cellC){
		this.scrnX = scrnX; this.scrnY = scrnY;
		this.cellX = cellX; this.cellY = cellY; this.cellC = cellC;
		//console.log(cellX + ' ' + cellY + ' ' + cellC);
		if(that.lmb[0] === 'down' && (that.lmb[1] !== scrnX || that.lmb[2] !== scrnY)){ that.lmbDrag = true; } else { that.lmbDrag = false; }
		if(that.mmb[0] === 'down' && (that.mmb[1] !== scrnX || that.mmb[2] !== scrnY)){ that.mmbDrag = true; } else { that.mmbDrag = false; }
		if(that.rmb[0] === 'down' && (that.rmb[1] !== scrnX || that.rmb[2] !== scrnY)){ that.rmbDrag = true; } else { that.rmbDrag = false; }
	}

	this.buttonDown = function(button, scrnX, scrnY, cellX, cellY, cellC){
		if(button === 'lmb'){
			that.lmb = ['down', scrnX, scrnY, cellX, cellY, cellC];
			if(App.Game.currentPlanningLevel.currentSelection.length !== 0){
				this.moveStart = [cellX, cellY, cellC];
			}
		}
		
		if(button === 'mmb'){
			that.mmb = ['down', scrnX, scrnY, cellX, cellY, cellC];
			that.selectStart = [cellX, cellY, cellC];
			App.Game.currentPlanningLevel.currentSelection = [];
		}
		
		if(button ==='rmb'){ that.rmb = ['down', scrnX, scrnY, cellX, cellY, cellC]; }
		/*console.log('lmb: ' + that.lmb);
		console.log('mmb: ' + that.mmb);
		console.log('rmb: ' + that.rmb);
		console.log('');*/
	}

	// TODO make it so that one button can be held while another is released
	this.buttonUp = function(button, scrnX, scrnY, cellX, cellY, cellC){
		if(button === 'lmb'){
			that.lmb = ['up', scrnX, scrnY, cellX, cellY, cellC];
			if(that.moveStart[0] !== -1){
				var shiftX = cellX - that.moveStart[0];
				var shiftY = cellY - that.moveStart[1];

				if(App.InputHandler.keysDown['Ctrl']){ App.Game.currentPlanningLevel.copy( App.Game.currentPlanningLevel.currentSelection, shiftX, shiftY); }
				else{ App.Game.currentPlanningLevel.move( App.Game.currentPlanningLevel.currentSelection, shiftX, shiftY); }

				console.log(App.InputHandler.keysDown);

				that.moveStart = [-1,-1,-1];
			}
		}
		
		if(button === 'mmb'){
				that.mmb = ['up', scrnX, scrnY, cellX, cellY, cellC];
				App.Game.currentPlanningLevel.selectInstructions(that.selectStart[0], that.selectStart[1], that.selectStart[2], cellX, cellY, cellC);
			}
		
		if(button === 'rmb'){ that.rmb = ['up', scrnX, scrnY, cellX, cellY, cellC]; }
		/*console.log('lmb: ' + that.lmb);
		console.log('mmb: ' + that.mmb);
		console.log('rmb: ' + that.rmb);
		console.log('');*/
	}

	this.delKey = function(){
		if(App.Game.currentPlanningLevel.currentSelection !== []){
			App.Game.currentPlanningLevel.delete(App.Game.currentPlanningLevel.currentSelection);
		}
	}
}