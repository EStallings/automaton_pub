App.setupMainMenu = function(){
	var mainMenu = App.ModeHandler.addNewMode('main menu');

		// ---------------------------------------------

	mainMenu.gfx = App.Canvases.addNewLayer('plan gui',1);

	mainMenu.entranceFunc = function(){
		mainMenu.updatingActive = true;
		mainMenu.exitFlag = false;
		App.GameRenderer.bestFit();
	}

	mainMenu.updateFunc = function(){
		mainMenu.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
		if(mainMenu.exitFlag){
			mainMenu.updatingActive = false;
			return;
		}

		mainMenu.gfx.fillStyle = 'rgba(0,0,0,0.5)';
		mainMenu.gfx.fillRect(0,0,App.Canvases.width,App.Canvases.height);

		mainMenu.gfx.fillStyle = '#fff';
		text(mainMenu.gfx,"Automaton",15,15,36,-3);

		mainMenu.gfx.fillRect(15,56+28*0,App.Canvases.width-30,24);
		mainMenu.gfx.fillRect(15,56+28*1,App.Canvases.width-30,24);
		mainMenu.gfx.fillRect(15,56+28*2,App.Canvases.width-30,24);
		mainMenu.gfx.fillRect(15,56+28*3,App.Canvases.width-30,24);

		mainMenu.gfx.fillStyle = '#000';
		text(mainMenu.gfx,"Play"     ,17,59+28*0,18,-2);
		text(mainMenu.gfx,"Library"  ,17,59+28*1,18,-2);
		text(mainMenu.gfx,"Sandbox"  ,17,59+28*2,18,-2);
		text(mainMenu.gfx,"Settings" ,17,59+28*3,18,-2);
	}

	mainMenu.exitFunc = function(){
		mainMenu.exitFlag = true;
	}

		// ---------------------------------------------

	mainMenu.registerKeyDownFunc('Space',function(){
		App.ModeHandler.pushMode('simulation');
		App.Game.toggleMode();
	});

	mainMenu.registerMouseMoveFunc(function(x,y){
		App.GameRenderer.screenToGridCoords(x,y);
		if(App.InputHandler.rmb)App.GameRenderer.pan(x,y);
	});

	mainMenu.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.RIGHT,function(x,y){
		App.GameRenderer.beginPan(x,y);
	});

	mainMenu.registerMouseWheelFunc(function(w){
		App.GameRenderer.zoom(App.InputHandler.mouseX,App.InputHandler.mouseY,w);

	});
}
