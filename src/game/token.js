function Token(x,y,number){

	this.id = Token.staticInfo.staticID++;
	this.x = x;
	this.y = y;
	this.number = number;

	this.toString = function(){
		return "t:" + this.id + "," +  this.x + "," + this.y + "," + this.number;
	}
}

Token.staticInfo = new StaticInfo();