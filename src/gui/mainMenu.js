App.setupMainMenu = function(){
	var mainMenu = App.ModeHandler.addNewMode('main menu');

		// ---------------------------------------------

	mainMenu.gfx = App.Canvases.addNewLayer(2).getContext('2d');
	mainMenu.gui = new App.guiFrame(mainMenu.gfx);

	mainMenu.playButton = new App.GuiTextButton(15, 56+28*0, 200, 000, 'Play', function(){
		App.ModeHandler.pushMode('level select');
		App.ModeHandler.modes['planning'].isSandbox = false;
		mainMenu.requestStaticRenderUpdate = true;
	}, false, null, null);

	mainMenu.libraryButton = new App.GuiTextButton(15, 56+28*1, 300, 100, 'Library', function(){
		App.ModeHandler.pushMode('library');
		App.ModeHandler.modes['planning'].isSandbox = true;
		mainMenu.requestStaticRenderUpdate = true;
	}, false, null, null);

	mainMenu.sandboxButton = new App.GuiTextButton(15, 56+28*2, 400, 200, 'Sandbox', function(){
		App.Game.currentPlanningLevel = App.Game.parseLevel("empty`0`10`10");
		App.GameRenderer.bestFit();
		App.ModeHandler.modes['planning'].isSandbox = true;
		App.ModeHandler.pushMode('planning'); // TODO: CHANGE THIS
		mainMenu.requestStaticRenderUpdate = true;
	}, false, null, null);

	mainMenu.settingsButton = new App.GuiTextButton(15, 56+28*3, 500, 300, 'Help', function(){
		App.ModeHandler.pushMode('help');
		mainMenu.requestStaticRenderUpdate = true;
	}, false, null, null);

	mainMenu.playButton.hoverColor          = '#ff0000';
	mainMenu.playButton.hoverTextColor      = '#ffffff';
	mainMenu.playButton.activeColor         = '#800000';
	mainMenu.playButton.activeTextColor     = '#ff0000';
	mainMenu.libraryButton.hoverColor       = '#00ff00';
	mainMenu.libraryButton.hoverTextColor   = '#ffffff';
	mainMenu.libraryButton.activeColor      = '#008000';
	mainMenu.libraryButton.activeTextColor  = '#00ff00';
	mainMenu.sandboxButton.hoverColor       = '#0000ff';
	mainMenu.sandboxButton.hoverTextColor   = '#ffffff';
	mainMenu.sandboxButton.activeColor      = '#000080';
	mainMenu.sandboxButton.activeTextColor  = '#0000ff';
	mainMenu.settingsButton.hoverColor      = '#ffff00';
	mainMenu.settingsButton.hoverTextColor  = '#ffffff';
	mainMenu.settingsButton.activeColor     = '#808000';
	mainMenu.settingsButton.activeTextColor = '#ffff00';

	mainMenu.gui.addComponent(mainMenu.playButton);
	mainMenu.gui.addComponent(mainMenu.libraryButton);
	mainMenu.gui.addComponent(mainMenu.sandboxButton);
	mainMenu.gui.addComponent(mainMenu.settingsButton);
	mainMenu.alpha = mainMenu.goalAlpha = 0;

		// ---------------------------------------------

	mainMenu.enterFunc = function(){
		mainMenu.requestStaticRenderUpdate = true;
		mainMenu.updatingActive = true;
		mainMenu.exitFlag = false;
		mainMenu.gui.enter();
		mainMenu.goalAlpha = 1;

		App.Shade.turnOn();
	}

	mainMenu.updateFunc = function(){
		if(mainMenu.gui.update())
			mainMenu.requestStaticRenderUpdate = true;

		if(!mainMenu.requestStaticRenderUpdate)return;
		mainMenu.requestStaticRenderUpdate = false;

		mainMenu.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

		mainMenu.gfx.fillStyle = '#fff';
		text(mainMenu.gfx,"Automaton",15,15,36,-3);
		text(mainMenu.gfx, 'Created by:',    15, App.Canvases.height - 130+18*0, 12, -1);
		text(mainMenu.gfx, 'Luke Balaoro',   20, App.Canvases.height - 130+18*1, 12, -1);
		text(mainMenu.gfx, 'Ezra Stallings', 20, App.Canvases.height - 130+18*2, 12, -1);
		text(mainMenu.gfx, 'Kevin Dilts',    20, App.Canvases.height - 130+18*3, 12, -1);
		text(mainMenu.gfx, 'Khabbab Saleem', 20, App.Canvases.height - 130+18*4, 12, -1);
		text(mainMenu.gfx, 'Cameron Smith',  20, App.Canvases.height - 130+18*5, 12, -1);

		if(mainMenu.gui.render())
			mainMenu.requestStaticRenderUpdate = true;

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

		mainMenu.gui.exit();
		mainMenu.goalAlpha = 0;
	}

	mainMenu.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.LEFT, mainMenu.gui.mouseDown);
	mainMenu.registerMouseUpFunc(App.InputHandler.MOUSEBUTTON.LEFT, mainMenu.gui.mouseUp);

	mainMenu.registerResizeFunc(function(){
		App.GameRenderer.bestFit();
	});
}
