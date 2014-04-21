
//NOT a simple text display.
App.GuiTextBox = function(x, y, w, h, defaultText, en, ex, xorigin, yorigin){
	App.GuiTools.Component.call(this, x, y, w, h, en, ex, xorigin, yorigin);

	this.text = defaultText;
	this.editing = false;

	this.renderLayers['Text'] = function(gfx){
		gfx.fillStyle = that.textColor;
		text(gfx,that.txt,that.getx()+2,that.gety()+3,that.h-6,-2);
	};

	this.update = function(){

	}

	this.clickStart = function(){
		this.editing = true;
	}

	this.clickEnd = function(){
	}

}
App.GuiTextBox.prototype = Object.create(g.Component);
App.GuiTextBox.prototype.constructor = App.GuiTextBox;
