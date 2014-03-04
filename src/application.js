/*
	Explanation: In order for other things to access this, it has to be loaded first.
	HOWEVER we don't want to load main.js (and therefore risk running the application) until
	every OTHER script has been loaded. So that's why there's this script instead of just
	putting it all in main. Stupid fucking JavaScript.
*/
Application = {}; // top level object. holds everything'

Application.COLORS = {
	RED:0,
	GREEN:1,
	BLUE:2,
	YELLOW:3
};

Application.DIRECTIONS = {
	UP:0,
	LEFT:1,
	DOWN:2,
	RIGHT:3
};

// makes canvases
Application.makeCanvases = function(){
	var canvases = {};
	canvases.width;
	canvases.height;
	canvases.layers = {};

	// resizes all canvases to browser window
	canvases.resize = function(){} // TODO, this is dependant on inputHandler...

	// creates a new canvas with specified name and depth
	canvases.makeNewLayer = function(name, depth){} // TODO: return canvas

	return canvases;
}

Application.makeGui = function(){
	var gui = {};

	// set up canvases here?

	gui.render = function(){}; // TODO
	gui.update = function(){}; // TODO

	return gui;
}

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

	game.enterPlanningMode = function(){
		if(this.mode === this.modes.PLANNING)
			return;
		this.mode = this.modes.PLANNING;

		var simLevel = this.topLevelPlanningLevel.generateSimulationLevel();

		//TODO make sure the simulation level is overwritten in a safe way
		//--unsure of specific requirements
	}

	game.enterSimulationMode = function(){
		if(this.mode === this.modes.SIMULATION)
			return;
		this.mode = this.modes.SIMULATION;
		//as far as I know, this is all that really needs to be done.
	}

	game.loadNewLevel = function(inputString){
		this.mode = this.modes.PLANNING;
		//TODO clear old undo-redo cache

		//TODO load planning level from string and set it as our planning level
	}

	return game;
}

Application.makeEngine = function(){
	var engine = {};

	engine.tick = 0;
	engine.elapsed = 0;

	// TODO
	engine.run = function(){
		Application.Engine.tick = new Date().getTime();
		Application.Engine.elapsed = 1;
		requestAnimationFrame(Application.Engine.frame);
	};

	// TODO if we want this fixed-update, we're gonna need updateTick and renderTick, at this point, I feel fixed-updates are unnecessary
	engine.frame = function(){
		requestAnimationFrame(Application.Engine.frame);
		var currentTick = new Date().getTime();
		Application.Engine.elapsed = currentTick - Application.Engine.tick;
		Application.Engine.tick = currentTick;
		
		Application.Engine.update();
		Application.Engine.render();
	};

	engine.setUpdateSpeed = function(){}; // TODO

	engine.update = function(){
		Application.Game.update();
		Application.Gui.update();
	};

	engine.render = function(){
		Application.Game.render();
		Application.Gui.render();
	};

	return engine;
}
