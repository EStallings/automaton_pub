App.InstructionActions = {}; // TODO populate with action methods

App.InstructionSymbols = {}; // TODO populate with drawing methods

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
