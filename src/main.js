window.onload = function(){
	debug("Initializing application");
	App.Canvases     = App.createCanvasArray();
	App.InputHandler = App.makeInputHandler();

	// ========================================================== //
	// TODO: FOR EACH MENU, MAKE A CREATE<MENUNAME>?
	// TODO: CLEANUP & DELETE
	// TODO: what about each gui menu gets its own canvas and is "always rendering"?
	constructMenus();
	App.Gui = App.Menus['mainMenu'];
	App.InputHandler.registerMouse(App.InputHandler.mouseTypes.LEFT_CLICK,App.CheckGuiClick,"GUI");
	// ========================================================== //

	App.Game   = App.makeGame();
	App.Engine = App.makeEngine();

	lvl = new App.PlanningLevel();                         // TODO: CLEANUP & DELETE
	lvl.insert(new App.PlanningInstruction(1,1,1,'left')); // TODO: CLEANUP & DELETE
	lvl.insert(new App.PlanningInstruction(1,1,3,'up'));   // TODO: CLEANUP & DELETE

	App.Engine.run();
}
