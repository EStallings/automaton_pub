window.onload = function(){
	debug("Initializing application");
	Application.Canvases = Application.createCanvasArray(); // TODO: CHANGE THIS TO CREATECANVASARRAY
	Application.InputHandler = Application.makeInputHandler();
	Application.Game = Application.makeGame(); // game object holds data and has update and render functions

	// TODO: FOR EACH MENU, MAKE A CREATE<MENUNAME>?
	constructMenus();
	Application.Gui = Application.Menus['mainMenu'];
	Application.InputHandler.registerMouse(Application.InputHandler.mouseTypes.LEFT_CLICK,Application.CheckGuiClick,"GUI");

	Application.Engine = Application.makeEngine(); // calls rendering and updating

	lvl = new Application.PlanningLevel();                         // TODO: CLEANUP
	lvl.insert(new Application.PlanningInstruction(1,1,1,'left')); // TODO: CLEANUP
	lvl.insert(new Application.PlanningInstruction(1,1,3,'up'));   // TODO: CLEANUP

	Application.Engine.run(); // do we call it here?
}
