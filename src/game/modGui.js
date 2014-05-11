App.setupModificationGui = function(){
	var modder = App.ModeHandler.addNewMode('modder');
	var returnFunc = function(){
		modder.requestStaticRenderUpdate = true;
		App.ModeHandler.popMode();
	}

	var changeColor = function(color){
		App.Game.currentPlanningLevel.grid[modder.instruction.x][modder.instruction.y][modder.instruction.color] = null;
		modder.instruction.color = color;
		App.Game.currentPlanningLevel.grid[modder.instruction.x][modder.instruction.y][modder.instruction.color] = modder.instruction;
		App.GameRenderer.requestStaticRenderUpdate = true;
	}

	var bases = [0,4,19,23,27,31];
	var check = function(i, l, h){if (i >= l && i < h) return l; return i};
	var getBase = function(i){
		for(var b in bases)
			i = check(i, bases[b],  bases[b]+4);
		return i;
	}

	var changeDirection = function(direction){
		modder.instruction.type = modder.baseType + direction;
		App.GameRenderer.requestStaticRenderUpdate = true;
	}

	var changeLetter = function(letter){

	}

	var changeFunction = function(fn){

	}

	modder.gfx = App.Canvases.addNewLayer(2).getContext('2d');
	modder.gui = new App.guiFrame(modder.gfx);

	modder.applyButton = new App.GuiTextButton(15,100,200,000,'Apply', returnFunc,false,null,null);
	modder.applyButton.hoverColor = '#af1010';

	modder.colorComps  = []; //for the components that are used for color
	modder.streamComps = []; //for the components used for streams
	modder.dirComps    = []; //for the components used for directional instructions

	modder.colorComps[0] = new App.GuiTools.Button(15+50*0, 150, 30, 30, 0, 0, function(){changeColor(0)}, false, null, null);
	modder.colorComps[0].baseColor = modder.colorComps[0].hoverColor = App.FILL_COLOR[0];
	modder.colorComps[0].doInterp = false;
	modder.colorComps[1] = new App.GuiTools.Button(15+50*1, 150, 30, 30, 0, 0, function(){changeColor(1)}, false, null, null);
	modder.colorComps[1].baseColor = modder.colorComps[1].hoverColor = App.FILL_COLOR[1];
	modder.colorComps[1].doInterp = false;
	modder.colorComps[2] = new App.GuiTools.Button(15+50*2, 150, 30, 30, 0, 0, function(){changeColor(2)}, false, null, null);
	modder.colorComps[2].baseColor = modder.colorComps[2].hoverColor = App.FILL_COLOR[2];
	modder.colorComps[2].doInterp = false;
	modder.colorComps[3] = new App.GuiTools.Button(15+50*3, 150, 30, 30, 0, 0, function(){changeColor(3)}, false, null, null);
	modder.colorComps[3].baseColor = modder.colorComps[3].hoverColor = App.FILL_COLOR[3];
	modder.colorComps[3].doInterp = false;

	modder.dirComps[0] = new App.GuiTools.Button(15+50*0, 200, 30, 30, 0, 0, function(){changeDirection(0)}, false, null, null);
	modder.dirComps[0].render = function(gfx){
		App.InstCatalog.render(
			gfx,
			modder.baseType + 0,
			modder.dirComps[0].getx()-1, modder.dirComps[0].gety()-1,
			modder.instruction.color,
			modder.dirComps[0].w+2,
			modder.dirComps[0].data);
	}
	modder.dirComps[1] = new App.GuiTools.Button(15+50*1, 200, 30, 30, 0, 0, function(){changeDirection(1)}, false, null, null);
	modder.dirComps[1].render = function(gfx){
		App.InstCatalog.render(
			gfx,
			modder.baseType + 1,
			modder.dirComps[1].getx()-1, modder.dirComps[1].gety()-1,
			modder.instruction.color,
			modder.dirComps[1].w+2,
			modder.dirComps[1].data);
	}
	modder.dirComps[2] = new App.GuiTools.Button(15+50*2, 200, 30, 30, 0, 0, function(){changeDirection(2)}, false, null, null);
	modder.dirComps[2].render = function(gfx){
		App.InstCatalog.render(
			gfx,
			modder.baseType + 2,
			modder.dirComps[2].getx()-1, modder.dirComps[2].gety()-1,
			modder.instruction.color,
			modder.dirComps[2].w+2,
			modder.dirComps[2].data);
	}
	modder.dirComps[3] = new App.GuiTools.Button(15+50*3, 200, 30, 30, 0, 0, function(){changeDirection(3)}, false, null, null);
	modder.dirComps[3].render = function(gfx){
		App.InstCatalog.render(
			gfx,
			modder.baseType + 3,
			modder.dirComps[3].getx()-1, modder.dirComps[3].gety()-1,
			modder.instruction.color,
			modder.dirComps[3].w+2,
			modder.dirComps[3].data);
	}



	modder.gui.addComponent(modder.applyButton);
	modder.alpha = modder.goalAlpha = 0;
	modder.callback = null;
	modder.instruction = null;
	modder.baseType = 0;
	for(var c in modder.colorComps){
		modder.gui.addComponent(modder.colorComps[c]);
	}

		// ---------------------------------------------
	modder.init = function(instruction){
		modder.instruction = instruction;
		modder.baseType = getBase(instruction.type);
		var f = false;
		for(var b in bases) if(instruction.type === bases[b]) f = true;
		if(modder.baseType !== modder.instruction.type || f){
			for(var c in modder.dirComps)
				modder.gui.addComponent(modder.dirComps[c]);
		}
		else{
			for(var c in modder.dirComps)
				modder.gui.removeComponent(modder.dirComps[c]);
		}
	}

	modder.enterFunc = function(){
		modder.requestStaticRenderUpdate = true;
		modder.updatingActive = true;
		modder.exitFlag = false;
		modder.gui.enter();
		modder.goalAlpha = 1;

		App.Shade.turnOn();
	}

	modder.updateFunc = function(){
		if(modder.gui.update())
			modder.requestStaticRenderUpdate = true;

		if(!modder.requestStaticRenderUpdate)return;
		modder.requestStaticRenderUpdate = false;

		modder.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

		modder.gfx.fillStyle = '#fff';
		text(modder.gfx,"Edit Instruction",15,15,36,-3);

		if(modder.gui.render())
			modder.requestStaticRenderUpdate = true;

		if(modder.alpha !== modder.goalAlpha){
			modder.alpha += expInterp(modder.alpha,modder.goalAlpha,0.003,0.01);
			modder.gfx.globalAlpha = modder.alpha;
			modder.requestStaticRenderUpdate = true;
		}

		if(modder.exitFlag && modder.requestStaticRenderUpdate === false){
			modder.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
			modder.updatingActive = false;
		}
	}

	modder.exitFunc = function(){
		modder.requestStaticRenderUpdate = true;
		modder.exitFlag = true;

		modder.gui.exit();
		modder.goalAlpha = 0;
	}

	modder.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.LEFT, modder.gui.mouseDown);
	modder.registerMouseUpFunc(App.InputHandler.MOUSEBUTTON.LEFT, modder.gui.mouseUp);

	modder.registerResizeFunc(function(){
		App.GameRenderer.bestFit();
	});
}