App.setupLibrary = function(){
	var library = App.ModeHandler.addNewMode('library');

		// ---------------------------------------------

	library.gfx = App.Canvases.addNewLayer(1).getContext('2d');
	library.backButton = new App.Button('Back to Main Menu','#fff','#000','#0f0','#fff',library.gfx,15,56+28*0,512,24,200,000);

		// ---------------------------------------------

	library.enterFunc = function(){
		library.requestStaticRenderUpdate = true;
		library.updatingActive = true;
		library.exitFlag = false;
		App.GameRenderer.bestFit();

		library.backButton.enter();
	}

	library.updateFunc = function(){
		if(!library.requestStaticRenderUpdate)return;
		library.requestStaticRenderUpdate = false;

		library.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

//		library.gfx.fillStyle = 'rgba(0,0,0,0.5)';
//		library.gfx.fillRect(0,0,App.Canvases.width,App.Canvases.height);

		library.gfx.fillStyle = '#fff';
		text(library.gfx,"Library",15,15,36,-3);

		if(library.backButton.render())library.requestStaticRenderUpdate = true;

		if(library.exitFlag && library.requestStaticRenderUpdate === false){
			library.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
			library.updatingActive = false;
		}
	}

	library.exitFunc = function(){
		library.requestStaticRenderUpdate = true;
		library.exitFlag = true;

		library.backButton.exit();
	}

		// ---------------------------------------------

	library.registerMouseMoveFunc(function(x,y){
		if(library.backButton.collide(x,y) && !library.backButton.oldHover)library.requestStaticRenderUpdate = true;
		if(library.backButton.oldHover !== library.backButton.hover)library.requestStaticRenderUpdate = true;
	});

	library.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.LEFT,function(x,y){
		if(library.backButton.collide(x,y)){
			App.ModeHandler.popMode();
			library.requestStaticRenderUpdate = true;
		}
	});

	library.registerKeyDownFunc('Esc',function(){
		library.requestStaticRenderUpdate = true;
		App.ModeHandler.popMode();
	});
}
