
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
	gui.canvas = App.Canvases.addNewLayer("GUI",0);
	gui.gfx = gui.canvas.getContext('2d');

	gui.frames = [];
	gui.currentFrame;
	gui.activeComponent = null;

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
		this.currentFrame = (this.frames[key]) ? this.frames[key] : this.currentFrame;
		this.activeComponent = null;
	}

	gui.addNewComponent = function(framekey, component){
		if(!this.frames[framekey])
			console.error("cannot add a component to nonexistent frame: " + framekey);
		this.frames[framekey].push(component);
	}


	gui.update = function(){
		for(var c in this.currentFrame)if(this.currentFrame[c].update)
			this.currentFrame[c].update();
	}

	gui.render = function(){
		this.gfx.clearRect(0,0,App.Canvases.width, App.Canvases.height);

		for(var c in this.currentFrame) if(this.currentFrame[c].render)
			this.currentFrame[c].render(this.gfx);
	}

	return gui;
}

