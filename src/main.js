window.onload = function(){
	console.debug("Initializing application");
	Application.Canvases = Application.makeCanvases();
	Application.InputHandler = Application.makeInputHandler();
	Application.Game = Application.makeGame(); // game object holds data and has update and render functions
	Application.Gui = Application.makeGui();
	Application.Engine = Application.makeEngine(); // calls rendering and updating

	lvl = new Application.PlanningLevel();
	lvl.insert(new Application.PlanningInstruction(1,1,0,'left arrow'));

	Application.Engine.run(); // do we call it here?
}

