window.onload = function(){
	debug("Initializing application");
	Application.Canvases     = Application.createCanvasArray();
	Application.InputHandler = Application.makeInputHandler();

	// ========================================================== //
	// TODO: FOR EACH MENU, MAKE A CREATE<MENUNAME>?
	// TODO: CLEANUP & DELETE
	// TODO: what about each gui menu gets its own canvas and is "always rendering"?
	constructMenus();
	Application.Gui = Application.Menus['mainMenu'];
	Application.InputHandler.registerMouse(Application.InputHandler.mouseTypes.LEFT_CLICK,Application.CheckGuiClick,"GUI");
	// ========================================================== //

	Application.Game   = Application.makeGame();
	Application.Engine = Application.makeEngine();

	lvl = new Application.PlanningLevel();                         // TODO: CLEANUP & DELETE
	lvl.insert(new Application.PlanningInstruction(1,1,1,'left')); // TODO: CLEANUP & DELETE
	lvl.insert(new Application.PlanningInstruction(1,1,3,'up'));   // TODO: CLEANUP & DELETE

	Application.Engine.run();
}
