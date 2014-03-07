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
	gInput.registerKey = function(key, callback){
		App.InputHandler.registerKey(key, callback);
	}

	return gInput;
}