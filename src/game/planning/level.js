var PlanningLevel = function(){
	this.name;
	this.dateCreated;
	this.width;
	this.height;
	this.grid = [];

	this.print = function(){
		for(var i in this.grid)
		for(var j in this.grid[i])
		for(var c in this.grid[i][j])
			console.log(i+" "+j+" "+c+" "+this.grid[i][j][c]);
	}

	this.insert = function(x,y,color,type){
		var i = this.grid[x];
		if(i === undefined)i = this.grid[x] = [];
		var j = i[y];
		if(j === undefined)j = i[y] = [];
		var c = j[color];
		if(c !== undefined)return false;
		j[color] = type;
		return true;
	}

	this.staticRender = function(){}
	this.dynamicRender = function(){
		
	}
}

var createNewLevel = function(name,width,height){
	var lvl = new PlanningLevel();
	lvl.name        = name;
	lvl.dateCreated = new Date.getTime();
	lvl.width       = width;
	lvl.height      = height;
	return lvl;
}

// returns undefined if the level string is invalid
var parseLevel = function(str){
	var lvl = new PlanningLevel();
	if(!str)return undefined;
	var data = str.split('~');
	for(var i=0;i<data.length;++i)data[i] = data[i].split('`');
	if(data.length<1)return undefined;
	if(data[0].length!==4)return undefined;
	lvl.name        = data[0][0];
	lvl.dateCreated = parseInt(data[0][1]);
	lvl.width       = parseInt(data[0][2]);
	lvl.height      = parseInt(data[0][3]);
	if(isNaN(lvl.dateCreated) || isNaN(lvl.width) || isNaN(lvl.height))return undefined;
	if(lvl.width < 0 || lvl.height < 0)return undefined;
	for(var i=1;i<data.length;++i){
		if(data[i].length<4)return undefined;
		var x = parseInt(data[i][0]);
		var y = parseInt(data[i][1]);
		var c = parseInt(data[i][2]);
		var t = parseInt(data[i][3]);
		if(isNaN(x) || isNaN(y) || isNaN(c) || isNaN(t))return undefined;
		if(lvl.width  !== 0 && (x < 0 || x >= lvl.width ))return undefined;
		if(lvl.height !== 0 && (y < 0 || y >= lvl.height))return undefined;
		if(c < 0 || c >= 4)return undefined;
		if(!lvl.insert(x,y,c,t))return undefined;
	}return lvl;
}
