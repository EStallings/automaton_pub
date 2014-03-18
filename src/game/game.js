App.makeGame = function(){
	var game = {};

	// ========================================================== //
	// ====================== MODE-SPECIFIC ===================== //
	// ========================================================== //

		/*+------------------------------------------+*/

	game.modes = {SIMULATION:'Simulation',PLANNING:'Planning'}; // why are these strings?
	game.mode = game.modes.PLANNING;

	game.currentPlanningLevel;
	game.currentSimulationLevel;

		/*+------------------------------------------+*/

	game.loadLevel = function(levelString){
		// TODO: clear old undo-redo cache
		// TODO: setup render vars (center level, default zoom)
	}

	game.toggleMode = function(){
		if(game.mode === game.modes.PLANNING){
			game.mode = game.modes.SIMULATION;
			game.currentSimulationLevel = game.currentPlanningLevel.generateSimulationLevel();
			game.requestStaticRenderUpdate = true;
			game.paused = false;
			game.nextCycleTick = App.Engine.tick;
			game.cycle = 0;
		}else{
			game.mode = game.modes.PLANNING;
			game.currentSimulationLevel = undefined;
			game.automGfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
			game.tokenSGfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
			game.requestStaticRenderUpdate = true;
			game.paused = true;
		}
	}

		/*+------------------------------------------+*/

	game.simulationError = function(errorCode){
		// TODO: stop simulation
		// TODO: display error
		// TODO: go back to planning mode
	}

	game.simulationSuccess = function(){
		// TODO: stop simulation
		// TODO: display scores
		//       instruction count
		//       ticks elapsed
		//       automaton count (fork?) (min max total)
		//       cell usage
		// TODO: exit/next level...
	}

		/*+------------------------------------------+*/

	game.createNewLevel = function(){} // TODO: implement?

	// returns a planning level object, given an input string.
	// Just a little string parser, really. If changes to
	// Level format are made, they have to be updated here.
	// This could be considered fragile code in need of refactoring!
	game.loadNewLevel = function(inputString){
		var split = inputString.split(";");
		var lev = new App.PlanningLevel();
		if(split.length > 0){
			var levDat = split[0].split(',');
			lev.name = levDat[0];
			lev.width = parseInt(levDat[1]);
			lev.height = parseInt(levDat[2]);

			for(var i = 1; i < split.length; i++){
				var instDat = split[i].split(',');
				var x = parseInt(instDat[0]);
				var y = parseInt(instDat[1]);
				var col = instDat[2];
				var typ = parseInt(instDat[3]);
				var inst = new App.PlanningInstruction(x, y, col, typ);
				lev.insert(inst);
			}
		}return lev;
	}

	// ========================================================== //
	// ===================== UPDATE-SPECIFIC ==================== //
	// ========================================================== //

	game.lastCycleTick;
	game.nextCycleTick;
	game.cycle;
	game.simulationSpeed = 512;

	game.requestPause = false;
	game.paused = true;
	game.pauseTick;
	game.pauseLastCycleTick;
	game.pauseNextCycleTick;

		/*+------------------------------------------+*/

	game.update = function(){
		if(game.mode === game.modes.PLANNING &&
		   game.currentPlanningLevel !== undefined &&
		   game.currentPlanningLevel.update)
			game.currentPlanningLevel.update();
		else if(game.currentSimulationLevel !== undefined){
			if(!game.paused)while(App.Engine.tick > game.nextCycleTick){
				if(game.simulationSpeed <= 0)break;
				game.lastCycleTick = game.nextCycleTick;
				game.nextCycleTick += game.simulationSpeed;
				++game.cycle;
				game.currentSimulationLevel.update();
				if(game.requestPause){
					game.requestPause = false;
					game.lastCycleTick = App.Engine.tick;
					game.nextCycleTick = App.Engine.tick+game.simulationSpeed;
					game.pause();
					return;
				}
			}else{
				var diff = App.Engine.tick-game.pauseTick;
				game.lastCycleTick = game.pauseLastCycleTick+diff;
				game.nextCycleTick = game.pauseNextCycleTick+diff;
			}
		}
	}

	game.pause = function(){
		game.paused = !game.paused;
		if(!game.paused && game.mode === game.modes.PLANNING)game.toggleMode();
		game.pauseTick = App.Engine.tick;
		game.pauseLastCycleTick = game.lastCycleTick;
		game.pauseNextCycleTick = game.nextCycleTick;
	}

	// ========================================================== //
	// ===================== RENDER-SPECIFIC ==================== //
	// ========================================================== //

	game.tempGfx        = App.Canvases.addNewLayer("gameTemp"       ,0).getContext("2d");
	game.automGfx       = App.Canvases.addNewLayer("autom"         ,-1).getContext("2d");
	game.tokenDGfx      = App.Canvases.addNewLayer("token dynamic" ,-2).getContext("2d");
	game.tokenSGfx      = App.Canvases.addNewLayer("token static"  ,-3).getContext("2d");
	game.instructionGfx = App.Canvases.addNewLayer("instruction"   ,-4).getContext("2d");
	game.gridGfx        = App.Canvases.addNewLayer("grid static"   ,-5).getContext("2d");
	// remember to add to clearGfx

	game.requestStaticRenderUpdate = true;

		/*+------------------------------------------+*/

	game.renderX = 100;
	game.renderY = 100;
	game.cellSizeFactor = 4;
	game.cellSize = 3*Math.pow(2,3);
	game.interpolation;

	game.goalRenderX = 16;
	game.goalRenderY = 93;
	game.goalCellSize = 3*Math.pow(2,game.cellSizeFactor);

	game.panRenderX;
	game.panRenderY;
	game.panMouseX;
	game.panMouseY;

	game.mouseX;
	game.mouseY;
	game.mouseC;
	game.renderMX = 0;
	game.renderMY = 0;
	game.goalMX = 0;
	game.goalMY = 0;

		/*+------------------------------------------+*/

	game.beginPan = function(x,y){
		game.panMouseX = x;
		game.panMouseY = y;
		game.panRenderX = game.goalRenderX;
		game.panRenderY = game.goalRenderY;
	}

	game.pan = function(x,y){
		game.goalRenderX = Math.round(game.panRenderX+(x-game.panMouseX));
		game.goalRenderY = Math.round(game.panRenderY+(y-game.panMouseY));
		game.requestStaticRenderUpdate = true;
	}

	game.zoom = function(x,y,f){
		game.cellSizeFactor += f;
		if(game.cellSizeFactor<2)game.cellSizeFactor=2;
		if(game.cellSizeFactor>7)game.cellSizeFactor=7;

		var oldCellSize = game.goalCellSize;
		game.goalCellSize = Math.round(3*Math.pow(2,game.cellSizeFactor));
		var factor = game.goalCellSize/oldCellSize;

		game.goalRenderX = Math.round(x+(game.goalRenderX-x)*factor);
		game.goalRenderY = Math.round(y+(game.goalRenderY-y)*factor);

		game.requestStaticRenderUpdate = true;
	}

	game.setSimulationSpeed = function(speed){
		if(game.paused)game.pause();
		if(game.mode === game.modes.PLANNING)game.toggleMode();
		if(speed<1)return;

		var tick = App.Engine.tick;
		var last = game.lastCycleTick;
		var next = game.nextCycleTick;
		var interp = (tick-last)/(next-last);
		var factor = speed/game.simulationSpeed;

		game.lastCycleTick = tick-(tick-last)*factor;
		game.nextCycleTick = tick+(next-tick)*factor;
		game.simulationSpeed = speed;
	}

	game.translateCanvas = function(gfx){
		gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
		gfx.save();
		gfx.translate(App.Game.renderX,App.Game.renderY);
	}

	game.screenToGridCoords = function(x,y){
		var gx = (x-game.renderX)/game.cellSize;
		var gy = (y-game.renderY)/game.cellSize;
		var gc = fmod(gx,1)<0.5?fmod(gy,1)<0.5?App.COLORS.RED:App.COLORS.BLUE:fmod(gy,1)<0.5?App.COLORS.GREEN:App.COLORS.YELLOW;

		game.mouseX = Math.floor(gx);
		game.mouseY = Math.floor(gy);
		game.mouseC = gc;

		game.goalMX = game.mouseX*game.cellSize;
		game.goalMY = game.mouseY*game.cellSize;
		switch(game.mouseC){
			case App.COLORS.RED:break;
			case App.COLORS.GREEN:game.goalMX += game.cellSize/2;break;
			case App.COLORS.BLUE:game.goalMY += game.cellSize/2;break;
			case App.COLORS.YELLOW:
				game.goalMX += game.cellSize/2;
				game.goalMY += game.cellSize/2;
				break;
		}

	}

		/*+------------------------------------------+*/

	game.expInterp = function(val,goal,speed,threshold){
		var factor = App.Engine.elapsed*speed;
		if(factor>1)factor=1;
		var retVal = (goal-val)*factor;
		if(Math.abs(val+retVal-goal)<threshold)retVal=goal-val;
		return retVal;
	}

	game.staticRender = function(){
		// return if no need to re-render
		if(!game.requestStaticRenderUpdate)return;
		game.requestStaticRenderUpdate = false;

		// update interpolated view variables
		game.renderX  += game.expInterp(game.renderX,game.goalRenderX  ,0.01,0.5);
		game.renderY  += game.expInterp(game.renderY,game.goalRenderY  ,0.01,0.5);
		game.cellSize += game.expInterp(game.cellSize,game.goalCellSize,0.01,0.01);
		if(game.renderX != game.goalRenderX)game.requestStaticRenderUpdate=true;
		if(game.renderY != game.goalRenderY)game.requestStaticRenderUpdate=true;
		if(game.cellSize != game.goalCellSize)game.requestStaticRenderUpdate=true;

		// setup grid canvas
		game.gridGfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
		game.gridGfx.lineWidth = 2;

		// setup grid vars
		var cs = game.cellSize;
		var w = App.Canvases.width;
		var h = App.Canvases.height;
		var rx = fmod(game.renderX,cs);
		var ry = fmod(game.renderY,cs);

		// draw grid lines
		game.gridGfx.strokeStyle = "#111111";
		game.gridGfx.beginPath();
		for(var i=rx;i<=w;i+=cs){
			game.gridGfx.moveTo(i,0);game.gridGfx.lineTo(i,h);
		}for(var j=ry;j<=h;j+=cs){
			game.gridGfx.moveTo(0,j);game.gridGfx.lineTo(w,j);
		}game.gridGfx.stroke();

		// draw cell corners
		game.gridGfx.strokeStyle = "#444444";
		game.gridGfx.beginPath();
		for(var i=rx;i<=w;i+=cs)
		for(var j=ry;j<=h;j+=cs){
			game.gridGfx.moveTo(i-4,j);game.gridGfx.lineTo(i+4,j);
			game.gridGfx.moveTo(i,j-4);game.gridGfx.lineTo(i,j+4);
		}game.gridGfx.stroke();

		// draw cell centers
		game.gridGfx.strokeStyle = "#222222";
		game.gridGfx.beginPath();
		for(var i=rx-cs/2;i<w+cs;i+=cs)
		for(var j=ry-cs/2;j<h+cs;j+=cs){
			game.gridGfx.moveTo(i-4,j);game.gridGfx.lineTo(i+4,j);
			game.gridGfx.moveTo(i,j-4);game.gridGfx.lineTo(i,j+4);
			if(game.cellSize < 30)continue;
			game.gridGfx.moveTo(i-7,j);game.gridGfx.arc(i,j,7,-Math.PI,Math.PI);
		}game.gridGfx.stroke();

		// draw level borders
		game.gridGfx.strokeStyle = "#888888";
		game.gridGfx.beginPath();
		game.gridGfx.rect(game.renderX-4,game.renderY-4,
		                  game.currentPlanningLevel.width*game.cellSize+8,
		                  game.currentPlanningLevel.height*game.cellSize+8);
		game.gridGfx.stroke();

		if(game.mode === game.modes.PLANNING &&
		   game.currentPlanningLevel !== undefined)
			game.currentPlanningLevel.staticRender();
		else if(game.currentSimulationLevel !== undefined)
			game.currentSimulationLevel.staticRender();
	}

	game.dynamicRender = function(){
		if(game.mode === game.modes.PLANNING &&
		   game.currentPlanningLevel !== undefined)
			game.currentPlanningLevel.dynamicRender();
		else if(game.currentSimulationLevel !== undefined){
			game.interpolation = (App.Engine.tick-game.lastCycleTick)
				           // (game.nextCycleTick-game.lastCycleTick);
			game.currentSimulationLevel.dynamicRender();
		}

		game.renderDebug();

	}

	game.renderDebug = function(){
		game.tempGfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

		game.tempGfx.fillStyle = "rgba(0,0,0,0.7)"
		game.tempGfx.fillRect(5,5,300,81);

		game.tempGfx.font = "bold 11px arial";
		game.tempGfx.fillStyle = "#ffffff";
		game.tempGfx.fillText("FPS: "+Math.round(App.Engine.fps) ,11,22);
		game.tempGfx.fillText("Cycle: "+game.cycle               ,11,33);
		if(game.paused){
			game.tempGfx.fillStyle = "#ff0000";
			game.tempGfx.fillText("Speed: PAUSED",11,44);
			game.tempGfx.fillStyle = "#ffffff";
		}else game.tempGfx.fillText("Speed: "+game.simulationSpeed+" ms/tick",11,44);
		game.tempGfx.fillText("Tick: "+App.Engine.tick           ,11,55);
		game.tempGfx.fillText("Zoom: "+game.cellSizeFactor       ,11,66);
		game.tempGfx.fillText("Mode: "+game.mode       ,11,77);

		game.tempGfx.fillText("Pan X: "+game.renderX             ,132,22);
		game.tempGfx.fillText("Pan Y: "+game.renderY             ,132,33);
		game.tempGfx.fillText("Cell Size: "+game.cellSize        ,132,44);
		if(game.requestStaticRenderUpdate)game.tempGfx.fillStyle = "#ff0000";
		game.tempGfx.fillText("Static Render: "+game.requestStaticRenderUpdate,132,55);
		game.tempGfx.fillStyle = "#ffffff";
		var bar = "Interpolation ";
		for(var i=0;i<game.interpolation;i+=0.05)bar+="|";
		game.tempGfx.fillText(bar,132,66);
		game.tempGfx.fillText("Mouse: "+game.mouseX+","+game.mouseY+","+game.mouseC,132,77);
	}

	// ========================================================== //

	// TODO: move these to gameInput
	// TODO: why can't i register "-" and "="?
	App.InputHandler.registerKey("[",function(){game.setSimulationSpeed(game.simulationSpeed*2);});
	App.InputHandler.registerKey("]",function(){game.setSimulationSpeed(game.simulationSpeed/2);});
	App.InputHandler.registerKey("Space",function(){game.pause();});
	App.InputHandler.registerKey("`",function(){game.toggleMode();});
	return game;
}
