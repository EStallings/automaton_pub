App.makeGame = function(){
	var game = {};

	// TODO: make canvas layers for each object type
	game.gfx = App.Canvases.addNewLayer("game",-1).getContext("2d");

	game.modes = {SIMULATION:'sim', PLANNING:'plan'}; // why are these strings?
	game.mode = game.modes.SIMULATION; // XXX: AT ITS CURRENT STATE, THIS NEEDS TO BE INITIALIZED TO SIMULATION

	game.currentPlanningLevel;
	game.currentSimulationLevel;
	// game.currentRenderedLevel; // only applicable when functions come into play

	game.lastCycleTick;
	game.nextCycleTick;
	game.cycles;
	game.simulationSpeed = 500;

	game.renderX;
	game.renderY;
	game.cellSize;

	// TODO: game.pan(x,y){}
	// TODO: game.zoom(f){} // from cursor or center?

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
	};

	// TODO: GFX IS CURRENTLY ONLY ONE LAYER. THIS NEEDS TO BE MULTIPLE PER OBJECT
	game.render = function(){
		// clear background
		game.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
	//	game.gfx.fillStyle = "#ff0000"; // DELETE
	//	game.gfx.fillRect(15,15,App.Canvases.width-30,App.Canvases.height-30); // DELETE

		// pan grid
		game.gfx.save();
		game.gfx.translate(game.renderX,game.renderY);

		// render level
		if(game.mode === game.modes.PLANNING &&
		   game.currentPlanningLevel !== undefined)
			game.currentPlanningLevel.render();
		else if(game.currentSimulationLevel !== undefined)
			game.currentSimulationLevel.render();

		game.gfx.restore();

	//	// render cycles
	//	gfx.fillStyle = "#ffffff";
	//	gfx.textAlign = "left";
	//	gfx.fillText("Cycle: "+this.cycles+" | FPS: "+Math.ceil(1000/elapsed),0,this.height*cellSize+28);
	};

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
		game.currentSimulationLevel = game.currentPlanningLevel.generateSimulationLevel();
		game.currentRenderedLevel = game.currentSimulationLevel;

		// TODO: CALL INSTRUCTION start() FUNCTIONS
		// TODO: SETUP CYCLE VARIABLES
	}

	game.simulationError = function(errorCode){

	}

	// ========================================================== //

	game.createNewLevel = function(){} // TODO: implement this

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
