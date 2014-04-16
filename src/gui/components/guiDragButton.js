

//TODO requires some special logic
//note that the instruction dragging is the only drag and drop, so let's cut
//out the middleman and just hardcode that part
App.GuiDragButton = function(x, y, draw, instruction, panel){
	this.guiCollider = new App.GuiCollisionRect(x, y, 24, 24);
	if(panel) panel.addChild(this);
	this.guiCollider.functional = true;

	this.currentX = this.guiCollider.getx();
	this.currentY = this.guiCollider.gety();
	this.activeColor = App.GuiDragButton.active;
	this.inactiveColor = App.GuiDragButton.inactive;
	this.dragged = false;
	this.draw = draw;
	this.instruction = instruction;

	//Draws a simple box for now - once we have some vector draw functions,
	//we'll be able to draw them on it!
	this.render = function(gfx){
		// gfx.fillStyle = (this.dragged)? this.activeColor : this.inactiveColor;
		// gfx.fillRect(this.currentX, this.currentY, this.guiCollider.w, this.guiCollider.h);
		gfx.lineWidth = 2;
		App.InstCatalog.render(
			gfx,
			this.instruction,
			this.currentX, this.currentY,
			App.GuiDragButton.globalColor,
			this.guiCollider.w);

	}

	//Initiating the dragging
	this.clickStart = function(){
		this.dragged = true;
	}

	this.windowupdate = function(){
		this.currentX = this.guiCollider.getx();
		this.currentY = this.guiCollider.gety();
	}

	//The drag part of 'drag and drop'
	this.update = function(){
		if(!this.dragged)
			return;
		this.currentX = App.InputHandler.mouseData.x - this.guiCollider.w/2;
		this.currentY = App.InputHandler.mouseData.y - this.guiCollider.h/2;
	}

	//The button has been 'dropped'!
	this.clickEnd = function(x, y){
		this.dragged = false;
		this.currentX = this.guiCollider.getx();
		this.currentY = this.guiCollider.gety();

		//prevent dropping instructions behind gui elements
		if(App.Gui.testCoordinates(x,y) !== null)
			return;

		//place the instruction
		var level =	App.Game.currentPlanningLevel;
		App.Game.screenToGridCoords(x, y);
		var nx = App.Game.mouseX;
		var ny = App.Game.mouseY;
		var c = App.GuiDragButton.globalColor;
		var t = this.instruction;
		console.log('dragged to ' + nx + ',' + ny);
		level.insert(new App.PlanningInstruction(nx,ny,c,t));
	}

	App.GuiDragButton.registry.push(this);
}

App.GuiDragButton.registry = [];
App.GuiDragButton.globalColor = 0;
App.GuiDragButton.inactive = App.GuiColors.inactive[App.GuiDragButton.globalColor];
App.GuiDragButton.active = App.GuiColors.active[App.GuiDragButton.globalColor];
App.GuiDragButton.changeGlobalColor = function(color){
	this.globalColor = color;
	this.inactive = App.GuiColors.inactive[color];
	this.active = App.GuiColors.active[color];
	for(var i = 0; i < this.registry.length; i++){
		this.registry[i].activeColor = this.active;
		this.registry[i].inactiveColor = this.inactive;
	}
	App.Gui.drawStatic = true;

}

