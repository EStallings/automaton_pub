/*
	Moves the 'camera' around.
*/
App.GuiJoystick = function(x, y, enterDelay, exitDelay, panel){
	App.GuiTools.Component.call(this, x, y, 50, 50, enterDelay, exitDelay, panel);

	var that = this;
	this.functional = true;
	this.moveRate = 0.1;
	this.curPanX = 0;
	this.curPanY = 0;
	this.sticky = false;

	delete(this.renderLayers['Rect']);
	this.renderLayers['Joystick'] = function(gfx){
		gfx.fillStyle = that.color;
		gfx.fillRect(that.x - that.w/2, that.y - that.h/2, that.w, that.h);
	}

	this.collides = function(x, y){
		return ((x > (this.x - this.w/2)) && (x < ((this.x - this.w/2) + this.w)) &&
			   	(y > (this.y - this.h/2)) && (y < ((this.y - this.h/2) + this.h)));
	}

	this.clickStart = function(){
		App.GameRenderer.beginPan(this.x, this.y);
		this.sticky = true;
		this.curPanX = this.x;
		this.curPanY = this.y;
	}

	this.update = function(){
		if(!this.sticky)
			return;

		var x = App.InputHandler.mouseX - this.px;
		var y = App.InputHandler.mouseY - this.py;

		this.x = x + this.px;
		this.y = y + this.py;

		this.curPanX -= x * this.moveRate;
		this.curPanY -= y * this.moveRate;

		App.GameRenderer.pan(this.curPanX, this.curPanY);
		this.changed = true;

		if(!App.InputHandler.lmb){
			this.sticky = false;
			this.resetPosition();
		}

	}

	this.clickEnd = function(){
	}
}
App.GuiJoystick.prototype = Object.create(App.GuiTools.Component);
App.GuiJoystick.prototype.constructor = App.GuiJoystick;
