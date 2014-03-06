App.makeGame = function(){
	var game = {};

	// TODO: SETUP CANVASES

	game.modes = {SIMULATION:'sim', PLANNING:'plan'}; // why are these strings?
	game.mode = game.modes.SIMULATION; // XXX: AT ITS CURRENT STATE, THIS NEEDS TO BE INITIALIZED TO SIMULATION

	game.currentPlanningLevel;
	game.currentSimulationLevel;
	// game.currentRenderedLevel; // only applicable when functions come into play

	game.lastCycleTick;
	game.nextCycleTick;
	game.cycles;
	game.simulationSpeed;

	game.update = function(){
		if(game.mode === game.modes.PLANNING){
			// Do nothing, I believe. -- lets have a planning mode
			// update anyways, theres a possibility of time-dependant
			// animations for example.
		}else{
		}
	};

	game.render = function(){
		if(game.mode === game.modes.PLANNING){
		}else{
		}
	};

	// ========================================================== //

	game.enterPlanningMode = function(levelString){
		if(game.mode === game.modes.PLANNING)return;
		game.mode = game.modes.PLANNING;
		App.changeMenu('planning'); // TODO: USE THE NEW GUI CALL ONCE ITS WRITTEN

		if(levelString)game.currentPlanningLevel = game.loadNewLevel(levelString);
		else game.currentPlanningLevel = game.createNewLevel();
		game.currentRenderedLevel = game.currentPlanningLevel;

		// TODO clear old undo-redo cache
	}

	game.enterSimulationMode = function(){
		if(game.mode === game.modes.SIMULATION)return;
		game.mode = game.modes.SIMULATION;
		App.changeMenu('simulation'); // TODO: USE THE NEW GUI CALL ONCE ITS WRITTEN
		game.currentSimulationLevel = game.currentPlanningLevel.generateSimulationLevel();
		game.currentRenderedLevel = game.currentSimulationLevel;

		// TODO: CALL INSTRUCTION start() FUNCTIONS
		// TODO: SETUP CYCLE VARIABLES
	}

	// ========================================================== //

	game.createNewLevel = function(){} // TODO: implement this

	game.loadNewLevel = function(inputString){
		var split = inputString.split(";");
		var lev = new App.PlanningLevel();
		if(split.length > 0){
			var levDat = split[0].split(',');
			lev.name = levDat[0];
			lev.width = parseInt(levDat[1]);
			lev.height = parseInt(levDat[2]);

			for(var i = 1; i < split.length; i++){
				var instDat = split[i].split(',');
				var x = parseInt(instDat[0]);
				var y = parseInt(instDat[1]);
				var col = instDat[2];
				var typ = parseInt(instDat[3]);
				var inst = new App.PlanningInstruction(x, y, col, typ);
				lev.insert(inst);
			}
		}return lev;
	}

	return game;
}
