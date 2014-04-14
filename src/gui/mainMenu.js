App.setupMainMenu = function(){
	var mainMenu = App.ModeHandler.addNewMode('main menu');

		// ---------------------------------------------

	mainMenu.gfx = App.Canvases.addNewLayer(2).getContext('2d');
	mainMenu.playButton     = new App.Button('Play'    ,'#fff','#000','#f00','#fff',mainMenu.gfx,15,56+28*0,512,24,200,000);
	mainMenu.libraryButton  = new App.Button('Library' ,'#fff','#000','#0f0','#fff',mainMenu.gfx,15,56+28*1,512,24,300,100);
	mainMenu.sandboxButton  = new App.Button('Sandbox' ,'#fff','#000','#00f','#fff',mainMenu.gfx,15,56+28*2,512,24,400,200);
	mainMenu.settingsButton = new App.Button('Settings','#fff','#000','#ff0','#fff',mainMenu.gfx,15,56+28*3,512,24,500,300); // width: App.Canvases.width-30
	mainMenu.alpha = mainMenu.goalAlpha = 0;

		// ---------------------------------------------

	mainMenu.enterFunc = function(){
		mainMenu.requestStaticRenderUpdate = true;
		mainMenu.updatingActive = true;
		mainMenu.exitFlag = false;

		mainMenu.playButton.enter();
		mainMenu.libraryButton.enter();
		mainMenu.sandboxButton.enter();
		mainMenu.settingsButton.enter();
		mainMenu.goalAlpha = 1;

		App.Shade.turnOn();
	}

	mainMenu.updateFunc = function(){
		if(!mainMenu.requestStaticRenderUpdate)return;
		mainMenu.requestStaticRenderUpdate = false;

		mainMenu.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

//		mainMenu.gfx.fillStyle = 'rgba(0,0,0,0.5)';
//		mainMenu.gfx.fillRect(0,0,App.Canvases.width,App.Canvases.height);

		mainMenu.gfx.fillStyle = '#fff';
		text(mainMenu.gfx,"Automaton",15,15,36,-3);

		if(mainMenu.playButton.render())mainMenu.requestStaticRenderUpdate = true;
		if(mainMenu.libraryButton.render())mainMenu.requestStaticRenderUpdate = true;
		if(mainMenu.sandboxButton.render())mainMenu.requestStaticRenderUpdate = true;
		if(mainMenu.settingsButton.render())mainMenu.requestStaticRenderUpdate = true;
		if(mainMenu.alpha !== mainMenu.goalAlpha){
			mainMenu.alpha += expInterp(mainMenu.alpha,mainMenu.goalAlpha,0.003,0.01);
			mainMenu.gfx.globalAlpha = mainMenu.alpha;
			mainMenu.requestStaticRenderUpdate = true;
		}

		if(mainMenu.exitFlag && mainMenu.requestStaticRenderUpdate === false){
			mainMenu.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
			mainMenu.updatingActive = false;
		}
	}

	mainMenu.exitFunc = function(){
		mainMenu.requestStaticRenderUpdate = true;
		mainMenu.exitFlag = true;

		mainMenu.playButton.exit();
		mainMenu.libraryButton.exit();
		mainMenu.sandboxButton.exit();
		mainMenu.settingsButton.exit();
		mainMenu.goalAlpha = 0;
	}

		// ---------------------------------------------

	mainMenu.registerMouseMoveFunc(function(x,y){
		if(mainMenu.playButton.collide(x,y) && !mainMenu.playButton.oldHover)mainMenu.requestStaticRenderUpdate = true;
		if(mainMenu.playButton.oldHover !== mainMenu.playButton.hover)mainMenu.requestStaticRenderUpdate = true;

		if(mainMenu.libraryButton.collide(x,y) && !mainMenu.libraryButton.oldHover)mainMenu.requestStaticRenderUpdate = true;
		if(mainMenu.libraryButton.oldHover !== mainMenu.libraryButton.hover)mainMenu.requestStaticRenderUpdate = true;

		if(mainMenu.sandboxButton.collide(x,y) && !mainMenu.sandboxButton.oldHover)mainMenu.requestStaticRenderUpdate = true;
		if(mainMenu.sandboxButton.oldHover !== mainMenu.sandboxButton.hover)mainMenu.requestStaticRenderUpdate = true;

		if(mainMenu.settingsButton.collide(x,y) && !mainMenu.settingsButton.oldHover)mainMenu.requestStaticRenderUpdate = true;
		if(mainMenu.settingsButton.oldHover !== mainMenu.settingsButton.hover)mainMenu.requestStaticRenderUpdate = true;
	});

	mainMenu.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.LEFT,function(x,y){
		if(mainMenu.playButton.collide(x,y)){
			App.ModeHandler.pushMode('level select');
			mainMenu.requestStaticRenderUpdate = true;
		}if(mainMenu.libraryButton.collide(x,y)){
			App.ModeHandler.pushMode('library');
			mainMenu.requestStaticRenderUpdate = true;
		}if(mainMenu.sandboxButton.collide(x,y)){
			App.Game.currentPlanningLevel = App.Game.parseLevel("empty`0`11`11");
			App.GameRenderer.bestFit();
			App.ModeHandler.pushMode('planning'); // TODO: CHANGE THIS
			mainMenu.requestStaticRenderUpdate = true;
		}if(mainMenu.settingsButton.collide(x,y)){
			App.ModeHandler.pushMode('settings');
			mainMenu.requestStaticRenderUpdate = true;
		}
	});

	mainMenu.registerResizeFunc(function(){
		App.GameRenderer.bestFit();
	});
}
