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
		



		//TODO make sure the simulation level is overwritten in a safe way
		//--unsure of specific requirements
	}

	game.enterSimulationMode = function(){
		if(this.mode === this.modes.SIMULATION)
			return;
		this.mode = this.modes.SIMULATION;
		Application.changeMenu('simulation');

		var simLevel = this.topLevelPlanningLevel.generateSimulationLevel();
		//as far as I know, this is all that really needs to be done.
	}

	game.loadNewLevel = function(inputString){
		this.mode = this.modes.PLANNING;
		//TODO clear old undo-redo cache

		//TODO load planning level from string and set it as our planning level
	}

	return game;
}