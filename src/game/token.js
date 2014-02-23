function Token(x,y,number,id){

	this.id = Token.staticInfo.register(id, this);

	this.x = x;
	this.y = y;
	this.number = number;

	//outputs of the form "t:0,20,40,100" etc
	this.toString = function(){
		return "t," + this.id + "," +  this.x + "," + this.y + "," + this.number;
	}
}

Token.staticInfo = new StaticInfo();

Token.fromString = function(str){
		var s = str.split(",");
		if(s[0] !== "t" || s.length !== 5)
			console.error("invalid syntax! : " + str);
		
		var id = parseInt(s[1]);
		var x = parseInt(s[2]);
		var y = parseInt(s[3]);
		var n = parseInt(s[4]);

		var t = new Token(x, y, n, id);
		return t;
}
