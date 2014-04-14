App.setupSettings = function(){
	var settings = App.ModeHandler.addNewMode('settings');

		// ---------------------------------------------

	settings.gfx = App.Canvases.addNewLayer(2).getContext('2d');
	settings.backButton = new App.Button('Back to Main Menu','#fff','#000','#ff0','#fff',settings.gfx,15,56+28*0,512,24,200,000);
	settings.alpha = settings.goalAlpha = 0;

		// ---------------------------------------------

	settings.enterFunc = function(){
		settings.requestStaticRenderUpdate = true;
		settings.updatingActive = true;
		settings.exitFlag = false;
		App.GameRenderer.bestFit();

		settings.backButton.enter();
		settings.goalAlpha = 1;

		App.Shade.turnOn();
	}

	settings.updateFunc = function(){
		if(!settings.requestStaticRenderUpdate)return;
		settings.requestStaticRenderUpdate = false;

		settings.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

		settings.gfx.fillStyle = '#fff';
		text(settings.gfx,"Settings",15,15,36,-3);

		if(settings.backButton.render())settings.requestStaticRenderUpdate = true;
		if(settings.alpha !== settings.goalAlpha){
			settings.alpha += expInterp(settings.alpha,settings.goalAlpha,0.003,0.01);
			settings.gfx.globalAlpha = settings.alpha;
			settings.requestStaticRenderUpdate = true;
		}

		if(settings.exitFlag && settings.requestStaticRenderUpdate === false){
			settings.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
			settings.updatingActive = false;
		}
	}

	settings.exitFunc = function(){
		settings.requestStaticRenderUpdate = true;
		settings.exitFlag = true;

		settings.backButton.exit();
		settings.goalAlpha = 0;
	}

		// ---------------------------------------------

	settings.registerMouseMoveFunc(function(x,y){
		if(settings.backButton.collide(x,y) && !settings.backButton.oldHover)settings.requestStaticRenderUpdate = true;
		if(settings.backButton.oldHover !== settings.backButton.hover)settings.requestStaticRenderUpdate = true;
	});

	settings.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.LEFT,function(x,y){
		if(settings.backButton.collide(x,y)){
			App.ModeHandler.popMode();
			settings.requestStaticRenderUpdate = true;
		}
	});

	settings.registerKeyDownFunc('Esc',function(){
		settings.requestStaticRenderUpdate = true;
		App.ModeHandler.popMode();
	});
}
