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

	this.drawSelf = function(context, offsetX, offsetY, currentScale){

		context.strokeStyle = "0x000000";
		context.beginPath();

		 
		context.arc((this.x * 50 + offsetX), (this.y * 50 + offsetY), 15, 0, 2*Math.PI);
		context.stroke();

		context.fillText((this.id + " " + this.x + "," + this.y), (this.x * 15 + offsetX), (this.y * 15 + offsetY));
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
	var rc = parseBoolean(s[5]);
	var gc = parseBoolean(s[6]);
	var bc = parseBoolean(s[7]);
	var yc = parseBoolean(s[8]);
	var t = parseInt(s[9]);
	var flags = {"R":rc, "G":gc, "B":bc, "Y":yc};

	var a = new Automaton(x, y, d, flags, id);
	a.tokenHolding = t;

	return a;
}