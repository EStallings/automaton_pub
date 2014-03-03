// users can't edit
Application.SimulationLevel = function(){
	this.width;
	this.height;
	this.grid = []; 
	this.tokens = [];
	this.automatons = [];
	this.instructions = [];
	this.streams = [];

	this.lastCycleTick;
	this.nextCycleTick;
	this.cycles;
	this.simulationSpeed;

	this.getCell = function(x,y){};
	this.removeCell = function(x,y){};
	this.forEachCell = function(f){};
}
