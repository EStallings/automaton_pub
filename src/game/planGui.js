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

		App.Game.setMode(App.Game.modes.PLANNING);
	}

	planMode.updateFunc = function(){
		if(!planMode.requestStaticRenderUpdate)return;
		planMode.requestStaticRenderUpdate = false;

		planMode.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

	// TOP BAR -----------------------------------------------------

		App.InstCatalog.render(planMode.gfx, 8,0,0,0,48,'I');
		App.InstCatalog.render(planMode.gfx, 8,0,0,0,48,'O');
		planMode.gfx.fillStyle = '#ffffff';
		text(planMode.gfx,'wants',100,110,8,-1);

		console.log(App.Game.inStreams.length);
		for(var i=0;i<App.Game.inStreams.length;++i){
			var stream = App.Game.inStreams[i];
			App.InstCatalog.render(planMode.gfx,8,5+i*50,5,0,48);
			text(planMode.gfx,'gives',100,100,8,-1);
		}

	// BOTTOM BAR --------------------------------------------------

		var xOffset = Math.floor((App.Canvases.width-50*8)/2)+1;
		var yOffset = App.Canvases.height-100-2-5;

		planMode.gfx.fillStyle = 'rgba(0,0,0,0.8)';
		planMode.gfx.fillRect(xOffset-5,yOffset-5,50*8-2+10,100-2+10);

		var x=0;
		App.InstCatalog.render(planMode.gfx, 0+planMode.direction,xOffset+x++*50,yOffset,planMode.color,48);
		App.InstCatalog.render(planMode.gfx, 4,xOffset+x++*50,yOffset,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,12,xOffset+x++*50,yOffset,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,15,xOffset+x++*50,yOffset,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,13,xOffset+x++*50,yOffset,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,18+planMode.direction,xOffset+x++*50,yOffset,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,26+planMode.direction,xOffset+x++*50,yOffset,planMode.color,48);
		App.InstCatalog.render(planMode.gfx, 8,xOffset+x++*50,yOffset,planMode.color,48,'I');

		var x=0;
		App.InstCatalog.render(planMode.gfx, 7,xOffset+x++*50,yOffset+50,planMode.color,48);
		App.InstCatalog.render(planMode.gfx, 6,xOffset+x++*50,yOffset+50,planMode.color,48);
		App.InstCatalog.render(planMode.gfx, 5,xOffset+x++*50,yOffset+50,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,16,xOffset+x++*50,yOffset+50,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,14,xOffset+x++*50,yOffset+50,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,22+planMode.direction,xOffset+x++*50,yOffset+50,planMode.color,48);
		App.InstCatalog.render(planMode.gfx,17,xOffset+x++*50,yOffset+50,planMode.color,48);
		App.InstCatalog.render(planMode.gfx, 9,xOffset+x++*50,yOffset+50,planMode.color,48,'O');

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
		App.loadDemo();
		App.ModeHandler.popMode();
	});

	planMode.registerKeyDownFunc('Space',function(){
		App.ModeHandler.pushMode('simulation');
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
