function Automaton(x,y,direction,cFlags){

	this.id = Automaton.staticInfo.staticID++;
	this.x = x;
	this.y = y;
	this.direction = direction;
	this.colorFlags = cFlags; //a list by string literal to booleans 
	this.tokenHolding; //an ID, NOT a reference

	this.toString = function(){
		var cString = "[" + this.cFlags["R"] + "," + this.cFlags["G"] + "," + this.cFlags["B"] + "," + this.cFlags["Y"]  + "]";
		return "a:" + this.id + "," +  this.x + "," + this.x + "," + this.direction + "," + cString + "," + this.tokenHolding;
	}

	Automaton.registry[this.id] = this; //static references to our members.
}

Automaton.staticInfo = new StaticInfo();