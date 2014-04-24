App.setupLibrary = function(){
	var library = App.ModeHandler.addNewMode('library');

		// ---------------------------------------------

	library.gfx = App.Canvases.addNewLayer(2).getContext('2d');
	library.gui = new App.guiFrame(library.gfx);

	library.backButton = new App.GuiTextButton(15,56+28*0,200,000,'Back to Main Menu',function(){
		library.requestStaticRenderUpdate = true;
		App.ModeHandler.popMode();
	},false,null,null);
	library.backButton.hoverColor = '#10af10';

	//library.table = new App.GuiTable();

	library.gui.addComponent(library.backButton);
	library.alpha = library.goalAlpha = 0;

		// ---------------------------------------------

	library.enterFunc = function(){
		library.requestStaticRenderUpdate = true;
		library.updatingActive = true;
		library.exitFlag = false;
		App.GameRenderer.bestFit();

		library.gui.enter();
		library.goalAlpha = 1;

		App.Shade.turnOn();
	}

	library.updateFunc = function(){
		if(library.gui.update())
			library.requestStaticRenderUpdate = true;

		if(!library.requestStaticRenderUpdate)return;
		library.requestStaticRenderUpdate = false;

		library.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

		library.gfx.fillStyle = '#fff';
		text(library.gfx,"Library",15,15,36,-3);

		if(library.gui.render())
			library.requestStaticRenderUpdate = true;

		if(library.alpha !== library.goalAlpha){
			library.alpha += expInterp(library.alpha,library.goalAlpha,0.003,0.01);
			library.gfx.globalAlpha = library.alpha;
			library.requestStaticRenderUpdate = true;
		}

		if(library.exitFlag && library.requestStaticRenderUpdate === false){
			library.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
			library.updatingActive = false;
		}
	}

	library.exitFunc = function(){
		library.requestStaticRenderUpdate = true;
		library.exitFlag = true;

		library.gui.exit();
		library.goalAlpha = 0;
	}

		// ---------------------------------------------

	library.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.LEFT, library.gui.mouseDown);
	library.registerMouseUpFunc(App.InputHandler.MOUSEBUTTON.LEFT, library.gui.mouseUp);

	library.registerKeyDownFunc('Esc',function(){
		library.requestStaticRenderUpdate = true;
		App.ModeHandler.popMode();
	});
}
