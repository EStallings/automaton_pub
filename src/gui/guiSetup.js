App.setupGUI = function(){
	setupPlanningFrame();
	setupSimulationFrame();
	setupMainMenuFrame();

}

var setupMainMenuFrame = function(){
	var key = App.setup.frames.MAIN_MENU;
	App.Gui.addNewFrame(key);

}

var setupSimulationFrame = function(){
	var key = App.setup.frames.SIMULATION;
	App.Gui.addNewFrame(key);

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
	var zoomOutButton = new App.GuiTextButton(0, 300, 'Zoom Out', function(){App.Game.zoom(App.Canvases.width/2, App.Canvases.height/2,-1);}, false, controlsPanel);

	App.Gui.addNewComponent(key, zoomInButton);
	App.Gui.addNewComponent(key, zoomOutButton);

	var promptOverlay = [];
	promptOverlay[1] = App.MakeGuiOverlayPanel();
	promptOverlay[0] = new App.GuiTextButton(100,100, 'OK', function(){setTimeout(function(){App.Gui.endOverlay()}, 200);}, false, null);


	var toggle = function(){
		 App.Gui.startOverlay(promptOverlay); App.Game.setMode(App.Game.modes.SIMULATION);
	}
	var simButton = new App.GuiTextButton(400, 50, 'Simulate',toggle, false, null);
	App.Gui.addNewComponent(key, simButton);



	//For the simulation mode GUI
	// var speedSliderButton = new App.GuiSliderButton(new App.GuiCollisionRect(200,100,50,25), controlsPanel);
	// var speedSliderLine = new App.GuiSliderLine(new App.GuiCollisionRect(200,100,10, 400), 0, 100, 2, function(n){
	// 	App.Game.setSimulationSpeed(n);
	// }, controlsPanel);
	// speedSliderButton.sliderLine = speedSliderLine;
	// speedSliderLine.sliderButton = speedSliderButton;
	// App.Gui.addNewComponent(key, speedSliderLine);
	// App.Gui.addNewComponent('planning', speedSliderButton);



}