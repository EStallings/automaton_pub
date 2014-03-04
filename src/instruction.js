Application.InstructionActions = {}; // TODO populate with action methods

Application.InstructionSymbols = {}; // TODO populate with drawing methods

Application.PlanningInstruction = function(){
	// this.level;
	this.x;
	this.y;
	this.color;
	this.type;
	// this.attributes; // this should only be used for stuff like stream config...

	this.generateSimulationInstruction = function(){
		
	}
}

Application.SimulationInstruction = function(level,x,y,color,type){ // what about attributes?
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
