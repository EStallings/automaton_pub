//A consistent grayscale to help keep colors coordinated
App.GuiColors = {};
App.GuiColors.gray = [
	'#ffffff',
	'#e0e0e0',
	'#c0c0c0',
	'#afafaf',
	'#5a5a5a',
	'#3d3d3d',
	'#1f1f1f',
	'#000000'
]

App.GuiColors.inactive = [
	'#b20000',
	'#00b200',
	'#0000b2',
	'#999900'
]

App.GuiColors.active = [
	'#ff1010',
	'#10ff10',
	'#1010ff',
	'#ffff00'
]


//Positions this component relative to another component, instead of absolute positioning on the screen
var positionRelative = function(component){
	if(!component)
		return;
	if(!component.guiCollider)
		return;
	var r = component.guiCollider;

	this.x = r.x + this.baseX;
	this.y = r.y + this.baseY;
}

App.GuiCollisionCircle = function(x, y, r){
	this.x = x;
	this.y = y;
	this.baseX = x;
	this.baseY = y;
	this.r = r;

	this.getx = function(){
		return this.x;
	}

	this.gety = function(){
		return this.y;
	}
	this.functional = false;

	this.collides = function(x, y){
		return (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y) <= this.r * this.r;
	}

	this.positionRelative = positionRelative;
}

//Abstracts out some logic for coordinates and collision, relative positioning
App.GuiCollisionRect = function(x, y, w, h){
	this.x = x;
	this.y = y;
	this.baseX = x;
	this.baseY = y;
	this.w = w;
	this.h = h;
	this.functional = false;

	this.getx = function(){
		return this.x;
	}

	this.gety = function(){
		return this.y;
	}

	this.geth = function(){
		return this.h;
	}

	this.getw = function(){
		return this.w;
	}


	//Tests if a point is inside of the rectangle
	this.collides = function(x, y){
		return ((x > this.x) && (x < (this.x + this.w)) &&
			   	(y > this.y) && (y < (this.y + this.h)));
	}

	this.positionRelative = positionRelative;
}