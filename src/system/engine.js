// contains master loop | calls rendering and updating for everything
Application.makeEngine = function(){
	var engine = {};
	engine.tick    = 0;
	engine.elapsed = 0;
	engine.fps     = 0;

	// starts the engine | time-dependant engine initializations should go here
	engine.run = function(){
		engine.tick = new Date().getTime();
		engine.elapsed = 1;
		requestAnimationFrame(engine.frame);
	};

	// called once per frame | calculates time, updates, and renders everything
	engine.frame = function(){
		requestAnimationFrame(engine.frame);
		var currentTick = new Date().getTime();
		engine.elapsed = currentTick - engine.tick;
		engine.tick = currentTick;
		if(engine.elapsed>0)engine.fps = 1000/engine.elapsed;
		
		engine.update();
		engine.render();
	};

	// calls all appropriate update functions
	engine.update = function(){
		Application.Game.update();
		Application.Gui.update();
	};

	// calls all appropriate render functions
	engine.render = function(){
		Application.Game.render();
		Application.Gui.render();
	};

	return engine;
}
