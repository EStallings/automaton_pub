// holds data, contains update & render for game layer
Application.makeGame = function(){
	var game = {};
	
	//TODO  set up canvases here?
	game.modes = {SIMULATION:'sim', PLANNING:'plan'};
	game.mode = game.modes.PLANNING; // planning or simulation

	game.topLevelPlanningLevel;
	game.topLevelSimulationLevel;
	game.currentRenderedLevel;

	game.lastCycleTick;
	game.nextCycleTick;
	game.cycles;
	game.simulationSpeed;

	game.update = function(){
		if(this.mode === this.modes.PLANNING){
			//TODO Do nothing, I believe.
			return;
		}
		//TODO else, simulation level

		//? Interpolation ?
		//Loop over gameplay objects and update internal state
		//--Unsure which objects need updating. Just automatons?

		//--Do we preserve the current state while we make changes to avoid
		//--non-deterministic behavior? I'll discuss this with the group in more
		//--detail, but basically if we don't do this, order of which cell gets updated
		//--could radically alter gameplay in a way that looks random to users.
	};

	game.render = function(){
		if(this.mode === this.modes.PLANNING){
			//TODO render planning mode
		}
		else{
			//TODO render simulation mode
		}
	};

	game.enterPlanningMode = function(levelString){
		Application.changeMenu('planning'); 
		if(this.mode === this.modes.PLANNING)
			return;

		this.mode = this.modes.PLANNING;

		if(levelString)
			this.loadNewLevel(levelString);

		this.currentRenderedLevel = this.topLevelPlanningLevel;
	}

	game.enterSimulationMode = function(){
		if(this.mode === this.modes.SIMULATION)
			return;
		this.mode = this.modes.SIMULATION;
		Application.changeMenu('simulation');

		this.topLevelSimulationLevel = this.topLevelPlanningLevel.generateSimulationLevel();
		this.currentRenderedLevel = this.topLevelSimulationLevel;
		//as far as I know, this is all that really needs to be done.
	}

	game.loadNewLevel = function(inputString){
		this.mode = this.modes.PLANNING;

		var split = inputString.split(";");
		var lev = new Application.PlanningLevel();
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
				var inst = new Application.PlanningInstruction(x, y, col, typ);
				lev.insert(inst);
			}
		}

		this.topLevelPlanningLevel = lev;
		this.currentRenderedLevel = lev;
		//TODO clear old undo-redo cache

		//TODO load planning level from string and set it as our planning level
	}

	return game;
}
