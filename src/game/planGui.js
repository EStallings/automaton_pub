App.setupPlanGui = function(){
	var planMode = App.ModeHandler.addNewMode('planning');

		// ---------------------------------------------

	planMode.gfx = App.Canvases.addNewLayer(2).getContext('2d');
	planMode.gui = new App.guiFrame(planMode.gfx);

	planMode.joystick = new App.GuiJoystick(100, 500, 50, 100, null);

	planMode.topRow = [];
	planMode.topRow[0] = new App.GuiInstDrag  (-164, -73-5, 0,  0, true , 'center', 'bottom', planMode.gui, 'Spawn Automaton');
	planMode.topRow[1] = new App.GuiInstDrag  (-116, -73-5, 0,  4, false, 'center', 'bottom', planMode.gui, 'Change Direction Up');
	planMode.topRow[2] = new App.GuiInstDrag  ( -68, -73-5, 0, 12, false, 'center', 'bottom', planMode.gui, 'Grab/Drop Token');
	planMode.topRow[3] = new App.GuiInstDrag  ( -20, -73-5, 0, 27, true , 'center', 'bottom', planMode.gui, 'Positive Switch');
	planMode.topRow[4] = new App.GuiInstDrag  (  28, -73-5, 0, 31, true , 'center', 'bottom', planMode.gui, 'Flip-Flop');
	planMode.topRow[5] = new App.GuiInstDrag  (  76, -73-5, 0, 16, false, 'center', 'bottom', planMode.gui, 'Sync');
	planMode.topRow[6] = new App.GuiInstDrag  ( 124, -73-5, 0, 13, false, 'center', 'bottom', planMode.gui, 'Add');
	planMode.topRow[7] = new App.GuiInstDrag  ( 172, -73-5, 0, 15, false, 'center', 'bottom', planMode.gui, 'Set Value');
	planMode.topRow[8] = new App.GuiInstDrag  ( 220, -73-5, 0,  8, false, 'center', 'bottom', planMode.gui, 'Input Stream');

	planMode.botRow = [];
	planMode.botRow[0] = new App.GuiInstDrag     (-164, -25-5, 0,  7, false, 'center', 'bottom', planMode.gui, 'Change Direction Left');
	planMode.botRow[1] = new App.GuiInstDrag     (-116, -25-5, 0,  6, false, 'center', 'bottom', planMode.gui, 'Change Direction Down');
	planMode.botRow[2] = new App.GuiInstDrag     ( -68, -25-5, 0,  5, false, 'center', 'bottom', planMode.gui, 'Change Direction Right');
	planMode.botRow[3] = new App.GuiInstDrag     ( -20, -25-5, 0, 23, true , 'center', 'bottom', planMode.gui, 'Equality Switch');
	planMode.botRow[4] = new App.GuiInstDrag     (  28, -25-5, 0, 19, true , 'center', 'bottom', planMode.gui, 'Token Switch');
	planMode.botRow[5] = new App.GuiInstDrag     (  76, -25-5, 0, 17, false, 'center', 'bottom', planMode.gui, 'Toggle Color');
	planMode.botRow[6] = new App.GuiInstDrag     ( 124, -25-5, 0, 14, false, 'center', 'bottom', planMode.gui, 'Subtract');
	planMode.botRow[7] = new App.GuiInstDrag     ( 172, -25-5, 0, 18, false, 'center', 'bottom', planMode.gui, 'Pause');
	planMode.botRow[8] = new App.GuiInstDrag     ( 220, -25-5, 0,  9, false, 'center', 'bottom', planMode.gui, 'Output Stream');

	planMode.butNav = new App.GuiToolbarButton(-348, -49-5, 94, 0, '#ffffff', 'center', 'bottom', 'FOO');
	planMode.playback = [];
	planMode.playback[0] = new App.GuiToolbarButton(-284,-81-5, 30, 0, '#ffffff', 'center', 'bottom', 'Low Speed');
	planMode.playback[1] = new App.GuiToolbarButton(-284,-49-5, 30, 0, '#ffffff', 'center', 'bottom', 'High Speed');
	planMode.playback[2] = new App.GuiToolbarButton(-284,-17-5, 30, 0, '#ffffff', 'center', 'bottom', 'Stop');
	planMode.playback[3] = new App.GuiToolbarButton(-252,-81-5, 30, 0, '#ffffff', 'center', 'bottom', 'Med Speed');
	planMode.playback[4] = new App.GuiToolbarButton(-252,-49-5, 30, 0, '#ffffff', 'center', 'bottom', 'MAX Speed');
	planMode.playback[5] = new App.GuiToolbarButton(-252,-17-5, 30, 0, '#ffffff', 'center', 'bottom', 'Pause');

	planMode.undoBut = new App.GuiToolbarButton(-212,-73-5, 46, 0, '#ffffff', 'center', 'bottom', 'Undo');
	planMode.redoBut = new App.GuiToolbarButton(-212,-25-5, 46, 0, '#ffffff', 'center', 'bottom', 'Redo');

	planMode.toggles = [];
	planMode.toggles[ 0] = new App.GuiToolbarButton(260,-81-5, 30, 0, 0, 'center', 'bottom', 'Red Active');
	planMode.toggles[ 1] = new App.GuiToolbarButton(292,-81-5, 30, 0, 1, 'center', 'bottom', 'Green Active');
	planMode.toggles[ 2] = new App.GuiToolbarButton(324,-81-5, 30, 0, 2, 'center', 'bottom', 'Blue Active');
	planMode.toggles[ 3] = new App.GuiToolbarButton(356,-81-5, 30, 0, 3, 'center', 'bottom', 'Yellow Active');
	planMode.toggles[ 4] = new App.GuiToolbarButton(260,-49-5, 30, 0, 0, 'center', 'bottom', 'Red Locked');
	planMode.toggles[ 5] = new App.GuiToolbarButton(292,-49-5, 30, 0, 1, 'center', 'bottom', 'Green Locked');
	planMode.toggles[ 6] = new App.GuiToolbarButton(324,-49-5, 30, 0, 2, 'center', 'bottom', 'Blue Locked');
	planMode.toggles[ 7] = new App.GuiToolbarButton(356,-49-5, 30, 0, 3, 'center', 'bottom', 'Yellow Locked');
	planMode.toggles[ 8] = new App.GuiToolbarButton(260,-17-5, 30, 0, 0, 'center', 'bottom', 'Red Hidden');
	planMode.toggles[ 9] = new App.GuiToolbarButton(292,-17-5, 30, 0, 1, 'center', 'bottom', 'Green Hidden');
	planMode.toggles[10] = new App.GuiToolbarButton(324,-17-5, 30, 0, 2, 'center', 'bottom', 'Blue Hidden');
	planMode.toggles[11] = new App.GuiToolbarButton(356,-17-5, 30, 0, 3, 'center', 'bottom', 'Yellow Hidden');

	planMode.newLevelBut   = new App.GuiToolbarButton(384,-85-5, 22, 0, '#ffffff', 'center', 'bottom', 'New');
	planMode.saveLevelBut  = new App.GuiToolbarButton(384,-61-5, 22, 0, '#ffffff', 'center', 'bottom', 'Upload');
	planMode.propertiesBut = new App.GuiToolbarButton(384,-37-5, 22, 0, '#ffffff', 'center', 'bottom', 'Properties');
	planMode.backBut       = new App.GuiToolbarButton(384,-13-5, 22, 0, '#ffffff', 'center', 'bottom', 'Return');

	planMode.anchor = new App.GuiToolbarButton (0,-25,46,0,'#ffffff', 'center', 'bottom');
	planMode.anchor2 = new App.GuiToolbarButton(0,-5-48,46,0,'#ffffff', 'center', 'bottom');
	planMode.instPanel = new App.GuiTools.Component(0,-54,794,98,0,0,'center','bottom');
	planMode.instPanel.render = function(gfx){
		gfx.fillStyle = 'rgba(0,0,0,0.8)';
		gfx.fillRect(planMode.instPanel.getx(), planMode.instPanel.gety(), planMode.instPanel.w, planMode.instPanel.h);
	}

	planMode.submitButton = new App.GuiTextButton(15, 56+28*0, 200, 000, 'Submit', 			function(){
			planMode.gui.setOverlay(planMode.submitOverlay);
		}, false, null, null);


//	planMode.gui.addComponent(planMode.submitButton);
	planMode.gui.addComponent(planMode.instPanel);
	planMode.gui.addComponent(planMode.butNav);
	planMode.gui.addComponent(planMode.undoBut);
	planMode.gui.addComponent(planMode.redoBut);
	planMode.gui.addComponent(planMode.newLevelBut);
	planMode.gui.addComponent(planMode.saveLevelBut);
	planMode.gui.addComponent(planMode.propertiesBut);
	planMode.gui.addComponent(planMode.backBut);

	for(var c in planMode.topRow) planMode.gui.addComponent(planMode.topRow[c]);
	for(var c in planMode.botRow) planMode.gui.addComponent(planMode.botRow[c]);
	for(var c in planMode.playback) planMode.gui.addComponent(planMode.playback[c]);
	for(var c in planMode.toggles) planMode.gui.addComponent(planMode.toggles[c]);
//	planMode.gui.addComponent(planMode.joystick);
//planMode.gui.addComponent(planMode.anchor);
	planMode.direction = App.DIRECTIONS.UP;
	planMode.color = App.COLORS.RED;

	planMode.selectStart = undefined;
	planMode.moveStart = undefined;
	planMode.alpha = planMode.goalAlpha = 0;

/*
	planMode.submitOverlay = [];
	planMode.submitOverlay[0] = new App.GuiTools.BlockingPanel();
	planMode.submitOverlay[1] = new App.GuiTextButton(200, 100, 200, 000, 'Cancel', 			function(){
		planMode.gui.removeOverlay();
	}, false, null, null);
	planMode.submitOverlay[2] = new App.GuiTextButton(200, 140, 200, 000, 'Confirm', function(){
		App.Server.putLevel(App.Game.currentPlanningLevel.generateParseString(),
			planMode.submitOverlay[3].txt,
			planMode.submitOverlay[4].txt,
			planMode.submitOverlay[7].txt,
			planMode.submitOverlay[5].txt,
			planMode.submitOverlay[6].txt,
			App.Server.testPostCallback);
		planMode.gui.removeOverlay();
		planMode.submitOverlay[3].txt = "Username";
		planMode.submitOverlay[4].txt = "Password";
		planMode.submitOverlay[5].txt = "Level Name";
		planMode.submitOverlay[6].txt = "Description";
		planMode.submitOverlay[7].txt = "Easy";
	}, false, null, null);
	planMode.submitOverlay[3] = new App.GuiTextBox(200, 300, 200, 25, "Username", 100, 100, null, null);
	planMode.submitOverlay[4] = new App.GuiTextBox(200, 340, 200, 25, "Password", 100, 100, null, null);
	planMode.submitOverlay[5] = new App.GuiTextBox(200, 380, 200, 25, "Level Name", 100, 100, null, null);
	planMode.submitOverlay[6] = new App.GuiTextBox(200, 420, 200, 25, "Description", 100, 100, null, null);
	planMode.submitOverlay[7] = new App.GuiTextButton(200, 460, 200, 000, 'Easy', function(){
		if(planMode.submitOverlay[7].txt === 'Easy')   planMode.submitOverlay[7].txt = 'Medium';
		if(planMode.submitOverlay[7].txt === 'Medium') planMode.submitOverlay[7].txt = 'Hard';
		if(planMode.submitOverlay[7].txt === 'Hard')   planMode.submitOverlay[7].txt = 'Easy';

	}, false, null, null);

	for(var c in planMode.submitOverlay) planMode.submitOverlay[c].dointerp = false;
*/


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

	planMode.registerKeyDownFunc('Ctrl',function(){ App.Game.currentPlanningLevel.graphics.copying = true; });
	planMode.registerKeyUpFunc('Ctrl',function(){ App.Game.currentPlanningLevel.graphics.copying = false; });

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
		App.Game.currentPlanningLevel.graphics.mouseMove(App.GameRenderer.mouseX,App.GameRenderer.mouseY);
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
			App.Game.currentPlanningLevel.graphics.inserted = true;
			App.GameRenderer.requestStaticRenderUpdate = true;
		}
		else{ App.Game.currentPlanningLevel.graphics.inserted = false; }

		App.Game.currentPlanningLevel.graphics.mouseDown('lmb',App.GameRenderer.mouseX,App.GameRenderer.mouseY);
	});

	planMode.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.MIDDLE,function(x,y){
		App.Game.currentPlanningLevel.graphics.mouseDown('mmb',App.GameRenderer.mouseX,App.GameRenderer.mouseY);
	});

	planMode.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.RIGHT,function(x,y){
		App.GameRenderer.beginPan(x,y);
		App.Game.currentPlanningLevel.graphics.mouseDown('rmb',App.GameRenderer.mouseX,App.GameRenderer.mouseY);
	});

	planMode.registerMouseUpFunc(App.InputHandler.MOUSEBUTTON.LEFT,function(x,y){
		planMode.gui.mouseUp(x, y);
		App.Game.currentPlanningLevel.graphics.mouseUp('lmb',App.GameRenderer.mouseX,App.GameRenderer.mouseY);
	});

	planMode.registerMouseUpFunc(App.InputHandler.MOUSEBUTTON.MIDDLE,function(x,y){
		App.Game.currentPlanningLevel.graphics.mouseUp('mmb',App.GameRenderer.mouseX,App.GameRenderer.mouseY);
	});

	planMode.registerMouseUpFunc(App.InputHandler.MOUSEBUTTON.RIGHT,function(x,y){
		App.Game.currentPlanningLevel.graphics.mouseUp('rmb',App.GameRenderer.mouseX,App.GameRenderer.mouseY);
	});

	planMode.registerMouseWheelFunc(function(w){
		App.GameRenderer.zoom(App.InputHandler.mouseX,App.InputHandler.mouseY,w);
	});

	planMode.registerResizeFunc(function(){
		// TODO: move grid relative to center of screen, NOT a bestFit()
	});
}
