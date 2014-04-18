
//A relatively simple button. Click and release on top of it to fire a callback.
//with 'continuous' as true, it will keep firing every frame.
App.GuiTextButton = function(x, y, text, callback, continuous, panel){
	App.GuiTools.Button.call(this, x, y, 100, 50, callback, continuous, panel);
	this.text = text;

	//Draws a box and the text! Nothing fancy. Could use some work maybe.
	this.renderLayers.push (function(gfx){
		gfx.fillStyle = this.textColor;

		var textX = this.getx() + 2;
		var textY = this.gety() + (this.h / 2);

		var text_w = gfx.measureText(this.text).width;

		textX = this.getx() + (this.w/2 - text_w/2);

		// there is no gfx.measureText(txt).height param so we must use font size
		textY = this.gety() + this.h/2 + 5;

		gfx.fillText(this.text, textX, textY);
	});
}
App.GuiTextButton.prototype = Object.create(App.GuiTools.Button);
App.GuiTextButton.prototype.constructor = App.GuiTextButton;