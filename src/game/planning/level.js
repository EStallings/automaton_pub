App.PlanningLevel = function(){
	this.name;
	this.width;	this.height;
	this.numColors = 4;
	this.grid = []; // grid[x][y][color] = instruction
	this.undoStack = [];
	this.redoStack = [];

	var that = this;

	this.getCell = function(x,y){ 
		//Note: I edited this to prevent a potential crash and/or undefined being passed around.
		if(!that.grid[x] || !that.grid[x][y])
			return null;

		return that.grid[x][y]; 
	};

	//le sigh. I really wish this weren't how stupid JavaScript is, but, alas
	//this is _exactly_ how stupid JavaScript is. Gotta do this :(
	this.contains = function(x, y, c){
		return (that.grid[x] && that.grid[x][y] && that.grid[x][y][c]);
	}

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
	
	this.insertOp = function(instruction){		
		this.instruction = instruction;
		this.opId = 'insert';
	};
	
	this.deleteOp = function(instruction){		
		this.instruction = instruction;
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

	this.modifyOp = function(instruction, parameter, newValue, oldValue){
		this.instruction = instruction;
		this.parameter = parameter;
		this.newValue = newValue;
		this.oldValue = oldValue;
		this.opId = 'modify';
	}

	this.modify = function(instruction, parameter, value){
		if(that.contains(instruction.x, instruction.y, instruction.color)){
			var oldColor = instruction.color;
			// update undo stack
			that.undoStack.push(new that.modifyOp(instruction, parameter, value, instruction[parameter]));

			// update instruction
			that.getCell(instruction.x, instruction.y)[instruction.color][parameter] = value;

			// update grid if the color changed
			if(parameter === 'color'){
				that.getCell(instruction.x, instruction.y)[value] = that.getCell(instruction.x, instruction.y)[oldColor];
				that.getCell(instruction.x, instruction.y)[oldColor] = null;
			}
		}
	}

	this.copy = function(x, y, color, newX, newY){
		// update undo stack
		that.undoStack.push(new that.copyOp(that.getCell(x,y)[color], newX, newY));

		// update grid
		if(that.contains(x,y,color)){
			if(that.contains(newX, newY, color)){
				that.grid[newX][newY][color] = that.getCell(x,y)[color];
			}
			else{
				if(that.grid[newX]){
					if(that.grid[newX][newY]){
						that.grid[newX][newY][color] = that.getCell(x,y)[color];
					}
					else{
						that.grid[newX][newY] = [];
						that.grid[newX][newY][color] = that.getCell(x,y)[color];
					}
				}
				else{
					that.grid[newX] = [];
					that.grid[newX][newY] = [];
					that.grid[newX][newY][color] = that.getCell(x,y)[color];
				}
			}
		}
	}

	this.move = function(x, y, color, newX, newY){

		// update undo stack
		that.undoStack.push(new that.moveOp(that.getCell(x,y)[color], newX, newY));

		// update grid
		if(that.contains(x,y,color)){
			if(that.contains(newX, newY, color)){
				that.grid[newX][newY][color] = that.getCell(x,y)[color];
				that.getCell(x,y)[color] = null;
			}
			else{
				if(that.grid[newX]){
					if(that.grid[newX][newY]){
						that.grid[newX][newY][color] = that.getCell(x,y)[color];
						that.getCell(x,y)[color] = null;						
					}
					else{
						that.grid[newX][newY] = [];
						that.grid[newX][newY][color] = that.getCell(x,y)[color];
						that.getCell(x,y)[color] = null;
					}
				}
				else{
					that.grid[newX] = [];
					that.grid[newX][newY] = [];
					that.grid[newX][newY][color] = that.getCell(x,y)[color];
					that.getCell(x,y)[color] = null;
				}
			}
		}

	}

	this.insert = function(instruction){

		// update undo stack
		that.undoStack.push(new that.insertOp(instruction));

		// update grid
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

	};

	this.delete = function(x,y,color){
		if(that.grid[x]){
			if(that.grid[x][y]){
				if(that.grid[x][y][color]){

					// update undo stack
					that.undoStack.push(new that.deleteOp(that.getCell(x,y)[color]));

					// update grid
					that.grid[x][y][color] = null;
				}
			}
		}
	};

	this.undo = function(){

		// update stacks
		var op = that.undoStack.pop();
		that.redoStack.push(op);

		console.warn('undo op: ' + op.opId);

		// update grid
		if(op.opId === 'insert'){

			that.delete(op.instruction.x, op.instruction.y, op.instruction.color);
			that.undoStack.pop();
		}
		else if(op.opId === 'delete'){
			that.insert(op.instruction);
			that.undoStack.pop();
		}
		else if(op.opId === 'move'){
			that.move(op.newX, op.newY, op.instruction.color, op.instruction.x, op.instruction.y)
			that.undoStack.pop();
		}
		else if(op.opId === 'copy'){
			that.delete(op.newX, op.newY, op.instruction.color);
			that.undoStack.pop();
		}
		else if(op.opId === 'modify'){
			that.modify(op.instruction, op.parameter, op.oldValue);
			that.undoStack.pop();
		}
	};

	this.redo = function(){

		// update stacks
		var op = that.redoStack.pop();
		that.undoStack.push(op);

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
	};

	// TODO
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