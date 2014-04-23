App.setupLevelSelect = function(){
	var levelSelect = App.ModeHandler.addNewMode('level select');

		// ---------------------------------------------

	levelSelect.gfx = App.Canvases.addNewLayer(2).getContext('2d');
	levelSelect.lvl1Button = new App.Button('Move','#fff','#000','#f00','#fff',levelSelect.gfx,15+172*0,56+28*0,168,24,200,000);
	levelSelect.lvl2Button = new App.Button('Increment','#fff','#000','#f00','#fff',levelSelect.gfx,15+172*1,56+28*0,168,24,230,030);
	levelSelect.lvl3Button = new App.Button('Mod 2','#fff','#000','#f00','#fff',levelSelect.gfx,15+172*2,56+28*0,168,24,260,060);
	levelSelect.lvl4Button = new App.Button('Instruction Set','#fff','#000','#f00','#fff',levelSelect.gfx,15+172*0,56+28*1,168,24,300,100);
	levelSelect.lvl5Button = new App.Button('Add','#fff','#000','#f00','#fff',levelSelect.gfx,15+172*1,56+28*1,168,24,330,130);
	levelSelect.lvl6Button = new App.Button('Multiply','#fff','#000','#f00','#fff',levelSelect.gfx,15+172*2,56+28*1,168,24,360,160);
	levelSelect.lvl7Button = new App.Button('Level 7','#fff','#000','#f00','#fff',levelSelect.gfx,15+172*0,56+28*2,168,24,400,200);
	levelSelect.lvl8Button = new App.Button('Level 8','#fff','#000','#f00','#fff',levelSelect.gfx,15+172*1,56+28*2,168,24,430,230);
	levelSelect.lvl9Button = new App.Button('Level 9','#fff','#000','#f00','#fff',levelSelect.gfx,15+172*2,56+28*2,168,24,460,260);
	levelSelect.lvl10Button = new App.Button('Level 10','#fff','#000','#f00','#fff',levelSelect.gfx,15+172*0,56+28*3,168,24,500,300);
	levelSelect.lvl11Button = new App.Button('Level 11','#fff','#000','#f00','#fff',levelSelect.gfx,15+172*1,56+28*3,168,24,530,330);
	levelSelect.lvl12Button = new App.Button('Level 12','#fff','#000','#f00','#fff',levelSelect.gfx,15+172*2,56+28*3,168,24,560,360);
	levelSelect.backButton = new App.Button('Back to Main Menu','#fff','#000','#f00','#fff',levelSelect.gfx,15,56+28*4,512,24,600,400);
	levelSelect.alpha = levelSelect.goalAlpha = 0;

		// ---------------------------------------------

	levelSelect.enterFunc = function(){
		levelSelect.requestStaticRenderUpdate = true;
		levelSelect.updatingActive = true;
		levelSelect.exitFlag = false;
		App.GameRenderer.bestFit();

		levelSelect.lvl1Button.enter();
		levelSelect.lvl2Button.enter();
		levelSelect.lvl3Button.enter();
		levelSelect.lvl4Button.enter();
		levelSelect.lvl5Button.enter();
		levelSelect.lvl6Button.enter();
		levelSelect.lvl7Button.enter();
		levelSelect.lvl8Button.enter();
		levelSelect.lvl9Button.enter();
		levelSelect.lvl10Button.enter();
		levelSelect.lvl11Button.enter();
		levelSelect.lvl12Button.enter();
		levelSelect.backButton.enter();
		levelSelect.goalAlpha = 1;

		App.Shade.turnOn();
	}

	levelSelect.updateFunc = function(){
		if(!levelSelect.requestStaticRenderUpdate)return;
		levelSelect.requestStaticRenderUpdate = false;

		levelSelect.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

		levelSelect.gfx.fillStyle = '#fff';
		text(levelSelect.gfx,"Level Select",15,15,36,-3);

		if(levelSelect.lvl1Button.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl2Button.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl3Button.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl4Button.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl5Button.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl6Button.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl7Button.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl8Button.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl9Button.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl10Button.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl11Button.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl12Button.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.backButton.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.alpha !== levelSelect.goalAlpha){
			levelSelect.alpha += expInterp(levelSelect.alpha,levelSelect.goalAlpha,0.003,0.01);
			levelSelect.gfx.globalAlpha = levelSelect.alpha;
			levelSelect.requestStaticRenderUpdate = true;
		}

		if(levelSelect.exitFlag && levelSelect.requestStaticRenderUpdate === false){
			levelSelect.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
			levelSelect.updatingActive = false;
		}
	}

	levelSelect.exitFunc = function(){
		levelSelect.requestStaticRenderUpdate = true;
		levelSelect.exitFlag = true;

		levelSelect.lvl1Button.exit();
		levelSelect.lvl2Button.exit();
		levelSelect.lvl3Button.exit();
		levelSelect.lvl4Button.exit();
		levelSelect.lvl5Button.exit();
		levelSelect.lvl6Button.exit();
		levelSelect.lvl7Button.exit();
		levelSelect.lvl8Button.exit();
		levelSelect.lvl9Button.exit();
		levelSelect.lvl10Button.exit();
		levelSelect.lvl11Button.exit();
		levelSelect.lvl12Button.exit();
		levelSelect.backButton.exit();
		levelSelect.goalAlpha = 0;
	}

		// ---------------------------------------------

	levelSelect.registerMouseMoveFunc(function(x,y){
		if(levelSelect.lvl1Button.collide(x,y) && !levelSelect.lvl1Button.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl1Button.oldHover     !== levelSelect.lvl1Button.hover)levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.lvl2Button.collide(x,y) && !levelSelect.lvl2Button.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl2Button.oldHover     !== levelSelect.lvl2Button.hover)levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.lvl3Button.collide(x,y) && !levelSelect.lvl3Button.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl3Button.oldHover     !== levelSelect.lvl3Button.hover)levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.lvl4Button.collide(x,y) && !levelSelect.lvl4Button.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl4Button.oldHover     !== levelSelect.lvl4Button.hover)levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.lvl5Button.collide(x,y) && !levelSelect.lvl5Button.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl5Button.oldHover     !== levelSelect.lvl5Button.hover)levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.lvl6Button.collide(x,y) && !levelSelect.lvl6Button.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl6Button.oldHover     !== levelSelect.lvl6Button.hover)levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.lvl7Button.collide(x,y) && !levelSelect.lvl7Button.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl7Button.oldHover     !== levelSelect.lvl7Button.hover)levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.lvl8Button.collide(x,y) && !levelSelect.lvl8Button.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl8Button.oldHover     !== levelSelect.lvl8Button.hover)levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.lvl9Button.collide(x,y) && !levelSelect.lvl9Button.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl9Button.oldHover     !== levelSelect.lvl9Button.hover)levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.lvl10Button.collide(x,y) && !levelSelect.lvl10Button.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl10Button.oldHover     !== levelSelect.lvl10Button.hover)levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.lvl11Button.collide(x,y) && !levelSelect.lvl11Button.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl11Button.oldHover     !== levelSelect.lvl11Button.hover)levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.lvl12Button.collide(x,y) && !levelSelect.lvl12Button.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl12Button.oldHover     !== levelSelect.lvl12Button.hover)levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.backButton.collide(x,y) && !levelSelect.backButton.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.backButton.oldHover !== levelSelect.backButton.hover)levelSelect.requestStaticRenderUpdate = true;
	});

	levelSelect.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.LEFT,function(x,y){
		if(levelSelect.lvl1Button.collide(x,y)){
			App.Game.setMode(App.Game.modes.PLANNING);
			App.Game.currentPlanningLevel = App.Game.parseLevel("moving`0`9`5~2`2`0`8`I`random(0,10)~6`2`0`9`O`I`10");
			App.GameRenderer.bestFit();
			App.ModeHandler.pushMode('planning');
			levelSelect.requestStaticRenderUpdate = true;
		}if(levelSelect.lvl2Button.collide(x,y)){
			App.Game.setMode(App.Game.modes.PLANNING);
			App.Game.currentPlanningLevel = App.Game.parseLevel("increment`0`9`5~2`2`0`8`I`random(0,10)~6`2`0`9`O`I+3`10");
			App.GameRenderer.bestFit();
			App.ModeHandler.pushMode('planning');
			levelSelect.requestStaticRenderUpdate = true;
		}if(levelSelect.lvl3Button.collide(x,y)){
			App.Game.setMode(App.Game.modes.PLANNING);
			App.Game.currentPlanningLevel = App.Game.parseLevel("mod 2`0`11`5~2`2`0`8`I`random(0,10)~8`2`0`9`O`I%2`10");
			App.GameRenderer.bestFit();
			App.ModeHandler.pushMode('planning');
			levelSelect.requestStaticRenderUpdate = true;
		}if(levelSelect.lvl4Button.collide(x,y)){
			App.Game.setMode(App.Game.modes.PLANNING);
			App.Game.currentPlanningLevel = App.Game.parseLevel("AllInstructions`0`10`13~1`1`0`0~2`1`0`1~3`1`0`2~4`1`0`3~1`2`0`4~2`2`0`5~3`2`0`6~4`2`0`7~1`3`0`19~2`3`0`20~3`3`0`21~4`3`0`22~1`4`0`23~2`4`0`24~3`4`0`25~4`4`0`26~1`5`0`27~2`5`0`28~3`5`0`29~4`5`0`30~1`6`0`31~2`6`0`32~3`6`0`33~4`6`0`34~6`1`0`10~7`1`0`11~8`1`0`12~6`2`0`13~7`2`0`14~8`2`0`15~6`3`0`18~6`5`0`16~6`5`1`16~6`5`2`16~6`5`3`16~8`5`0`17~8`5`1`17~8`5`2`17~8`5`3`17~1`8`0`8`A`0~2`8`0`8`B`0~3`8`0`8`C`0~4`8`0`8`D`0~5`8`0`8`E`0~6`8`0`8`F`0~7`8`0`8`G`0~8`8`0`8`H`0~1`9`1`8`I`0~2`9`1`8`J`0~3`9`1`8`K`0~4`9`1`8`L`0~5`9`1`8`M`0~6`9`1`8`N`0~7`9`1`8`O`0~8`9`1`8`P`0~1`10`2`8`Q`0~2`10`2`8`R`0~3`10`2`8`S`0~4`10`2`8`T`0~5`10`2`8`U`0~6`10`2`8`V`0~7`10`2`8`W`0~8`10`2`8`X`0~4`11`3`8`Y`0~5`11`3`8`Z`0");
			App.GameRenderer.bestFit();
			App.ModeHandler.pushMode('planning');
			levelSelect.requestStaticRenderUpdate = true;
		}if(levelSelect.lvl5Button.collide(x,y)){
			App.Game.setMode(App.Game.modes.PLANNING);
			App.Game.currentPlanningLevel = App.Game.parseLevel("add`0`11`11~2`2`0`8`A`random(0,10)~2`8`1`8`B`random(0,10)~8`5`2`9`O`A+B`10");
			// SOLUTION: "add`0`11`11~2`1`0`2~2`1`2`17~2`2`0`8~2`2`2`6~2`5`0`12~2`5`1`13~2`5`2`5~2`8`1`8~2`8`2`4~2`9`1`0~2`9`2`17~8`2`2`7~8`5`0`4~8`5`1`6~8`5`2`9~8`8`2`7"
			App.GameRenderer.bestFit();
			App.ModeHandler.pushMode('planning');
			levelSelect.requestStaticRenderUpdate = true;
		}if(levelSelect.lvl6Button.collide(x,y)){
			App.Game.setMode(App.Game.modes.PLANNING);
			App.Game.currentPlanningLevel = App.Game.parseLevel("add`0`11`11~2`2`0`8`A`random(0,10)~2`8`1`8`B`random(0,10)~8`5`2`9`O`A*B`10");
			App.GameRenderer.bestFit();
			App.ModeHandler.pushMode('planning');
			levelSelect.requestStaticRenderUpdate = true;
		}if(levelSelect.lvl7Button.collide(x,y)){
			App.ModeHandler.pushMode('coming soon');
			levelSelect.requestStaticRenderUpdate = true;
		}if(levelSelect.lvl8Button.collide(x,y)){
			App.ModeHandler.pushMode('coming soon');
			levelSelect.requestStaticRenderUpdate = true;
		}if(levelSelect.lvl9Button.collide(x,y)){
			App.ModeHandler.pushMode('coming soon');
			levelSelect.requestStaticRenderUpdate = true;
		}if(levelSelect.lvl10Button.collide(x,y)){
			App.ModeHandler.pushMode('coming soon');
			levelSelect.requestStaticRenderUpdate = true;
		}if(levelSelect.lvl11Button.collide(x,y)){
			App.ModeHandler.pushMode('coming soon');
			levelSelect.requestStaticRenderUpdate = true;
		}if(levelSelect.lvl12Button.collide(x,y)){
			App.ModeHandler.pushMode('coming soon');
			levelSelect.requestStaticRenderUpdate = true;
		}if(levelSelect.backButton.collide(x,y)){
			App.ModeHandler.popMode();
			levelSelect.requestStaticRenderUpdate = true;
		}
	});

	levelSelect.registerKeyDownFunc('Esc',function(){
		levelSelect.requestStaticRenderUpdate = true;
		App.ModeHandler.popMode();
	});
}
