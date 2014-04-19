/*
	Moves the 'camera' around.
*/
App.GuiJoystick = function(x, y, enterDelay, exitDelay, panel){
	App.GuiTools.CollisionCircle.call(this, x, y, 35, enterDelay, exitDelay, panel);
	this.curPanX = 0;
	this.curPanY = 0;
	this.moveRate = 0.2;
	this.functional = true;

	var that = this;
	this.renderLayers.push(function(gfx){
		//Draw outside/bounds
		gfx.fillStyle = that.color;
		gfx.strokeStyle = '#ffffff';
		gfx.lineWidth = 2;
		gfx.beginPath();
		gfx.arc(that.px, that.py, that.r, 0, Math.PI*2, true);
		gfx.closePath();
		gfx.stroke();

		//Draw inside/current joystick location
		gfx.lineWidth = 1;
		gfx.strokeStyle = '#d1d1d1';
		gfx.beginPath();
		gfx.arc(that.x, that.y, 15, 0, Math.PI*2, true);
		gfx.closePath();
		gfx.stroke();
	});

	this.clickStart = function(){
		App.Game.beginPan(this.x, this.y);
	}

	this.update = function(){
		if(!this.active)
			return;
		var x = App.InputHandler.mouseX - this.px;
		var y = App.InputHandler.mouseY - this.py;

		var a = Math.atan2(x, y);
		var d = Math.sqrt(x * x + y * y);

		d = (d > this.r)? this.r : d;
		y = (d * Math.cos(a));
		x = (d * Math.sin(a));

		this.curPanX -= x * this.moveRate;
		this.curPanY -= y * this.moveRate;

		this.x = x + this.px;
		this.y = y + this.py;

		App.Game.pan(this.curPanX, this.curPanY);
	}

	this.clickEnd = function(){
		App.Game.endPan();
	}
}
App.GuiJoystick.prototype = Object.create(App.GuiTools.CollisionCircle);
App.GuiJoystick.prototype.constructor = App.GuiJoystick;