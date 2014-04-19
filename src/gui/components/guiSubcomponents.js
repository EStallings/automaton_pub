App.GuiTools = {};
var g = App.GuiTools;

g.Component = function(x, y, enterDelay, exitDelay, panel){
	if(!x && x !== 0 || (!y && y !== 0))
		throw "x or y invalid";
	if(panel) panel.addChild(this);

	//current x and y
	this.x 								= x;
	this.y 								= y;

	//relatively positioned x and y
	this.px								= x;
	this.py								= y;

	//base x and y: never changes
	this.baseX 						= x;
	this.baseY 						= y;

	//for drawing the interpolation
	this.left 						= x;
	this.right 						= x;

	this.enterDelay      	= enterDelay;
	this.exitDelay       	= exitDelay;
	this.interpLeftTick  	= 0;
	this.interpRightTick 	= 0;

	this.functional 			= false;
	this.active 					= false;
	this.locked 					= false;

	this.baseColor 				= '#ffffff';
	this.hoverColor 			= '#a0a0a0';
	this.activeColor 			= '#000000';
	this.activeTextColor 	= '#ffffff';
	this.baseTextColor 		= '#000000';
	this.lockedColor 			= '#d2d2d2';

	this.color 						= this.baseColor;
	this.textColor 				= this.baseTextColor;
	this.renderLayers 		= [];

	//From the box class
	this.enter = function(){
		this.left  = this.goalLeft  = this.x;
		this.right = this.goalRight = this.x;
		this.goalRight = this.x+this.w;
		this.interpRightTick = App.Engine.tick+this.enterDelay;
	}

	this.exit = function(){
		this.goalLeft = this.x+this.w;
		this.interpLeftTick = App.Engine.tick+this.exitDelay;
	}

	this.render = function(gfx){
		var updating = false;

		//update interpolation
		if(this.left != this.goalLeft){
			updating = true;
			if(App.Engine.tick >= this.interpLeftTick)this.left += expInterp(this.left,this.goalLeft,0.005,1);
		}if(this.right != this.goalRight){
			updating = true;
			if(App.Engine.tick >= this.interpRightTick)this.right += expInterp(this.right,this.goalRight,0.005,1);
		}

		//Do the actual rendering as defined by our child class
		for(var r in this.renderLayers){
			this.renderLayers[r](gfx);
		}

		return updating;
	}


	this.setLock = function(lock){
		this.locked = lock;
		if(lock) this.color = this.lockedColor;
		else this.color = this.baseColor;
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
		this.textColor = this.activeTextColor;
		this.color = this.activeColor;
	}

	this._clickEnd = function(){
		this.active = false;
		this.textColor = this.baseTextColor;
		this.color = this.baseColor;
		this.resetPosition();
	}

	this._update = function(){
		if(!this.functional) return;
		var oc = this.color;
		var x = App.InputHandler.mouseX;
		var y = App.InputHandler.mouseY;

		if(!this.active && this.collides(x, y))
			this.color = this.hoverColor;
		else if(!this.active)
			this.color = this.baseColor;
		else if(!this.collides(x, y))
			this._clickEnd();

		if(this.color === oc)
			return false;
		return true;
	}
}

g.CollisionCircle = function(x, y, r, en, ex, panel){
	g.Component.call(this, x, y, en, ex, panel);
	this.r = r;
	this.w = r/2; //to make interpolation easier

	var that = this;

	this.renderLayers.push(function(gfx){
		gfx.fillStyle = that.color;
		gfx.beginPath();
		var r = (that.left === that.x) ? that.right : that.left;
		gfx.arc(that.x, that.y, r, 0, g.CollisionCircle.p2, true);
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
g.CollisionRect = function(x, y, w, h, en, ex, panel){
	g.Component.call(this, x, y, en, ex, panel);
	this.w = w;
	this.h = h;
	console.log(w + ", " + h);

	var that = this;
	this.renderLayers.push(function(gfx){
		gfx.fillStyle = that.color;
		gfx.fillRect(that.left, that.y, that.right - that.left, that.geth());
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
g.Button = function(x, y, w, h, en, ex, callback, continuous, panel){
	g.CollisionRect.call(this, x, y, w, h, en, ex, panel);
	this.functional = true;
	this.clicked = false;
	this.continuous = continuous;
	this.callback = callback;

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