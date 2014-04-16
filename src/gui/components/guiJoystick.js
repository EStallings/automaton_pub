/*
	Moves the 'camera' around.
*/
App.GuiJoystick = function(x, y, panel){
	this.guiCollider = new App.GuiCollisionCircle(x, y, 35);

	this.curPanX = 0;
	this.curPanY = 0;
	this.moveRate = 0.2;

	this.activeColor = App.GuiColors.gray[4];
	this.inactiveColor = App.GuiColors.gray[5];
	this.color = this.inactiveColor;

	this.dragged = false;

	this.render = function(gfx){
		//Draw outside/bounds
		gfx.fillStyle = this.color;
		gfx.strokeStyle = App.GuiColors.gray[2];
		gfx.lineWidth = 2;
		gfx.beginPath();
		gfx.arc(this.guiCollider.getx(), this.guiCollider.gety(), this.guiCollider.r, 0, Math.PI*2, true);
		gfx.closePath();
		gfx.stroke();

		//Draw inside/current joystick location
		gfx.lineWidth = 1;
		gfx.strokeStyle = App.GuiColors.gray[3];
		gfx.beginPath();
		gfx.arc(this.currentX, this.currentY, 15, 0, Math.PI*2, true);
		gfx.closePath();
		gfx.fill();
		gfx.stroke();

	}

	this.clickStart = function(){
		this.dragged = true;
		this.curPanX = this.guiCollider.getx();
		this.curPanY = this.guiCollider.gety();
		App.Game.beginPan(this.guiCollider.getx(), this.guiCollider.gety());
	}

	this.update = function(){


		var mx = this.guiCollider.getx();
		var my = this.guiCollider.gety();

		var x = App.InputHandler.mouseData.x - mx;
		var y = App.InputHandler.mouseData.y - my;

		var a = Math.atan2(x, y);
		var d = Math.sqrt(x * x + y * y);

		d = (d > this.guiCollider.r)? this.guiCollider.r : d;
		y = (d * Math.cos(a));
		x = (d * Math.sin(a));

		this.curPanX -= x * this.moveRate;
		this.curPanY -= y * this.moveRate;

		this.currentX = x + mx;
		this.currentY = y + my;

		App.Game.pan(this.curPanX, this.curPanY);
	}

	this.clickEnd = function(x, y){
		this.dragged = false;
		this.currentX = this.guiCollider.getx();
		this.currentY = this.guiCollider.gety();
	}


}