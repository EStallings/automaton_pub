function Stream(type,color){
	this.id     = Stream.staticInfo.staticID++;
	this.type   = type;
	this.color  = color;
	this.tokens = []; //needs initialization

	this.toString = function(){
		var ts = this.tokens.fold(function(x, y){return x + "," + y}, "");
		return "s:" + this.id + "," + this.type + "," + this.color + ",[" + ts + "]";
	}
}

Stream.staticInfo = new StaticInfo();