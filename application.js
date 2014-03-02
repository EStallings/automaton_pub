/*
	Explanation: In order for other things to access this, it has to be loaded first.
	HOWEVER we don't want to load main.js (and therefore risk running the application) until
	every OTHER script has been loaded. So that's why there's this script instead of just
	putting it all in main. Stupid fucking JavaScript.
*/
Application = {}; // top level object. holds everything

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
	
	// set up canvases here?

	game.mode; // planning or simulation

	game.topLevelPlanningLevel;
	game.topLevelSimulationLevel;
	game.currentRenderedLevel;

	game.lastCycleTick;
	game.nextCycleTick;
	game.cycles;
	game.simulationSpeed;

	game.update = function(){};
	game.render = function(){};

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
