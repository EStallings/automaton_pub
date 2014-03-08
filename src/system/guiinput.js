App.makeGuiInput = function(){
	var gInput = {};

	gInput.mouseDown = function(mouseData){
		var hit = App.Gui.testCoordinates(mouseData.x, mouseData.y);
		App.Gui.clickStart(mouseData.x, mouseData.y);
		return hit;
	}
	gInput.mouseUp = function(mouseData){
		var hit = App.Gui.testCoordinates(mouseData.x, mouseData.y);
		App.Gui.clickEnd(mouseData.x, mouseData.y);
		return hit;
	}
	gInput.mouseMove = function(mouseData){
		var hit = App.Gui.testCoordinates(mouseData.x, mouseData.y);
		App.Gui.clickDrag(mouseData.x, mouseData.y); 
		return hit;
	}
	gInput.mouseWheel = function(mouseData){
		//var hit = App.Gui.testCoordinates(mouseData.x, mouseData.y);
		return false;
	}
	gInput.registerKey = function(key, callback){
		App.InputHandler.registerKey(key, callback);
	}

	return gInput;
}
