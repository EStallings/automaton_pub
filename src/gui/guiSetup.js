App.setupGUI = function(){
	setupPlanningFrame();
	setupSimulationFrame();
	setupMainMenuFrame();

}

var setupMainMenuFrame = function(){
	var key = App.setup.frames.MAIN_MENU;
	App.Gui.addNewFrame(key);

	var panel = new App.GuiPanel(new App.GuiCollisionRect(0,0,500,500));
	panel.yAlignment = 'center';
	panel.xAlignment = 'center';

	var playBut = new App.GuiTextButton(100, 200, 'Play', function(){App.changeMode(App.MODES.PLANNING);}, false, panel);
	var blockPanel = App.makeBlockingPanel();
	blockPanel.color = 'rgba(180, 180, 180, 0)';

	App.Gui.addNewComponent(key, panel);
	App.Gui.addNewComponent(key, playBut);
	App.Gui.addNewComponent(key, blockPanel);

}

var setupSimulationFrame = function(){


	var key = App.setup.frames.SIMULATION;
	App.Gui.addNewFrame(key);

	var controlsPanel = new App.GuiPanel(new App.GuiCollisionRect(0,0,200,500));
	controlsPanel.yAlignment = 'bottom';

	var joystick = new App.GuiJoystick(50, 50, controlsPanel);
	var zoomInButton = new App.GuiTextButton(0, 200, 'Zoom In', function(){App.Game.zoom(App.Canvases.width/2, App.Canvases.height/2,1);}, false, controlsPanel);
	var zoomOutButton = new App.GuiTextButton(0, 250, 'Zoom Out', function(){App.Game.zoom(App.Canvases.width/2, App.Canvases.height/2,-1);}, false, controlsPanel);
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

	var zoomInButton = new App.GuiTextButton(0, 200, 'Zoom In', function(){App.Game.zoom(App.Canvases.width/2, App.Canvases.height/2,1);}, false, controlsPanel);
	var zoomOutButton = new App.GuiTextButton(0, 250, 'Zoom Out', function(){App.Game.zoom(App.Canvases.width/2, App.Canvases.height/2,-1);}, false, controlsPanel);

	App.Gui.addNewComponent(key, zoomInButton);
	App.Gui.addNewComponent(key, zoomOutButton);


	var simButton = new App.GuiTextButton(400, 50, 'Simulate',function(){App.changeMode(App.MODES.SIMULATION);	}, false, null);
	App.Gui.addNewComponent(key, simButton);

	var menuButton = new App.GuiTextButton(525, 50, 'Menu',function(){App.changeMode(App.MODES.MAIN_MENU);	}, false, null);
	App.Gui.addNewComponent(key, menuButton);

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