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
App.GuiTextButton = function(x, y, text, callback, continuous, panel){
	this.guiCollider = new App.GuiCollisionRect(x, y, App.GuiTextButton.width, App.GuiTextButton.height);
	this.text = text;
	this.callback = callback;
	this.guiCollider.positionRelative(panel);
	this.guiCollider.functional = true;
	this.color = App.GuiTextButton.bg;
	this.continuous = continuous;
	this.clicked = false;

	var textX = this.guiCollider.x + (this.guiCollider.w / 2); // for centering text
	var textY = this.guiCollider.y + (this.guiCollider.h / 2); // for centering text

	//For continuous callbacks
	this.update = function(){
		if(this.clicked && this.continuous)
			this.callback();
	}

	//Draws a box and the text! Nothing fancy. Could use some work maybe.
	this.render = function(gfx){
		gfx.fillStyle = this.color;
		gfx.fillRect(this.guiCollider.x, this.guiCollider.y, this.guiCollider.w, this.guiCollider.h);
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
		if(!this.guiCollider.collides(x,y)){
			this.color = App.GuiTextButton.bg;
			this.clicked = false;
		}
	}

	//If the click was successful, fire the callback
	this.clickEnd = function(x, y){
		this.color = App.GuiTextButton.bg;
		if(!this.guiCollider.collides(x,y))
			return;
		if(this.callback && this.clicked)
			this.callback();
		this.clicked = false;
	}
}
App.GuiTextButton.bg = '#1f1f1f';
App.GuiTextButton.fg = '#ffffff';
App.GuiTextButton.width = 100;
App.GuiTextButton.height = 30;

//A relatively simple button. Click and release on top of it to fire a callback.
//with 'continuous' as true, it will keep firing every frame.
App.GuiDropDownMenu = function(guiCollider, text, callback, continuous, panel){
	// TODO
}



//TODO: Cameron, we need designs. Basically the same as above, just a different render method.
//SHOULD abstract some stuff out but for now...
App.GuiVectorButton = function(guiCollider, draw, callback, continuous, panel){
	this.guiCollider = guiCollider;
	this.guiCollider.positionRelative(panel);
}



//A backgound panel. You can add things to these to organize your components for
//relative positioning and rapid gui alterations.
App.GuiPanel = function(guiCollider){
	this.guiCollider = guiCollider;

	this.render = function(gfx){
		gfx.fillStyle = App.GuiPanel.rgba;
		gfx.fillRect(this.guiCollider.x, this.guiCollider.y, this.guiCollider.w, this.guiCollider.h);
	}
}
App.GuiPanel.rgba = 'rgba(180, 180, 180, 0.1)';


//Positions this component relative to another component, instead of absolute positioning on the screen
var positionRelative = function(component){
	if(!component)
		return;
	if(!component.guiCollider)
		return;
	var r = component.guiCollider;

	this.x += r.x;
	this.y += r.y;
}

App.GuiCollisionCircle = function(x, y, r){
	this.x = x;
	this.y = y;
	this.r = r;
	this.functional = false;

	this.collides = function(x, y){
		return (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y) <= this.r * this.r;
	}

	this.positionRelative = positionRelative;
}

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

	this.positionRelative = positionRelative;
}


