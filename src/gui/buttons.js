/*
Notes about doing the GUI:

For now, just need:

DRAW NOT DONE
imageButton - small and large? -- doesn't need to be an ACTUAL image, just pictographic somehow

DONE?
textButton - small and large?

DRAW NOT DONE
dragButton - like an imageButton

DONE?
textBox -- static and user entry

DONE
guiPanel -- static and prevents click fallthrough


One TODO (potentially): abstract out button logic. Several of the objects
in this file have some similar code. Less than you might think, though...
*/


//A relatively simple button. Click and release on top of it to fire a callback.
//with 'continuous' as true, it will keep firing every frame.
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
		//-------
		//At this point, need drawing of planning level
		//to drag and drop components! WOO!
		//-------
	}
}


//Simple text display. Has a background, some text. Nothing fancy.
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

//NOT a simple text display. This bad boy is heavy weight
//Feel free to extend/refactor this! It does, however, work pretty well,
//and isn't very inefficient.
App.GuiEditableTextBox = function(cRect, defaultText, panel){
	this.cRect = cRect;
	this.text = defaultText;
	this.lastText = defaultText;
	this.defaultText = defaultText;
	this.cRect.positionRelative(panel);
	this.color = App.GuiTextButton.bg;
	this.clicked = false;
	this.editmode = false;
	this.cRect.functional = true;
	this.cursorPosition = 0;
	this.cursorTime = 0;
	this.cursorTimeout = 15;

	var textX = this.cRect.x + 10;// (this.cRect.w / 2); // for centering text
	var textY = this.cRect.y + 5 + (this.cRect.h / 2); // for centering text

	this.render = function(gfx){
		gfx.fillStyle = this.color;
		gfx.fillRect(this.cRect.x, this.cRect.y, this.cRect.w, this.cRect.h);
		gfx.fillStyle = App.GuiTextButton.fg;
		//if set font, set font here.
		var metrics = gfx.measureText(this.text.substring(0, this.cursorPosition));
		if(metrics.width + textX > this.cRect.x + this.cRect.w)
			this.text = this.text.substring(0, this.text.length - 1);
		gfx.fillText(this.text, textX, textY);

		if(this.cursorTime > 0){
			gfx.fillRect(textX + metrics.width, textY - 10, 1, 10);

		}
		if(this.editmode)
			gfx.fillText("Press Enter to save, Esc to cancel.", textX, textY - 15);
	}

	this.update = function(){
		if(!this.editmode)
			return;
		this.cursorTime ++;
		if(this.cursorTime > this.cursorTimeout){
			this.cursorTime = -1 * this.cursorTimeout;
		}
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
		this.lastText = this.text;
		this.text = (this.text === this.defaultText)? "" : this.text;
		this.cursorPosition = this.text.length;
		this.color = "#121212";
	}

	this.exitEditMode = function(){
		App.InputHandler.deHijackInput();
		this.editmode = false;
		this.cursorTime = 0;
		this.cursorPosition = 0;
		this.color = App.GuiTextButton.bg;
	}

	this.insertKey = function(key){
		if(this.text.length === 0)
			this.text = key;
		else
			this.text = this.text.substring(0, this.cursorPosition) + key + this.text.substring(this.cursorPosition, this.text.length);
	}

	
	this.listenKeyStroke = function(key, shift){

		if(key.length <= 1){
			that.insertKey((shift)? key : key.toLowerCase());
			that.cursorPosition ++;
		}
		if(key === 'Space'){
			that.insertKey(' ');
			that.cursorPosition ++;
		}
		if(key === 'Backspace'){
			that.text = that.text.substring(0, that.text.length - 1);
			that.cursorPosition --;
		}
		if(key === 'Left'){
			that.cursorPosition --;
		}
		if(key === 'Right'){
			that.cursorPosition ++;
		}
		if(that.cursorPosition > that.text.length)
			that.cursorPosition = that.text.length;
		else if(that.cursorPosition < 0)
			that.cursorPosition = 0;

		if(key === 'Enter')
			that.exitEditMode();
		if(key === 'Esc') {
			that.text = that.lastText;
			that.exitEditMode();
		}
	}
}

//A backgound panel. You can add things to these to organize your components for
//relative positioning and rapid gui alterations.
App.GuiPanel = function(cRect){
	this.cRect = cRect;

	this.render = function(gfx){
		gfx.fillStyle = App.GuiPanel.rgba;
		gfx.fillRect(this.cRect.x, this.cRect.y, this.cRect.w, this.cRect.h);
	}
}
App.GuiPanel.rgba = 'rgba(180, 180, 180, 0.1)';


//Abstracts out some logic for coordinates and collision, relative positioning
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
