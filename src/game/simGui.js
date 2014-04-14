App.setupSimGui = function(){
	var simMode = App.ModeHandler.addNewMode('simulation');

		// ---------------------------------------------

	simMode.gfx = App.Canvases.addNewLayer(1).getContext('2d');

		// ---------------------------------------------

	simMode.enterFunc = function(){
		simMode.requestStaticRenderUpdate = true;
		simMode.updatingActive = true;
		simMode.exitFlag = false;

		App.Game.setMode(App.Game.modes.SIMULATION);
	}

	simMode.updateFunc = function(){
		if(!simMode.requestStaticRenderUpdate)return;
		simMode.requestStaticRenderUpdate = false;

		simMode.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

		if(simMode.exitFlag && simMode.requestStaticRenderUpdate === false){
			simMode.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
			simMode.updatingActive = false;
		}
	}

	simMode.exitFunc = function(){
		simMode.requestStaticRenderUpdate = true;
		simMode.exitFlag = true;
	}

		// ---------------------------------------------

	simMode.registerKeyDownFunc('Esc',function(){
		App.ModeHandler.popMode();
	});

	simMode.registerKeyDownFunc('Space',function(){
		App.ModeHandler.popMode();
	});

	simMode.registerMouseMoveFunc(function(x,y){
		App.GameRenderer.screenToGridCoords(x,y);
		if(App.InputHandler.rmb)App.GameRenderer.pan(x,y);
	});

	simMode.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.RIGHT,function(x,y){
		App.GameRenderer.beginPan(x,y);
	});

	simMode.registerMouseWheelFunc(function(w){
		App.GameRenderer.zoom(App.InputHandler.mouseX,App.InputHandler.mouseY,w);
	});

	simMode.registerResizeFunc(function(){
		// TODO: move grid relative to center of screen, NOT a bestFit()
	});
}
