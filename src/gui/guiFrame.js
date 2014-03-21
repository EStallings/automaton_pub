
/*Creates a Gui object that:
1. tracks 'frames', i.e. menus and gameplay UI interfaces, implemented as arrays of components
2. allows adding a new frame (creates an empty array)
3. allows adding components to frames
4. allows switching between frames
5. updates components in current frame that have an update method
6. renders components in current frame that have a render method (all should)

*/
App.makeGUI = function(){
	var gui = {};
	gui.staticCanvas = App.Canvases.addNewLayer("GUI_Static",0);
	gui.staticGfx = gui.staticCanvas.getContext('2d');

	//Only used to draw the currently active component
	//if this is bad, we can change it.
	gui.dynamicCanvas = App.Canvases.addNewLayer("GUI_Dynamic",0);
	gui.dynamicGfx = gui.dynamicCanvas.getContext('2d');

	gui.frames = [];
	gui.currentFrame;
	gui.activeComponent = null;
	//gets reset after one frame.
	gui.drawStatic = false;

	gui.addNewFrame = function(framekey){
		if(this.frames[framekey]){
			console.error("tried to bind two frames to a single key: " + framekey);
			return;
		}
		this.frames[framekey] = [];

		if(!this.currentFrame)
			this.currentFrame = this.frames[framekey];
	}

	gui.setCurrentFrame = function(framekey){
		this.currentFrame = (this.frames[framekey]) ? this.frames[framekey] : this.currentFrame;
		this.activeComponent = null;
		this.ensurePositions();
	}

	gui.addNewComponent = function(framekey, component){
		if(!this.frames[framekey])
			console.error("cannot add a component to nonexistent frame: " + framekey);
		this.frames[framekey].push(component);
		if(this.frames[framekey] == this.currentFrame)
			this.drawStatic = true;
	}


	gui.update = function(){
		for(var c in this.currentFrame)if(this.currentFrame[c].update)
			this.currentFrame[c].update();
	}

	gui.ensurePositions = function(){
		this.drawStatic = true;
		for(var c in this.currentFrame) if(this.currentFrame[c].updatePosition)
			this.currentFrame[c].updatePosition();
	}

	gui.render = function(){
		this.dynamicGfx.clearRect(0,0,App.Canvases.width, App.Canvases.height);
		if(this.drawStatic)
			this.staticGfx.clearRect(0,0,App.Canvases.width, App.Canvases.height);

		for(var c in this.currentFrame){
			if(this.currentFrame[c].render){
				if(this.currentFrame[c] === this.activeComponent)
					this.currentFrame[c].render(this.dynamicGfx);
				else if(this.drawStatic)
					this.currentFrame[c].render(this.staticGfx);
			}
		}

		this.drawStatic = false;
	}

	return gui;
}

