window.onload = function(){
	App.InstCatalog  = App.makeInstructionCatalog();
	App.Canvases     = App.createCanvasArray();
	App.InputHandler = App.makeInputHandler();
	App.ModeHandler  = App.makeModeHandler();
	App.Engine       = App.makeEngine();
	App.Shade        = App.makeShade();

	App.Game         = App.makeGame();
	App.GameRenderer = App.makeGameRenderer();

	App.setupMainMenu();
	App.setupLevelSelect();
	App.setupLibrary();
	App.setupHelp();
	App.confirmGui = App.setupConfirm();
	App.setupSubmitLevel();
	App.setupCreateAccount();
	App.setupPropertiesGui();
	App.setupSuccessGui();
	App.setupModificationGui();

	// TODO: split below into normal and sandbox versions?
	App.setupPlanGui();
	App.setupSimGui();
	App.setupErrorGui();

	App.Engine.run();
}
