

// TODO: WRITE THIS ========================================================= //

App.makeGUI = function(){
	var gui = {};
	gui.canvas = App.Canvases.addNewLayer("GUI",0);
	gui.gfx = gui.canvas.getContext('2d');

	gui.frames = [];
	gui.currentFrame;

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

// ========================================================================== //


	// =========================================================== //
	// = EVERYTHING BELOW IS TEMP, THE ABOVE NEEDS TO BE WRITTEN = //
	// =========================================================== //





App.Button = function(menuName,x,y,width,height,text,callback){
	App.Menus[menuName].components.push(this);

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.callback = callback;
	this.gfx = App.GuiCanvas.getContext("2d");

	var textX = this.x + (this.width / 2); // for centering text
	var textY = this.y + (this.height / 2); // for centering text

	this.render = function(){
		this.gfx.fillStyle = "rgb(0,0,0)";
		this.gfx.fillRect(this.x,this.y,this.width,this.height);
		this.gfx.fillStyle = "rgb(255,255,255)";
		// this.gfx.textAlign = 'center';
		// this.gfx.fillText(this.text, textX, textY)
		this.gfx.fillText(this.text, this.x + 5, this.y + 20);
		this.gfx.strokeStyle = "rgb(255,255,255)";
		this.gfx.strokeRect(this.x,this.y,this.width,this.height);
	}
}