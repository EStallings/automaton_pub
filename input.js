// deals with all keyboard, mouse, and window input
// TODO add event listeners to the inputCanvas
Application.makeInputHandler = function(){
	var input = {};

	// types of events that can be registered for
	input.mouseTypes = {
		MOVE:'move',

		LEFT_CLICK:'left click',
		RIGHT_CLICK:'right click',
		MIDDLE_CLICK:'middle click',

		LEFT_DRAG:'left drag',
		RIGHT_DRAG:'right drag',
		MIDDLE_DRAG:'middle drag',

		SCROLL:'scroll',
	};

	input.registryTypes = {
		func:'func',
		shft:'shft',
		alt:'alt',
		cntrl:'cntrl'
	};

	// stores callback events associated with a type of event and a layer
	input.keyRegistry = [];
	input.mouseRegistry = {'GUI':[], 'GAME':[]};

	// create first canvas and get its context
	// For later:
	//input.canvas = Application.Canvases.makeNewLayer('inputCanvas', 0);
	
	//for now:
	input.canvas = document.getElementById("canvas");


	input.context = input.canvas.getContext('2d');

	input.mousePos = {x:0, y:0};

	// right mouse button
	input.rButton = {
		button:false,
		dragStart:null,
		drag:false
	};

	// left mouse button
	input.lButton = {
		button:false,
		dragStart:null,
		drag:false
	};

	// middle mouse button
	input.mButton = {
		button:false,
		dragStart:null,
		drag:false
	};

	input.updateMousePos = function(event){
		if(event.toElement === null) return;

		var rect = event.toElement.getBoundingClientRect();

		input.mousePos = {
			x:event.clientX - rect.left,
			y:event.clientY - rect.top
		};
	}

	//TODO registering a function to be called back under specified conditions for mouse events
	input.registerMouse = function(type, callback, layer){
		if(!this.mouseRegistry.layer)
			console.error("Tried to assign a function to an invalid layer: " + layer);

		if(!this.mouseRegistry.layer[type])
			this.mouseRegistry.layer[type] = callback;

		else
			console.error("Tried to assign multiple functions to a single mouse action on the same layer!: " + type);
	}

	//TODO registering a function to be called back under specified conditions for keyboard events
	input.registerKey = function(key, callback){
		if(!this.keyRegistry[key])
			this.keyRegistry[key] = callback;
		else
			console.error("Tried to assign multiple functions to a single keypress!!!: " + key + " , " + callback);
	}

	input.executeMouse = function(typ, event){
		var guiList = this.mouseRegistry['GUI'];
		var gameList = this.mouseRegistry['GAME'];
		var flag = true;

		if(guiList[typ])
			flag = guiList[typ]();

		if(flag && gameList[typ])
			gameList[typ]();

	}

	input.executeKey = function(typ, event){
		if(this.keyRegistry[typ])
			this.keyRegistry[typ]();
	}


	var handle_mouseMove 	= function(e){console.debug("from mousemove");}// TODO

	var handle_mouseUp 		= function(e){console.debug("from mouseUp");}
		//determine which mouse button & update status accordingly
		// switch(e.button){
		// 	case 0:
		// 		Application.InputHandler.lButton = false;
		// 		break;	
		// 	case 1:
		// 		Application.InputHandler.mButton = false;
		// 		break;
		// 	case 2:
		// 		Application.InputHandler.rButton = false;
		// 		break;
		// }

	
	
	var handle_mouseDown 	= function(e){console.debug("from mousedown");}// TODO
	
	var handle_mouseOver 	= function(e){console.debug("from mouseover");}// TODO
	
	var handle_mouseOut 	= function(e){console.debug("from mouseout");}// TODO
	
	var handle_mouseClick 	= function(e){console.debug("from mouseclick");}// TODO
	
	var handle_mouseWheel 	= function(e){console.debug("from mousewheel");}// TODO
	
	var handle_keyPress 	= function(e){console.debug("from keypress");}// TODO
	
	var handle_keyDown 		= function(e){console.debug("from keydown");}// TODO
	
	var handle_keyUp 		= function(e){console.debug("from keyup");}// TODO


	// registering callbacks
	input.Canvas.addEventListener('mousemove', handle_mouseMove, false);
	input.Canvas.addEventListener('mouseup', handle_mouseUp, false);
	input.Canvas.addEventListener('mousedown', handle_mouseDown, false);
	input.Canvas.addEventListener('mouseover', handle_mouseOver, false);
	input.Canvas.addEventListener('mouseout', handle_mouseOut, false);
	input.Canvas.addEventListener('click', handle_mouseClick, false);
	input.Canvas.addEventListener('contextmenu', handle_mouseClick, false);
	input.Canvas.addEventListener('mousewheel', handle_mouseWheel, false);
	input.Canvas.addEventListener('DOMMouseScroll', handle_mouseWheel, false);
	input.Canvas.addEventListener('keypress', handle_keyPress, false);
	input.Canvas.addEventListener('keyup', handle_keyUp, false);
	input.Canvas.addEventListener('keydown', handle_keyDown, false);

	// disables context menu
	input.canvas.oncontextmenu = function(){ return false; };

	return input;
}



