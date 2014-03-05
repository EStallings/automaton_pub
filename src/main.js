window.onload = function(){
	console.debug("Initializing application");
	Application.Canvases = Application.makeCanvases();
	Application.InputHandler = Application.makeInputHandler();
	Application.Game = Application.makeGame(); // game object holds data and has update and render functions
	
	constructMenus();
	Application.Gui = Application.Menus['mainMenu'];
	Application.InputHandler.registerMouse(Application.InputHandler.mouseTypes.LEFT_CLICK, Application.CheckGuiClick, "GUI");

	Application.Engine = Application.makeEngine(); // calls rendering and updating

	Application.Engine.run(); // do we call it here?

	lvl = new Application.PlanningLevel();
	lvl.insert(new Application.PlanningInstruction(1,1,1,'left'));
	lvl.insert(new Application.PlanningInstruction(1,1,3,'up'));
	
}

