// deals with all keyboard, mouse, and window input
// TODO add event listeners to the inputCanvas
Application.makeInputHandler = function(){
	var internal = {};

	// types of events that can be registered for
	internal.types = {
		MOVE:'move',

		LEFT_CLICK:'left click',
		RIGHT_CLICK:'right click',
		MIDDLE_CLICK:'middle click',

		LEFT_DRAG:'left drag',
		RIGHT_DRAG:'right drag',
		MIDDLE_DRAG:'middle drag',

		SCROLL:'scroll',
		KEY:'key'
	};

	internal.registryTypes = {
		func:'func',
		shft:'shft',
		alt:'alt',
		cntrl:'cntrl',
		data:'data'
	};

	// stores callback events associated with a type of event and a layer
	internal.registry = [];

	// create first canvas and get its context
	internal.canvas = Application.Canvases.makeNewLayer('inputCanvas',0);
	internal.context = internal.canvas.getContext('2d');

	internal.mousePos = {x:0, y:0};

	// right mouse button
	internal.rButton = {
		button:false,
		dragStart:null,
		drag:false
	};

	// left mouse button
	internal.lButton = {
		button:false,
		dragStart:null,
		drag:false
	};

	// middle mouse button
	internal.mButton = {
		button:false,
		dragStart:null,
		drag:false
	};

	internal.updateMousePos = function(event){
		if(event.toElement === null) return;

		var rect = event.toElement.getBoundingClientRect();

		internal.mousePos = {
			x:event.clientX - rect.left,
			y:event.clientY - rect.top
		};
	}

	//TODO registering a function to be called back under specified conditions
	internal.register = function(){}

	internal.execute = function(typ, event){} // TODO

	// registering callbacks
	internal.Canvas.addEventListener('mousemove', handle_mouseMove, false);
	internal.Canvas.addEventListener('mouseup', handle_mouseUp, false);
	internal.Canvas.addEventListener('mousedown', handle_mouseDown, false);
	internal.Canvas.addEventListener('mouseover', handle_mouseOver, false);
	internal.Canvas.addEventListener('mouseout', handle_mouseOut, false);
	internal.Canvas.addEventListener('click', handle_mouseClick, false);
	internal.Canvas.addEventListener('contextmenu', handle_mouseClick, false);
	internal.Canvas.addEventListener('mousewheel', handle_mouseWheel, false);
	internal.Canvas.addEventListener('DOMMouseScroll', handle_mouseWheel, false);

	// disables context menu
	internal.canvas.oncontextmenu = function(){ return false; };

	return internal;
}

function handle_mouseMove(e){}; // TODO

function handle_mouseUp(e){}; // TODO

function handle_mouseDown(e){}; // TODO

function handle_mouseOver(e){}; // TODO

function handle_mouseOut(e){}; // TODO

function handle_mouseClick(e){}; // TODO

function handle_mouseWheel(e){}; // TODO
