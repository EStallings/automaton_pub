window.onload = function(){
	// console.debug("Initializing application"); // TODO: CLEANUP & DELETE
	App.Canvases     = App.createCanvasArray();
	App.InputHandler = App.makeInputHandler();

	// ========================================================== //

	// TODO: what about each gui menu gets its own canvas and is "always rendering"?
	App.Gui = App.makeGUI();
	
	//Made some changes. Uncomment the line below this to see!
	//App.makeDemoGui();
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
	setupTestLevel(); // DELETE DELETE DELETE DELETE DELETE
	// ========================================================== //
}


App.makeDemoGui = function(){
	App.Gui.addNewFrame('test');
	var dragButton = new App.GuiDragButton(new App.GuiCollisionRect(100,200,100,50), null, null, null);
	var textButton = new App.GuiTextButton(new App.GuiCollisionRect(100,100,100,50), "foo bar", function(){ console.log("hi");});
	var textBox = new App.GuiTextBox(new App.GuiCollisionRect(100,300,100,50), "I am a text box!", null);
	var editBox = new App.GuiEditableTextBox(new App.GuiCollisionRect(100,400,100,50), "Edit me", null);
	App.Gui.addNewComponent('test', dragButton);
	App.Gui.addNewComponent('test', textButton);
	App.Gui.addNewComponent('test', textBox);
	App.Gui.addNewComponent('test', editBox);
}