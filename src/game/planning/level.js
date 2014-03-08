App.PlanningLevel = function(){
	this.name; // name of the level
	this.width;	this.height; // grid size
	this.numColors = 4; // number of different colors in the game
	this.grid = []; // grid[x][y][color] = instruction
	this.undoStack = []; // stores operation objects that can be undone later
	this.redoStack = []; // stores operation objects that can be redone later

	// flag that lets the operation functions know how to handle conflicts.
	this.userOverlapSetting = 0; // 0 - reject operation, 1 - overwrite

	var that = this;

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

	// contains information needed to undo or redo any of the group operations
	this.groupOp = function(numInstructions){
		this.numInstructions = numInstructions;
		this.opId = 'group';
	};

	// contains the information needed to undo or redo an insert operation
	this.insertOp = function(instruction){		
		this.instruction = instruction;
		this.overWritten = null;
		this.opId = 'insert';
	};
	
	// contains the information needed to undo or redo a delete operation
	this.deleteOp = function(instruction){		
		this.instruction = instruction;
		this.opId = 'delete';
	};

	// contains the information needed to undo or redo a move operation
	this.moveOp = function(instruction, newX, newY){
		this.instruction = instruction;
		this.newX = newX; this.newY = newY;
		this.overWritten = null;
		this.opId = 'move';
	};

	// contains the information needed to undo or redo a copy operation
	this.copyOp = function(instruction, newX, newY){
		this.instruction = instruction;
		this.newX = newX; this.newY = newY;
		this.overWritten = null;
		this.opId = 'copy';
	};

	// contains the information needed to undo or redo a modify operation
	this.modifyOp = function(instruction, parameter, newValue, oldValue){
		this.instruction = instruction;
		this.parameter = parameter;
		this.newValue = newValue;
		this.oldValue = oldValue;
		this.overWritten = null;
		this.opId = 'modify';
	};

	// this function takes a list of PlanningInstructions and inserts them into the grid
	this.groupInsert = function(instructions){
		for(var x = 0; x < instructions.length; x++){
			that.insert(instructions[x]);
		}
		that.undoStack.push(new that.groupOp(instructions.length));
	};

	// this function takes a list of coordinate triplets and deletes the corresponding instructions from the grid
	this.groupDelete = function(coords){
		for(var x = 0; x < coords.length; x++){
			that.delete(coords[x][0],coords[x][1],coords[x][2]);
		}
		that.undoStack.push(new that.groupOp(coords.length));
	};

	// this function takes a list of coordinate triplets and shifts the instructions they point to by shiftX and shiftY
	this.groupMove = function(coords,shiftX,shiftY){
		for(var x = 0; x < coords.length; x++){
			that.move(coords[x][0],coords[x][1],coords[x][2],coords[x][0]+shiftX,coords[x][1]+shiftY);
		}
		that.undoStack.push(new that.groupOp(coords.length));
	}

	// this function takes a list of coordinate triplets and copies the instructions they point to to a new cell shiftX and shiftY away from the first
	this.groupCopy = function(coords,shiftX,shiftY){
		for(var x = 0; x < coords.length; x++){
			that.copy(coords[x][0],coords[x][1],coords[x][2],coords[x][0]+shiftX,coords[x][1]+shiftY);
		}
		that.undoStack.push(new that.groupOp(coords.length));
	}

	// not sure we will actually need this one
	// this function takes a list of coordinate triplets and changes the specified parameter of all of them to value
	this.groupModify = function(coords, parameter, value){
		for(var x = 0; x < coords.length; x++){
			that.modify(this.getInstruction(coords[x][0],coords[x][1],coords[x][2]),parameter,value);
		}
		that.undoStack.push(new that.groupOp(coords.length));
	}

	// this function performs a modify operation on an instruction,
	// and creates and pushes a modifyOp object onto the undo stack.
	// if the parameter is 'color', then this will try to move the instruction
	// to the appropriate spot in the array.
	this.modify = function(instruction, parameter, value){
		if(that.contains(instruction.x, instruction.y, instruction.color)){
			var oldColor = instruction.color;
			// update undo stack
			that.undoStack.push(new that.modifyOp(instruction, parameter, value, instruction[parameter]));

			// update instruction
			that.grid[instruction.x][instruction.y][instruction.color][parameter] = value;

			// update grid if the color changed
			if(parameter === 'color'){
				// if the location the cell would be moved to is free
				if(!that.getInstruction(instruction.x, instruction.y,value)){
					that.grid[instruction.x][instruction.y][value] = that.getInstruction(instruction.x, instruction.y,oldColor);
					that.grid[instruction.x][instruction.y][oldColor] = null;
				// if the location is not empty, and the user setting is set to overwrite
				} else if(that.userOverlapSetting === 1){
					// store the old instruction into the modiyOp object
					that.undoStack[that.undoStack.length-1].overWritten = that.getInstruction(instruction.x,instruction.y,value);

					// perform the overwrite
					that.grid[instruction.x][instruction.y][value] = that.getInstruction(instruction.x, instruction.y,oldColor);
					that.grid[instruction.x][instruction.y][oldColor] = null;
				}
				else{
					that.grid[instruction.x][instruction.y][oldColor][parameter] = oldColor; // reset the color if the move part of the operation got rejected
				}
			}
		}
	};

	// this function performs a copy operation on an instruction,
	// and creates and pushes a copyOp object onto the undo stack.
	this.copy = function(x, y, color, newX, newY){
		// update undo stack
		that.undoStack.push(new that.copyOp(that.getInstruction(x,y,color), newX, newY));

		// make sure there is an instruction at the specified coordinate
		if(!that.contains(x,y,color)){ return; }

		// update grid
		if(!that.getInstruction(newX,newY,color)){
			// place the copy
			if(that.grid[newX] && that.grid[newX][newY] ){
				that.grid[newX][newY][color] = that.getInstruction(x,y,color);
			} else if(that.grid[newX]){
				that.grid[newX][newY] = [];
				that.grid[newX][newY][color] = that.getInstruction(x,y,color);
			} else {
				that.grid[newX] = [];
				that.grid[newX][newY] = [];
				that.grid[newX][newY][color] = that.getInstruction(x,y,color);
			}

		} else if(that.userOverlapSetting === 1){
			// store the old instruction
			that.undoStack[that.undoStack.length-1].overWritten = that.getInstruction(newX,newY,color);

			// overwrite
			that.grid[newX][newY][color] = that.getInstruction(x,y,color);
		}
	};

	// this function, performs a move operation on an instruction,
	// and creates and pushes a moveOp object onto the undo stack.
	this.move = function(x, y, color, newX, newY){

		// make sure there is an instruction at the specified coordinate
		if(!that.contains(x,y,color)){ return; }

		// update undo stack
		that.undoStack.push(new that.moveOp(that.getInstruction(x,y,color), newX, newY));

		// update grid
		if(!that.contains(newX,newY,color)){
			if(that.contains(x,y,color)){
				if(that.contains(newX, newY, color)){
					that.grid[newX][newY][color] = that.getInstruction(x,y,color);
					that.grid[x][y][color] = null;
				}
				else{
					if(that.grid[newX]){
						if(that.grid[newX][newY]){
							that.grid[newX][newY][color] = that.getInstruction(x,y,color);
							that.grid[x][y][color] = null;
						}
						else{
							that.grid[newX][newY] = [];
							that.grid[newX][newY][color] = that.getInstruction(x,y,color);
							that.grid[x][y][color] = null;
						}
					}
					else{
						that.grid[newX] = [];
						that.grid[newX][newY] = [];
						that.grid[newX][newY][color] = that.getInstruction(x,y,color);
						that.grid[x][y][color] = null;
					}
				}
			}
		}
		else if(that.userOverlapSetting === 1){
			// store the old instruction
			that.undoStack[that.undoStack.length-1].overWritten = that.getInstruction(newX,newY,color);

			// overwrite
			that.grid[newX][newY][color] = that.getInstruction(x,y,color);
			that.grid[x][y][color] = null;			
		}
	};

	// this function performs an insert operation on the grid,
	// and creates and pushes an insertOp object onto the undo stack.
	this.insert = function(instruction){

		// update undo stack
		that.undoStack.push(new that.insertOp(instruction));

		// update grid
		if(!that.getInstruction(instruction.x,instruction.y,instruction.color)){
			if(that.grid[instruction.x]){
				if(that.grid[instruction.x][instruction.y]){
					that.grid[instruction.x][instruction.y][instruction.color] = instruction;
				}
				else {
					that.grid[instruction.x][instruction.y] = [];
					that.grid[instruction.x][instruction.y][instruction.color] = instruction;
				}
			}
			else {
				that.grid[instruction.x] = [];
				that.grid[instruction.x][instruction.y] = [];
				that.grid[instruction.x][instruction.y][instruction.color] = instruction;
			}
		} else if(that.userOverlapSetting === 1){
			// store the old instruction
			that.undoStack[that.undoStack.length-1].overWritten = that.getInstruction(instruction.x,instruction.y,instruction.color);

			// overwrite
			that.grid[instruction.x][instruction.y][instruction.color] = instruction;			
		}
	};

	// this function performs a delete operation on an instruction,
	// it also creates and pushes a deleteOp object onto the stack
	this.delete = function(x,y,color){
		if(that.grid[x]){
			if(that.grid[x][y]){
				if(that.grid[x][y][color]){

					// update undo stack
					that.undoStack.push(new that.deleteOp(that.getInstruction(x,y,color)));

					// update grid
					that.grid[x][y][color] = null;
				}
			}
		}
	};

	// each call to this function pops the undo stack, and undoes whatever operation it finds
	this.undo = function(){

		// update stacks
		var op = that.undoStack.pop();
		if(op.opId !== 'group'){ that.redoStack.push(op); }

		console.warn('undo op: ' + op.opId);

		// update grid
		if(op.opId === 'insert'){

			that.delete(op.instruction.x, op.instruction.y, op.instruction.color);
			that.undoStack.pop();

			if(op.overWritten !== null){
				that.insert(op.overWritten);
				that.undoStack.pop();
			}
		}
		else if(op.opId === 'delete'){
			that.insert(op.instruction);
			that.undoStack.pop();
		}
		else if(op.opId === 'move'){
			that.move(op.newX, op.newY, op.instruction.color, op.instruction.x, op.instruction.y)
			that.undoStack.pop();

			if(op.overWritten !== null){
				that.insert(op.overWritten);
				that.undoStack.pop();
			}
		}
		else if(op.opId === 'copy'){
			that.delete(op.newX, op.newY, op.instruction.color);
			that.undoStack.pop();

			if(op.overWritten !== null){
				that.insert(op.overWritten);
				that.undoStack.pop();
			}
		}
		else if(op.opId === 'modify'){
			that.modify(op.instruction, op.parameter, op.oldValue);
			that.undoStack.pop();

			if(op.overWritten !== null){
				that.insert(op.overWritten);
				that.undoStack.pop();
			}
		}
		else if(op.opId === 'group'){
			for(var x = 0; x < op.numInstructions; x++){
				that.undo();
			}
			that.redoStack.push(op);
		}
	};

	// each call to this function pops the redo stack, and undoes whatever operation it finds
	this.redo = function(){

		// update stacks
		var op = that.redoStack.pop();
		if(op.opId !== 'group'){ that.undoStack.push(op); }

		console.warn('redo op: ' + op.opId);

		// update grid
		if(op.opId === 'insert'){
			that.insert(op.instruction);
			that.undoStack.pop();
		}
		else if(op.opId === 'delete'){
			that.delete(op.instruction.x, op.instruction.y, op.instruction.color);
			that.undoStack.pop();
		}
		else if(op.opId === 'move'){
			that.move(op.instruction.x, op.instruction.y, op.instruction.color, op.newX, op.newY);
			that.undoStack.pop();
		}
		else if(op.opId === 'copy'){
			that.insert(new App.PlanningInstruction(op.newX, op.newY, op.instruction.color, op.instruction.type));
			that.undoStack.pop();
		}
		else if(op.opId === 'modify'){
			that.modify(op.instruction, op.parameter, op.newValue);
			that.undoStack.pop();
		}
		else if(op.opId === 'group'){ // TODO make it so that group ends up on the front of the stack
			for(var x = 0; x < op.numInstructions; x++){
				that.redo();
			}
			that.undoStack.push(op);
		}
	};

	// TODO it sounds like we may want to include the level title in the string?
	this.generateParseString = function(){
		var strings = [];
		strings.push(this.name + "," + this.width + "," + this.height + ";");

		for(var i in this.grid){
			for(var j in this.grid[i]){
				for(var c in this.grid[i][j]){
					var inst = this.grid[i][j][c];
					strings.push(inst.x + "," + inst.y + "," + inst.color + "," + inst.type);
				}
			}
		}

		return strings.join();
	};
	
	// TODO
	this.generateSimulationLevel = function(){
		
	};
}