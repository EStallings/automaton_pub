App.GuiTools = {};
var g = App.GuiTools;

g.Component = function(x, y, w, h, enterDelay, exitDelay, xorigin, yorigin){
	if(!x && x !== 0 || (!y && y !== 0))
		throw "x or y invalid";

	//current x and y
	this.x               = x;
	this.y               = y;
	this.w               = w;
	this.h               = h;

	//relatively positioned x and y
	this.px              = x;
	this.py              = y;

	//base x and y: never changes
	this.baseX           = x;
	this.baseY           = y;

	this.xorigin         = xorigin;
	this.yorigin         = yorigin;

	//for drawing the interpolation
	this.left            = x;
	this.right           = x;

	this.enterDelay      = enterDelay;
	this.exitDelay       = exitDelay;
	this.interpLeftTick  = 0;
	this.interpRightTick = 0;

	this.functional      = false;
	this.active          = false;
	this.locked          = false;
	this.changed         = false;
	this.overridepos     = false;
	this.dointerp        = true;

	this.baseColor       = '#ffffff';
	this.hoverColor      = '#a0a0a0';
	this.activeColor     = '#000000';
	this.activeTextColor = '#ffffff';
	this.baseTextColor   = '#000000';
	this.lockedColor     = '#d2d2d2';

	this.color           = this.baseColor;
	this.textColor       = this.baseTextColor;

	this.renderLayers    = [];

	this.interpmode = 'none';

	var that = this;

	//From the box class
	this.enter = function(){
		this.left  = this.goalLeft  = this.x;
		this.right = this.goalRight = this.x;
		this.goalRight = this.x+this.w;
		this.interpmode = 'enter';
		this.interpRightTick = App.Engine.tick+this.enterDelay;
	}

	this.exit = function(){
		this.interpmode = 'exit';
		this.goalLeft = this.x+this.w;
		this.interpLeftTick = App.Engine.tick+this.exitDelay;
	}

	this.render = function(gfx){
		var updating = false;
		if(this.dointerp){
			//update interpolation
			if(this.left != this.goalLeft){
				updating = true;
				if(App.Engine.tick >= this.interpLeftTick)this.left += expInterp(this.left,this.goalLeft,0.005,0.1);
			}if(this.right != this.goalRight){
				updating = true;
				if(App.Engine.tick >= this.interpRightTick)this.right += expInterp(this.right,this.goalRight,0.005,0.1);
			}
		}
		else{
			this.left = this.x;
			this.right = this.x + this.w;
		}

		//Do the actual rendering as defined by our child class
		for(var r in this.renderLayers){
			this.renderLayers[r](gfx);
		}

		return updating;
	}

	this.renderLayers["Rect"] = function(gfx){
		gfx.fillStyle = that.color;
		gfx.fillRect(that.getleft(), that.gety(), that.getright() - that.getleft(), that.h);
	};

	//Tests if a point is inside of the rectangle
	this.collides = function(x, y){
		return ((x > this.getx()) && (x < (this.getx() + this.w)) &&
			   	(y > this.gety()) && (y < (this.gety() + this.h)));
	}

	this.getx = function(){
		if(this.overridepos)
			return this.x
		if(this.xorigin == 'right')
			return this.x + App.Canvases.width - this.w;
		if(this.xorigin == 'center')
			return this.x + App.Canvases.width/2 - this.w;
		return this.x;
	}

	this.gety = function(){
		if(this.overridepos)
			return this.y
		if(this.yorigin == 'bottom')
			return this.y + App.Canvases.height - this.h;
		if(this.yorigin == 'center')
			return this.y + App.Canvases.height/2 - this.h;
		return this.y
	}

	this.getleft = function(){
		if(this.xorigin == 'right')
			return this.left + App.Canvases.width - this.w;
		if(this.xorigin == 'center')
			return this.left + App.Canvases.width/2 - this.w;
		return this.left;
	}

	this.getright = function(){
		if(this.xorigin == 'right')
			return this.right + App.Canvases.width - this.w;
		if(this.xorigin == 'center')
			return this.right + App.Canvases.width/2 - this.w;
		return this.right;
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
		this.left = this.getx();
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

//To be used for text buttons or image buttons...
g.Button = function(x, y, w, h, en, ex, callback, continuous, xorigin, yorigin){
	g.Component.call(this, x, y, w, h, en, ex, xorigin, yorigin);
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
		console.log(this.left + " " + this.getleft() + " VS " + this.x + " " + this.getx());
		if(this.callback)
			this.callback();
	}

}
g.Button.prototype = Object.create(g.Component);
g.Button.prototype.constructor = g.Button;

g.Drag = function(x, y, w, h, en, ex, xorigin, yorigin){
	g.Component.call(this, x, y, w, h, en, ex, xorigin, yorigin);

	var that = this;

	this.functional = true;
	this.sticky = false;
	this.mx = this.x;
	this.my = this.y;

	delete(this.renderLayers['Rect']);
	this.renderLayers['Drag'] = function(gfx){
		gfx.fillStyle = that.color;
		gfx.fillRect(that.getx() - that.w/2, that.gety() - that.h/2, that.w, that.h);
	}

	this.collides = function(x, y){
		return ((x > (this.getx() - this.w/2)) && (x < ((this.getx() - this.w/2) + this.w)) &&
			   	(y > (this.gety() - this.h/2)) && (y < ((this.gety() - this.h/2) + this.h)));
	}

	this.clickStart = function(){
		this.sticky = true;
		this.overridepos = true;
		this.subClickStart();
	}

	this.update = function(){
		if(!this.sticky)
			return;

		this.x = App.InputHandler.mouseX;
		this.y = App.InputHandler.mouseY;

		this.changed = true;

		if(!App.InputHandler.lmb){
			this.subClickEnd();
			this.sticky = false;
			this.overridepos = false;
			this._clickEnd();
			this.resetPosition();
		}
		this.subUpdate();
	}

	this.clickEnd = function(){
	}
}
g.Drag.prototype = Object.create(g.Component);
g.Drag.prototype.constructor = g.Drag;

