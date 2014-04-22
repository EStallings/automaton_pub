
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


App.GuiToolbarButton = function(x, y, delay, color, xorigin, yorigin, pos, callback){
	App.GuiTools.Button.call(this, x - 41, y - 25, 44, 44, delay, delay, callback, false, xorigin, yorigin);
	this.pos = pos;
	this.c = color;

	var that = this;
	//Draws a box and the text! Nothing fancy. Could use some work maybe.
	delete(this.renderLayers["Rect"]);
	this.renderLayers["Button"] = function(gfx){

		var interp = (that.interpmode === 'exit') ?
		48 - (that.getleft() - that.getx()) :
		that.getright() - that.getx();
		var dx = ((interp + 3) * that.pos + (that.getx() - that.x));

		gfx.fillStyle =  '#ffffff'; // TODO App.FILL_COLOR[this.c];
		gfx.fillRect(dx, that.gety(), that.w, that.h);

	};
}
App.GuiToolbarButton.prototype = Object.create(App.GuiTools.Button);
App.GuiToolbarButton.prototype.constructor = App.GuiToolbarButton;


App.GuiLockButton = function(x, y, delay, color, xorigin, yorigin, pos){
	App.GuiToolbarButton.call(this, x, y, delay, color, xorigin, yorigin, pos, function(){App.Game.currentPlanningLevel.toggleLock(color)});
}
App.GuiLockButton.prototype = Object.create(App.GuiToolbarButton);
App.GuiLockButton.prototype.constructor = App.GuiLockButton;

App.GuiToggButton = function(x, y, delay, color, xorigin, yorigin, pos){
	App.GuiToolbarButton.call(this, x, y, delay, color, xorigin, yorigin, pos, function(){App.GuiInstDrag.changeGlobalColor(color)});
}
App.GuiToggButton.prototype = Object.create(App.GuiToolbarButton);
App.GuiToggButton.prototype.constructor = App.GuiToggButton;

