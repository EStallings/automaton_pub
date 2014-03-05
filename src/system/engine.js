Application.makeEngine = function(){
	var engine = {};
	engine.tick    = 0;
	engine.elapsed = 0;

	// starts the engine | time-dependant engine initializations should go here
	engine.run = function(){
		Application.Engine.tick = new Date().getTime();
		Application.Engine.elapsed = 1;
		requestAnimationFrame(Application.Engine.frame);
	};

	// called once per frame | calculates time, updates, and renders everything
	engine.frame = function(){
		requestAnimationFrame(Application.Engine.frame);
		var currentTick = new Date().getTime();
		Application.Engine.elapsed = currentTick - Application.Engine.tick;
		Application.Engine.tick = currentTick;
		
		Application.Engine.update();
		Application.Engine.render();
	};

	// calls all appropriate update functions
	engine.update = function(){
		Application.Game.update();
		Application.Gui.update();
	};

	// calls all appropriate render functions
	engine.render = function(){
		Application.Game.render();

		// TODO: THE GUI SHOULD HAVE A REFERENCE TO ITS OWN CANVAS | CLEAR THE GUI INSIDE GUI'S RENDER, NOT HERE
		var guiCanvas = Application.Canvases.layers['GUI'];                          // TODO: CLEAN THIS UP
		guiCanvas.getContext('2d').clearRect(0,0,guiCanvas.width, guiCanvas.height); // TODO: CLEAN THIS UP
		
		Application.Gui.render();
	};

	return engine;
}
