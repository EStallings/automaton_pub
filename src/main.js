window.onload = function(){
	App.InstCatalog  = App.makeInstructionCatalog();
	App.Canvases     = App.createCanvasArray();
	App.InputHandler = App.makeInputHandler();
	App.ModeHandler  = App.makeModeHandler();
	App.Engine       = App.makeEngine();

	App.Game         = App.makeGame();
	App.GameRenderer = App.makeGameRenderer();

	App.setupMainMenu();
	App.setupLevelSelect();
	App.setupLibrary();
	App.setupSettings();
	App.setupGameGui(); // TODO: split this into planningGui and simulationGui
	                    // TODO: split above into normal and sandbox versions?

	App.Engine.run();
}
