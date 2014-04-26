App.setupLevelSelect = function(){
	var levelSelect = App.ModeHandler.addNewMode('level select');

		// ---------------------------------------------

	var levels = [
			"moving`0`9`5~2`2`0`8`I`random(0,10)~6`2`0`9`O`I`10",
			"increment`0`9`5~2`2`0`8`I`random(0,10)~6`2`0`9`O`I+3`10",
			"mod 2`0`11`5~2`2`0`8`I`random(0,10)~8`2`0`9`O`I%2`10",
			"AllInstructions`0`10`13~1`1`0`0~2`1`0`1~3`1`0`2~4`1`0`3~1`2`0`4~2`2`0`5~3`2`0`6~4`2`0`7~1`3`0`19~2`3`0`20~3`3`0`21~4`3`0`22~1`4`0`23~2`4`0`24~3`4`0`25~4`4`0`26~1`5`0`27~2`5`0`28~3`5`0`29~4`5`0`30~1`6`0`31~2`6`0`32~3`6`0`33~4`6`0`34~6`1`0`10~7`1`0`11~8`1`0`12~6`2`0`13~7`2`0`14~8`2`0`15~6`3`0`18~6`5`0`16~6`5`1`16~6`5`2`16~6`5`3`16~8`5`0`17~8`5`1`17~8`5`2`17~8`5`3`17~1`8`0`8`A`0~2`8`0`8`B`0~3`8`0`8`C`0~4`8`0`8`D`0~5`8`0`8`E`0~6`8`0`8`F`0~7`8`0`8`G`0~8`8`0`8`H`0~1`9`1`8`I`0~2`9`1`8`J`0~3`9`1`8`K`0~4`9`1`8`L`0~5`9`1`8`M`0~6`9`1`8`N`0~7`9`1`8`O`0~8`9`1`8`P`0~1`10`2`8`Q`0~2`10`2`8`R`0~3`10`2`8`S`0~4`10`2`8`T`0~5`10`2`8`U`0~6`10`2`8`V`0~7`10`2`8`W`0~8`10`2`8`X`0~4`11`3`8`Y`0~5`11`3`8`Z`0",
			"add`0`11`11~2`2`0`8`A`random(0,10)~2`8`1`8`B`random(0,10)~8`5`2`9`O`A+B`10",
			// SOLUTION: "add`0`11`11~2`1`0`2~2`1`2`17~2`2`0`8~2`2`2`6~2`5`0`12~2`5`1`13~2`5`2`5~2`8`1`8~2`8`2`4~2`9`1`0~2`9`2`17~8`2`2`7~8`5`0`4~8`5`1`6~8`5`2`9~8`8`2`7"
			"multiply`0`0`0~2`5`3`8`Z`0~5`2`0`8`A`random(0,10)~5`8`1`8`B`random(0,10)~8`5`2`9`O`A*B`10"
	]
	var startLevel = function(number){
		if(number >= levels.length){
			App.ModeHandler.pushMode('coming soon');
			levelSelect.requestStaticRenderUpdate = true;
		}
		else{
			App.Game.currentPlanningLevel = App.Game.parseLevel(levels[number]);
			App.GameRenderer.bestFit();
			App.ModeHandler.pushMode('planning');
			levelSelect.requestStaticRenderUpdate = true;
		}
	}

	levelSelect.gfx = App.Canvases.addNewLayer(2).getContext('2d');
	levelSelect.gui = new App.guiFrame(levelSelect.gfx);

	levelSelect.lvl1Button 	= new App.GuiTextButton(15+172*0,56+28*0,200,000,'Move',           function(){startLevel(01);}, false, null, null);
	levelSelect.lvl2Button 	= new App.GuiTextButton(15+172*1,56+28*0,230,030,'Increment',      function(){startLevel(02);}, false, null, null);
	levelSelect.lvl3Button 	= new App.GuiTextButton(15+172*2,56+28*0,260,060,'Mod 2',          function(){startLevel(03);}, false, null, null);
	levelSelect.lvl4Button 	= new App.GuiTextButton(15+172*0,56+28*1,300,100,'Instruction Set',function(){startLevel(04);}, false, null, null);
	levelSelect.lvl5Button 	= new App.GuiTextButton(15+172*1,56+28*1,330,130,'Add',            function(){startLevel(05);}, false, null, null);
	levelSelect.lvl6Button 	= new App.GuiTextButton(15+172*2,56+28*1,360,160,'Multiply',       function(){startLevel(06);}, false, null, null);
	levelSelect.lvl7Button 	= new App.GuiTextButton(15+172*0,56+28*2,400,200,'Level 7',        function(){startLevel(07);}, false, null, null);
	levelSelect.lvl8Button 	= new App.GuiTextButton(15+172*1,56+28*2,430,230,'Level 8',        function(){startLevel(08);}, false, null, null);
	levelSelect.lvl9Button 	= new App.GuiTextButton(15+172*2,56+28*2,460,260,'Level 9',        function(){startLevel(09);}, false, null, null);
	levelSelect.lvl10Button = new App.GuiTextButton(15+172*0,56+28*3,500,300,'Level 10',       function(){startLevel(10);}, false, null, null);
	levelSelect.lvl11Button = new App.GuiTextButton(15+172*1,56+28*3,530,330,'Level 11',       function(){startLevel(11);}, false, null, null);
	levelSelect.lvl12Button = new App.GuiTextButton(15+172*2,56+28*3,560,360,'Level 12',       function(){startLevel(12);}, false, null, null);
	levelSelect.backButton 	= new App.GuiTextButton(15,      56+28*4,600,400,'Back to Main Menu', function(){App.ModeHandler.popMode(); levelSelect.requestStaticRenderUpdate = true;}, false, null, null);

	levelSelect.lvl1Button.hoverColor = '#af1010';  levelSelect.lvl1Button.w  = 168;
	levelSelect.lvl2Button.hoverColor = '#af1010';  levelSelect.lvl2Button.w  = 168;
	levelSelect.lvl3Button.hoverColor = '#af1010';  levelSelect.lvl3Button.w  = 168;
	levelSelect.lvl4Button.hoverColor = '#af1010';  levelSelect.lvl4Button.w  = 168;
	levelSelect.lvl5Button.hoverColor = '#af1010';  levelSelect.lvl5Button.w  = 168;
	levelSelect.lvl6Button.hoverColor = '#af1010';  levelSelect.lvl6Button.w  = 168;
	levelSelect.lvl7Button.hoverColor = '#af1010';  levelSelect.lvl7Button.w  = 168;
	levelSelect.lvl8Button.hoverColor = '#af1010';  levelSelect.lvl8Button.w  = 168;
	levelSelect.lvl9Button.hoverColor = '#af1010';  levelSelect.lvl9Button.w  = 168;
	levelSelect.lvl10Button.hoverColor= '#af1010'; levelSelect.lvl10Button.w = 168;
	levelSelect.lvl11Button.hoverColor= '#af1010'; levelSelect.lvl11Button.w = 168;
	levelSelect.lvl12Button.hoverColor= '#af1010'; levelSelect.lvl12Button.w = 168;
	levelSelect.backButton.hoverColor = '#af1010';

	levelSelect.gui.addComponent(levelSelect.lvl1Button);
	levelSelect.gui.addComponent(levelSelect.lvl2Button);
	levelSelect.gui.addComponent(levelSelect.lvl3Button);
	levelSelect.gui.addComponent(levelSelect.lvl4Button);
	levelSelect.gui.addComponent(levelSelect.lvl5Button);
	levelSelect.gui.addComponent(levelSelect.lvl6Button);
	levelSelect.gui.addComponent(levelSelect.lvl7Button);
	levelSelect.gui.addComponent(levelSelect.lvl8Button);
	levelSelect.gui.addComponent(levelSelect.lvl9Button);
	levelSelect.gui.addComponent(levelSelect.lvl10Button);
	levelSelect.gui.addComponent(levelSelect.lvl11Button);
	levelSelect.gui.addComponent(levelSelect.lvl12Button);
	levelSelect.gui.addComponent(levelSelect.backButton);

	levelSelect.alpha = levelSelect.goalAlpha = 0;

		// ---------------------------------------------

	levelSelect.enterFunc = function(){
		levelSelect.requestStaticRenderUpdate = true;
		levelSelect.updatingActive = true;
		levelSelect.exitFlag = false;
		App.GameRenderer.bestFit();

		levelSelect.gui.enter();
		levelSelect.goalAlpha = 1;

		App.Shade.turnOn();
	}

	levelSelect.updateFunc = function(){
		if(levelSelect.gui.update())
			levelSelect.requestStaticRenderUpdate = true;

		if(!levelSelect.requestStaticRenderUpdate)return;
		levelSelect.requestStaticRenderUpdate = false;

		levelSelect.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

		levelSelect.gfx.fillStyle = '#fff';
		text(levelSelect.gfx,"Level Select",15,15,36,-3);

		if(levelSelect.gui.render())
			levelSelect.requestStaticRenderUpdate = true;

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

		levelSelect.gui.exit();
		levelSelect.goalAlpha = 0;
	}

		// ---------------------------------------------
	levelSelect.registerKeyDownFunc('Esc',function(){
		levelSelect.requestStaticRenderUpdate = true;
		App.ModeHandler.popMode();
	});

	levelSelect.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.LEFT, levelSelect.gui.mouseDown);
	levelSelect.registerMouseUpFunc(App.InputHandler.MOUSEBUTTON.LEFT, levelSelect.gui.mouseUp);
}
