App.GuiTools = {};
var g = App.GuiTools;

g.Component = function(x, y, w, h, enterDelay, exitDelay, panel){
	if(!x && x !== 0 || (!y && y !== 0))
		throw "x or y invalid";
	if(panel) panel.addChild(this);

	//current x and y
	this.x  = x;
	this.y  = y;
	this.w  = w;
	this.h  = h;

	//relatively positioned x and y
	this.px = x;
	this.py = y;

	//base x and y: never changes
	this.baseX = x;
	this.baseY = y;

	//for drawing the interpolation
	this.left  = x;
	this.right = x;

	this.enterDelay      = enterDelay;
	this.exitDelay       = exitDelay;
	this.interpLeftTick  = 0;
	this.interpRightTick = 0;

	this.functional = false;
	this.active     = false;
	this.locked     = false;
	this.changed    = false;

	this.baseColor       = '#ffffff';
	this.hoverColor      = '#a0a0a0';
	this.activeColor     = '#000000';
	this.activeTextColor = '#ffffff';
	this.baseTextColor   = '#000000';
	this.lockedColor     = '#d2d2d2';

	this.color        = this.baseColor;
	this.textColor    = this.baseTextColor;
	
	this.renderLayers = [];
	var that = this;

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

	this.renderLayers["Rect"] = function(gfx){
		gfx.fillStyle = that.color;
		gfx.fillRect(that.left, that.y, that.right - that.left, that.h);
	};

	//Tests if a point is inside of the rectangle
	this.collides = function(x, y){
		return ((x > this.x) && (x < (this.x + this.w)) &&
			   	(y > this.y) && (y < (this.y + this.h)));
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
		this.left = this.x;
		this.right = this.w + this.x;
	}

	this._clickStart = function(){
		this.active = true;
		this.textColor = this.activeTextColor;
		this.color = this.activeColor;
		this.changed = true;
	}

	this._clickEnd = function(){
		this.active = false;
		this.textColor = this.baseTextColor;
		this.color = this.baseColor;
		this.changed = true;
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
		if(this.changed){
			this.changed = false;
			return true;
		}
		if(this.color === oc)
			return false;
		return true;
	}
}

//Abstracts out some logic for coordinates and collision, relative positioning
g.CollisionRect = function(x, y, w, h, en, ex, panel){
	g.Component.call(this, x, y, en, ex, panel);
	
	console.log(w + ", " + h);

	
}
g.CollisionRect.prototype = Object.create(g.Component);
g.CollisionRect.prototype.constructor = g.CollisionRect;


//To be used for text buttons or image buttons...
g.Button = function(x, y, w, h, en, ex, callback, continuous, panel){
	g.Component.call(this, x, y, w, h, en, ex, panel);
	this.functional = true;
	this.clicked = false;
	this.continuous = continuous;
	this.callback = callback;

	//For continuous callbacks
	this.update = function(){
		if(this.active && this.continuous)
			this.callback();
	}

	this.clickStart = function(){
	}

	//If the click was successful, fire the callback
	this.clickEnd = function(){
		if(this.callback)
			this.callback();
	}

}
g.Button.prototype = Object.create(g.Component);
g.Button.prototype.constructor = g.Buton;
