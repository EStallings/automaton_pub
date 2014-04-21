App.setupPlanGui = function(){
	var planMode = App.ModeHandler.addNewMode('planning');

		// ---------------------------------------------

	planMode.gfx = App.Canvases.addNewLayer(2).getContext('2d');
	planMode.gui = new App.guiFrame(planMode.gfx);

	planMode.joystick = new App.GuiJoystick(100, 500, 50, 100, null);

	planMode.topRow = [];

	planMode.topRow[0]  = new App.GuiLockButton(48*-7+2, -38, 800,  0,        'center', 'bottom',               -8);
	planMode.topRow[1]  = new App.GuiLockButton(48*-6+2, -38, 700,  1,        'center', 'bottom',               -7);
	planMode.topRow[2]  = new App.GuiLockButton(48*-5+2, -38, 600,  2,        'center', 'bottom',               -6);
	planMode.topRow[3]  = new App.GuiLockButton(48*-4+2, -38, 500,  3,        'center', 'bottom',               -5);
	planMode.topRow[4]  = new App.GuiInstDrag  (48*-3+2, -38, 400,  0, true , 'center', 'bottom', planMode.gui, -4);
	planMode.topRow[5]  = new App.GuiInstDrag  (48*-2+2, -38, 300,  4, false, 'center', 'bottom', planMode.gui, -3);
	planMode.topRow[6]  = new App.GuiInstDrag  (48*-1+2, -38, 200, 12, false, 'center', 'bottom', planMode.gui, -2);
	planMode.topRow[7]  = new App.GuiInstDrag  (48* 0+2, -38, 100, 27, true , 'center', 'bottom', planMode.gui, -1);
	planMode.topRow[8]  = new App.GuiInstDrag  (48* 1+2, -38, 000, 31, true , 'center', 'bottom', planMode.gui,  0);
	planMode.topRow[9]  = new App.GuiInstDrag  (48* 2+2, -38, 100, 16, false, 'center', 'bottom', planMode.gui,  1);
	planMode.topRow[10] = new App.GuiInstDrag  (48* 3+2, -38, 200, 13, false, 'center', 'bottom', planMode.gui,  2);
	planMode.topRow[11] = new App.GuiInstDrag  (48* 4+2, -38, 300, 15, false, 'center', 'bottom', planMode.gui,  3);
	planMode.topRow[12] = new App.GuiInstDrag  (48* 5+2, -38, 400,  8, false, 'center', 'bottom', planMode.gui,  4);


	planMode.botRow = [];
	planMode.botRow[0]  = new App.GuiToggButton(48*-7+2, 16, 800,  0,        'center', 'bottom',               -8);
	planMode.botRow[1]  = new App.GuiToggButton(48*-6+2, 16, 700,  1,        'center', 'bottom',               -7);
	planMode.botRow[2]  = new App.GuiToggButton(48*-5+2, 16, 600,  2,        'center', 'bottom',               -6);
	planMode.botRow[3]  = new App.GuiToggButton(48*-4+2, 16, 500,  3,        'center', 'bottom',               -5);
	planMode.botRow[4]  = new App.GuiInstDrag  (48*-3+2, 16, 450,  7, false, 'center', 'bottom', planMode.gui, -4);
	planMode.botRow[5]  = new App.GuiInstDrag  (48*-2+2, 16, 350,  6, false, 'center', 'bottom', planMode.gui, -3);
	planMode.botRow[6]  = new App.GuiInstDrag  (48*-1+2, 16, 250,  5, false, 'center', 'bottom', planMode.gui, -2);
	planMode.botRow[7]  = new App.GuiInstDrag  (48* 0+2, 16, 150, 23, true , 'center', 'bottom', planMode.gui, -1);
	planMode.botRow[8]  = new App.GuiInstDrag  (48* 1+2, 16, 050, 19, true , 'center', 'bottom', planMode.gui,  0);
	planMode.botRow[9]  = new App.GuiInstDrag  (48* 2+2, 16, 150, 17, false, 'center', 'bottom', planMode.gui,  1);
	planMode.botRow[10] = new App.GuiInstDrag  (48* 3+2, 16, 250, 14, false, 'center', 'bottom', planMode.gui,  2);
	planMode.botRow[11] = new App.GuiInstDrag  (48* 4+2, 16, 350, 18, false, 'center', 'bottom', planMode.gui,  3);
	planMode.botRow[12] = new App.GuiInstDrag  (48* 5+2, 16, 450,  9, false, 'center', 'bottom', planMode.gui,  4);

	planMode.instPanel = new App.GuiTools.Component(0,0,500,116,0,0,null,'bottom');
	planMode.instPanel.render = function(gfx){
		gfx.fillStyle = 'rgba(0,0,0,0.8)';
		gfx.fillRect(planMode.instPanel.getx(), planMode.instPanel.gety(), App.Canvases.width, planMode.instPanel.h);
	}



	planMode.gui.addComponent(planMode.instPanel);
	for(var c in planMode.topRow) planMode.gui.addComponent(planMode.topRow[c]);
	for(var c in planMode.botRow) planMode.gui.addComponent(planMode.botRow[c]);

	planMode.gui.addComponent(planMode.joystick);

	planMode.direction = App.DIRECTIONS.UP;
	planMode.color = App.COLORS.RED;

	planMode.selectStart = undefined;
	planMode.moveStart = undefined;
	planMode.alpha = planMode.goalAlpha = 0;

		// ---------------------------------------------

	planMode.enterFunc = function(){
		planMode.requestStaticRenderUpdate = true;
		planMode.updatingActive = true;
		planMode.exitFlag = false;
		planMode.goalAlpha = 1;

		planMode.gui.enter();

		App.Game.setMode(App.Game.modes.PLANNING);
		App.GuiInstDrag.changeDirection(App.DIRECTIONS.UP);
		App.Shade.turnOff();
	}

	planMode.updateFunc = function(){
		if(planMode.gui.update())
			planMode.requestStaticRenderUpdate = true;

		if(!planMode.requestStaticRenderUpdate)return;
		planMode.requestStaticRenderUpdate = false;

		planMode.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

		if(planMode.gui.render())
			planMode.requestStaticRenderUpdate = true;

		if(planMode.alpha !== planMode.goalAlpha){
			planMode.alpha += expInterp(planMode.alpha,planMode.goalAlpha,0.005,0.01);
			planMode.gfx.globalAlpha = planMode.alpha;
			planMode.requestStaticRenderUpdate = true;
		}

	// TOP BAR -----------------------------------------------------

		var keys = Object.keys(App.Game.inStreams);
		for(var i in keys){
			var key = keys[i];
			var stream = App.Game.inStreams[key];
			switch(stream[4]){
				case App.COLORS.RED:    planMode.gfx.fillStyle = 'rgba(255,0,0,0.2)';break;
				case App.COLORS.GREEN:  planMode.gfx.fillStyle = 'rgba(0,255,0,0.2)';break;
				case App.COLORS.BLUE:   planMode.gfx.fillStyle = 'rgba(0,0,255,0.2)';break;
				case App.COLORS.YELLOW: planMode.gfx.fillStyle = 'rgba(255,255,0,0.2)';break;
			}planMode.gfx.fillRect(5+i*100,5,98,63);
			App.InstCatalog.render(planMode.gfx,8,5+i*100,5,stream[4],48,key);
			App.renderToken(planMode.gfx,55+i*100,5,''/*,stream[2][stream[3]]*/,48);
			planMode.gfx.fillStyle = '#ffffff';
			text(planMode.gfx,'gives '+stream[0],10+i*100,55,8,-1);
		}

		var keys = Object.keys(App.Game.outStreams);
		for(var i in keys){
			var key = keys[i];
			var stream = App.Game.outStreams[key];
			switch(stream[6]){
				case App.COLORS.RED:    planMode.gfx.fillStyle = 'rgba(255,0,0,0.2)';break;
				case App.COLORS.GREEN:  planMode.gfx.fillStyle = 'rgba(0,255,0,0.2)';break;
				case App.COLORS.BLUE:   planMode.gfx.fillStyle = 'rgba(0,0,255,0.2)';break;
				case App.COLORS.YELLOW: planMode.gfx.fillStyle = 'rgba(255,255,0,0.2)';break;
			}planMode.gfx.fillRect(5+i*100,70,98,63);
			App.InstCatalog.render(planMode.gfx,8,5+i*100,70,stream[6],48,key);
			App.renderToken(planMode.gfx,55+i*100,70,''/*,stream[2][stream[3]]*/,48);
			planMode.gfx.fillStyle = '#ffffff';
			text(planMode.gfx,'accepts '+stream[0],10+i*100,120,8,-1);
		}

	// BOTTOM BAR --------------------------------------------------

		var xOffset = Math.floor((App.Canvases.width-50*8)/2)+1;
		var yOffset = App.Canvases.height-100-2-5;

		planMode.gfx.fillStyle = 'rgba(0,0,0,0.8)';
		//planMode.gfx.fillRect(xOffset-5,yOffset-5,50*8-2+10,100-2+10);
/*
		var x=0;
		App.InstCatalog.render(planMode.gfx, 0+planMode.direction,xOffset+x++*50,yOffset,planMode.color,48);
		App.InstCatalog.render(planMode.gfx, 4,xOffset+x++*50,yOffset,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,12,xOffset+x++*50,yOffset,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,15,xOffset+x++*50,yOffset,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,13,xOffset+x++*50,yOffset,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,18+planMode.direction,xOffset+x++*50,yOffset,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,26+planMode.direction,xOffset+x++*50,yOffset,planMode.color,48);
		App.InstCatalog.render(planMode.gfx, 8,xOffset+x++*50,yOffset,planMode.color,48,'I');

		var x=0;
		App.InstCatalog.render(planMode.gfx, 7,xOffset+x++*50,yOffset+50,planMode.color,48);
		App.InstCatalog.render(planMode.gfx, 6,xOffset+x++*50,yOffset+50,planMode.color,48);
		App.InstCatalog.render(planMode.gfx, 5,xOffset+x++*50,yOffset+50,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,16,xOffset+x++*50,yOffset+50,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,14,xOffset+x++*50,yOffset+50,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,22+planMode.direction,xOffset+x++*50,yOffset+50,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,17,xOffset+x++*50,yOffset+50,planMode.color,48);
		App.InstCatalog.render(planMode.gfx, 9,xOffset+x++*50,yOffset+50,planMode.color,48,'O');
*/
		if(planMode.exitFlag && planMode.requestStaticRenderUpdate === false){
			planMode.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
			planMode.updatingActive = false;
		}
	}

	planMode.exitFunc = function(){
		planMode.requestStaticRenderUpdate = true;
		planMode.exitFlag = true;
		planMode.goalAlpha = 0;
		planMode.gui.exit();
	}

		// ---------------------------------------------

	planMode.registerKeyDownFunc('Esc',function(){
		App.loadDemo();
		App.ModeHandler.popMode();
	});

	planMode.registerKeyDownFunc('Space',function(){
		App.ModeHandler.pushMode('simulation');
		App.ModeHandler.modes['simulation'].renderStreams = true;
	});

	planMode.registerKeyDownFunc('W',function(){
		planMode.direction = App.DIRECTIONS.UP;
		App.GuiInstDrag.changeDirection(App.DIRECTIONS.UP);
		planMode.requestStaticRenderUpdate = true;
	});

	planMode.registerKeyDownFunc('S',function(){
		planMode.direction = App.DIRECTIONS.DOWN;
		App.GuiInstDrag.changeDirection(App.DIRECTIONS.DOWN);
		planMode.requestStaticRenderUpdate = true;
	});

	planMode.registerKeyDownFunc('A',function(){
		planMode.direction = App.DIRECTIONS.LEFT;
		App.GuiInstDrag.changeDirection(App.DIRECTIONS.LEFT);
		planMode.requestStaticRenderUpdate = true;
	});

	planMode.registerKeyDownFunc('D',function(){
		planMode.direction = App.DIRECTIONS.RIGHT;
		App.GuiInstDrag.changeDirection(App.DIRECTIONS.RIGHT);
		planMode.requestStaticRenderUpdate = true;
	});

	planMode.registerKeyDownFunc('1',function(){
		planMode.color = App.COLORS.RED;
		App.GuiInstDrag.changeGlobalColor(App.COLORS.RED);
		planMode.requestStaticRenderUpdate = true;
	});

	planMode.registerKeyDownFunc('2',function(){
		planMode.color = App.COLORS.GREEN;
		App.GuiInstDrag.changeGlobalColor(App.COLORS.GREEN);
		planMode.requestStaticRenderUpdate = true;
	});

	planMode.registerKeyDownFunc('3',function(){
		planMode.color = App.COLORS.BLUE;
		App.GuiInstDrag.changeGlobalColor(App.COLORS.BLUE);
		planMode.requestStaticRenderUpdate = true;
	});

	planMode.registerKeyDownFunc('4',function(){
		planMode.color = App.COLORS.YELLOW;
		App.GuiInstDrag.changeGlobalColor(App.COLORS.YELLOW);
		planMode.requestStaticRenderUpdate = true;
	});

	planMode.registerKeyDownFunc('Delete',function(){
		if(App.Game.currentPlanningLevel.currentSelection !== []){
			App.Game.currentPlanningLevel.delete(App.Game.currentPlanningLevel.currentSelection);
			App.GameRenderer.requestStaticRenderUpdate = true;
		}
	});

	planMode.registerKeyDownFunc('Z',function(){
		if(App.InputHandler.keysDown[App.InputHandler.keyCharToCode['Ctrl']]){
			if(App.InputHandler.keysDown[App.InputHandler.keyCharToCode['Shift']]){
				App.Game.currentPlanningLevel.redo();
			}else{
				App.Game.currentPlanningLevel.undo();
			}
		}App.GameRenderer.requestStaticRenderUpdate = true;
	});

	planMode.registerMouseMoveFunc(function(x,y){
		App.GameRenderer.screenToGridCoords(x,y);
		if(App.InputHandler.rmb)App.GameRenderer.pan(x,y);
	});

	planMode.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.LEFT,function(x,y){
		planMode.gui.mouseDown(x, y);

		var insCode = undefined;

		if(App.InputHandler.keysDown[App.InputHandler.keyCharToCode['Q']] === true)insCode =  0+planMode.direction;
		if(App.InputHandler.keysDown[App.InputHandler.keyCharToCode['W']] === true)insCode =  4;
		if(App.InputHandler.keysDown[App.InputHandler.keyCharToCode['E']] === true)insCode = 12;
		if(App.InputHandler.keysDown[App.InputHandler.keyCharToCode['R']] === true)insCode = 15;
		if(App.InputHandler.keysDown[App.InputHandler.keyCharToCode['T']] === true)insCode = 13;
		if(App.InputHandler.keysDown[App.InputHandler.keyCharToCode['Y']] === true)insCode = 18+planMode.direction;
		if(App.InputHandler.keysDown[App.InputHandler.keyCharToCode['U']] === true)insCode = 26+planMode.direction;
		if(App.InputHandler.keysDown[App.InputHandler.keyCharToCode['I']] === true)insCode =  8;

		if(App.InputHandler.keysDown[App.InputHandler.keyCharToCode['A']] === true)insCode =  7;
		if(App.InputHandler.keysDown[App.InputHandler.keyCharToCode['S']] === true)insCode =  6;
		if(App.InputHandler.keysDown[App.InputHandler.keyCharToCode['D']] === true)insCode =  5;
		if(App.InputHandler.keysDown[App.InputHandler.keyCharToCode['F']] === true)insCode = 16;
		if(App.InputHandler.keysDown[App.InputHandler.keyCharToCode['G']] === true)insCode = 14;
		if(App.InputHandler.keysDown[App.InputHandler.keyCharToCode['H']] === true)insCode = 22+planMode.direction;
		if(App.InputHandler.keysDown[App.InputHandler.keyCharToCode['J']] === true)insCode = 17;
		if(App.InputHandler.keysDown[App.InputHandler.keyCharToCode['K']] === true)insCode =  9;

		if(insCode !== undefined){
			var ins = new App.PlanningInstruction(App.GameRenderer.mouseX,App.GameRenderer.mouseY,planMode.color,insCode);
			App.Game.currentPlanningLevel.insert(ins);
			App.GameRenderer.requestStaticRenderUpdate = true;
		}

		if(App.Game.currentPlanningLevel.currentSelection.length !== 0)
			planMode.moveStart = [App.GameRenderer.mouseX,App.GameRenderer.mouseY,App.GameRenderer.mouseC];
	});

	planMode.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.MIDDLE,function(x,y){
		planMode.selectStart = [App.GameRenderer.mouseX,App.GameRenderer.mouseY,App.GameRenderer.mouseC];
		App.Game.currentPlanningLevel.currentSelection = [];
	});

	planMode.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.RIGHT,function(x,y){
		App.GameRenderer.beginPan(x,y);
	});

	planMode.registerMouseUpFunc(App.InputHandler.MOUSEBUTTON.LEFT,function(x,y){
		planMode.gui.mouseUp(x, y);

		if(planMode.moveStart !== undefined){
			console.log("TEST");
			var shiftX = App.GameRenderer.mouseX-planMode.moveStart[0];
			var shiftY = App.GameRenderer.mouseY-planMode.moveStart[1];

			if(App.InputHandler.keysDown['Ctrl'])
				App.Game.currentPlanningLevel.copy(App.Game.currentPlanningLevel.currentSelection,shiftX,shiftY);
			else
				App.Game.currentPlanningLevel.move(App.Game.currentPlanningLevel.currentSelection,shiftX,shiftY);
			App.GameRenderer.requestStaticRenderUpdate = true;

			planMode.moveStart = undefined;
		}
	});

	planMode.registerMouseUpFunc(App.InputHandler.MOUSEBUTTON.MIDDLE,function(x,y){
		if(planMode.selectStart !== undefined){
			App.Game.currentPlanningLevel.selectInstructions(planMode.selectStart[0],planMode.selectStart[1],planMode.selectStart[2],
		                                                         App.GameRenderer.mouseX,App.GameRenderer.mouseY,App.GameRenderer.mouseC);
			planMode.selectStart = undefined;
		}
	});

	planMode.registerMouseWheelFunc(function(w){
		App.GameRenderer.zoom(App.InputHandler.mouseX,App.InputHandler.mouseY,w);
	});

	planMode.registerResizeFunc(function(){
		// TODO: move grid relative to center of screen, NOT a bestFit()
	});
}
