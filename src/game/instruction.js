function Instruction(x,y,color,type, id){

	this.id = Instruction.staticInfo.register(id, this);
	this.x = x;
	this.y = y;
	this.color = color;
	this.type = type;

	this.toString = function(){
		return "i," + this.id + "," + this.x + "," + this.y + "," + this.color + "," + this.type;
	}
}
Instruction.staticInfo = new StaticInfo();

Instruction.fromString = function(str){
	var s = str.split(",");
	if(s[0] !== 'i' || s.length !== 6)
		console.error("invalid syntax! " + str);

	var id = parseInt(s[1]);
	var x = parseInt(s[2]);
	var y = parseInt(s[3]);
	var c = s[4];
	var t = parseInt(s[5]);

	var i = new Instruction(x, y, c, t, id);
	return i;
}