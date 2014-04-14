App.PlanningInstruction = function(x,y,color,type,data){
	this.x        = x;
	this.y        = y;
	this.color    = color;
	this.type     = type;
	this.data     = data;
}

//============================================================================//

App.Operation = function(){

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
	this.moveOp = function(instruction, oldX, oldY, newX, newY){
		this.instruction = instruction;
		this.oldX = oldX; this.oldY = oldY;
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
}

//============================================================================//

App.PlanningLevel = function(){
	var that = this;

	this.name;
	this.dateCreated;
	this.width;
	this.height;
	this.grid = [];
	this.currentSelection = [];
	this.undoStack = [];
	this.redoStack = [];
	this.locks = [false, false, false, false]; // R,G,B,Y

	this.userOverlapSetting = 0; // 0 - reject operation, 1 - overwrite

		// ---------------------------------------------

	this.insert = function(x,y,color,type,data){
		var i = this.grid[x];
		if(i === undefined)i = this.grid[x] = [];
		var j = i[y];
		if(j === undefined)j = i[y] = [];
		var c = j[color];
		if(c !== undefined)return false;
		j[color] = new App.PlanningInstruction(x,y,color,type,data);
		return true;
	}

		// ---------------------------------------------

	this.generateSimulationLevel = function(){
		var level = new App.SimulationLevel(this.width,this.height);
		for(var i in this.grid)
		for(var j in this.grid[i])
		for(var c in this.grid[i][j]){
			var ins = this.grid[i][j][c];
			if(ins)new App.SimulationInstruction(level,ins.x,ins.y,ins.color,ins.type,ins.data);
		}return level;
	};

	this.generateParseString = function(){
		var str = [];
		str.push(this.name+'`'+this.dateCreated+'`'+this.width+'`'+this.height);
		for(var i in this.grid)
		for(var j in this.grid[i])
		for(var c in this.grid[i][j])
		if(this.grid[i][j][c])
			str.push(i+'`'+j+'`'+c+'`'+this.grid[i][j][c]);
		return str.join('~');
	};

		// ---------------------------------------------

	this.staticRender = function(){
		var cs = App.GameRenderer.cellSize;
		for(var c=0;c<4;++c){
			App.GameRenderer.instructionGfx.save();
			switch(c){
				case 0:App.GameRenderer.instructionGfx.translate(0,0);break;
				case 1:App.GameRenderer.instructionGfx.translate(cs/2,0);break;
				case 2:App.GameRenderer.instructionGfx.translate(0,cs/2);break;
				case 3:App.GameRenderer.instructionGfx.translate(cs/2,cs/2);break;
			}

			for(var i in this.grid)
			for(var j in this.grid[i]){
				var ins = this.grid[i][j][c];
				if(ins){
					var streamBkg = false;
					if(ins.type === App.InstCatalog.TYPES['IN'] || ins.type === App.InstCatalog.TYPES['OUT'])streamBkg = true;
					App.InstCatalog.render(App.GameRenderer.instructionGfx,ins.type,ins.x*cs,ins.y*cs,ins.color,cs/2,ins.data,streamBkg);
				}
			}

			App.GameRenderer.instructionGfx.restore();
		}
	}

	this.dynamicRender = function(){}
}
