window.onload = function(){
	App.InstCatalog  = App.makeInstructionCatalog();
	App.Canvases     = App.createCanvasArray();
	App.InputHandler = App.makeInputHandler();
	App.ModeHandler  = App.makeModeHandler();
	App.Engine       = App.makeEngine();

	App.Game         = App.makeGame();
	App.GameRenderer = App.makeGameRenderer();

	App.setupComingSoon();
	App.setupMainMenu();
	App.setupLevelSelect();
	App.setupLibrary();
	App.setupSettings();
	// TODO: split below into normal and sandbox versions?
	App.setupPlanGui();
	App.setupSimGui();

	App.Engine.run();
}
