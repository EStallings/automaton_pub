App.makeEngine = function(){
	var engine = {};
	engine.tick    = 0;
	engine.elapsed = 0;
	engine.fps     = 0;

	engine.run = function(){
		window.onresize();
		engine.tick = new Date().getTime();
		engine.elapsed = 1;
		requestAnimationFrame(engine.frame);
	};

	engine.frame = function(){
		requestAnimationFrame(engine.frame);
		var currentTick = new Date().getTime();
		engine.elapsed = currentTick - engine.tick;
		engine.tick = currentTick;
		if (engine.elapsed>0) engine.fps = 1000/engine.elapsed;

		engine.update();
		engine.render();
	};

	engine.update = function(){
		App.Game.update();
	// XXX:	App.Gui.update();
	};

	engine.render = function(){
		App.GameRenderer.render();
	// XXX:	App.Gui.render();
	};

	return engine;
}
