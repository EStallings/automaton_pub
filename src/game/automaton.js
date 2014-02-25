function Automaton(x,y,direction,cFlags, id){

	this.id = Automaton.staticInfo.register(id, this);
	this.x = x;
	this.y = y;
	this.direction = direction;
	this.colorFlags = cFlags; //a list by string literal to booleans 
	this.tokenHolding = -1; //an ID, NOT a reference. let's let -1 be "none"

	this.toString = function(){
		var cString = this.colorFlags.RED + "," + this.colorFlags.GREEN + "," + this.colorFlags.BLUE + "," + this.colorFlags.YELLOW;
		return "a," + this.id + "," +  this.x + "," + this.x + "," + this.direction + "," + cString + "," + this.tokenHolding;
	}

	this.drawSelf = function(context, currentScale, unit){
		var s = context.strokeStyle;

		context.strokeStyle = "#ffffff";
		context.lineWidth = 2;
		context.beginPath();

		var x = this.x * unit + unit/2;
		var y = this.y * unit + unit/2;

		

		// INTEROPLATE adjustment
		switch(this.direction){
			case UP    : y+=(1-INTERPOLATE);break;
			case DOWN  : y-=(1-INTERPOLATE);break;
			case LEFT  : x+=(1-INTERPOLATE);break;
			case RIGHT : x-=(1-INTERPOLATE);break;
		}
		 
		context.arc(x, y, 22 * currentScale, 0, 2*Math.PI);
		context.stroke();

		context.strokeStyle = s;
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
	var flags = {RED:rc, GREEN:gc, BLUE:bc, YELLOW:yc};

	var a = new Automaton(x, y, d, flags, id);
	a.tokenHolding = t;

	return a;
}