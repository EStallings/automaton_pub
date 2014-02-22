function Instruction(x,y,color,type){
	this.id = Instruction.staticID++;
	this.x = x;
	this.y = y;
	this.color = color;
	this.type = type;

	this.toString = function(){
		return "i:" + this.id + "," + this.x + "," + this.y + "," + this.color + "," + this.type;
	}
}

Instruction.staticID = 0; //How to make a static member for a class