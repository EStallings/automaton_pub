// used for planning, users can edit, only contains instructions
Application.PlannningLevel = function(){
	this.width;
	this.height;
	this.grid = []; // grid[x][y][color] = instruction
	this.undoRedoStack = [];
	
	this.getCell = function(x,y){};
	this.removeCell = function(x,y){};
	this.forEachCell = function(f){};
	
	// TODO
	this.generateParseString = function(){
			
	}
	
	// TODO
	this.generateSimulationLevel = function(){
		
	}
}

// users can't edit
Application.SimulationLevel = function(){
	this.width;
	this.height;
	this.grid = []; 
	this.tokens = [];
	this.automatons = [];
	this.instructions = [];
	this.streams = [];

	// these are in the simulator
	// this.lastCycleTick;
	// this.nextCycleTick;
	// this.cycles;
	// this.simulationSpeed;

	this.getCell = function(x,y){};
	this.removeCell = function(x,y){};
	this.forEachCell = function(f){};
}
