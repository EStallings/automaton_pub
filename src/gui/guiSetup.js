App.setupGUI = function(){
	setupPlanningFrame();
	setupSimulationFrame();
	setupMainMenuFrame();
	setupUserLevelSelectFrame();

}

var setupUserLevelSelectFrame = function(){
	var key = App.setup.frames.USER_LEVEL_SELECT;
	App.Gui.addNewFrame(key);

	var table = new App.GuiTable(100,100);
	var confirmButton = new App.GuiTextButton(600, 100, 'Load Level', function(){
		if(table.table[table.activeRow]){

			if(App.Game.loadNewLevel(table.table[table.activeRow].json['level_str'])){
				App.changeMode(App.MODES.PLANNING);
			}
			else{
				//TODO error dialog box
			}
		}

		else
			console.log('select a level first!');
	}, false, null);

	var callback = function(data){
		table.setData(data);
	}

	var typeEntry = new App.GuiEditableTextBox(new App.GuiCollisionRect(750, 100, 100, 30), 'user');
	var subtypeEntry = new App.GuiEditableTextBox(new App.GuiCollisionRect(750, 150, 100, 30), 'khabbabs');
	var submitButton = new App.GuiTextButton(750, 200, 'Get Levels', function(){
		App.Server.getLevels(typeEntry.text, subtypeEntry.text, callback);
	})

	var menuButton = new App.GuiTextButton(400, 50, 'Main Menu',function(){App.changeMode(App.MODES.MAIN_MENU);	}, false, null);
	App.Gui.addNewComponent(key, menuButton);

	App.Gui.addNewComponent(key, confirmButton);
	App.Gui.addNewComponent(key, table);
	App.Gui.addNewComponent(key, typeEntry);
	App.Gui.addNewComponent(key, subtypeEntry);
	App.Gui.addNewComponent(key, submitButton);


	App.Server.getLevels('user', 'khabbabs', callback);

}


var setupMainMenuFrame = function(){
	var key = App.setup.frames.MAIN_MENU;
	App.Gui.addNewFrame(key);

	var panel = new App.GuiPanel(new App.GuiCollisionRect(0,0,500,500));
	panel.yAlignment = 'center';
	panel.xAlignment = 'center';

	var playBut = new App.GuiTextButton(100, 200, 'Play', function(){App.changeMode(App.MODES.PLANNING);}, false, panel);
	var userBut = new App.GuiTextButton(100, 250, 'Play User Level', function(){App.changeMode(App.MODES.USER_LEVEL_SELECT);}, false, panel);
	var blockPanel = App.makeBlockingPanel();
	blockPanel.color = 'rgba(180, 180, 180, 0)';

	App.Gui.addNewComponent(key, panel);
	App.Gui.addNewComponent(key, playBut);
	App.Gui.addNewComponent(key, userBut);
	App.Gui.addNewComponent(key, blockPanel);

}

var setupSimulationFrame = function(){


	var key = App.setup.frames.SIMULATION;
	App.Gui.addNewFrame(key);

	var controlsPanel = new App.GuiPanel(new App.GuiCollisionRect(0,0,200,500));
	controlsPanel.yAlignment = 'bottom';

	var joystick = new App.GuiJoystick(50, 50, controlsPanel);
	var zoomInButton = new App.GuiTextButton(0, 200, 'Zoom In', function(){App.Game.zoom(App.Canvases.halfWidth, App.Canvases.halfHeight,1);}, false, controlsPanel);
	var zoomOutButton = new App.GuiTextButton(0, 250, 'Zoom Out', function(){App.Game.zoom(App.Canvases.halfWidth, App.Canvases.halfHeight,-1);}, false, controlsPanel);
	var simButton = new App.GuiTextButton(400, 50, 'Return',function(){ App.changeMode(App.MODES.PLANNING);	}, false, null);
	var pauseButton = new App.GuiTextButton(0, 325, 'Pause',function(){ App.Game.pause();}, false, controlsPanel);
	var speedSliderButton = new App.GuiSliderButton(new App.GuiCollisionRect(150,10,50,25), controlsPanel);

	var min = 0;
	var max = 10;
	var speedSliderLine = new App.GuiSliderLine(new App.GuiCollisionRect(150,10,10, 400), min, max, 2, function(n){

		App.Game.setSimulationSpeed(64/(Math.sqrt(n)+1));
	}, controlsPanel);
	speedSliderButton.sliderLine = speedSliderLine;
	speedSliderLine.sliderButton = speedSliderButton;



	App.Gui.addNewComponent(key, controlsPanel);
	App.Gui.addNewComponent(key, simButton);
	App.Gui.addNewComponent(key, pauseButton);
	App.Gui.addNewComponent(key, joystick);
	App.Gui.addNewComponent(key, zoomInButton);
	App.Gui.addNewComponent(key, zoomOutButton);
	App.Gui.addNewComponent(key, speedSliderLine);
	App.Gui.addNewComponent(key, speedSliderButton);

	//Setup key bindings
	App.InputHandler.registerKey('[', App.MODES.SIMULATION, function(){App.Game.setSimulationSpeed(App.Game.simulationSpeed*2);});
	App.InputHandler.registerKey(']', App.MODES.SIMULATION,function(){App.Game.setSimulationSpeed(App.Game.simulationSpeed/2);});
	App.InputHandler.registerKey('Space', App.MODES.SIMULATION,function(){App.Game.pause();});
	App.InputHandler.registerKey('`', App.MODES.SIMULATION,function(){ App.changeMode(App.MODES.PLANNING);});

}

var setupPlanningFrame = function(){
	var key = App.setup.frames.PLANNING;

	App.Gui.addNewFrame(key);
	var instructionPanel = new App.GuiPanel(new App.GuiCollisionRect(800,0,100,600));
	instructionPanel.xAlignment = 'right';
	var controlsPanel = new App.GuiPanel(new App.GuiCollisionRect(0,100,100,500));

	var redButton 		= new App.GuiTextButton(0,300,'Red',		function(){	App.GuiDragButton.changeGlobalColor(0)	}, false, instructionPanel);
	var greenButton 	= new App.GuiTextButton(0,330,'Green',	function(){	App.GuiDragButton.changeGlobalColor(1)	}, false, instructionPanel);
	var blueButton 		= new App.GuiTextButton(0,360,'Blue',		function(){	App.GuiDragButton.changeGlobalColor(2)	}, false, instructionPanel);
	var yellowButton	= new App.GuiTextButton(0,390,'Yellow',	function(){	App.GuiDragButton.changeGlobalColor(3)	}, false, instructionPanel);

	App.Gui.addNewComponent(key, instructionPanel);
	App.Gui.addNewComponent(key, controlsPanel);
	App.Gui.addNewComponent(key, redButton);
	App.Gui.addNewComponent(key, greenButton);
	App.Gui.addNewComponent(key, blueButton);
	App.Gui.addNewComponent(key, yellowButton);


	for(var i=0; i < 8; i++){
		App.Gui.addNewComponent(key, new App.GuiDragButton(0 , 31 * i, null, i, 			instructionPanel));
		App.Gui.addNewComponent(key, new App.GuiDragButton(31, 31 * i, null, i + 8, 	instructionPanel));
		App.Gui.addNewComponent(key, new App.GuiDragButton(62, 31 * i, null, i + 16, instructionPanel));

	}
	var joystick = new App.GuiJoystick(50, 50, controlsPanel);
	App.Gui.addNewComponent(key, joystick);

	var zoomInButton = new App.GuiTextButton(0, 200, 'Zoom In', function(){App.Game.zoom(App.Canvases.halfWidth, App.Canvases.halfHeight,1);}, false, controlsPanel);
	var zoomOutButton = new App.GuiTextButton(0, 250, 'Zoom Out', function(){App.Game.zoom(App.Canvases.halfWidth, App.Canvases.halfHeight,-1);}, false, controlsPanel);

	App.Gui.addNewComponent(key, zoomInButton);
	App.Gui.addNewComponent(key, zoomOutButton);





	var simButton = new App.GuiTextButton(400, 50, 'Simulate',function(){App.changeMode(App.MODES.SIMULATION);	}, false, null);
	App.Gui.addNewComponent(key, simButton);

	var menuButton = new App.GuiTextButton(525, 50, 'Menu',function(){App.changeMode(App.MODES.MAIN_MENU);	}, false, null);
	App.Gui.addNewComponent(key, menuButton);

	var submitDialog = [];
	submitDialog[0] = App.makeBlockingPanel();
	submitDialog[1] = new App.GuiPanel(new App.GuiCollisionRect(0,0,150,500));
	submitDialog[1].xAlignment = 'center';
	submitDialog[1].yAlignment = 'center';
	submitDialog[1].updatePosition();
	submitDialog[2] = new App.GuiTextButton(25,450,'Cancel', function(){setTimeout(function(){App.Gui.endOverlay();});}, false, submitDialog[1]);

	submitDialog[3] = new App.GuiEditableTextBox(new App.GuiCollisionRect(25,250,100,30), 'Username', submitDialog[1]);
	submitDialog[4] = new App.GuiEditableTextBox(new App.GuiCollisionRect(25,300,100,30), 'Password', submitDialog[1]);

	submitDialog[5] = new App.GuiEditableTextBox(new App.GuiCollisionRect(25,100,100,30), 'Level Name', submitDialog[1]);
	submitDialog[6] = new App.GuiEditableTextBox(new App.GuiCollisionRect(25,150,100,30), 'Level Description', submitDialog[1]);
	submitDialog[7] = new App.GuiEditableTextBox(new App.GuiCollisionRect(25,200,100,30), 'Difficulty', submitDialog[1]);

	submitDialog[8] = new App.GuiTextButton(25,400,'Submit', function(){
		App.Server.putLevel(App.Game.currentPlanningLevel.generateParseString(),
											submitDialog[3].text,
											submitDialog[4].text,
											submitDialog[7].text,
											submitDialog[5].text,
											submitDialog[6].text,
											App.Server.testPostCallback);
		App.Gui.endOverlay();
	}, false, submitDialog[1]);

	var submitButton = new App.GuiTextButton(650, 50, 'Submit Level', function(){
		App.Gui.startOverlay(submitDialog);
	}, false, null);
	App.Gui.addNewComponent(key, submitButton);

	//Setup Key Bindings
	App.InputHandler.registerKey('`', App.MODES.PLANNING,function(){ App.changeMode(App.MODES.SIMULATION);});
	App.InputHandler.registerKey('Z', App.MODES.PLANNING, function(){
			if(App.InputHandler.keysDown['Ctrl']) {
				if(App.InputHandler.keysDown['Shift']){
					App.Game.currentPlanningLevel.redo();
				}
				else
					App.Game.currentPlanningLevel.undo();
			}
	});






}