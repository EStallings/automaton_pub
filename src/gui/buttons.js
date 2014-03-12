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

NOT DONE
guiSliderButton and guiSliderLine


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

	//For continuous callbacks
	this.update = function(){
		if(this.clicked && this.continuous)
			this.callback();
	}

	//Draws a box and the text! Nothing fancy. Could use some work maybe.
	this.render = function(gfx){
		gfx.fillStyle = this.color;
		gfx.fillRect(this.cRect.x, this.cRect.y, this.cRect.w, this.cRect.h);
		gfx.fillStyle = App.GuiTextButton.fg;
		gfx.fillText(this.text, textX, textY);
	}

	//Changes the color and initiates the click
	this.clickStart = function(){
		this.color = '#2f2f2f';
		this.clicked = true;
	}

	//Checks for moving the mouse off of the button
	this.clickDrag = function(x, y){
		if(!this.cRect.collides(x,y)){
			this.color = App.GuiTextButton.bg;
			this.clicked = false;
		}
	}

	//If the click was successful, fire the callback
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

	//For continuous callbacks
	this.update = function(){
		if(this.clicked && this.continuous)
			this.callback();
	}

	//Draws a box and the text! Nothing fancy. Could use some work maybe.
	this.render = function(gfx){
		gfx.fillStyle = this.color;
		gfx.fillRect(this.cRect.x, this.cRect.y, this.cRect.w, this.cRect.h);
		gfx.fillStyle = App.GuiTextButton.fg;
		gfx.fillText(this.text, textX, textY);
	}

	//Changes the color and initiates the click
	this.clickStart = function(){
		this.color = '#2f2f2f';
		this.clicked = true;
	}

	//Checks for moving the mouse off of the button
	this.clickDrag = function(x, y){
		if(!this.cRect.collides(x,y)){
			this.color = App.GuiTextButton.bg;
			this.clicked = false;
		}
	}

	//If the click was successful, fire the callback
	this.clickEnd = function(x, y){
		this.color = App.GuiTextButton.bg;
		if(!this.cRect.collides(x,y))
			return;
		if(this.callback && this.clicked)
			this.callback();
		this.clicked = false;
	}
}



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

	//Draws a simple box for now - once we have some vector draw functions,
	//we'll be able to draw them on it!
	this.render = function(gfx){
		gfx.fillStyle = this.color;
		gfx.fillRect(this.currentX, this.currentY, this.cRect.w, this.cRect.h);

		if(this.draw)
			this.draw(gfx);
	}

	//Initiating the dragging
	this.clickStart = function(){
		this.dragged = true;
		this.color = '#4d4d4d';
	}

	//The drag part of "drag and drop"
	this.update = function(){
		if(!this.dragged)
			return;
		this.currentX = App.InputHandler.mouseData.x - this.cRect.w/2;
		this.currentY = App.InputHandler.mouseData.y - this.cRect.h/2;
	}

	//The button has been "dropped"!
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


/* BIG NOTE
	This and the sliderLine below it are currently twinned - each requires the other.
	However, I haven't made a nice function for just making a slider, button and line included, just yet.
	This is because each has to be stored separately inside the gui frame
	in order for collisions with the cRect to be dealt with properly. The probable solution
	will be to just make a function that makes both, adds both to the frame,
	and updates their references to each other.
*/
App.GuiSliderButton = function(cRect, panel){
	this.cRect = cRect;
	this.cRect.positionRelative(panel);
	this.cRect.functional = true;
	this.color = App.GuiTextButton.bg; 
	this.sliderLine;
	this.dragged = false;

	//Renders just the button portion of the slider (the box)
	this.render = function(gfx){
		if(!this.sliderLine)
			console.error("Improperly initialized gui slider");
		gfx.fillStyle = this.color;
		gfx.fillRect(this.cRect.x, this.cRect.y, this.cRect.w, this.cRect.h);

		gfx.fillStyle = '#ffffff';
		gfx.fillText (Math.floor(this.sliderLine.value), this.cRect.x, this.cRect.y + this.cRect.h/2);
	}

	//Begins the dragging of the slider
	this.clickStart = function(){
		this.dragged = true;
		this.color = '#3d2d1d';
	}

	//Ugly code in here, needs cleanup.
	//What this does is move relative to the mouse, while snapping to the
	//axis of the slider line (IE only moving on X or Y)
	//and also ensures that it doesn't move outside of the bounds of the line
	//(IE past the max and min)
	//It also calls the sliderLine.evaluate function, which in turn calls any
	//change listener callback.
	this.clickDrag = function(){
		if(!this.dragged)
			return;
		if(this.sliderLine.direction === 1){
			this.cRect.x= App.InputHandler.mouseData.x - this.cRect.w/2;
			if(this.cRect.x > this.sliderLine.cRect.x + this.sliderLine.cRect.w)
				this.cRect.x = this.sliderLine.cRect.x + this.sliderLine.cRect.w;
			else if (this.cRect.x < this.sliderLine.cRect.x)
				this.cRect.x = this.sliderLine.cRect.x;
		}
		else{
			this.cRect.y = App.InputHandler.mouseData.y - this.cRect.h/2;
			if(this.cRect.y > this.sliderLine.cRect.y + this.sliderLine.cRect.h)
				this.cRect.y = this.sliderLine.cRect.y + this.sliderLine.cRect.h;
			else if (this.cRect.y < this.sliderLine.cRect.y)
				this.cRect.y = this.sliderLine.cRect.y;
		}
		this.sliderLine.evaluate(this.cRect.x, this.cRect.y);
	}

	//Releases from dragging
	this.clickEnd = function(){
		this.dragged = false;
		this.color = App.GuiTextButton.bg;
		
	}
}

//callback is basically a change listener. Not required.
//The slider line is the "rail" that the button "slides on"
App.GuiSliderLine = function(cRect, min, max, direction, callback, panel){
	this.cRect = cRect;
	this.cRect.positionRelative(panel);
	this.cRect.functional = true; //to allow snap-to-click
	this.color = '#dadada';
	this.direction = direction;
	this.sliderButton;
	this.min = min;
	this.max = max;
	this.callback = callback;
	this.value = 0;

	//Renders the slider line component; the part that the slider slides "on"
	this.render = function(gfx){
		if(!this.sliderButton)
			console.error("Improperly initialized gui slider");
		gfx.fillStyle = this.color;
		gfx.fillRect(this.cRect.x, this.cRect.y, this.cRect.w, this.cRect.h);
	}

	//Evaluates a new value for the slider based on the x,y coordinates of the button
	//Also calls the change listener callback, if there is one.
	this.evaluate = function(x, y){
		var vals = (this.direction === 1)? {v:x, l:this.cRect.x, h:this.cRect.w} :
											{v:y, l:this.cRect.y, h:this.cRect.h};
		vals.v -= vals.l;
		var step = (this.max-this.min)/vals.h;
		vals.v *= step;

		if(this.callback)
			this.callback();
		this.value = vals.v;
	}

	//these redirects allow the user to click on the slider and "snap" the slider button to where they clicked!
	this.clickStart = function(){ this.sliderButton.clickStart(); }
	this.clickEnd = function(){	this.sliderButton.clickEnd(); }

}


//Simple text display. Has a background, some text. Nothing fancy.
App.GuiTextBox = function(cRect, text, panel){
	this.cRect = cRect;
	this.text = text;
	this.cRect.positionRelative(panel);
	this.color = App.GuiTextButton.bg;

	var textX = this.cRect.x + 10;// (this.cRect.w / 2); // for centering text
	var textY = this.cRect.y + (this.cRect.h / 2); // for centering text

	//Draw our text
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

	//Draw the text box, including cursor
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
		if(!this.cRect.collides(x,y)){
			this.color = App.GuiTextButton.bg;
			this.clicked = false;
		}
	}

	//For button-like functionality. Enters edit mode if the click is successful
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

	//Tests if a point is inside of the rectangle
	this.collides = function(x, y){
		return ((x > this.x) && (x < (this.x + this.w)) &&
			   	(y > this.y) && (y < (this.y + this.h)));
	}

	//Positions this component relative to another component, instead of absolute positioning on the screen
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
