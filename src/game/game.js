App.makeGame = function(){
	var game = {};

	// ========================================================== //
	// ====================== LEVEL-SPECIFIC ==================== //
	// ========================================================== //

	game.currentPlanningLevel;
	game.currentSimulationLevel;

	game.createNewLevel = function(name,width,height){
		var lvl = new PlanningLevel();
		lvl.name        = name;
		lvl.dateCreated = new Date.getTime();
		lvl.width       = width;
		lvl.height      = height;
		return lvl;
	}

	// returns undefined if the level string is invalid
	game.parseLevel = function(str){
		var lvl = new PlanningLevel();
		if(!str)return undefined;
		var data = str.split('~');
		for(var i=0;i<data.length;++i)data[i] = data[i].split('`');
		if(data.length<1)return undefined;
		if(data[0].length!==4)return undefined;
		lvl.name        = data[0][0];
		lvl.dateCreated = parseInt(data[0][1]);
		lvl.width       = parseInt(data[0][2]);
		lvl.height      = parseInt(data[0][3]);
		if(isNaN(lvl.dateCreated) || isNaN(lvl.width) || isNaN(lvl.height))return undefined;
		if(lvl.width < 0 || lvl.height < 0)return undefined;
		for(var i=1;i<data.length;++i){
			if(data[i].length<4)return undefined;
			var x = parseInt(data[i][0]);
			var y = parseInt(data[i][1]);
			var c = parseInt(data[i][2]);
			var t = parseInt(data[i][3]);
			if(isNaN(x) || isNaN(y) || isNaN(c) || isNaN(t))return undefined;
			if(lvl.width  !== 0 && (x < 0 || x >= lvl.width ))return undefined;
			if(lvl.height !== 0 && (y < 0 || y >= lvl.height))return undefined;
			if(c < 0 || c >= 4)return undefined;
			if(!lvl.insert(x,y,c,t))return undefined;
		}return lvl;
	}

		/*--------------------------------------------*/

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
