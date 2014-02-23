function Stream(x, y, type,color, id){

	this.id     = Stream.staticInfo.register(id, this);
	this.x 		= x;
	this.y 		= y;
	this.type   = type;
	this.color  = color;
	this.tokens = []; //needs initialization: should be NUMBERS

	this.toString = function(){
		var ts = this.tokens.fold(function(x, y){return y + "," + x}, "");
		var str = "s," + this.id  + "," + this.x + "," + this.y + "," + this.type + "," + this.color + "" + ts + "";
		return str;
	}
}

Stream.staticInfo = new StaticInfo();

Stream.fromString = function(str){
	var s = str.split(",");
	if(s[0] !== 's')
		console.error("invalid syntax! " + str);

	var id = parseInt(s[1]);
	var x = parseInt(s[2]);
	var y = parseInt(s[3]);
	var t = s[4];
	var c = s[5];

	var tks = s.slice(6, s.length).map(parseInt);
	

	var stream = new Stream(x, y, t, c, id);
	stream.tokens = tks;
	return stream;
}