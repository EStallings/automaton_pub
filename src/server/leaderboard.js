App.setupLeaderboard = function(){
	var leaderboard = App.ModeHandler.addNewMode('leaderboard');

		// ---------------------------------------------

	leaderboard.gfx = App.Canvases.addNewLayer(2).getContext('2d');
	leaderboard.gui = new App.guiFrame(leaderboard.gfx);

	leaderboard.backButton = new App.GuiTextButton(15,56+28*0,200,000,'Back to Main Menu',function(){
		leaderboard.requestStaticRenderUpdate = true;
		App.ModeHandler.popMode();
	},false,null,null);

	leaderboard.backButton.hoverColor       = '#00ff00';
	leaderboard.backButton.hoverTextColor   = '#ffffff';
	leaderboard.backButton.activeColor      = '#008000';
	leaderboard.backButton.activeTextColor  = '#00ff00';

	var go = function(){
		var type = leaderboard.typeButton.txt;
		var query;
		if(type === 'User') {
			type = 'user';
			query = leaderboard.queryBox.txt;
		}
		else {
			type = 'diff';
			query = leaderboard.diffButton.txt;
		}
		leaderboard.table.loading = true;
		App.Server.getLevels(type, query, leaderboard.table.setData);
	}

	var loadLevel = function(){
		var e = leaderboard.table.getSelectedEntry();
		if(e == null)
			return;
		App.Game.currentPlanningLevel = App.Game.parseLevel(e.level_str);
		App.GameRenderer.bestFit();
		App.ModeHandler.pushMode('planning');
		leaderboard.requestStaticRenderUpdate = true;
	}

	leaderboard.queryBox = new App.GuiTextBox(15+128+10, 56+28*2, 300, 25, "Enter search term here", 100, 100, null, null);
	leaderboard.queryBox.submitFunc = go;

	leaderboard.diffButton = new App.GuiTextButton(15+128+10, 56+28*2,200, 200, 'Easy', function(){
		if(leaderboard.diffButton.txt === 'Easy')
			leaderboard.diffButton.txt = 'Medium';
		else if(leaderboard.diffButton.txt === 'Medium')
			leaderboard.diffButton.txt = 'Hard';
		else if(leaderboard.diffButton.txt === 'Hard')
			leaderboard.diffButton.txt = 'Easy';
	});

	leaderboard.diffButton.hoverColor       = '#00ff00';
	leaderboard.diffButton.hoverTextColor   = '#ffffff';
	leaderboard.diffButton.activeColor      = '#008000';
	leaderboard.diffButton.activeTextColor  = '#00ff00';
	leaderboard.diffButton.w = 300;
	leaderboard.diffButton.dointerp = false;

	leaderboard.typeButton = new App.GuiTextButton(15, 56+28*2, 200, 000, 'User', function(){
		if(leaderboard.typeButton.txt === 'User'){
			leaderboard.typeButton.txt = 'Difficulty';
			leaderboard.gui.removeComponent(leaderboard.queryBox);
			leaderboard.gui.addComponent(leaderboard.diffButton);
		}
		else{
			leaderboard.typeButton.txt = 'User';
			leaderboard.gui.removeComponent(leaderboard.diffButton);
			leaderboard.gui.addComponent(leaderboard.queryBox);
		}
	}, false, null, null);

	leaderboard.typeButton.hoverColor       = '#00ff00';
	leaderboard.typeButton.hoverTextColor   = '#ffffff';
	leaderboard.typeButton.activeColor      = '#008000';
	leaderboard.typeButton.activeTextColor  = '#00ff00';
	leaderboard.typeButton.w = 128;

	leaderboard.goButton = new App.GuiTextButton(15 + 128 + 20 + 300, 56+28*2, 200, 000, 'Search!', go, false, null, null);

	leaderboard.goButton.hoverColor       = '#00ff00';
	leaderboard.goButton.hoverTextColor   = '#ffffff';
	leaderboard.goButton.activeColor      = '#008000';
	leaderboard.goButton.activeTextColor  = '#00ff00';
	leaderboard.goButton.w = 128;

	leaderboard.table = new App.GuiTable(15, 150, 20, [{id:'title', name:"Title"},{id:'description', name:"Description"},{id:'difficulty', name:"Difficulty"},{id:'author_id', name:"Author"},{id:'created', name:"Created"}]);

	leaderboard.loadButton = new App.GuiTextButton(leaderboard.table.w + 30, 152, 200, 000, 'Load Level', loadLevel, false, null, null);

	leaderboard.loadButton.hoverColor       = '#00ff00';
	leaderboard.loadButton.hoverTextColor   = '#ffffff';
	leaderboard.loadButton.activeColor      = '#008000';
	leaderboard.loadButton.activeTextColor  = '#00ff00';
	leaderboard.loadButton.w = 128;

	leaderboard.gui.addComponent(leaderboard.table);
	leaderboard.gui.addComponent(leaderboard.typeButton);
	leaderboard.gui.addComponent(leaderboard.loadButton);
	leaderboard.gui.addComponent(leaderboard.queryBox);
	leaderboard.gui.addComponent(leaderboard.backButton);
	leaderboard.gui.addComponent(leaderboard.goButton);
	leaderboard.alpha = leaderboard.goalAlpha = 0;

		// ---------------------------------------------

	leaderboard.enterFunc = function(){
		leaderboard.requestStaticRenderUpdate = true;
		leaderboard.updatingActive = true;
		leaderboard.exitFlag = false;
		App.GameRenderer.bestFit();

		leaderboard.gui.enter();
		leaderboard.goalAlpha = 1;

		App.Shade.turnOn();
	}

	leaderboard.updateFunc = function(){
		if(leaderboard.gui.update())
			leaderboard.requestStaticRenderUpdate = true;

		if(!leaderboard.requestStaticRenderUpdate)return;
		leaderboard.requestStaticRenderUpdate = false;

		leaderboard.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

		leaderboard.gfx.fillStyle = '#fff';
		text(leaderboard.gfx,"Library",15,15,36,-3);

		if(leaderboard.gui.render())
			leaderboard.requestStaticRenderUpdate = true;

		if(leaderboard.alpha !== leaderboard.goalAlpha){
			leaderboard.alpha += expInterp(leaderboard.alpha,leaderboard.goalAlpha,0.003,0.01);
			leaderboard.gfx.globalAlpha = leaderboard.alpha;
			leaderboard.requestStaticRenderUpdate = true;
		}

		if(leaderboard.exitFlag && leaderboard.requestStaticRenderUpdate === false){
			leaderboard.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
			leaderboard.updatingActive = false;
		}
	}

	leaderboard.exitFunc = function(){
		leaderboard.requestStaticRenderUpdate = true;
		leaderboard.exitFlag = true;

		leaderboard.gui.exit();
		leaderboard.goalAlpha = 0;
	}

		// ---------------------------------------------

	leaderboard.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.LEFT, leaderboard.gui.mouseDown);
	leaderboard.registerMouseUpFunc(App.InputHandler.MOUSEBUTTON.LEFT, leaderboard.gui.mouseUp);

	leaderboard.registerKeyDownFunc('Esc',function(){
		leaderboard.requestStaticRenderUpdate = true;
		App.ModeHandler.popMode();
	});

	leaderboard.registerKeyDownFunc('Enter', function(){if(!leaderboard.table.json) go(); else loadLevel();} );
}
