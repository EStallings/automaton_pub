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

function test1(){
	var testLevel = new App.PlanningLevel();
	testLevel.width  = 7;
	testLevel.height = 7;

	for(var x=0;x<5;++x)for(var y=0;y<5;++y)
		testLevel.insert(new App.PlanningInstruction(x+1,y+1,0,5*y+x));

	return testLevel;
}

function test2(){
	var testLevel = new App.PlanningLevel();
	testLevel.width  = 8;
	testLevel.height = 3;

	testLevel.insert(new App.PlanningInstruction(1,1,0,3));
	testLevel.insert(new App.PlanningInstruction(1,1,3,3));
	testLevel.insert(new App.PlanningInstruction(2,1,0,12));
	testLevel.insert(new App.PlanningInstruction(2,1,3,23));
	testLevel.insert(new App.PlanningInstruction(3,1,0,10));
	testLevel.insert(new App.PlanningInstruction(3,1,3,14));
	testLevel.insert(new App.PlanningInstruction(4,1,0,17));
	testLevel.insert(new App.PlanningInstruction(4,1,3,17));
	testLevel.insert(new App.PlanningInstruction(5,1,0,11));
	testLevel.insert(new App.PlanningInstruction(5,1,3,15));
	testLevel.insert(new App.PlanningInstruction(6,1,0,13));

	return testLevel;
}

function test3(){
	var testLevel = new App.PlanningLevel();
	testLevel.width  = 7;
	testLevel.height = 6;

	testLevel.insert(new App.PlanningInstruction(1,2,0,3));
	testLevel.insert(new App.PlanningInstruction(1,2,1,3));
	testLevel.insert(new App.PlanningInstruction(1,2,2,3));
	testLevel.insert(new App.PlanningInstruction(1,2,3,2));

	testLevel.insert(new App.PlanningInstruction(2,2,1,4));
	testLevel.insert(new App.PlanningInstruction(2,2,2,5));
	testLevel.insert(new App.PlanningInstruction(2,1,1,7));
	testLevel.insert(new App.PlanningInstruction(2,4,2,7));
	testLevel.insert(new App.PlanningInstruction(4,1,1,5));
	testLevel.insert(new App.PlanningInstruction(4,4,2,4));
	testLevel.insert(new App.PlanningInstruction(4,2,1,7));
	testLevel.insert(new App.PlanningInstruction(4,2,2,7));

	testLevel.insert(new App.PlanningInstruction(5,2,0,22));
	testLevel.insert(new App.PlanningInstruction(5,2,1,22));
	testLevel.insert(new App.PlanningInstruction(5,2,2,22));
	testLevel.insert(new App.PlanningInstruction(5,2,3,22));

	return testLevel;
}

function test4(){
	var testLevel = new App.PlanningLevel();
	testLevel.width  = 0;
	testLevel.height = 0;
	testLevel.insert(new App.PlanningInstruction(0,0,0,0));
	testLevel.insert(new App.PlanningInstruction(0,0,1,1));
	testLevel.insert(new App.PlanningInstruction(0,0,2,2));
	testLevel.insert(new App.PlanningInstruction(0,0,3,3));
	return testLevel;
}

function setupTestLevel(){
	App.Game.currentPlanningLevel = test3();
}

// DELETE THIS FILE ONCE PROPER LEVEL LOADING IS IMPLEMENTED
