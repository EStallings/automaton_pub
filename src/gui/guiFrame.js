
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
	gui.staticCanvas = App.Canvases.addNewLayer('GUI_Static',0);
	gui.staticGfx = gui.staticCanvas.getContext('2d');

	//Only used to draw the currently active component
	//if this is bad, we can change it.
	gui.dynamicCanvas = App.Canvases.addNewLayer('GUI_Dynamic',0);
	gui.dynamicGfx = gui.dynamicCanvas.getContext('2d');

	gui.frames = [];
	gui.currentFrame;
	gui.activeComponent = null;
	//gets reset after one frame.
	gui.drawStatic = false;

	gui.dialogCanvas = App.Canvases.addNewLayer('GUI_Dialog',0);
	gui.dialogGfx = gui.dialogCanvas.getContext('2d');
	gui.dialogClear = false;
	//We might want to draw multiple dialogs at a time...
	gui.dialogs = [];
	//dialogs block other gui inputs and the game (and other dialogs) from receiving any input
	//for simplicity, they are rendered on their own canvas, and are themselves essentially 'frames'
	gui.startDialog = function(dialog){
		this.dialogs.push(dialog);
		this.dialogClear = true;
	}

	gui.endDialog = function(){
		this.dialogs.pop();
	}

	gui.isDialogDrawing = function(){
		return this.dialogs.length !== 0;
	}

	gui.getActiveDialog = function(){
		if(this.isDialogDrawing())
			return this.dialogs[this.dialogs.length - 1];
		return null;
	}

	gui.addNewFrame = function(framekey){
		if(this.frames[framekey]){
			console.error('tried to bind two frames to a single key: ' + framekey);
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
			console.error('cannot add a component to nonexistent frame: ' + framekey);
		this.frames[framekey].push(component);
		if(this.frames[framekey] == this.currentFrame)
			this.drawStatic = true;
	}

	gui.testCoordinates = function(x,y){

		if(this.isDialogDrawing()){
			var dRet = null;
			for(var d in this.dialogs){
				for(var c in this.dialogs[d]){
					if(this.dialogs[d][c].guiCollider && this.dialogs[d][c].guiCollider.collides(x, y)){
						if(this.dialogs[d][c].guiCollider.functional){
							return this.dialogs[d][c];
						}
						else dRet = this.currentFrame[c];
					}
				}
			}
			if(dRet !== null)
				return dRet;
		}

		var ret = null;
		for(var c in this.currentFrame){
			if(this.currentFrame[c].guiCollider && this.currentFrame[c].guiCollider.collides(x, y)){
					if(this.currentFrame[c].guiCollider.functional){
						ret = this.currentFrame[c];
						return ret;
					}
					else ret = this.currentFrame[c];

			}
		}
		return ret;
	}

	gui.update = function(){
		for(var c in this.currentFrame)if(this.currentFrame[c].update)
			this.currentFrame[c].update();
	}

	gui.ensurePositions = function(){
		this.drawStatic = true;
		for(var c in this.currentFrame) if(this.currentFrame[c].updatePosition)
			this.currentFrame[c].updatePosition();
		for(var c in this.currentFrame) if(this.currentFrame[c].windowupdate)
			this.currentFrame[c].windowupdate();
	}

	gui.render = function(){
		if(this.dialogClear){
			this.dialogGfx.clearRect(0,0,App.Canvases.width, App.Canvases.height);
			if(this.isDialogDrawing()){
				for(var d in this.dialogs){
					for(var c in this.dialogs[d]){
						this.dialogs[d][c].render(this.dialogGfx);
					}
				}
			}
			else this.dialogClear = false;
		}

		this.dynamicGfx.clearRect(0,0,App.Canvases.width, App.Canvases.height);

		if(this.drawStatic){
			this.staticGfx.clearRect(0,0,App.Canvases.width, App.Canvases.height);
		}

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

