App.InstructionActions = {}; // TODO populate with action methods

App.InstructionSymbols = {}; // TODO populate with drawing methods

App.PlanningInstruction = function(x,y,color,type){
	// this.level;
	this.x = x;
	this.y = y;
	this.color = color;
	this.type = type;
	// this.attributes; // this should only be used for stuff like stream config...

	this.generateSimulationInstruction = function(){
		
	}
}

App.SimulationInstruction = function(level,x,y,color,type){ // what about attributes?
	this.level = level;
	this.x = x;
	this.y = y;
	this.color = color;
	this.type = type;
	
	this.action;
	this.drawSelf;

	this.execute = function(a){
		this.action(a);
	}
	
	this.render = function(){
		this.drawSelf();
	}
}
