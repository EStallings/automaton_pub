function Automaton(x,y,direction,cFlags, id){

	this.id = Automaton.staticInfo.register(id, this);
	this.x = x;
	this.y = y;
	this.direction = direction;
	this.colorFlags = cFlags; //a list by string literal to booleans 
	this.tokenHolding = -1; //an ID, NOT a reference. let's let -1 be "none"

	this.toString = function(){
		var cString = this.colorFlags["R"] + "," + this.colorFlags["G"] + "," + this.colorFlags["B"] + "," + this.colorFlags["Y"];
		return "a," + this.id + "," +  this.x + "," + this.x + "," + this.direction + "," + cString + "," + this.tokenHolding;
	}
}

Automaton.staticInfo = new StaticInfo();

Automaton.fromString = function(str){
	var s = str.split(",");
	if(s[0] !== 'a' || s.length !== 10)
		console.error("invalid syntax! " + str);

	var id = parseInt(s[1]);
	var x = parseInt(s[2]);
	var y = parseInt(s[3]);
	var d = s[4];
	var r = parseBoolean(s[5]);
	var g = parseBoolean(s[6]);
	var b = parseBoolean(s[7]);
	var y = parseBoolean(s[8]);
	var t = parseInt(s[9]);
	var flags = {"R":r, "G":g, "B":b, "Y":y};

	var a = new Automaton(x, y, d, flags, t);
	return a;
}