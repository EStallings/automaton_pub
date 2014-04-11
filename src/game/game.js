App.makeGame = function(){
	var game = {};

	// ========================================================== //
	// ====================== LEVEL-SPECIFIC ==================== //
	// ========================================================== //

	game.currentPlanningLevel;
	game.currentSimulationLevel;

	game.loadLevel = function(levelString,mode){
		// TODO: setup render vars (center level, default zoom)
	}

	game.loadNewLevel = function(str){
		var level = parseLevel(str);
		if(!level)return false;
		this.currentPlanningLevel = level;
		return true;
	}

	// ========================================================== //
	// ====================== MODE-SPECIFIC ===================== //
	// ========================================================== //

		/*+------------------------------------------+*/

	game.modes = {SIMULATION:0,PLANNING:1};
	game.mode = game.modes.PLANNING; // XXX: shouldnt this be setup by the initializing context

	game.setMode = function(mode){
		if(mode === game.mode)return;
		game.toggleMode();
	}

	game.toggleMode = function(mode){
		if(game.mode === game.modes.SIMULATION){
			game.currentSimulationLevel = game.currentPlanningLevel.generateSimulationLevel();
			game.requestStaticRenderUpdate = true;
			game.paused = false;
			game.nextCycleTick = App.Engine.tick;
			game.cycle = 0;
		}else{
			game.mode = game.modes.PLANNING;
			game.currentSimulationLevel = undefined;
			game.automGfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
			game.tokenSGfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
			game.requestStaticRenderUpdate = true;
			game.paused = true;
		}
	}

	// ========================================================== //
	// =================== SIMULATION-SPECIFIC ================== //
	// ========================================================== //

	game.lastCycleTick;
	game.nextCycleTick;
	game.cycle;
	game.simulationSpeed = 512;

	game.requestPause = false;
	game.paused = true;
	game.pauseTick;
	game.pauseLastCycleTick;
	game.pauseNextCycleTick;

		/*+------------------------------------------+*/

	game.simulationError = function(errorMsg){
		// TODO: stop simulation
		// TODO: display error
		// TODO: go back to planning mode
	}

	game.simulationSuccess = function(){
		// TODO: stop simulation
		// TODO: display scores
		//       instruction count
		//       ticks elapsed
		//       automaton count (fork?) (min max total)
		//       cell usage
		// TODO: exit/next level...
	}

	game.update = function(){
		if(game.mode === game.modes.PLANNING &&
		   game.currentPlanningLevel !== undefined &&
		   game.currentPlanningLevel.update)
			game.currentPlanningLevel.update();
		else if(game.currentSimulationLevel !== undefined){
			if(!game.paused)while(App.Engine.tick > game.nextCycleTick){
				if(game.simulationSpeed <= 0)break;
				game.lastCycleTick = game.nextCycleTick;
				game.nextCycleTick += game.simulationSpeed;
				++game.cycle;
				game.currentSimulationLevel.update();
				if(game.requestPause){
					game.requestPause = false;
					game.lastCycleTick = App.Engine.tick;
					game.nextCycleTick = App.Engine.tick+game.simulationSpeed;
					game.pause();
					return;
				}
			}else{
				var diff = App.Engine.tick-game.pauseTick;
				game.lastCycleTick = game.pauseLastCycleTick+diff;
				game.nextCycleTick = game.pauseNextCycleTick+diff;
			}
		}
	}

	game.pause = function(){
		game.paused = !game.paused;
		if(!game.paused && game.mode === game.modes.PLANNING)game.setMode(game.modes.SIMULATION);
		game.pauseTick = App.Engine.tick;
		game.pauseLastCycleTick = game.lastCycleTick;
		game.pauseNextCycleTick = game.nextCycleTick;
	}

	game.setSimulationSpeed = function(speed){
		if(game.paused)game.pause();
		if(game.mode === game.modes.PLANNING)game.setMode(game.modes.SIMULATION);
		if(speed<1)return;

		var tick = App.Engine.tick;
		var last = game.lastCycleTick;
		var next = game.nextCycleTick;
		var interp = (tick-last)/(next-last);
		var factor = speed/game.simulationSpeed;

		game.lastCycleTick = tick-(tick-last)*factor;
		game.nextCycleTick = tick+(next-tick)*factor;
		game.simulationSpeed = speed;
	}

	// ========================================================== //

	return game;
}
