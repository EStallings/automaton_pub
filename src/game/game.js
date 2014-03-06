App.makeGame = function(){
	var game = {};

	// TODO: make canvas layers for each object type
	game.gfx = App.Canvases.addNewLayer("game",-1).getContext("2d");
	game.gfx.lineWidth = 2; // interestingly enough, making this an even number gives a HUGE performance boost

	game.modes = {SIMULATION:'sim',PLANNING:'plan'}; // why are these strings?
	game.mode = game.modes.SIMULATION; // XXX: AT ITS CURRENT STATE, THIS NEEDS TO BE INITIALIZED TO SIMULATION

	game.currentPlanningLevel;
	game.currentSimulationLevel;
	// game.currentRenderedLevel; // only applicable when functions come into play

	game.lastCycleTick;
	game.nextCycleTick;
	game.cycles;
	game.simulationSpeed = 500;
	game.interpolation;

	game.renderX = 0;
	game.renderY = 0;
	game.cellSize = 6*Math.pow(2,3);

	// ========================================================== //

	game.update = function(){
		if(game.mode === game.modes.PLANNING &&
		   game.currentPlanningLevel !== undefined)
			// Do nothing, I believe. -- lets have a planning mode
			// update anyways, theres a possibility of time-dependant
			// animations for example.
			game.currentPlanningLevel.update();
		else if(game.currentSimulationLevel !== undefined)
		while(App.Engine.tick > game.nextCycleTick){
			if(game.simulationSpeed <= 0)break; // TODO: change to pause
			game.currentSimulationLevel.update();
			game.lastCycleTick = game.nextCycleTick;
			game.nextCycleTick += game.simulationSpeed;
			++game.cycles;
		}
	}

	game.dynamicRender = function(){
		game.interpolation = (App.Engine.tick-game.lastCycleTick)
		                   / (game.nextCycleTick-game.lastCycleTick);

		// clear canvas backgrounds
		game.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

		// pan grid
		game.gfx.save();
		game.gfx.translate(game.renderX,game.renderY);


		// render level
	//	if(game.mode === game.modes.PLANNING &&
	//	   game.currentPlanningLevel !== undefined)
	//		// TODO: CALL DYNAMIC RENDER METHODS ONLY
	//		game.currentPlanningLevel.render();
	//	else if(game.currentSimulationLevel !== undefined)
	//		// TODO: CALL DYNAMIC RENDER METHODS ONLY
			game.currentSimulationLevel.staticRender(); // DELETE
			game.currentSimulationLevel.dynamicRender();
	//		game.currentSimulationLevel.render();

		game.gfx.restore();
	}

	// TODO: call initial static rendering
	game.staticRender = function(){
		// clear canvas backgrounds

		// pan grid
		game.gfx.save();
		game.gfx.translate(game.renderX,game.renderY);

		// render level
	//	if(game.mode === game.modes.PLANNING &&
	//	   game.currentPlanningLevel !== undefined)
	//		game.currentPlanningLevel.render();
	//	else if(game.currentSimulationLevel !== undefined)
	//		game.currentSimulationLevel.staticRender(); // DELETE

		game.gfx.restore();
	}

	// TODO: call staticRender inside pan and zoom
	// TODO: game.pan(x,y){}
	// TODO: game.zoom(f){} // from cursor or center?

	// ========================================================== //

	game.enterPlanningMode = function(levelString){
		if(game.mode === game.modes.PLANNING)return;
		game.mode = game.modes.PLANNING;
		App.changeMenu('planning'); // TODO: USE THE NEW GUI CALL ONCE ITS WRITTEN

		if(levelString)game.currentPlanningLevel = game.loadNewLevel(levelString);
		else game.currentPlanningLevel = game.createNewLevel();
		game.currentRenderedLevel = game.currentPlanningLevel;

		// TODO: clear old undo-redo cache
		// TODO: setup render vars (center level, default zoom)
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

	// TODO: IMPLEMENT THIS
	game.simulationError = function(errorCode){
		// TODO: stop simulation
		// TODO: display error
		// TODO: go back to planning mode
	}

	// TODO: IMPLEMENT THIS
	game.simulationSuccess = function(){
		// TODO: stop simulation
		// TODO: display scores
		//       instruction count
		//       ticks elapsed
		//       automaton count (fork?) (min max total)
		//       cell usage
		// TODO: exit/next level...
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
