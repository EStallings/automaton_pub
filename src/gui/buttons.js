/*
Notes about doing the GUI:

For now, just need:
imageButton - small and large? -- doesn't need to be an ACTUAL image, just pictographic somehow
textButton - small and large?
dragButton - like an imageButton
textBox -- static and user entry

guiPanel -- static and prevents click fallthrough
*/

App.GuiTextButton = function(cRect, text, callback, panel){
	this.cRect = cRect;
	this.text = text;
	this.cRect.positionRelative(panel);

	this.render = function(gfx){

	}
}

App.GuiVectorButton = function(cRect, draw, callback, panel){
	this.cRect = cRect;
	this.cRect.positionRelative(panel);
}


//TODO requires some special logic
App.GuiDragButton = function(){

}

App.GuiTextBox = function(cRect, text, editable, panel){
	this.cRect = cRect;
	this.text = text;
	this.cRect.positionRelative(panel);

}

App.GuiPanel = function(cRect){
	this.cRect = cRect;

	this.render = function(gfx){
		gfx.fillStyle = App.GuiPanel.rgba;
		gfx.fillRect(this.cRect.x, this.cRect.y, this.cRect.w, this.cRect.h);
	}
}
App.GuiPanel.rgba = "#F1F1F1";

App.GuiCollisionRect = function(x, y, w, h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.didCollide = function(x, y){
		return ((x > this.x) && (x < (this.x + this.w)) &&
			   	(y > this.y) && (y < (this.y + this.h)));
	}

	this.positionRelative = function(component){
		if(!component)
			return;
		if(!component.cRect)
			return;
		var r = component.cRect;

		this.x += r.x;
		this.y += r.y;
	}
}