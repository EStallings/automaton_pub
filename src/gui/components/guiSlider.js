App.GuiSlider = function(x, y, length, min, max, panel){
	App.GuiTools.CollisionRect.call(this, x, y, length, 25, panel);
	this.min = min;
	this.max = max;
	this.value = this.min;

	this.renderLayers.pop();
	this.renderLayers.push(function(gfx){
		gfx.fillStyle = '#f0f0f0';
		gfx.fillRect(this.px, this.py, this.w, this.h);
		gfx.fillStyle = this.textColor;
		gfx.fillText(this.px, this.py, this.min);
		gfx.fillText(this.px + this.w, this.py, this.max);
	}

	this.renderLayers.push(function(gfx){
		gfx.fillStyle = this.color;
		gfx.fillRect(this.x, this.y, 25, 25);
		gfx.fillStyle = this.textColor;
		gfx.fillText(this.x, this.y, this.value);
	}


}


/* BIG NOTE
	This and the sliderLine below it are currently twinned - each requires the other.
	However, I haven't made a nice function for just making a slider, button and line included, just yet.
	This is because each has to be stored separately inside the gui frame
	in order for collisions with the guiCollider to be dealt with properly. The probable solution
	will be to just make a function that makes both, adds both to the frame,
	and updates their references to each other.
*/
App.GuiSliderButton = function(guiCollider, panel){
	this.guiCollider = guiCollider;
	if(panel) panel.addChild(this);
	this.guiCollider.functional = true;
	this.activeColor = App.GuiColors.gray[4];
	this.inactiveColor = App.GuiColors.gray[6];
	this.color = this.inactiveColor;
	this.sliderLine;
	this.dragged = false;

	//Renders just the button portion of the slider (the box)
	this.render = function(gfx){
		if(!this.sliderLine)
			console.error('Improperly initialized gui slider');
		gfx.fillStyle = this.color;
		gfx.fillRect(this.guiCollider.getx(), this.guiCollider.gety(), 10, 10);

		gfx.fillStyle = App.GuiColors.gray[6];

		// gfx.fillText(Math.floor(this.sliderLine.value), textX, this.guiCollider.gety() + this.guiCollider.h/2);
	}

	//Begins the dragging of the slider
	this.clickStart = function(){
		this.dragged = true;
	}

	//Ugly code in here, needs cleanup.
	//What this does is move relative to the mouse, while snapping to the
	//axis of the slider line (IE only moving on X or Y)
	//and also ensures that it doesn't move outside of the bounds of the line
	//(IE past the max and min)
	//It also calls the sliderLine.evaluate function, which in turn calls any
	//change listener callback.
	this.update = function(){
		if(!this.dragged)
			return;
		if(this.sliderLine.direction === 1){
			this.guiCollider.x = App.InputHandler.mouseData.getx() - this.guiCollider.w/2;
			if(this.guiCollider.getx() > this.sliderLine.guiCollider.getx() + this.sliderLine.guiCollider.w)
				this.guiCollider.x = this.sliderLine.guiCollider.getx() + this.sliderLine.guiCollider.w;
			else if (this.guiCollider.getx() < this.sliderLine.guiCollider.x)
				this.guiCollider.x = this.sliderLine.guiCollider.getx();
		}
		else{
			this.guiCollider.y = App.InputHandler.mouseData.y - this.guiCollider.h/2;
			if(this.guiCollider.gety() > this.sliderLine.guiCollider.gety() + this.sliderLine.guiCollider.h)
				this.guiCollider.y = this.sliderLine.guiCollider.gety() + this.sliderLine.guiCollider.h;
			else if (this.guiCollider.gety() < this.sliderLine.guiCollider.gety())
				this.guiCollider.y = this.sliderLine.guiCollider.gety();
		}
		this.sliderLine.evaluate(this.guiCollider.getx(), this.guiCollider.gety());
	}

	//Releases from dragging
	this.clickEnd = function(){
		this.dragged = false;

	}
}

//callback is basically a change listener. Not required.
//The slider line is the 'rail' that the button 'slides on'
App.GuiSliderLine = function(guiCollider, min, max, direction, callback, panel){
	this.guiCollider = guiCollider;
	if(panel) panel.addChild(this);
	this.guiCollider.functional = true; //to allow snap-to-click
	this.color = App.GuiColors.gray[2];
	this.direction = direction;
	this.sliderButton;
	this.min = min;
	this.max = max;
	this.callback = callback;
	this.value = 0;

	//Renders the slider line component; the part that the slider slides 'on'
	this.render = function(gfx){
		if(!this.sliderButton)
			console.error('Improperly initialized gui slider');
		gfx.fillStyle = this.color;
		gfx.fillRect(this.guiCollider.getx(), this.guiCollider.gety(), this.guiCollider.w, this.guiCollider.h);
	}

	//Evaluates a new value for the slider based on the x,y coordinates of the button
	//Also calls the change listener callback, if there is one.
	this.evaluate = function(x, y){
		var vals = (this.direction === 1) ? { v : x, l : this.guiCollider.getx(), h : this.guiCollider.w } :
						{v : y, l : this.guiCollider.gety(), h : this.guiCollider.h};
		vals.v -= vals.l;
		var step = (this.max-this.min)/vals.h;
		vals.v *= step;

		if(this.callback)
			this.callback(vals.v);
		this.value = vals.v;
	}

	//this redirect allows the user to click on the slider and 'snap' the slider button to where they clicked!
	this.clickStart = function(){
		App.Gui.activeComponent = this.sliderButton;
		this.sliderButton.clickStart();
	}

}