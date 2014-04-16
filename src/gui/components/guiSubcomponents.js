App.GuiTools = {};

App.GuiTools.Draggable = function(gc, render, cs, up, ce,  panel){
	this.guiCollider = gc;
	if(panel) panel.addChild(this);
	this.guiCollider.functional = true;

	this.currentX = this.guiCollider.getx();
	this.currentY = this.guiCollider.gety();

	this.color = App.GuiTools.color;
	this.dragged = false;
	this.render = render;

	this.clickStart = function(){
		this.dragged = true;
		if(this.cs)
			this.cs();
	}

	this.update = function(){
		if(!this.dragged)
			return;
		if(this.up)
			this.up();
	}

	this.clickEnd = function(x, y){
		this.dragged = false;
		this.currentX = this.guiCollider.getx();
		this.currentY = this.guiCollider.gety();
	}



}

App.GuiTools.color = '#1d1d1d';


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

App.GuiTools.CollisionCircle = function(x, y, r){
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
App.GuiTools.CollisionRect = function(x, y, w, h){
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