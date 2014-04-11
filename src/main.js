window.onload = function(){
	App.InstCatalog  = App.makeInstructionCatalog();
	App.Canvases     = App.createCanvasArray();
	App.Input        = App.makeInputHandler();
	App.Engine       = App.makeEngine();

	App.Game         = App.makeGame();
	App.GameRenderer = App.makeGameRenderer();

	// TODO: MOVE THIS TO ENGINE.RUN =============================//
	App.Game.currentPlanningLevel = App.Game.parseLevel(App.demoLevels[2]);
	//============================================================//
	App.Engine.run();
}
