Application.PlanningLevel = function(){
	this.width;	this.height;
	this.numColors = 4;
	this.grid = []; // grid[x][y][color] = instruction
	this.undoStack = [];
	this.redoStack = [];
	
	this.getCell = function(x,y){
		if(this.grid[x]){
			return this.grid[x][y];
		}
	};

	// clears an entire cell
	this.removeCell = function(x,y){
		for(var c = 0; c < this.numColors; c++){
			if(this.grid[x]){
				if(this.grid[x][y]){
					this.grid[x][y][c] = null;
				}
			}
		}
	};
	
	// TODO update to make sure grid[x][y][c] exists before trying to apply the function
	this.forEachCell = function(f){
		for(var y = 0; y < this.height; y++){
			for(var x = 0; x < this.width; x++){
				for(var c = 0; c < this.numColors; c++){
					if(this.grid[x][y][c]){ f(this.grid[x][y][c]); };
				}
			}
		}
	};

	//this.moveOp = function(){}; // TODO

	//this.modifyOp = function(x,y,){}; // TODO
	
	this.insertOp = function(instruction){		
		this.instruction = instruction;
		this.opId = 'insert';
	};
	
	this.deleteOp = function(instruction){		
		this.instruction = instruction;
		console.warn('deleteOp: ' + instruction);
		this.opId = 'delete';
	};

	this.insert = function(instruction){

		// update undo stack
		this.undoStack.push(new this.insertOp(instruction));

		// update grid
		if(this.grid[instruction.x]){
			if(this.grid[instruction.x][instruction.y]){
				if(this.grid[instruction.x][instruction.y][instruction.color]){
					this.grid[instruction.x][instruction.y][instruction.color] = instruction;
				}
			}
			else {
				this.grid[instruction.x][instruction.y] = [];
				this.grid[instruction.x][instruction.y][instruction.color] = instruction;
			}
		}
		else {
			this.grid[instruction.x] = [];
			this.grid[instruction.x][instruction.y] = [];
			this.grid[instruction.x][instruction.y][instruction.color] = instruction;
		}

	};

	this.delete = function(x,y,color){
		if(this.grid[x]){
			if(this.grid[x][y]){
				if(this.grid[x][y][color]){

					// update undo stack
					this.undoStack.push(new this.deleteOp(this.getCell(x,y)[color]));

					// update grid
					this.grid[x][y][color] = null;
				}
			}
		}
	};

	this.undo = function(){

		// update stacks
		var op = this.undoStack.pop();
		this.redoStack.push(op);

		console.warn('undo op: ' + op.opId + ' ins: ' + op.instruction.x);

		// update grid
		if(op.opId === 'insert'){

			this.delete(op.instruction.x, op.instruction.y, op.instruction.color);
			this.undoStack.pop();
		}
		else if(op.opId === 'delete'){
			this.insert(op.instruction);
			this.undoStack.pop();
		}
	};

	// TODO
	/*this.redo = function(){

		// update stacks
		var op = this.redoStack.pop();
		this.undoStack.push(op);

		console.warn('redo op: ' + op.opId + ' ins: ' + op.instruction.x);

		// update grid
		if(op.opId === 'insert'){
			this.insert(op.instruction);
			this.undoStack.pop();
		}
		else if(op.opId === 'delete'){
			this.delete(op.instruction.x, op.instruction.y, op.instruction.color);
			this.undoStack.pop();
		}
	};*/

	// TODO
	this.generateParseString = function(){};
	
	// TODO
	this.generateSimulationLevel = function(){};
}