App.GuiInstDrag = function(x, y, delay, instruction, dirsens, xorigin, yorigin, gui, pos){
	App.GuiTools.Drag.call(this, x, y, 48, 48, delay, delay, xorigin, yorigin);
	this.functional = true;
	this.gui = gui;
	this.pos = pos;

	//if this is direction-sensitive
	this.dirsens = dirsens;

	this.instruction     = instruction;
	this.baseInstruction = instruction;

	var that = this;

	delete(this.renderLayers['Drag']);
	this.renderLayers['Inst'] = function(gfx){
		gfx.lineWidth = 2;

		var interp = (that.interpmode === 'exit') ?
		that.w - (that.getleft() - that.getx()) :
		that.getright() - that.getx();

		var dx = (interp * that.pos + (that.getx() - that.x) +that.w/2);
		if(that.overridepos)
			dx = that.getx() - that.w/2;

		App.InstCatalog.render(
			gfx,
			that.instruction,
			dx, that.gety()-that.h/2,
			App.GuiInstDrag.globalColor,
			that.w);
	}

	this.subClickStart = function(){};

	//The drag part of 'drag and drop'
	this.subUpdate = function(){
		if(!this.active)
			return;

		this.x = App.InputHandler.mouseX - this.w/2;
		this.x = App.InputHandler.mouseY - this.h/2;
	}

	//The button has been 'dropped'!
	this.subClickEnd = function(){
		//prevent dropping instructions behind gui elements
		//check upper left
		var c = this.gui.testCoordinates(this.getx()-this.w/2, this.gety()-this.h/2);
		if(c.f.length > 0 || c.p.length > 0) return;
		//bottom left
		c = this.gui.testCoordinates(this.getx()-this.w/2, this.gety()+this.h/2);
		if(c.f.length > 0 || c.p.length > 0) return;
		//upper right
		c = this.gui.testCoordinates(this.getx()+this.w/2, this.gety()-this.h/2);
		if(c.f.length > 0 || c.p.length > 0) return;
		//lower right
		c = this.gui.testCoordinates(this.getx()+this.w/2, this.gety()+this.h/2);
		if(c.f.length > 0 || c.p.length > 0) return;

		//place the instruction
		App.GameRenderer.screenToGridCoords(this.getx(), this.gety());
		App.GameRenderer.requestStaticRenderUpdate = true;
		var nx = App.GameRenderer.mouseX;
		var ny = App.GameRenderer.mouseY;
		var c = App.GuiInstDrag.globalColor;

		//TODO make instructino update based on direction if applicable
		var t = this.instruction;
		console.log('dragged to ' + nx + ',' + ny);
		App.Game.currentPlanningLevel.insert(new App.PlanningInstruction(nx,ny,c,t));
	}

	App.GuiInstDrag.registry.push(this);
}
App.GuiInstDrag.prototype = Object.create(App.GuiTools.Drag);
App.GuiInstDrag.prototype.constructor = App.GuiInstDrag;

App.GuiInstDrag.registry = [];
App.GuiInstDrag.globalColor = 0;
App.GuiInstDrag.colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];
App.GuiInstDrag.direction = 0;
App.GuiInstDrag.changeGlobalColor = function(color){
	this.globalColor = color;
	for(var i = 0; i < this.registry.length; i++){
		this.registry[i].activeColor = this.colors[this.globalColor];
		this.registry[i].inactiveColor = this.colors[this.globalColor];
	}
}

App.GuiInstDrag.changeDirection = function(dir){
	this.direction = dir;
	for(var i = 0; i < this.registry.length; i++){
		if(this.registry[i].dirsens)
			this.registry[i].instruction = this.registry[i].baseInstruction + dir;
	}
}

