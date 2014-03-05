window.onload = function(){
	debug("Initializing application");
	Application.Canvases = Application.createCanvasArray();
	Application.InputHandler = Application.makeInputHandler();
	Application.Game = Application.makeGame(); // holds data, contains update & render for game layer

	// TODO: FOR EACH MENU, MAKE A CREATE<MENUNAME>?
	// TODO: CLEANUP & DELETE
	// TODO: what about each gui menu gets its own canvas and is "always rendering"?
	constructMenus();
	Application.Gui = Application.Menus['mainMenu'];
	Application.InputHandler.registerMouse(Application.InputHandler.mouseTypes.LEFT_CLICK,Application.CheckGuiClick,"GUI");

	Application.Engine = Application.makeEngine(); // calls rendering and updating

	lvl = new Application.PlanningLevel();                         // TODO: CLEANUP & DELETE
	lvl.insert(new Application.PlanningInstruction(1,1,1,'left')); // TODO: CLEANUP & DELETE
	lvl.insert(new Application.PlanningInstruction(1,1,3,'up'));   // TODO: CLEANUP & DELETE

	Application.Engine.run(); // do we call it here?
}
