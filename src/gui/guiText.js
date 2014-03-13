
//Simple text display. Has a background, some text. Nothing fancy.
App.GuiTextBox = function(guiCollider, text, panel){
	this.guiCollider = guiCollider;
	this.text = text;
	this.guiCollider.positionRelative(panel);
	this.color = App.GuiTextButton.bg;

	var textX = this.guiCollider.x + 10;// (this.guiCollider.w / 2); // for centering text
	var textY = this.guiCollider.y + (this.guiCollider.h / 2); // for centering text

	//Draw our text
	this.render = function(gfx){
		gfx.fillStyle = this.color;
		gfx.fillRect(this.guiCollider.x, this.guiCollider.y, this.guiCollider.w, this.guiCollider.h);
		gfx.fillStyle = App.GuiTextButton.fg;
		gfx.fillText(this.text, textX, textY);
	}

}

//NOT a simple text display. This bad boy is heavy weight
//Feel free to extend/refactor this! It does, however, work pretty well,
//and isn't very inefficient.
App.GuiEditableTextBox = function(guiCollider, defaultText, panel){
	this.guiCollider = guiCollider;
	this.text = defaultText;
	this.lastText = defaultText;
	this.defaultText = defaultText;
	this.guiCollider.positionRelative(panel);
	this.color = App.GuiTextButton.bg;
	this.clicked = false;
	this.editmode = false;
	this.guiCollider.functional = true;
	this.cursorPosition = 0;
	this.cursorTime = 0;
	this.cursorTimeout = 15;

	var textX = this.guiCollider.x + 10;// (this.guiCollider.w / 2); // for centering text
	var textY = this.guiCollider.y + 5 + (this.guiCollider.h / 2); // for centering text

	//Draw the text box, including cursor
	this.render = function(gfx){
		gfx.fillStyle = this.color;
		gfx.fillRect(this.guiCollider.x, this.guiCollider.y, this.guiCollider.w, this.guiCollider.h);
		gfx.fillStyle = App.GuiTextButton.fg;
		//if set font, set font here.
		var metrics = gfx.measureText(this.text.substring(0, this.cursorPosition));
		if(metrics.width + textX > this.guiCollider.x + this.guiCollider.w)
			this.text = this.text.substring(0, this.text.length - 1);
		gfx.fillText(this.text, textX, textY);

		if(this.cursorTime > 0){
			gfx.fillRect(textX + metrics.width, textY - 10, 1, 10);
		}

		if(this.editmode)
			gfx.fillText("Press Enter to save, Esc to cancel.", textX, textY - 15);
	}

	//Update cursor
	this.update = function(){
		if(!this.editmode)
			return;
		this.cursorTime ++;
		if(this.cursorTime > this.cursorTimeout){
			this.cursorTime = -1 * this.cursorTimeout;
		}
	}

	//begin a click - this is just for the button-like functionality
	this.clickStart = function(){
		if(this.editmode)
			return;
		this.color = '#2f2f2f';
		this.clicked = true;
	}

	//For button-like functionality. Tests if the user moves their mouse off the button
	this.clickDrag = function(x, y){
		if(this.editmode)
			return;
		if(!this.guiCollider.collides(x,y)){
			this.color = App.GuiTextButton.bg;
			this.clicked = false;
		}
	}

	//For button-like functionality. Enters edit mode if the click is successful
	this.clickEnd = function(x, y){
		if(this.editmode)
			return;
		this.color = App.GuiTextButton.bg;
		if(!this.guiCollider.collides(x,y))
			return;
		if(this.clicked)
			this.enterEditMode();
		this.clicked = false;
	}

	//Ohh, javascript
	var that = this;

	//Enters the edit mode: steals input from the inputhandler
	this.enterEditMode = function(){
		App.InputHandler.hijackInput(that.listenKeyStroke);
		this.editmode = true;
		this.lastText = this.text;
		this.text = (this.text === this.defaultText)? "" : this.text;
		this.cursorPosition = this.text.length;
		this.color = "#121212";
	}

	//restores input control to the inputhandler, exits edit mode.
	this.exitEditMode = function(){
		App.InputHandler.deHijackInput();
		this.editmode = false;
		this.cursorTime = 0;
		this.cursorPosition = 0;
		this.color = App.GuiTextButton.bg;
	}

	//Helper function to insert a keystroke at the cursor position
	this.insertKey = function(key){
		if(this.text.length === 0)
			this.text = key;
		else
			this.text = this.text.substring(0, this.cursorPosition) + key + this.text.substring(this.cursorPosition, this.text.length);
	}


	//Could use some cleanup; callback that receives the redirected input during edit mode
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
			that.text = that.text.substring(0, that.cursorPosition-1) + that.text.substring(that.cursorPosition, that.text.length);
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

		//Having a way to exit edit mode is VITAL
		if(key === 'Enter')
			that.exitEditMode();
		if(key === 'Esc') {
			that.text = that.lastText;
			that.exitEditMode();
		}
	}
}