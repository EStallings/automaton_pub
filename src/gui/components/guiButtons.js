
//A relatively simple button. Click and release on top of it to fire a callback.
//with 'continuous' as true, it will keep firing every frame.
App.GuiTextButton = function(x, y, text, callback, continuous, panel){
	this.guiCollider = new App.GuiCollisionRect(x, y, App.GuiTextButton.width, App.GuiTextButton.height);
	this.text = text;
	this.callback = callback;
	if(panel) panel.addChild(this);
	this.guiCollider.functional = true;

	this.activeColor = App.GuiColors.gray[4];
	this.inactiveColor = App.GuiColors.gray[6];
	this.color = this.inactiveColor;

	this.continuous = continuous;
	this.clicked = false;
	this.flair = null;
	this.flairColor = App.GuiColors.gray[1];


	//For continuous callbacks
	this.update = function(){
		if(this.clicked && this.continuous)
			this.callback();
	}

	//Draws a box and the text! Nothing fancy. Could use some work maybe.
	this.render = function(gfx){

		gfx.fillStyle = this.color;
		gfx.fillRect(this.guiCollider.getx(), this.guiCollider.gety(), this.guiCollider.w, this.guiCollider.h);
		gfx.fillStyle = App.GuiTextButton.fg;

		var textX = this.guiCollider.getx() + 2;
		var textY = this.guiCollider.gety() + (this.guiCollider.h / 2);

		var text_w = gfx.measureText(this.text).width;

		textX = this.guiCollider.getx() + (this.guiCollider.w/2 - text_w/2);

		// there is no gfx.measureText(txt).height param so we must use font size
		textY = this.guiCollider.gety() + this.guiCollider.h/2 + 5;

		gfx.fillText(this.text, textX, textY);
		var flair = (this.flair) ? this.flair : App.GuiTextButton.defaultFlair;
		App.GuiTextButton.flairs[flair](gfx, this.flairColor, this.guiCollider.getx(), this.guiCollider.gety());
	}

	//Changes the color and initiates the click
	this.clickStart = function(){
		// this.color = '#2f2f2f';
		this.clicked = true;
	}

	//Checks for moving the mouse off of the button
	this.clickDrag = function(x, y){
		if(!this.guiCollider.collides(x,y)){
			this.color = App.GuiTextButton.bg;
			this.clicked = false;
		}
	}

	//If the click was successful, fire the callback
	this.clickEnd = function(x, y){
		this.color = this.inactiveColor;
		if(!this.guiCollider.collides(x,y))
			return;
		if(this.callback && this.clicked)
			this.callback();
		this.clicked = false;
	}
}
App.GuiTextButton.bg = '#1f1f1f';
App.GuiTextButton.fg = '#ffffff';
App.GuiTextButton.width = 100;
App.GuiTextButton.height = 30;
App.GuiTextButton.defaultFlair = 3;
App.GuiTextButton.flairs = [
	function(gfx, c, x, y){
		return;
	},
	function(gfx, c, x, y){
		gfx.fillStyle = c;
		gfx.fillRect(x +  App.GuiTextButton.width - 5, y + 10, 10, 10);
	},
	function(gfx, c, x, y){
		gfx.strokeStyle = c;
		gfx.lineWidth = 1;
		gfx.strokeRect(x, y, App.GuiTextButton.width, App.GuiTextButton.height);
	},
	function(gfx, c, x, y){
		gfx.strokeStyle = c;
		gfx.lineWidth = 1;
		gfx.strokeRect(x, y, App.GuiTextButton.width, App.GuiTextButton.height);
		gfx.fillStyle = c;
		gfx.fillRect(x +  App.GuiTextButton.width - 5, y + 10, 10, 10);
	},

]

//TODO: Cameron, we need designs. Basically the same as above, just a different render method.
//SHOULD abstract some stuff out but for now...
App.GuiVectorButton = function(guiCollider, draw, callback, continuous, panel){
	this.guiCollider = guiCollider;
	if(panel) panel.addChild(this);
}

