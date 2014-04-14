App.setupComingSoon = function(){
	var comingSoon = App.ModeHandler.addNewMode('coming soon');

		// ---------------------------------------------

	comingSoon.gfx = App.Canvases.addNewLayer(2).getContext('2d');
	comingSoon.backButton = new App.Button('Back','#fff','#000','#f00','#fff',comingSoon.gfx,15,56+28*0,512,24,200,000);
	comingSoon.alpha = comingSoon.goalAlpha = 0;

		// ---------------------------------------------

	comingSoon.enterFunc = function(){
		comingSoon.requestStaticRenderUpdate = true;
		comingSoon.updatingActive = true;
		comingSoon.exitFlag = false;

		App.GameRenderer.bestFit();
		comingSoon.backButton.enter();
		comingSoon.goalAlpha = 1;

		App.Shade.turnOn();
	}

	comingSoon.updateFunc = function(){
		if(!comingSoon.requestStaticRenderUpdate)return;
		comingSoon.requestStaticRenderUpdate = false;

		comingSoon.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

		comingSoon.gfx.fillStyle = '#fff';
		text(comingSoon.gfx,"Coming Soon",15,15,36,-3);

		if(comingSoon.backButton.render())comingSoon.requestStaticRenderUpdate = true;
		if(comingSoon.alpha !== comingSoon.goalAlpha){
			comingSoon.alpha += expInterp(comingSoon.alpha,comingSoon.goalAlpha,0.003,0.01);
			comingSoon.gfx.globalAlpha = comingSoon.alpha;
			comingSoon.requestStaticRenderUpdate = true;
		}

		if(comingSoon.exitFlag && comingSoon.requestStaticRenderUpdate === false){
			comingSoon.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
			comingSoon.updatingActive = false;
		}
	}

	comingSoon.exitFunc = function(){
		comingSoon.requestStaticRenderUpdate = true;
		comingSoon.exitFlag = true;

		comingSoon.backButton.exit();
		comingSoon.goalAlpha = 0;
	}

		// ---------------------------------------------

	comingSoon.registerMouseMoveFunc(function(x,y){
		if(comingSoon.backButton.collide(x,y) && !comingSoon.backButton.oldHover)comingSoon.requestStaticRenderUpdate = true;
		if(comingSoon.backButton.oldHover !== comingSoon.backButton.hover)comingSoon.requestStaticRenderUpdate = true;
	});

	comingSoon.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.LEFT,function(x,y){
		if(comingSoon.backButton.collide(x,y)){
			App.ModeHandler.popMode();
			comingSoon.requestStaticRenderUpdate = true;
		}
	});

	comingSoon.registerKeyDownFunc('Esc',function(){
		comingSoon.requestStaticRenderUpdate = true;
		App.ModeHandler.popMode();
	});
}
