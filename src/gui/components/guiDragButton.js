App.GuiInstDrag = function(x, y, instruction, panel){
	App.GuiTools.Drag.call(this, x, y, 40, 40, 200, 200, panel);
	this.functional = true;
	
	this.instruction = instruction;

	var that = this;

	delete(this.renderLayers['Drag']);
	this.renderLayers['Inst'] = function(gfx){
		gfx.lineWidth = 2;
		App.InstCatalog.render(
			gfx,
			that.instruction,
			that.x-that.w/2, that.y-that.h/2,
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
	this.subClickEnd = function(onGui){
		//prevent dropping instructions behind gui elements
		if(onGui)
			return;

		//place the instruction
		App.GameRenderer.screenToGridCoords(this.x, this.y);
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

