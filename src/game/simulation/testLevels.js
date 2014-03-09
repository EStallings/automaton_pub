// DELETE THIS FILE ONCE PROPER LEVEL LOADING IS IMPLEMENTED

/*
	Instruction type id's

	------------------------------------------------ automaton spawn
	 0: spawn up			 1: spawn down
	 2: spawn left			 3: spawn right
	---------------------------------------------- direction control
	 4: up				 5: down
	 6: left			 7: right
	 8: rotate cw			 9: rotate ccw
	------------------------------------------------------- token IO
	10: in stream			11: out stream
	12: in				13: out
	--------------------------------------------- token manipulation
	14: grab			15: drop
	16: grab/drop			17: inc
	18: dec
	-------------------------------------------- conditional control
	19: switch 0			20: switch +-
	21: switch even odd
	----------------------------------------------------------- misc
	22: sync			23: color toggle
	24: pause

	// TODO: ALL SWITCHES NEED UP DOWN LEFT RIGHT
*/

function test2(){
	var testLevel = new App.SimulationLevel(5,5);

	new App.SimulationAutomaton(testLevel,2,1,App.DIRECTIONS.RIGHT,App.COLORS.RED);
	new App.SimulationInstruction(testLevel,1,1,0,4);
	new App.SimulationInstruction(testLevel,3,3,0,5);
	new App.SimulationInstruction(testLevel,1,3,0,6);
	new App.SimulationInstruction(testLevel,3,1,0,7);

	new App.SimulationAutomaton(testLevel,2,2,App.DIRECTIONS.RIGHT,App.COLORS.RED);
	new App.SimulationInstruction(testLevel,2,2,0,8);

	new App.SimulationInstruction(testLevel,1,2,0,16);
	new App.SimulationInstruction(testLevel,3,2,0,16);
	new App.SimulationInstruction(testLevel,2,1,0,16);
	new App.SimulationInstruction(testLevel,2,3,0,16);

	new App.SimulationToken(testLevel,1,2,0);

	return testLevel;
}

function test3(){
	var testLevel = new App.SimulationLevel(7,7);

	for(var x=0;x<5;++x)for(var y=0;y<5;++y)
		new App.SimulationInstruction(testLevel,x+1,y+1,0,5*y+x);

	return testLevel;
}

function test4(){
	var testLevel = new App.SimulationLevel(8,3);

	new App.SimulationInstruction(testLevel,1,1,0,3);
	new App.SimulationInstruction(testLevel,1,1,3,3);
	new App.SimulationInstruction(testLevel,2,1,0,12);
	new App.SimulationInstruction(testLevel,2,1,3,23);
	new App.SimulationInstruction(testLevel,3,1,0,10);
	new App.SimulationInstruction(testLevel,3,1,3,14);
	new App.SimulationInstruction(testLevel,4,1,0,17);
	new App.SimulationInstruction(testLevel,4,1,3,17);
	new App.SimulationInstruction(testLevel,5,1,0,11);
	new App.SimulationInstruction(testLevel,5,1,3,15);
	new App.SimulationInstruction(testLevel,6,1,0,13);

	return testLevel;
}

function test5(){
	var testLevel = new App.SimulationLevel(4,3);

	new App.SimulationInstruction(testLevel,1,1,0,3);
	new App.SimulationInstruction(testLevel,2,1,0,23);
	new App.SimulationInstruction(testLevel,2,1,1,23);
	new App.SimulationInstruction(testLevel,2,1,2,23);
	new App.SimulationInstruction(testLevel,2,1,3,23);

	return testLevel;
}

function test6(){
	var testLevel = new App.SimulationLevel(7,5);

	new App.SimulationInstruction(testLevel,1,2,0,3);
	new App.SimulationInstruction(testLevel,1,2,1,3);
	new App.SimulationInstruction(testLevel,1,2,2,3);
	new App.SimulationInstruction(testLevel,1,2,3,3);

	new App.SimulationInstruction(testLevel,2,2,1,4);
	new App.SimulationInstruction(testLevel,2,2,2,5);
	new App.SimulationInstruction(testLevel,2,1,1,7);
	new App.SimulationInstruction(testLevel,2,3,2,7);
	new App.SimulationInstruction(testLevel,4,1,1,5);
	new App.SimulationInstruction(testLevel,4,3,2,4);
	new App.SimulationInstruction(testLevel,4,2,1,7);
	new App.SimulationInstruction(testLevel,4,2,2,7);

	new App.SimulationInstruction(testLevel,5,2,0,22);
	new App.SimulationInstruction(testLevel,5,2,1,22);
	new App.SimulationInstruction(testLevel,5,2,2,22);

	return testLevel;
}

function setupTestLevel(){
	App.Game.currentSimulationLevel = test6();
	App.Game.enterSimulationMode();
}

// DELETE THIS FILE ONCE PROPER LEVEL LOADING IS IMPLEMENTED
