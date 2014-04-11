App.setupLevelSelect = function(){
	var levelSelect = App.ModeHandler.addNewMode('level select');

		// ---------------------------------------------

	levelSelect.gfx = App.Canvases.addNewLayer('level select',1);
	levelSelect.backButton = new App.Button('Back to Main Menu','#fff','#000','#f00','#fff',levelSelect.gfx,15,56+28*0,512,24,200,000);

		// ---------------------------------------------

	levelSelect.enterFunc = function(){
		levelSelect.requestStaticRenderUpdate = true;
		levelSelect.updatingActive = true;
		levelSelect.exitFlag = false;
		App.GameRenderer.bestFit();

		levelSelect.backButton.enter();
	}

	levelSelect.updateFunc = function(){
		if(!levelSelect.requestStaticRenderUpdate)return;
		levelSelect.requestStaticRenderUpdate = false;

		levelSelect.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

		levelSelect.gfx.fillStyle = 'rgba(0,0,0,0.5)';
		levelSelect.gfx.fillRect(0,0,App.Canvases.width,App.Canvases.height);

		levelSelect.gfx.fillStyle = '#fff';
		text(levelSelect.gfx,"Level Select",15,15,36,-3);

		if(levelSelect.backButton.render())levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.exitFlag && levelSelect.requestStaticRenderUpdate === false){
			levelSelect.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
			levelSelect.updatingActive = false;
		}
	}

	levelSelect.exitFunc = function(){
		levelSelect.requestStaticRenderUpdate = true;
		levelSelect.exitFlag = true;

		levelSelect.backButton.exit();
	}

		// ---------------------------------------------

	levelSelect.registerMouseMoveFunc(function(x,y){
		if(levelSelect.backButton.collide(x,y) && !levelSelect.backButton.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.backButton.oldHover !== levelSelect.backButton.hover)levelSelect.requestStaticRenderUpdate = true;
	});

	levelSelect.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.LEFT,function(x,y){
		if(levelSelect.backButton.collide(x,y)){
			App.ModeHandler.popMode();
			levelSelect.requestStaticRenderUpdate = true;
		}
	});

	levelSelect.registerKeyDownFunc('Esc',function(){
		levelSelect.requestStaticRenderUpdate = true;
		App.ModeHandler.popMode();
	});
}
