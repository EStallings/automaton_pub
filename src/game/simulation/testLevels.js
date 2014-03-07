// DELETE THIS FILE ONCE PROPER LEVEL LOADING IS IMPLEMENTED

function test1(){
	var testLevel = new App.SimulationLevel(5,5);
	new App.SimulationAutomaton(testLevel,2,2,App.DIRECTIONS.UP,true,false,true,false);
//	new App.SimulationAutomaton(testLevel,2,2,App.DIRECTIONS.RIGHT,false,true,true,false);
//	new App.SimulationAutomaton(testLevel,2,2,App.DIRECTIONS.DOWN,false,false,true,true);
//	var test = new App.SimulationAutomaton(testLevel,3,2,App.DIRECTIONS.RIGHT,false,true,false,false);
//	test.tokenHeld = new App.SimulationToken(testLevel,3,2,0); // DELETE, this breaks stuff

	for(var c=0;c<4;++c){
		new App.SimulationInstruction(testLevel,0,0,c,"u");
		new App.SimulationInstruction(testLevel,1,0,c,"d");
		new App.SimulationInstruction(testLevel,2,0,c,"l");
		new App.SimulationInstruction(testLevel,3,0,c,"r");
		new App.SimulationInstruction(testLevel,4,0,c,"c");
		new App.SimulationInstruction(testLevel,0,1,c,"w");
		new App.SimulationInstruction(testLevel,1,1,c,"t");
		new App.SimulationInstruction(testLevel,2,1,c,"+");
		new App.SimulationInstruction(testLevel,3,1,c,"-");
		new App.SimulationInstruction(testLevel,4,1,c,"i");
		new App.SimulationInstruction(testLevel,0,2,c,"o");
	}

	return testLevel;
}

function test2(){
	var testLevel = new App.SimulationLevel(5,5);

	new App.SimulationAutomaton(testLevel,2,1,App.DIRECTIONS.RIGHT,true,true,true,true);
	new App.SimulationInstruction(testLevel,1,1,0,"u");
	new App.SimulationInstruction(testLevel,3,3,0,"d");
	new App.SimulationInstruction(testLevel,1,3,0,"l");
	new App.SimulationInstruction(testLevel,3,1,0,"r");

	new App.SimulationAutomaton(testLevel,2,2,App.DIRECTIONS.RIGHT,true,true,true,true);
	new App.SimulationInstruction(testLevel,2,2,0,"w");

	new App.SimulationInstruction(testLevel,1,2,0,"t");
	new App.SimulationInstruction(testLevel,3,2,0,"t");
	new App.SimulationInstruction(testLevel,2,1,0,"t");
	new App.SimulationInstruction(testLevel,2,3,0,"t");

	new App.SimulationToken(testLevel,1,2,0);

	return testLevel;
}

function setupTestLevel(){
	App.Game.currentSimulationLevel = test2();
	App.Game.enterSimulationMode();
}

// DELETE THIS FILE ONCE PROPER LEVEL LOADING IS IMPLEMENTED
