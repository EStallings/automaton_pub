App.setupModificationGui = function(){
	var modder = App.ModeHandler.addNewMode('modder');
	var returnFunc = function(){
		modder.requestStaticRenderUpdate = true;
		App.ModeHandler.popMode();
	}

	modder.gfx = App.Canvases.addNewLayer(2).getContext('2d');
	modder.gui = new App.guiFrame(modder.gfx);

	modder.applyButton = new App.GuiTextButton(15,100,200,000,'Apply', returnFunc,false,null,null);
	modder.applyButton.hoverColor = '#af1010';



	modder.gui.addComponent(modder.applyButton);
	modder.alpha = modder.goalAlpha = 0;
	modder.callback = null;
	modder.type = 0;
		// ---------------------------------------------
	modder.init = function(type, callback){
		modder.callback = callback;
		modder.type = type;
	}

	modder.enterFunc = function(){
		modder.requestStaticRenderUpdate = true;
		modder.updatingActive = true;
		modder.exitFlag = false;
		modder.gui.enter();
		modder.goalAlpha = 1;

		App.Shade.turnOn();
	}

	modder.updateFunc = function(){
		if(modder.gui.update())
			modder.requestStaticRenderUpdate = true;

		if(!modder.requestStaticRenderUpdate)return;
		modder.requestStaticRenderUpdate = false;

		modder.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

		modder.gfx.fillStyle = '#fff';
		text(modder.gfx,"Edit Instruction",15,15,36,-3);

		if(modder.gui.render())
			modder.requestStaticRenderUpdate = true;

		if(modder.alpha !== modder.goalAlpha){
			modder.alpha += expInterp(modder.alpha,modder.goalAlpha,0.003,0.01);
			modder.gfx.globalAlpha = modder.alpha;
			modder.requestStaticRenderUpdate = true;
		}

		if(modder.exitFlag && modder.requestStaticRenderUpdate === false){
			modder.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
			modder.updatingActive = false;
		}
	}

	modder.exitFunc = function(){
		modder.requestStaticRenderUpdate = true;
		modder.exitFlag = true;

		modder.gui.exit();
		modder.goalAlpha = 0;
	}

	modder.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.LEFT, modder.gui.mouseDown);
	modder.registerMouseUpFunc(App.InputHandler.MOUSEBUTTON.LEFT, modder.gui.mouseUp);

	modder.registerResizeFunc(function(){
		App.GameRenderer.bestFit();
	});
}