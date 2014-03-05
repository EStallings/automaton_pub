//Put this in one file for now because they're all small.
//I assume that the instructions will contain most of the actual logic,
//But these are still just skeletons :)

//Token
App.Token = function(x, y, num){
	this.x = x;
	this.y = y;
	this.num = num;

	this.render = function(){} //TODO write me
}

//Stream
App.Stream = function(x, y, color, nums){
	this.x = x;
	this.y = y;
	this.color = color; //Note: For colors and direction, I created App.COLORS and DIRECTIONS
	this.nums = nums;

	this.render = function(){}//TODO write me

	this.getNextToken = function(){
		var num = this.nums.pop();
		if(num === undefined)
			return null;
		var token = new App.Token(this.x, this.y, num);
		return token;
	}
}

//Automaton
App.Automaton = function(x, y, colors, direction){
	this.x = x;
	this.y = y;
	this.colors = colors;  //Note: For colors and direction, I created App.COLORS and DIRECTIONS
	this.direction = direction; 

	this.render = function(){} //TODO write me
}