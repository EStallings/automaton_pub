App.PlanningLevel = function(){
	var that = this;

	this.name; // name of the level
	this.width;	this.height; // grid size
	this.grid = []; // grid[x][y][color] = instruction
	this.currentSelection = [];
	this.undoStack = [];
	this.redoStack = [];
	this.locks = [false, false, false, false]; // R,G,B,Y
	this.input = new App.PlanningControls();
	this.graphics = new App.PlanningGraphics();
	this.insertDir = 'Left';

	// flag that lets the operation functions know how to handle conflicts.
	this.userOverlapSetting = 0; // 0 - reject operation, 1 - overwrite

	this.operation = function(opId, instructions, shiftX, shiftY, param, newVal, oldVal){
		this.opId = opId;
		this.instructions = instructions;
		this.shiftX = shiftX; this.shiftY = shiftY;
		this.param = param;
		this.newVal = newVal;
		this.oldVal = oldVal;
	}

	// returns an array that can have up to four instruction for the tile at x,y
	this.getCell = function(x,y){
		//Note: I edited this to prevent a potential crash and/or undefined being passed around.
		if(!that.grid[x] || !that.grid[x][y])
			return null;

		return that.grid[x][y];
	};

	// returns the instruction at x,y, color
	this.getInstruction = function(x,y,color){
		if(!that.grid[x] || !that.grid[x][y] || !that.grid[x][y][color])
			return null;

			return that.grid[x][y][color];
	};

	// checks whether or not an instruction in a grid cell has been defined or not
	this.contains = function(x, y, c){
		return (!!that.grid[x] && !!that.grid[x][y] && !!that.grid[x][y][c]); // added !!
	};

	// clears an entire cell
	this.removeCell = function(x,y){
		for(var c = 0; c < that.numColors; c++){
			if(that.grid[x]){
				if(that.grid[x][y]){
					that.grid[x][y][c] = null;
				}
			}
		}
	};

	// applies function f() to each cell in the grid
	this.forEachCell = function(f){
		for(var y = 0; y < that.height; y++){
			for(var x = 0; x < that.width; x++){
				for(var c = 0; c < that.numColors; c++){
					if(that.contains(x, y, c)){
						f(that.grid[x][y][c]);
					}
				}
			}
		}
	};

	this.toggleLock = function(color){
		if(that.locks[color] === true){that.locks[color] = false; }
		else{
			that.locks[color] = true;
			for(var i = 0; i < that.currentSelection.length; ++i){
				if(that.isLocked(that.currentSelection[i].color)){ that.currentSelection.splice(i,1); i--; }
			}
		}
	}

	// returns the states of the specified layer lock
	this.isLocked = function(color){ return that.locks[color]; }

	// fills currentSelection list of all unlocked instructions in cells between the specified coordinates
	this.selectInstructions = function(x1, y1, c1, x2, y2, c2){
		var that = App.Game.currentPlanningLevel; // TODO wierd bug with 'that'. not sure why this was needed
		if(x1 === x2 && y1 === y2 && c1 === c2){ // click select
			if(that.getInstruction(x1,y1,c1) && !that.isLocked(that.getInstruction(x1,y1,c1).color)){
				that.currentSelection[0] = that.getInstruction(x1,y1,c1);
			}
			else{ // click in empty space - clear selection
				that.currentSelection = [];
			}
		}
		else{ //drag select
			var p1 = that.xycToij(x1, y1, c1);
			var p2 = that.xycToij(x2, y2, c2);

			var upperLeft = [-1,-1];
			var lowerRight = [-1,-1];

			if(p1[0] < p2[0]){ upperLeft[0] = p1[0]; lowerRight[0] = p2[0]; }else{ upperLeft[0] = p2[0]; lowerRight[0] = p1[0]; }
			if(p1[1] < p2[1]){ upperLeft[1] = p1[1]; lowerRight[1] = p2[1]; }else{ upperLeft[1] = p2[1]; lowerRight[1] = p1[1]; }

			var numInstr = 0;
			var temp;
			for(var j = upperLeft[1]; j <= lowerRight[1]; j += .5){
				for(var i = upperLeft[0]; i <= lowerRight[0]; i += .5){
					temp = that.getInstruction(that.ijToxyc(i,j)[0], that.ijToxyc(i,j)[1], that.ijToxyc(i,j)[2]);
					if(temp && !that.isLocked(temp.color)){
						that.currentSelection[numInstr] = temp;
						++numInstr;
					}
				}
			}
		}
	}

	this.validateGrid = function(){
		for(var x in that.grid){
			if(that.grid[x]) for(var y in that.grid[x]){
				if(that.grid[x][y]) for(var c in that.grid[x][y]){
					if(that.grid[x][y][c] && (('' + that.grid[x][y][c].x !== x) || ('' + that.grid[x][y][c].y !== y))){
						console.log(x + ' ' + y + ' ' + c + ' : ' + that.grid[x][y][c].x + ' ' + that.grid[x][y][c].y);
					}
				}
			}
		}
	}

	this.xycToij = function(x,y,c){
		var coords = [x, y];
		if(c === 1 || c === 3){ coords[0] += .5; }
		if(c === 2 || c === 3){ coords[1] += .5; }
		return coords;
	}

	this.ijToxyc = function(i,j){
		var coords = [i,j];
		if(i%1 === 0 && j%1 === 0){ coords[2] = 0; }
		if(i%1 === .5 && j%1 === 0){ coords[2] = 1; coords[0] -= .5; }
		if(i%1 === 0 && j%1 === .5){ coords[2] = 2; coords[1] -= .5; }
		if(i%1 === .5 && j%1 === .5){ coords[2] = 3; coords[0] -= .5; coords[1] -= .5;}
		return coords;
	}

	this.toList = function(x){

		if(!x){ return [null]; }

		if(x[0] === undefined){
			var temp = x;
			x = [];
			x[0] = temp;
		}
		return x;
	}

	// this function takes a list of PlanningInstructions and inserts them into the grid
	this.insert = function(instructions){
		instructions = that.toList(instructions);

		for(var i in instructions){
			if(instructions[i].x < 0 || instructions[i].x >= that.width){ console.log('insert out of bounds'); return; }
			if(instructions[i].y < 0 || instructions[i].y >= that.height){ console.log('insert out of bounds'); return; }
			if(that.isLocked(instructions[i].color)){ console.log('layer locked'); return; }
			if(that.getInstruction(instructions[i].x,instructions[i].y,instructions[i].color) !== null){ // space occupied
				// TODO overwrite
				if(that.userOverlapSetting == 1){ // overwrite
					console.log('insert blocked');
					return; // this probably causes things to break
				}
				else{ // reject
					console.log('insert blocked');
					return; // this probably causes things to break
				}

			}
			else{ // free space
				if(!that.grid[instructions[i].x]){ that.grid[instructions[i].x] = []; }
				if(!that.grid[instructions[i].x][instructions[i].y]){ that.grid[instructions[i].x][instructions[i].y] = []; }

				that.grid[instructions[i].x][instructions[i].y][instructions[i].color] = instructions[i];
			}
		}

		that.undoStack.push(new that.operation('ins', instructions, null, null, null, null));
		App.Game.requestStaticRenderUpdate = true;
		that.killRedo('kill redo: insert');
		that.validateGrid();
	}

	// this function takes a list of coordinate triplets and deletes the corresponding instructions from the grid
	this.delete = function(instructions){
		if(that.currentSelection === []){ return; }
		instructions = that.toList(instructions);
		for(i in instructions){
			if(that.isLocked(instructions[i].color)){ console.log('layer locked'); return; }
			that.grid[instructions[i].x][instructions[i].y][instructions[i].color] = null;
		}
		that.undoStack.push(new that.operation('del', instructions, null, null, null, null));
		App.Game.requestStaticRenderUpdate = true;
		that.killRedo('kill redo: delete');
		that.currentSelection = [];
		that.validateGrid();
	}

	// this function takes a list of coordinate triplets and shifts the instructions they point to by shiftX and shiftY
	this.move = function(instructions,shiftX,shiftY){

		instructions = that.toList(instructions);

		that.undoStack.push(new that.operation('mov', instructions, shiftX, shiftY, null, null)); // will have to pop if move fails
		for(i in instructions){
			if(that.isLocked(instructions[i].color)){ console.log('layer locked'); return; }

			var x = instructions[i].x;
			var y = instructions[i].y;
			var c = instructions[i].color;
			if(that.getInstruction(x + shiftX, y + shiftY, c) && that.currentSelection.indexOf(that.getInstruction(x + shiftX, y + shiftY, c)) === -1){  // space occupied
				// TODO overwrite
				if(that.userOverlapSetting == 1){ // overwrite
					console.log('insert blocked');
					return; // this probably causes things to break
				}
				else{ // reject
					console.log('insert blocked');
					return; // this probably causes things to break
				}
			}
			else{ // free space
				if(!that.grid[x+shiftX]){ that.grid[x+shiftX] = []; }
				if(!that.grid[x+shiftX][y+shiftY]){ that.grid[x+shiftX][y+shiftY] = []; }

				that.grid[x+shiftX][y+shiftY][c] = instructions[i];
				instructions[i].x += shiftX;
				instructions[i].y += shiftY;
				that.grid[x][y][c] = null;
			}
		}
		App.Game.requestStaticRenderUpdate = true;
		that.killRedo('kill redo: move');
		that.validateGrid();
	}

	// this function takes a list of coordinate triplets and copies the instructions they point to to a new cell shiftX and shiftY away from the first
	this.copy = function(instructions,shiftX,shiftY){
		instructions = that.toList(instructions);
		that.undoStack.push(new that.operation('cpy', instructions, shiftX, shiftY, null, null)); // will have to pop if move fails

		for(i in instructions){
			if(that.isLocked(instructions[i].color)){ console.log('layer locked'); return; }

			if(!instructions[i]){
				console.log('instruction doesn\'t exist');
				return;
			}

			var x = instructions[i].x;
			var y = instructions[i].y;
			var c = instructions[i].color;
			if(that.getInstruction(x + shiftX, y + shiftY, c)){  // space occupied
				// TODO overwrite
				if(that.userOverlapSetting == 1){ // overwrite
					console.log('insert blocked');
					return; // this probably causes things to break
				}
				else{ // reject
					console.log('insert blocked');
					return; // this probably causes things to break
				}
			}
			else{ // free space
				if(!that.grid[x+shiftX]){ that.grid[x+shiftX] = []; }
				if(!that.grid[x+shiftX][y+shiftY]){ that.grid[x+shiftX][y+shiftY] = []; }

				that.grid[x+shiftX][y+shiftY][c] = new App.PlanningInstruction(x+shiftX, y+shiftY, c, instructions[i].type);
				that.grid[x+shiftX][y+shiftY][c].x += shiftX;
				that.grid[x+shiftX][y+shiftY][c].y += shiftY;
			}
		}
		App.Game.requestStaticRenderUpdate = true;
		that.killRedo('kill redo: copy');
		that.validateGrid();
	}

	// TODO
	// this function takes a list of coordinate triplets and changes the specified parameter of all of them to value
	this.modify = function(instructions, parameter, value){}

	// each call to this function pops the undo stack, and undoes whatever operation it finds
	this.undo = function(){
		var op = that.undoStack.pop();
		if(op === undefined){ return; }
		if(op.opId === 'ins'){
			for(i in op.instructions){
				var x = op.instructions[i].x;
				var y = op.instructions[i].y;
				var c = op.instructions[i].color;

				that.grid[x][y][c] = null;
				that.redoStack.push(op);
			}
		}
		else if(op.opId === 'del'){
			for(i in op.instructions){
				var x = op.instructions[i].x;
				var y = op.instructions[i].y;
				var c = op.instructions[i].color;

				that.grid[x][y][c] = op.instructions[i];
				that.redoStack.push(op);
			}
		}
		else if(op.opId === 'mov'){
			for(i in op.instructions){
				var x = op.instructions[i].x;
				var y = op.instructions[i].y;
				var c = op.instructions[i].color;

				that.grid[x-op.shiftX][y-op.shiftY][c] = op.instructions[i];
				that.grid[x-op.shiftX][y-op.shiftY][c].x -= op.shiftX;
				that.grid[x-op.shiftX][y-op.shiftY][c].y -= op.shiftY;
				that.grid[x][y][c] = null;
				that.redoStack.push(op);
			}
		}
		else if(op.opId === 'cpy'){
			for(i in op.instructions){
				var x = op.instructions[i].x;
				var y = op.instructions[i].y;
				var c = op.instructions[i].color;

				that.grid[x+op.shiftX][y+op.shiftY][c] = null;
				that.redoStack.push(op);
			}			
		}
		App.Game.requestStaticRenderUpdate = true;
		that.validateGrid();
	};

	// each call to this function pops the redo stack, and undoes whatever operation it finds
	this.redo = function(){
		var op = that.redoStack.pop();
		if(op === undefined){ return; }
		if(op.opId === 'ins'){
			for(i in op.instructions){
				var x = op.instructions[i].x;
				var y = op.instructions[i].y;
				var c = op.instructions[i].color;

				that.grid[x][y][c] = op.instructions[i];
				that.undoStack.push(op);
			}
		}
		else if(op.opId === 'del'){
			for(i in op.instructions){
				var x = op.instructions[i].x;
				var y = op.instructions[i].y;
				var c = op.instructions[i].color;

				that.grid[x][y][c] = null;
				that.undoStack.push(op);
			}
		}
		else if(op.opId === 'mov'){
			for(i in op.instructions){
				var x = op.instructions[i].x;
				var y = op.instructions[i].y;
				var c = op.instructions[i].color;

				that.grid[x+op.shiftX][y+op.shiftY][c] = op.instructions[i];
				that.grid[x+op.shiftX][y+op.shiftY][c].x += op.shiftX;
				that.grid[x+op.shiftX][y+op.shiftY][c].y += op.shiftY;
				that.grid[x][y][c] = null;
				that.undoStack.push(op);
			}
		}
		else if(op.opId === 'cpy'){
			for(i in op.instructions){
				var x = op.instructions[i].x;
				var y = op.instructions[i].y;
				var c = op.instructions[i].color;

				that.grid[x+op.shiftX][y+op.shiftY][c] = op.instructions[i];
				that.undoStack.push(op);
			}			
		}
		App.Game.requestStaticRenderUpdate = true;
		that.validateGrid();
	}

	this.killUndo = function(str){ that.undoStack = []; console.log(str); }
	this.killRedo = function(str){ that.redoStack = []; console.log(str); }

	this.generateParseString = function(){
		var strings = [];
		strings.push(this.name + ',' + this.width + ',' + this.height);

		for(var i in this.grid){
			for(var j in this.grid[i]){
				for(var c in this.grid[i][j]){
					var inst = this.grid[i][j][c];
					if(inst !== null){
						strings.push(inst.x + ',' + inst.y + ',' + inst.color + ',' + inst.type); // should there be a semicolon? the next x will be appended to the the type of the preceding instruction
					}
				}
			}
		}

		return strings.join(';');
	};

	// return a simulation level with instructions from the grid
	this.generateSimulationLevel = function(){
		var newLevel = new App.SimulationLevel(that.width, that.height);
		for(var i in that.grid){
			for(var j in that.grid[i]){
				for(var c in that.grid[i][j]){
					var ins = that.getInstruction(i,j,c);
					if(ins){
						new App.SimulationInstruction(newLevel,ins.x,ins.y,ins.color,ins.type);
					}
				}
			}
		}
		return newLevel;
	};

	this.staticRender = function(){
		var selected;
		var cs = App.Game.cellSize;
		App.Game.translateCanvas(App.Game.instructionGfx);
		App.Game.instructionGfx.lineWidth = 2;
		for(var c=0;c<4;++c){
			App.Game.instructionGfx.save();
			switch(c){
				case 0:
					App.Game.instructionGfx.fillStyle = '#ff0000';
					App.Game.instructionGfx.translate(0,0);
					break;
				case 1:
					App.Game.instructionGfx.fillStyle = '#00ff00';
					App.Game.instructionGfx.translate(cs/2,0);
					break;
				case 2:
					App.Game.instructionGfx.fillStyle = '#0000ff';
					App.Game.instructionGfx.translate(0,cs/2);
					break;
				case 3:
					App.Game.instructionGfx.fillStyle = '#ffff00';
					App.Game.instructionGfx.translate(cs/2,cs/2);
					break;
			}

			for(var i in that.grid)
				for(var j in that.grid[i])
					if(that.grid[i][j][c]){
						selected = false;
						if(that.currentSelection.indexOf(that.getInstruction(i,j,c)) != -1){
							selected = true;
						}

						App.InstCatalog.render(
							App.Game.instructionGfx,
							that.grid[i][j][c].type,
							i*cs,j*cs,c,cs/2);
					}

			App.Game.instructionGfx.restore();
		}
		App.Game.instructionGfx.restore();
	}

	this.dynamicRender = function(){}

	this.dumpUndo = function(){
		console.log('undo stack: ');
		for(var i = 0; i < that.undoStack.length; ++i){
			console.log(i + ' ' + that.undoStack[i].opId);
		}	
	}

	this.dumpRedo = function(){
		console.log('redo stack: ');
		for(var i = 0; i < that.redoStack.length; ++i){
			console.log(i + ' ' + that.redoStack[i].opId);
		}	
	}

	this.dumpGrid = function(){
		for(var i in that.grid){
			if(that.grid[i] !== undefined)for(var j in that.grid[i]){
				if(that.grid[i][j] !== undefined)for(var k in that.grid[i][j]){
					if(that.grid[i][j][k]){
						console.log('cell x,y,c: ' + i + ', ' + j + ', ' + k + ' instr x,y: ' + that.grid[i][j][k].x + ', ' + that.grid[i][j][k].y +
							' color: ' + that.grid[i][j][k].color + ' type: ' + that.grid[i][j][k].type);
					}
				}
			}
		}
	}
}
