App.makeGame = function(){
	var game = {};

	// TODO: make canvas layers for each object type
	game.gfx = App.Canvases.addNewLayer("game",-1).getContext("2d");
	game.gfx.lineWidth = 2; // interestingly enough, making game an even number gives a HUGE performance boost
	game.gridGfx  = App.Canvases.addNewLayer("grid" ,-3).getContext("2d");
	game.tokenSGfx = App.Canvases.addNewLayer("token dynamic",-2).getContext("2d");
	game.tokenDGfx = App.Canvases.addNewLayer("token static",-2).getContext("2d");
	game.automGfx = App.Canvases.addNewLayer("autom",-1).getContext("2d");
	game.automGfx.lineWidth = 4;

	game.modes = {SIMULATION:'sim',PLANNING:'plan'}; // why are these strings?
	game.mode = game.modes.PLANNING;

	game.currentPlanningLevel;
	game.currentSimulationLevel;
	// game.currentRenderedLevel; // only applicable when functions come into play

	game.lastCycleTick;
	game.nextCycleTick;
	game.cycles;
	game.simulationSpeed = 500;
	game.interpolation;

	game.renderX = 0; // XXX: CONSIDER KEEPING THIS FLOORED FOR PERFORMANCE
	game.renderY = 0; // XXX: CONSIDER KEEPING THIS FLOORED FOR PERFORMANCE
	game.cellSize = 6*Math.pow(2,3);

	// ========================================================== //

	game.update = function(){
		if(game.mode === game.modes.PLANNING &&
		   game.currentPlanningLevel !== undefined)
			// Do nothing, I believe. -- lets have a planning mode
			// update anyways, theres a possibility of time-dependant
			// animations for example.
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

	game.translateCanvas = function(gfx){
		gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
		gfx.save();
		gfx.translate(App.Game.renderX,App.Game.renderY);
	}

	game.dynamicRender = function(){
		game.interpolation = (App.Engine.tick-game.lastCycleTick)
		                   / (game.nextCycleTick-game.lastCycleTick);

		// clear canvas backgrounds
		game.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

		// pan level
		game.gfx.save();
		game.gfx.translate(game.renderX,game.renderY);


		// render level
	//	if(game.mode === game.modes.PLANNING &&
	//	   game.currentPlanningLevel !== undefined)
	//		// TODO: CALL DYNAMIC RENDER METHODS ONLY
	//		game.currentPlanningLevel.render();
	//	else if(game.currentSimulationLevel !== undefined)
	//		// TODO: CALL DYNAMIC RENDER METHODS ONLY
			game.currentSimulationLevel.dynamicRender();

		game.gfx.restore();
	}

	// TODO: call initial static rendering
	game.staticRender = function(){
		// clear canvas backgrounds
		game.gridGfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
		game.gridGfx.lineWidth = 2;

		game.renderX = Math.sin(App.Engine.tick * 0.0002)*50+60; // DELETE
		game.renderY = Math.sin(App.Engine.tick * 0.0005)*30+40; // DELETE

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
			game.gridGfx.moveTo(i-7,j);game.gridGfx.arc(i,j,7,-Math.PI,Math.PI);
		}game.gridGfx.stroke();

		// pan level | XXX: EVERY CANVAS MUST BE PANNED | LIST OF STATIC CANVASES?
		game.gridGfx.save();
		game.gridGfx.translate(game.renderX,game.renderY);

		// render level
	//	if(game.mode === game.modes.PLANNING &&
	//	   game.currentPlanningLevel !== undefined)
	//		game.currentPlanningLevel.render();
	//	else if(game.currentSimulationLevel !== undefined)
			game.currentSimulationLevel.staticRender();

		game.gridGfx.restore();
	}

	// TODO: call staticRender inside pan and zoom
	// TODO: game.beginPan(x,y){}
	// TODO: game.pan(x,y){}
	// TODO: game.zoom(f){} // from cursor or center?

	// ========================================================== //

	game.enterPlanningMode = function(levelString){
		if(game.mode === game.modes.PLANNING)return;
		game.mode = game.modes.PLANNING;
		App.changeMenu('planning'); // TODO: USE THE NEW GUI CALL ONCE ITS WRITTEN

		if(levelString)game.currentPlanningLevel = game.loadNewLevel(levelString);
		else game.currentPlanningLevel = game.createNewLevel();
		game.currentRenderedLevel = game.currentPlanningLevel;

		// TODO: clear old undo-redo cache
		// TODO: setup render vars (center level, default zoom)
	}

	game.enterSimulationMode = function(){
		if(game.mode === game.modes.SIMULATION)return;
		game.mode = game.modes.SIMULATION;
		App.changeMenu('simulation'); // TODO: USE THE NEW GUI CALL ONCE ITS WRITTEN
	//	game.currentSimulationLevel = game.currentPlanningLevel.generateSimulationLevel(); // TODO: IMPLEMENT THIS
		game.currentRenderedLevel = game.currentSimulationLevel;

		// TODO: CALL INSTRUCTION start() FUNCTIONS
		// TODO: SETUP CYCLE VARIABLES
		game.nextCycleTick = App.Engine.tick;
		game.cycles = 0;
	}

	// TODO: IMPLEMENT game
	game.simulationError = function(errorCode){
		// TODO: stop simulation
		// TODO: display error
		// TODO: go back to planning mode
	}

	// TODO: IMPLEMENT game
	game.simulationSuccess = function(){
		// TODO: stop simulation
		// TODO: display scores
		//       instruction count
		//       ticks elapsed
		//       automaton count (fork?) (min max total)
		//       cell usage
		// TODO: exit/next level...
	}

	// ========================================================== //

	game.createNewLevel = function(){} // TODO: implement game

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

	return game;
}
