function Token(x,y,number,id){

	this.id = Token.staticInfo.register(id, this);

	this.x = x;
	this.y = y;
	this.number = number;

	//outputs of the form "t:0,20,40,100" etc
	this.toString = function(){
		return "t," + this.id + "," +  this.x + "," + this.y + "," + this.number;
	}

	this.drawSelf = function(context, currentScale, unit){

		var s = context.strokeStyle;
		context.fillStyle = '#ffffff';

		var x = this.x * unit + unit/2;
		var y = this.y * unit + unit/2;
		 
		context.beginPath();
		context.arc(x, y, 18 * currentScale, 0, 2*Math.PI);
		context.fill();
		
		context.strokeStyle = '#3f3f3f';
		context.beginPath();
		context.arc(x, y, 18 * currentScale, 0, 2*Math.PI);
		context.stroke();

		context.fillStyle = "#000000";
		context.font = "bold 11px arial";
		context.textAlign = 'center';
		context.fillText(this.number + "", x, y + (4 * currentScale));
		context.strokeStyle = s;
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
