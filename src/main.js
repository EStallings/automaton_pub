window.onload = function(){
	// console.debug("Initializing application"); // TODO: CLEANUP & DELETE
	App.Canvases     = App.createCanvasArray();
	App.InputHandler = App.makeInputHandler();

	// ========================================================== //
	// TODO: FOR EACH MENU, MAKE A CREATE<MENUNAME>?
	// TODO: CLEANUP & DELETE
	// TODO: what about each gui menu gets its own canvas and is "always rendering"?
	App.Gui = App.makeGUI();
	// constructMenus();
	// App.Gui = App.Menus['mainMenu'];
	//App.InputHandler.registerMouse(App.InputHandler.mouseTypes.LEFT_CLICK,App.CheckGuiClick,"GUI");
	// ========================================================== //

	App.Game   = App.makeGame();
	App.Engine = App.makeEngine();

	App.Engine.run();

	// TEMPORARY LEVEL STUFF | DELETE =========================== //
	// the engine needs to be running before this happens
	lvl = new App.PlanningLevel();                         // TODO: CLEANUP & DELETE
	lvl.insert(new App.PlanningInstruction(1,1,1,'left')); // TODO: CLEANUP & DELETE
	lvl.insert(new App.PlanningInstruction(1,1,3,'up'));   // TODO: CLEANUP & DELETE
	lvl.insert(new App.PlanningInstruction(2,2,3,'down'));   // TODO: CLEANUP & DELETE
	ins = [];
	ins[0] = new App.PlanningInstruction(3,3,3,'right');
	ins[1] = new App.PlanningInstruction(3,3,1,'down');

	z = []; z[0] = []; z[1] = [];
	z[0][0] = 1; z[0][1] = 1; z[0][2] = 1;
	z[1][0] = 1; z[1][1] = 1; z[1][2] = 3;


	setupTestLevel(); // DELETE DELETE DELETE DELETE DELETE
	// ========================================================== //
}
