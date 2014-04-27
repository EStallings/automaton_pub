
//A relatively simple button. Click and release on top of it to fire a callback.
//with 'continuous' as true, it will keep firing every frame.
App.GuiTextButton = function(x, y, enterDelay, exitDelay, txt, callback, continuous, xorigin, yorigin){
	App.GuiTools.Button.call(this, x, y, 512, 24, enterDelay, exitDelay, callback, continuous, xorigin, yorigin);
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

App.GuiToolbarButton = function(x, y, d, delay, color, xorigin, yorigin,toggle, tooltip, callback){
	App.GuiTools.Button.call(this, x, y, d, d, delay, delay, callback, false, xorigin, yorigin);
	this.toggle = toggle;
	this.toggled = false;
	this.baseColor = '#ffffff';
	this.hoverColor = color;
	this.tooltip = tooltip;
	this.tooltipTextColor = '#000000';

	var that = this;


	delete(this.renderLayers['Rect']);

	this.renderLayers['Button'] = function(gfx){
		if(that.toggle && that.toggled)
			that.color = that.hoverColor;
		if(typeof that.color === 'string'){
			gfx.strokeStyle = '#808080';
			gfx.fillStyle = that.color;
		}
		else{
			gfx.strokeStyle = App.STROKE_COLOR[that.color];
			gfx.fillStyle = App.FILL_COLOR[that.color];
			//this.tooltipTextColor = '#ffffff';
		}
		gfx.fillRect  (that.getx()+1, that.gety()+1, that.w-2, that.h-2);
		gfx.strokeRect(that.getx()+1, that.gety()+1, that.w-2, that.h-2);

		if(that.hovering){
			var w = textWidth(gfx, that.tooltip, 24-6, -2);
			gfx.fillRect(that.getx(), App.Canvases.height-103-24, w+6, 24);
			gfx.fillStyle = that.tooltipTextColor;
			text(gfx, that.tooltip, that.getx() + 3, App.Canvases.height-103-21, 24-6, -2);
		}
	};
}
App.GuiToolbarButton.prototype = Object.create(App.GuiTools.Button);
App.GuiToolbarButton.prototype.constructor = App.GuiToolbarButton;
