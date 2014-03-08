/*
Notes about doing the GUI:

For now, just need:
imageButton - small and large? -- doesn't need to be an ACTUAL image, just pictographic somehow
textButton - small and large?
dragButton - like an imageButton
textBox -- static and user entry

guiPanel -- static and prevents click fallthrough
*/

App.GuiTextButton = function(cRect, text, callback, continuous, panel){
	this.cRect = cRect;
	this.text = text;
	this.callback = callback;
	this.cRect.positionRelative(panel);
	this.cRect.functional = true;
	this.color = App.GuiTextButton.bg;
	this.continuous = continuous;
	this.clicked = false;

	var textX = this.cRect.x + (this.cRect.w / 2); // for centering text
	var textY = this.cRect.y + (this.cRect.h / 2); // for centering text

	this.update = function(){
		if(this.clicked && this.continuous)
			this.callback();
	}

	this.render = function(gfx){
		gfx.fillStyle = this.color;
		gfx.fillRect(this.cRect.x, this.cRect.y, this.cRect.w, this.cRect.h);
		gfx.fillStyle = App.GuiTextButton.fg;
		gfx.fillText(this.text, textX, textY);
	}

	this.clickStart = function(){
		this.color = '#2f2f2f';
		this.clicked = true;
	}

	this.clickDrag = function(x, y){
		if(!this.cRect.collides(x,y)){
			this.color = App.GuiTextButton.bg;
			this.clicked = false;
		}
	}

	this.clickEnd = function(x, y){
		this.color = App.GuiTextButton.bg;
		if(!this.cRect.collides(x,y))
			return;
		if(this.callback && this.clicked)
			this.callback();
		this.clicked = false;
	}
}
App.GuiTextButton.bg = '#1f1f1f';
App.GuiTextButton.fg = '#ffffff';


//TODO: Cameron, we need designs. Basically the same as above, just a different render method.
//SHOULD abstract some stuff out but for now...
App.GuiVectorButton = function(cRect, draw, callback, continuous, panel){
	this.cRect = cRect;
	this.cRect.positionRelative(panel);
}


//TODO requires some special logic
//note that the instruction dragging is the only drag and drop, so let's cut
//out the middleman and just hardcode that part
App.GuiDragButton = function(cRect, draw, instruction, panel){
	this.cRect = cRect;
	this.cRect.positionRelative(panel);
	this.cRect.functional = true;

	this.currentX = this.cRect.x;
	this.currentY = this.cRect.y;
	this.color = App.GuiTextButton.bg;
	this.dragged = false;
	this.draw = draw;
	this.instruction = instruction;

	this.render = function(gfx){
		gfx.fillStyle = this.color;
		gfx.fillRect(this.currentX, this.currentY, this.cRect.w, this.cRect.h);

		if(this.draw)
			this.draw(gfx);
	}

	this.clickStart = function(){
		this.dragged = true;
		this.color = '#3d2d1d';
	}

	this.update = function(){
		if(!this.dragged)
			return;
		this.currentX = App.InputHandler.mouseData.x - this.cRect.w/2;
		this.currentY = App.InputHandler.mouseData.y - this.cRect.h/2;
	}

	this.clickEnd = function(x, y){
		this.dragged = false;
		this.color = App.GuiTextButton.bg;
		this.currentX = this.cRect.x;
		this.currentY = this.cRect.y;
		console.log("dragged to " + x + "," + y);


	}
}

App.GuiTextBox = function(cRect, text, panel){
	this.cRect = cRect;
	this.text = text;
	this.cRect.positionRelative(panel);
	this.color = App.GuiTextButton.bg;

	var textX = this.cRect.x + 10;// (this.cRect.w / 2); // for centering text
	var textY = this.cRect.y + (this.cRect.h / 2); // for centering text

	this.render = function(gfx){
		gfx.fillStyle = this.color;
		gfx.fillRect(this.cRect.x, this.cRect.y, this.cRect.w, this.cRect.h);
		gfx.fillStyle = App.GuiTextButton.fg;
		gfx.fillText(this.text, textX, textY);
	}

}

App.GuiEditableTextBox = function(cRect, defaultText, panel){
	this.cRect = cRect;
	this.text = defaultText;
	this.cRect.positionRelative(panel);
	this.color = App.GuiTextButton.bg;
	this.clicked = false;
	this.editmode = false;
	this.cRect.functional = true;

	var textX = this.cRect.x + 10;// (this.cRect.w / 2); // for centering text
	var textY = this.cRect.y + (this.cRect.h / 2); // for centering text

	this.render = function(gfx){
		gfx.fillStyle = this.color;
		gfx.fillRect(this.cRect.x, this.cRect.y, this.cRect.w, this.cRect.h);
		gfx.fillStyle = App.GuiTextButton.fg;
		gfx.fillText(this.text, textX, textY);
	}

	this.clickStart = function(){
		if(this.editmode)
			return;
		this.color = '#2f2f2f';
		this.clicked = true;
	}

	this.clickDrag = function(x, y){
		if(this.editmode)
			return;
		if(!this.cRect.collides(x,y)){
			this.color = App.GuiTextButton.bg;
			this.clicked = false;
		}
	}

	this.clickEnd = function(x, y){
		if(this.editmode)
			return;
		this.color = App.GuiTextButton.bg;
		if(!this.cRect.collides(x,y))
			return;
		if(this.clicked)
			this.enterEditMode();
		this.clicked = false;
	}
	var that = this;
	this.enterEditMode = function(){
		App.InputHandler.hijackInput(that.listenKeyStroke);
		this.editmode = true;
		this.text = "";
	}

	this.exitEditMode = function(){
		App.InputHandler.deHijackInput();
		this.editmode = false;
	}

	//SUPER clunky but it works. Lol!
	//TODO cursor support? I don't even know how to start with
	//this; no idea how thick the letters are, how to highlight
	//them, etc
	this.listenKeyStroke = function(key){
		console.log(key);
		if(key.length <= 1)
			that.text += key;
		if(key == 'Space')
			that.text += ' ';

		if(key == 'Enter')
			that.exitEditMode();
	}
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
	this.functional = false;

	this.collides = function(x, y){
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