/*
	Explanation: In order for other things to access this, it has to be loaded first.
	HOWEVER we don't want to load main.js (and therefore risk running the application) until
	every OTHER script has been loaded. So that's why there's this script instead of just
	putting it all in main. Stupid fucking JavaScript.
*/

Application = {}; // top level object. holds everything

Application.COLORS = {
	RED    : 0,
	GREEN  : 1,
	BLUE   : 2,
	YELLOW : 3
};

Application.DIRECTIONS = {
	UP    : 0,
	LEFT  : 1,
	DOWN  : 2,
	RIGHT : 3
};

// makes canvases
Application.makeCanvases = function(){
	var canvases = {};
	canvases.width;
	canvases.height;
	canvases.layers = {};
	//canvases.layers['INPUT'] = document.getElementById('inputCanvas');
	canvases.layers['GUI'] = document.getElementById("guiCanvas");

	// resizes all canvases to browser window
	canvases.resize = function(){} // TODO, this is dependant on inputHandler...

	// creates a new canvas with specified name and depth
	canvases.makeNewLayer = function(name, depth){} // TODO: return canvas

	return canvases;
}

/*
Application.createCanvasArray = function(){
	var canvases = {};
	canvases.width;
	canvases.height;
	canvases.layers = [];

	canvases.addNewLayer = function(name,z){
		var layer = document.createElement("canvas");
		layer.id = name;
		layer.width = canvases.width;
		layer.height = canvases.height;
		layer.style.zIndex = z;
		layer.style.position = "absolute";
		document.body.appendChild(layer);

		canvases.layers[name] = layer;
		return layer;
	}

	window.onresize = function(){
		canvases.width = window.innerWidth;
		canvases.height = window.innerHeight;

		for(var i in canvases.layers){
			var layer = canvases.layers[i];
			layer.width = canvases.width;
			layer.height = canvases.height;
		}

		// TODO: everything needs to be re-rendered
	}

	window.onresize(); // initializes width and height
	return canvases;
}
*/



