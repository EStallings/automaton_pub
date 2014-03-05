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
		var guiCanvas = Application.Canvases.layers['GUI'];
		guiCanvas.getContext('2d').clearRect(0,0,guiCanvas.width, guiCanvas.height);
		
		Application.Gui.render();
	};

	return engine;
}
