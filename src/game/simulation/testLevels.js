// DELETE THIS FILE ONCE PROPER LEVEL LOADING IS IMPLEMENTED

var testLevel;

function setupTestLevel(){
	testLevel = new App.SimulationLevel(5,5);
	new App.SimulationAutomaton(testLevel,2,2,App.DIRECTIONS.UP,true,false,true,false);
	new App.SimulationAutomaton(testLevel,2,2,App.DIRECTIONS.RIGHT,false,true,true,false);
	new App.SimulationAutomaton(testLevel,2,2,App.DIRECTIONS.DOWN,false,false,true,true);
	var test = new App.SimulationAutomaton(testLevel,3,2,App.DIRECTIONS.RIGHT,false,true,false,false);
	test.tokenHeld = new App.SimulationToken(testLevel,3,2,0); // DELETE, this breaks stuff

	App.Game.currentSimulationLevel = testLevel;
	App.Game.enterSimulationMode();
}

// DELETE THIS FILE ONCE PROPER LEVEL LOADING IS IMPLEMENTED
