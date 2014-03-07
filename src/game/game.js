App.makeGame = function(){
	var game = {};

	// ========================================================== //
	// ====================== MODE-SPECIFIC ===================== //
	// ========================================================== //

		/*+------------------------------------------+*/

	game.modes = {SIMULATION:'sim',PLANNING:'plan'}; // why are these strings?
	game.mode = game.modes.PLANNING;

	game.currentPlanningLevel;
	game.currentSimulationLevel;

		/*+------------------------------------------+*/

	game.enterPlanningMode = function(levelString){
		if(game.mode === game.modes.PLANNING)return;
		game.mode = game.modes.PLANNING;
		App.changeMenu('planning'); // TODO: USE THE NEW GUI CALL ONCE ITS WRITTEN

		if(levelString)game.currentPlanningLevel = game.loadNewLevel(levelString);
		else game.currentPlanningLevel = game.createNewLevel();

		// TODO: clear old undo-redo cache
		// TODO: setup render vars (center level, default zoom)
	}

	game.enterSimulationMode = function(){
		if(game.mode === game.modes.SIMULATION)return;
		game.mode = game.modes.SIMULATION;
		App.changeMenu('simulation'); // TODO: USE THE NEW GUI CALL ONCE ITS WRITTEN
		// game.currentSimulationLevel = game.currentPlanningLevel.generateSimulationLevel(); // TODO: IMPLEMENT THIS

		// TODO: CALL INSTRUCTION start() FUNCTIONS
		// TODO: SETUP CYCLE VARIABLES
		game.nextCycleTick = App.Engine.tick;
		game.cycles = 0;
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
	game.cycles;
	game.simulationSpeed = 500;

		/*+------------------------------------------+*/

	game.update = function(){
		if(game.mode === game.modes.PLANNING &&
		   game.currentPlanningLevel !== undefined)
			game.currentPlanningLevel.update();
		else if(game.currentSimulationLevel !== undefined)
		while(App.Engine.tick > game.nextCycleTick){
			if(game.simulationSpeed <= 0)break; // TODO: change to pause
			game.currentSimulationLevel.update();
			game.lastCycleTick = game.nextCycleTick;
			game.nextCycleTick += game.simulationSpeed;
			++game.cycles;
		}
	}

	// ========================================================== //
	// ===================== RENDER-SPECIFIC ==================== //
	// ========================================================== //

	game.tempGfx        = App.Canvases.addNewLayer("gameTemp"       ,0).getContext("2d");
	game.automGfx       = App.Canvases.addNewLayer("autom"         ,-1).getContext("2d");
	game.tokenSGfx      = App.Canvases.addNewLayer("token dynamic" ,-2).getContext("2d");
	game.tokenDGfx      = App.Canvases.addNewLayer("token static"  ,-3).getContext("2d");
	game.instructionGfx = App.Canvases.addNewLayer("instruction"   ,-4).getContext("2d");
	game.borderGfx      = App.Canvases.addNewLayer("border"        ,-5).getContext("2d");
	game.gridGfx        = App.Canvases.addNewLayer("grid"          ,-6).getContext("2d");

	game.requestStaticRenderUpdate = true;

		/*+------------------------------------------+*/

	game.renderX = 0; // XXX: CONSIDER KEEPING THIS FLOORED FOR PERFORMANCE
	game.renderY = 0; // XXX: CONSIDER KEEPING THIS FLOORED FOR PERFORMANCE
	game.cellSizeFactor = 3;
	game.cellSize = 6*Math.pow(2,game.cellSizeFactor);
	game.interpolation;

		/*+------------------------------------------+*/

	game.panRenderX;
	game.panRenderY;
	game.panMouseX;
	game.panMouseY;

	game.beginPan = function(obj,evt){
		game.panMouseX = obj.x;
		game.panMouseY = obj.y;
		game.panRenderX = game.renderX;
		game.panRenderY = game.renderX;
	}

	game.pan = function(obj,evt){
		game.renderX = game.panRenderX+(obj.END.x-game.panMouseX); // TODO: SCALING ADJUSTMENT
		game.renderY = game.panRenderY+(obj.END.y-game.panMouseY); // TODO: SCALING ADJUSTMENT
		game.requestStaticRenderUpdate = true;
	}

	game.zoom = function(f){
		game.cellSizeFactor += f;
		game.cellSize = 6*Math.pow(2,game.cellSizeFactor);
		// TODO: PAN ADJUSTMENT
		game.requestStaticRenderUpdate = true;
	}

	// App.InputHandler.registerMouse(App.InputHandler.mouseTypes.RIGHT_CLICK,game.beginPan,"GAME");
	// App.InputHandler.registerMouse(App.InputHandler.mouseTypes.RIGHT_DRAG,game.pan,"GAME");

	game.translateCanvas = function(gfx){
		gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
		gfx.save();
		gfx.translate(App.Game.renderX,App.Game.renderY);
	}

	game.screenToGridCoords = function(x,y){

	}

		/*+------------------------------------------+*/

	// TODO: CALL INITIAL STATIC RENDERING WHEN?
	game.staticRender = function(){
		game.gridGfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

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
			if(game.cellSizeFactor < 2.7)continue;
			game.gridGfx.moveTo(i-7,j);game.gridGfx.arc(i,j,7,-Math.PI,Math.PI);
		}game.gridGfx.stroke();

	//	if(game.mode === game.modes.PLANNING &&
	//	   game.currentPlanningLevel !== undefined)
	//		game.currentPlanningLevel.staticRender();
	//	else if(game.currentSimulationLevel !== undefined)
			game.currentSimulationLevel.staticRender();
	}

	game.dynamicRender = function(){
		game.gridGfx.lineWidth = 2;
	//	game.renderX = Math.sin(App.Engine.tick * 0.0002)*50+60; // DELETE
	//	game.renderY = Math.sin(App.Engine.tick * 0.0005)*30+40; // DELETE
	//	game.cellSizeFactor = (Math.sin(App.Engine.tick * 0.001)*0.5+0.5)*2+2; // DELETE
	//	game.cellSize = 6*Math.pow(2,game.cellSizeFactor); // DELETE

		game.interpolation = (App.Engine.tick-game.lastCycleTick)
		                   / (game.nextCycleTick-game.lastCycleTick);

		// render level
	//	if(game.mode === game.modes.PLANNING &&
	//	   game.currentPlanningLevel !== undefined)
	//		game.currentPlanningLevel.dynamicRender();
	//	else if(game.currentSimulationLevel !== undefined)
			game.currentSimulationLevel.dynamicRender();

		game.tempGfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
		game.tempGfx.font = "bold 11px arial";
		game.tempGfx.fillStyle = "#ffffff";
		game.tempGfx.fillText("FPS: "+Math.round(App.Engine.fps),11,22);
		game.tempGfx.fillText("Cycle: "+game.cycles             ,11,33);
		game.tempGfx.fillText("Tick: "+App.Engine.tick          ,11,44);
		game.tempGfx.fillText("Zoom: "+game.cellSizeFactor      ,11,55);
	}

	// ========================================================== //

	// TODO: SETUP GAME INPUT CALLBACKS HERE
	return game;
}
