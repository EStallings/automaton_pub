/*
	Explanation: In order for other things to access this, it has to be loaded first.
	HOWEVER we don't want to load main.js (and therefore risk running the application) until
	every OTHER script has been loaded. So that's why there's this script instead of just
	putting it all in main. Stupid fucking JavaScript.
*/

Application = {}; // top level object | everything should be stored within here

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
