window.onload = function(){
	App.InstCatalog  = App.makeInstructionCatalog();
	App.Canvases     = App.createCanvasArray();
	App.InputHandler = App.makeInputHandler();
	App.ModeHandler  = App.makeModeHandler();
	App.Engine       = App.makeEngine();

	App.Game         = App.makeGame();
	App.GameRenderer = App.makeGameRenderer();
	App.setupGameGui();

	// TODO: MOVE THIS TO ENGINE.RUN =============================//
	App.Game.currentPlanningLevel = App.Game.parseLevel(App.demoLevels[2]);
	App.ModeHandler.pushMode('planning'); // CHANGE THIS TO MAIN MENU
	//============================================================//

	App.Engine.run();
}
