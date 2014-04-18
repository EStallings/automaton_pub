App.GuiTools = {};
var g = App.GuiTools;

g.Component = function(x, y, panel){
	if(!x && x !== 0 || (!y && y !== 0))
		throw "x or y invalid";
	if(panel) panel.addChild(this);

	//current x and y
	this.x = x;
	this.y = y;

	//relatively positioned x and y
	this.px = x;
	this.py = y;

	//base x and y: never changes
	this.baseX = x;
	this.baseY = y;

	this.functional = false;
	this.active = false;
	this.locked = false;

	this.baseColor = '#1d1d1d';
	this.hoverColor = '#4d4d4d';
	this.activeColor = '#2d2d2d';
	this.textColor = '#ffffff';
	this.lockedColor = '#d2d2d2';

	this.color = this.baseColor;
	this.renderLayers = [];

	this.setLock = function(lock){
		this.locked = lock;
		if(lock) this.color = this.lockedColor;
		else this.color = this.baseColor;
	}

	this.render = function(gfx){
		for(var r in this.renderLayers){
			this.renderLayers[r](gfx);
		}
	}

	this.positionRelative = function(c) {
		if(!c)
			return;
		this.px = c.x + this.baseX;
		this.py = c.y + this.baseY;
		this.resetPosition();
	}

	this.resetPosition = function(){
		this.x = this.px;
		this.y = this.py;
	}

	this.getx = function(){
		return this.x;
	}

	this.gety = function(){
		return this.y;
	}

	this._clickStart = function(){
		this.active = true;
		this.color = this.activeColor;
	}

	this._clickEnd = function(){
		this.active = false;
		this.color = this.baseColor;
		this.resetPosition();
	}

	this._update = function(x, y){
		if(!this.functional) return;

		if(!this.active && this.collides(x, y))
			this.color = this.hoverColor;
		else if(!this.active)
			this.color = this.baseColor;
		else if(!this.collides(x, y))
			this._clickEnd();
	}
}

g.CollisionCircle = function(x, y, r, panel){
	g.Component.call(this, x, y, panel);
	this.r = r;

	this.renderLayers.push(function(gfx){
		gfx.fillStyle = this.color;
		gfx.beginPath();
		gfx.arc(this.x, this.y, this.r, 0, g.CollisionCircle.p2, true);
		gfx.closePath();
		gfx.fill();
	});

	this.getr = function(){
		return this.r;
	}

	this.collides = function(x, y){
		return (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y) <= this.r * this.r;
	}
}
g.CollisionCircle.p2 = Math.PI*2;
g.CollisionCircle.prototype = Object.create(g.Component);
g.CollisionCircle.prototype.constructor = g.CollisionCircle;

//Abstracts out some logic for coordinates and collision, relative positioning
g.CollisionRect = function(x, y, w, h, panel){
	g.Component.call(this, x, y, panel);
	this.w = w;
	this.h = h;

	this.renderLayers.push(function(gfx){
		gfx.fillStyle = this.color;
		gfx.fillRect(this.x, this.y, this.w, this.h);
	});

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
}
g.CollisionRect.prototype = Object.create(g.Component);
g.CollisionRect.prototype.constructor = g.CollisionRect;


//To be used for text buttons or image buttons...
g.Button = function(x, y, w, h, callback, continuous, panel){
	g.CollisionRect.call(this, x, y, w, h, panel);
	this.functional = true;
	this.clicked = false;
	this.continuous = continuous;

	//For continuous callbacks
	this.update = function(){
		if(this.clicked && this.continuous)
			this.callback();
	}

	this.clickStart = function(){
		this.clicked = true;
	}

	//If the click was successful, fire the callback
	this.clickEnd = function(){
		if(this.callback && this.clicked)
			this.callback();
		this.clicked = false;
	}

}
g.Button.prototype = Object.create(g.CollisionRect);
g.Button.prototype.constructor = g.CollisionRect;