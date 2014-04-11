window.onload = function(){
	App.InstCatalog  = App.makeInstructionCatalog();
	App.Canvases     = App.createCanvasArray();
	App.Engine       = App.makeEngine();

	App.Game         = App.makeGame();
	App.GameRenderer = App.makeGameRenderer();

	// TODO: MOVE THIS TO ENGINE.RUN =============================//
	App.Game.currentPlanningLevel = parseLevel(App.demoLevels[0]);
	//============================================================//
	App.Engine.run();
}
