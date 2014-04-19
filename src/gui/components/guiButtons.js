
//A relatively simple button. Click and release on top of it to fire a callback.
//with 'continuous' as true, it will keep firing every frame.
App.GuiTextButton = function(x, y, enterDelay, exitDelay, txt, callback, continuous, panel){
	App.GuiTools.Button.call(this, x, y, 512, 24, enterDelay, exitDelay, callback, continuous, panel);
	this.txt = txt;
	var that = this;
	//Draws a box and the text! Nothing fancy. Could use some work maybe.
	this.renderLayers["Button"] = function(gfx){
		gfx.fillStyle = that.textColor;
		text(gfx,that.txt,that.getx()+2,that.gety()+3,that.h-6,-2);
	};
}
App.GuiTextButton.prototype = Object.create(App.GuiTools.Button);
App.GuiTextButton.prototype.constructor = App.GuiTextButton;
