window.onload = function(){
	// console.debug("Initializing application"); // TODO: CLEANUP & DELETE
	App.Canvases     = App.createCanvasArray();
	App.InputHandler = App.makeInputHandler();
	App.Gui          = App.makeGUI();
	App.Game         = App.makeGame();
	App.Engine       = App.makeEngine();
	App.Engine.run();

	// TEMPORARY STUFF | DELETE ================================= //
	// TODO: what about each gui menu gets its own canvas and is "always rendering"?
	// Made some changes. Uncomment the line below this to see!
	App.makeDemoGui();

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

App.makeDemoGui = function(){
	App.Gui.addNewFrame('test');
	var panel = new App.GuiPanel(new App.GuiCollisionRect(0, 75, 250, 600));
	var dragButton1 = new App.GuiDragButton(new App.GuiCollisionRect(25,125,50,50), null, null, panel);
	var dragButton2 = new App.GuiDragButton(new App.GuiCollisionRect(100,125,50,50), null, null, panel);
	var textButton = new App.GuiTextButton(new App.GuiCollisionRect(25,25,100,50), "foo bar", function(){ console.log("hi");}, false, panel);
	
	//intentionally global for debugging
	textBox = new App.GuiTextBox(new App.GuiCollisionRect(25,225,100,50), "I am a text box!", panel);
	textBox.cRect.functional = true;

	var editBox = new App.GuiEditableTextBox(new App.GuiCollisionRect(25,325,200,50), "Edit me", panel);
	App.Gui.addNewComponent('test', panel);
	App.Gui.addNewComponent('test', dragButton1);
	App.Gui.addNewComponent('test', dragButton2);
	App.Gui.addNewComponent('test', textButton);
	App.Gui.addNewComponent('test', textBox);
	App.Gui.addNewComponent('test', editBox);


	var sliderButton = new App.GuiSliderButton(new App.GuiCollisionRect(200,100,50,25), null);
	var sliderLine = new App.GuiSliderLine(new App.GuiCollisionRect(200,100,10, 400), 0, 100, 2, null, null);
	sliderButton.sliderLine = sliderLine;
	sliderLine.sliderButton = sliderButton;
	App.Gui.addNewComponent('test', sliderLine);
	App.Gui.addNewComponent('test', sliderButton);

	var sliderButton2 = new App.GuiSliderButton(new App.GuiCollisionRect(250,525,50,25), null);
	var sliderLine2 = new App.GuiSliderLine(new App.GuiCollisionRect(200,525, 250, 10), 0, 18, 1, null, null);
	sliderButton2.sliderLine = sliderLine2;
	sliderLine2.sliderButton = sliderButton2;
	App.Gui.addNewComponent('test', sliderLine2);
	App.Gui.addNewComponent('test', sliderButton2);


}
