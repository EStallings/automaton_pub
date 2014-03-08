//An input redirect 'class' for the game (simulation and planning modes)

//TODO make work with planning AND simulation modes. 
//Need a functioning (visibly so, at least) planning mode first.

App.makeGameInput = function(){
	var gInput = {};


	gInput.mouseDown = function(mouseData){
		var game = App.Game;

		if(mouseData.rmb)
			game.beginPan(mouseData.x, mouseData.y);

	}
	
	gInput.mouseUp = function(mouseData){

	}

	gInput.mouseMove = function(mouseData){
		var game = App.Game;

		if(mouseData.rmb)
			game.pan(mouseData.x, mouseData.y);
	}

	gInput.mouseWheel = function(mouseData){
		var game = App.Game;

		game.zoom(mouseData.x, mouseData.y, mouseData.wheel);
	}

	//Just to allow key registration to happen here for ease of grokking the API
	gInput.registerKey = function(key, callback){
		App.InputHandler.registerKey(key, callback);
	}

	return gInput;
}