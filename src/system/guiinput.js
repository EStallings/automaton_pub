App.makeGuiInput = function(){
	var gInput = {};


	gInput.mouseDown = function(mouseData){}
	gInput.mouseUp = function(mouseData){}
	gInput.mouseMove = function(mouseData){}
	gInput.mouseWheel = function(mouseData){}
	gInput.registerKey = function(key, callback){
		App.InputHandler.registerKey(key, callback);
	}

	return gInput;
}
