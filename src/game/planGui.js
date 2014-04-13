App.setupPlanGui = function(){
	var planMode = App.ModeHandler.addNewMode('planning');

		// ---------------------------------------------

	planMode.gfx = App.Canvases.addNewLayer(1).getContext('2d');
	planMode.direction = App.DIRECTIONS.UP;
	planMode.color = App.COLORS.RED;

		// ---------------------------------------------

	planMode.enterFunc = function(){
		planMode.requestStaticRenderUpdate = true;
		planMode.updatingActive = true;
		planMode.exitFlag = false;
	}

	planMode.updateFunc = function(){
		if(!planMode.requestStaticRenderUpdate)return;
		planMode.requestStaticRenderUpdate = false;

		planMode.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

		var x=0;
		App.InstCatalog.render(planMode.gfx, 0+planMode.direction,10+x++*50,10,planMode.color,48);
		App.InstCatalog.render(planMode.gfx, 4,10+x++*50,10,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,12,10+x++*50,10,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,15,10+x++*50,10,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,13,10+x++*50,10,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,18+planMode.direction,10+x++*50,10,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,26+planMode.direction,10+x++*50,10,planMode.color,48);
		App.InstCatalog.render(planMode.gfx, 8,10+x++*50,10,planMode.color,48);

		var x=0;
		App.InstCatalog.render(planMode.gfx, 7,10+x++*50,10+50,planMode.color,48);
		App.InstCatalog.render(planMode.gfx, 6,10+x++*50,10+50,planMode.color,48);
		App.InstCatalog.render(planMode.gfx, 5,10+x++*50,10+50,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,16,10+x++*50,10+50,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,14,10+x++*50,10+50,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,22+planMode.direction,10+x++*50,10+50,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,17,10+x++*50,10+50,planMode.color,48);
		App.InstCatalog.render(planMode.gfx, 9,10+x++*50,10+50,planMode.color,48);

		if(planMode.exitFlag && planMode.requestStaticRenderUpdate === false){
			planMode.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
			planMode.updatingActive = false;
		}
	}

	planMode.exitFunc = function(){
		planMode.requestStaticRenderUpdate = true;
		planMode.exitFlag = true;
	}

		// ---------------------------------------------

	planMode.registerKeyDownFunc('Esc',function(){
		App.ModeHandler.popMode();
		App.GameRenderer.bestFit();
	});

	planMode.registerKeyDownFunc('Space',function(){
		App.ModeHandler.pushMode('simulation');
		App.Game.toggleMode();
	});

	planMode.registerKeyDownFunc('W',function(){
		planMode.direction = App.DIRECTIONS.UP;
		planMode.requestStaticRenderUpdate = true;
	});

	planMode.registerKeyDownFunc('S',function(){
		planMode.direction = App.DIRECTIONS.DOWN;
		planMode.requestStaticRenderUpdate = true;
	});

	planMode.registerKeyDownFunc('A',function(){
		planMode.direction = App.DIRECTIONS.LEFT;
		planMode.requestStaticRenderUpdate = true;
	});

	planMode.registerKeyDownFunc('D',function(){
		planMode.direction = App.DIRECTIONS.RIGHT;
		planMode.requestStaticRenderUpdate = true;
	});

	planMode.registerKeyDownFunc('1',function(){
		planMode.color = App.COLORS.RED;
		planMode.requestStaticRenderUpdate = true;
	});

	planMode.registerKeyDownFunc('2',function(){
		planMode.color = App.COLORS.GREEN;
		planMode.requestStaticRenderUpdate = true;
	});

	planMode.registerKeyDownFunc('3',function(){
		planMode.color = App.COLORS.BLUE;
		planMode.requestStaticRenderUpdate = true;
	});

	planMode.registerKeyDownFunc('4',function(){
		planMode.color = App.COLORS.YELLOW;
		planMode.requestStaticRenderUpdate = true;
	});

	planMode.registerMouseMoveFunc(function(x,y){
		App.GameRenderer.screenToGridCoords(x,y);
		if(App.InputHandler.rmb)App.GameRenderer.pan(x,y);
	});

	planMode.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.RIGHT,function(x,y){
		App.GameRenderer.beginPan(x,y);
	});

	planMode.registerMouseWheelFunc(function(w){
		App.GameRenderer.zoom(App.InputHandler.mouseX,App.InputHandler.mouseY,w);
	});

	planMode.registerResizeFunc(function(){
		// TODO: move grid relative to center of screen, NOT a bestFit()
	});
}
