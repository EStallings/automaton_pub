App.GuiInstDrag = function(x, y, draw, instruction, panel){
	App.GuiTools.Component.call(this, x, y, 40, 40);
	if(panel) panel.addChild(this);
	this.functional = true;

	this.activeColor = App.GuiInstDrag.active;
	this.inactiveColor = App.GuiInstDrag.inactive;
	this.draw = draw;
	this.instruction = instruction;

	this.renderLayers.pop(); //don't want the default
	this.renderLayers.push(function(gfx){
		gfx.lineWidth = 2;
		App.InstCatalog.render(
			gfx,
			this.instruction,
			this.x, this.y,
			this.color,
			this.guiCollider.w);
	});

	//The drag part of 'drag and drop'
	this.update = function(){
		if(!this.active)
			return;

		this.x = App.InputHandler.mouseX - this.w/2;
		this.x = App.InputHandler.mouseY - this.h/2;
	}

	//The button has been 'dropped'!
	this.clickEnd = function(onGui){
		//prevent dropping instructions behind gui elements
		if(onGui)
			return;

		//place the instruction
		var level =	App.Game.currentPlanningLevel;
		App.Game.screenToGridCoords(x, y);
		var nx = App.Game.mouseX;
		var ny = App.Game.mouseY;
		var c = App.GuiInstDrag.globalColor;
		var t = this.instruction;
		console.log('dragged to ' + nx + ',' + ny);
		level.insert(new App.PlanningInstruction(nx,ny,c,t));
	}

	App.GuiInstDrag.registry.push(this);
}
App.GuiInstDrag.prototype = Object.create(App.GuiTools.Component);
App.GuiInstDrag.prototype.constructor = App.GuiInstDrag;

App.GuiInstDrag.registry = [];
App.GuiInstDrag.globalColor = 0;
App.GuiInstDrag.colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];
App.GuiInstDrag.changeGlobalColor = function(color){
	this.globalColor = color;
	for(var i = 0; i < this.registry.length; i++){
		this.registry[i].activeColor = this.colors[this.globalColor];
		this.registry[i].inactiveColor = this.colors[this.globalColor];
	}
	App.Gui.drawStatic = true;
}

