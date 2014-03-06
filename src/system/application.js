/*
	Explanation: In order for other things to access this, it has to be loaded first.
	HOWEVER we don't want to load main.js (and therefore risk running the application) until
	every OTHER script has been loaded. So that's why there's this script instead of just
	putting it all in main. Stupid fucking JavaScript.
*/

App = {}; // top level object | everything should be stored within here

App.COLORS = {
	RED    : 0,
	GREEN  : 1,
	BLUE   : 2,
	YELLOW : 3//,
	// what are the additional 3 colors for?
	// automs iterate over App.COLORS to access instruction execution funcs
//	WHITE  : 4,
//	BLACK  : 5,
//	GRAY   : 6
};

App.DIRECTIONS = {
	UP    : 0,
	LEFT  : 1,
	DOWN  : 2,
	RIGHT : 3
};
