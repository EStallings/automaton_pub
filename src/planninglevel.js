Application.PlanningLevel = function(){
	this.width;	this.height;
	this.numColors = 4;
	this.grid = []; // grid[x][y][color] = instruction
	this.undoStack = [];
	this.redoStack = [];

	this.getCell = function(x,y){ 
		//Note: I edited this to prevent a potential crash and/or undefined being passed around.
		if(!this.grid[x] || !this.grid[x][y])
			return null;

		return this.grid[x][y]; 
	};

	//le sigh. I really wish this weren't how stupid JavaScript is, but, alas
	//this is _exactly_ how stupid JavaScript is. Gotta do this :(
	this.contains = function(x, y, c){
		return (this.grid[x] && this.grid[x][y] && this.grid[x][y][c]);
	}

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
	
	this.forEachCell = function(f){
		for(var y = 0; y < this.height; y++){
			for(var x = 0; x < this.width; x++){
				for(var c = 0; c < this.numColors; c++){
					if(this.contains(x, y, c)){ 
						f(this.grid[x][y][c]); 
					}
				}
			}
		}
	};

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

	this.moveOp = function(instruction, newX, newY){
		this.instruction = instruction;
		this.newX = newX; this.newY = newY;
		this.opId = 'move';
	}

	this.copyOp = function(instruction, newX, newY){
		this.instruction = instruction;
		this.newX = newX; this.newY = newY;
		this.opId = 'copy';
	}

	this.modifyOp = function(instruction, parameter, value){
		this.instruction = instruction;
		this.parameter = parameter;
		this.value = value;
	}

	this.modify = function(instruction, parameter, value){
		console.warn('instruction: ' + instruction.x + ', ' + instruction.y + ', ' + instruction.color + ', ' + instruction.type);
		/*if(this.contains(instruction.x, instruction.y, instruction.color)){
			// update undo stack
			this.undoStack.push(new this.modifyOp(instruction, parameter, value));

			// update grid
			console.warn('param: ' + this.getCell(instruction.x,instruction.y)[instruction.color][parameter]);
			this.getCell(instruction.x, instruction.y)[instruction.color][parameter] = value;
		}*/
	}

	this.copy = function(x, y, color, newX, newY){
		// update undo stack
		this.undoStack.push(new this.copyOp(this.getCell(x,y)[color], newX, newY));

		// update grid
		if(this.contains(x,y,color)){
			if(this.contains(newX, newY, color)){
				this.grid[newX][newY][color] = this.getCell(x,y)[color];
			}
			else{
				if(this.grid[newX]){
					if(this.grid[newX][newY]){
						this.grid[newX][newY][color] = this.getCell(x,y)[color];
					}
					else{
						this.grid[newX][newY] = [];
						this.grid[newX][newY][color] = this.getCell(x,y)[color];
					}
				}
				else{
					this.grid[newX] = [];
					this.grid[newX][newY] = [];
					this.grid[newX][newY][color] = this.getCell(x,y)[color];
				}
			}
		}
	}

	this.move = function(x, y, color, newX, newY){

		// update undo stack
		this.undoStack.push(new this.moveOp(this.getCell(x,y)[color], newX, newY));

		// update grid
		if(this.contains(x,y,color)){
			if(this.contains(newX, newY, color)){
				this.grid[newX][newY][color] = this.getCell(x,y)[color];
				this.getCell(x,y)[color] = null;
			}
			else{
				if(this.grid[newX]){
					if(this.grid[newX][newY]){
						this.grid[newX][newY][color] = this.getCell(x,y)[color];
						this.getCell(x,y)[color] = null;						
					}
					else{
						this.grid[newX][newY] = [];
						this.grid[newX][newY][color] = this.getCell(x,y)[color];
						this.getCell(x,y)[color] = null;
					}
				}
				else{
					this.grid[newX] = [];
					this.grid[newX][newY] = [];
					this.grid[newX][newY][color] = this.getCell(x,y)[color];
					this.getCell(x,y)[color] = null;
				}
			}
		}

	}

	this.insert = function(instruction){

		// update undo stack
		this.undoStack.push(new this.insertOp(instruction));

		// update grid
		if(this.grid[instruction.x]){
			if(this.grid[instruction.x][instruction.y]){
				this.grid[instruction.x][instruction.y][instruction.color] = instruction;
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
		else if(op.opId === 'move'){
			this.move(op.newX, op.newY, op.instruction.color, op.instruction.x, op.instruction.y)
			this.undoStack.pop();
		}
		else if(op.opId === 'copy'){
			this.delete(op.newX, op.newY, op.instruction.color);
			this.undoStack.pop();
		}
	};

	this.redo = function(){

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
		else if(op.opId === 'move'){
			this.move(op.instruction.x, op.instruction.y, op.instruction.color, op.newX, op.newY);
			this.undoStack.pop();
		}
		else if(op.opId === 'copy'){
			this.insert(new Application.PlanningInstruction(op.newX, op.newY, op.instruction.color, op.instruction.type));
			this.undoStack.pop();
		}
	};

	// TODO
	this.generateParseString = function(){
		
	};
	
	// TODO
	this.generateSimulationLevel = function(){
		
	};
}