/*
	Explanation: In order for other things to access this, it has to be loaded first.
	HOWEVER we don't want to load main.js (and therefore risk running the application) until
	every OTHER script has been loaded. So that's why there's this script instead of just
	putting it all in main. Stupid fucking JavaScript.
*/
Application = {}; // top level object. holds everything'

Application.COLORS = {
	RED:0,
	GREEN:1,
	BLUE:2,
	YELLOW:3
};

Application.DIRECTIONS = {
	UP:0,
	LEFT:1,
	DOWN:2,
	RIGHT:3
};

// makes canvases
Application.makeCanvases = function(){
	var canvases = {};
	canvases.width;
	canvases.height;
	canvases.layers = {};

	// resizes all canvases to browser window
	canvases.resize = function(){} // TODO, this is dependant on inputHandler...

	// creates a new canvas with specified name and depth
	canvases.makeNewLayer = function(name, depth){} // TODO: return canvas

	return canvases;
}

Application.makeGui = function(){
	var gui = {};

	// set up canvases here?

	gui.render = function(){}; // TODO
	gui.update = function(){}; // TODO

	return gui;
}



