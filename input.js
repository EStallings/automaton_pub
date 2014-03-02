// deals with all keyboard, mouse, and window input
// TODO add event listeners to the inputCanvas
Application.makeInputHandler = function(){
	var input = {};

	input.DRAGGING_PREVENTS_CLICKING = true;

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
		drag:false,
		killClick:false
	};

	// left mouse button
	input.lButton = {
		button:false,
		dragStart:null,
		drag:false,
		killClick:false
	};

	// middle mouse button
	input.mButton = {
		button:false,
		dragStart:null,
		drag:false,
		killClick:false
	};

	input.touch = {
		time:0, //the time elapsed in the current touch
		button:0, //the button currently being emulated
		spread:0 //the spread between two fingers; use this guy to zoom!
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
	//if repeat is false, holding a key down will not fire multiple events.
	input.registerKey = function(key, callback, repeat){
		if(!this.keyRegistry[key])
			this.keyRegistry[key] = {c:callback, r:repeat, n:0};
		else
			console.error("Tried to assign multiple functions to a single keypress!!!: " + key + " , " + callback);
	}

	input.executeMouse = function(typ, data, evt){
		console.debug("Executing: " + typ + " - " + data + " - " + evt);
		var guiList = this.mouseRegistry['GUI'];
		var gameList = this.mouseRegistry['GAME'];
		var flag = true;

		if(guiList[typ])
			flag = guiList[typ](data, evt);

		if(flag && gameList[typ])
			gameList[typ](data, evt);

	}

	input.executeKey = function(key, evt){
		if(!this.keyRegistry[key]) return;
		this.keyRegistry[key].n++; 

		if(this.keyRegistry[key].r || this.keyRegistry[key].n === 1)
			this.keyRegistry[key].c();
	}

	/////////
	//Section evt handlers
	/////////

	var handle_mouseMove 	= function(e){
		
		var input = Application.InputHandler;
		
		//update current mouse position
		if(e.toElement === null) return;

		var rect = e.toElement.getBoundingClientRect();

		input.mousePos = {
			x:e.clientX - rect.left,
			y:e.clientY - rect.top
		};
	
		//handle click+drag

		if(input.lButton.button){
			input.lButton.drag = true;
			input.lButton.killClick = true;
			input.executeMouse(input.mouseTypes.LEFT_DRAG, {START:input.lButton.dragStart, END:input.mousePos}, e);
		}

		if(input.mButton.button){
			input.mButton.drag = true;
			input.mButton.killClick = true;
			input.executeMouse(input.mouseTypes.MIDDLE_DRAG, {START:input.mButton.dragStart, END:input.mousePos}, e);	
		}

		if(input.rButton.button){
			input.rButton.drag = true;
			input.rButton.killClick = true;
			input.executeMouse(input.mouseTypes.RIGHT_DRAG, {START:input.rButton.dragStart, END:input.mousePos}, e);
		}
	}

	var handle_mouseUp 		= function(e){
		
		var input = Application.InputHandler;
		
		//determine which mouse button & update status accordingly
		switch(e.button){

			case 0:
				input.lButton.button = false;
				input.lButton.drag = false;
		input.lButton.dragStart = null;

				if(!input.lButton.killClick && input.DRAGGING_PREVENTS_CLICKING)
					input.executeMouse(input.mouseTypes.LEFT_CLICK, {x:input.mousePos.x, y:input.mousePos.y}, e);

				input.lButton.killClick = false;
				break;

			case 1:
				input.mButton.button = false;
				input.mButton.drag = false;
				input.mButton.dragStart = null;
				
				if(!input.mButton.killClick && input.DRAGGING_PREVENTS_CLICKING)
					input.executeMouse(input.mouseTypes.MIDDLE_CLICK, {x:input.mousePos.x, y:input.mousePos.y}, e);

				input.mButton.killClick = false;
				break;

			case 2:
				input.rButton.button = false;
				input.rButton.drag = false;
				input.rButton.dragStart = null;

				if(!input.rButton.killClick && input.DRAGGING_PREVENTS_CLICKING)
					input.executeMouse(input.mouseTypes.RIGHT_CLICK, {x:input.mousePos.x, y:input.mousePos.y}, e);

				input.rButton.killClick = false;
				break;

		}
	}
	
	
	var handle_mouseDown 	= function(e){
		var input = Application.InputHandler;

		//determine which mouse button & update status accordingly
		switch(e.button){

			case 0:
				input.lButton.button = true;
				input.lButton.dragStart = input.mousePos;
				break;

			case 1:
				input.mButton.button = true;
				input.mButton.dragStart = input.mousePos;
				break;

			case 2:
				input.rButton.button = true;
				input.rButton.dragStart = input.mousePos;
				break;

		}
	}// TODO
	
	var handle_mouseWheel 	= function(e){
		console.debug("from mousewheel");
		var input = Application.InputHandler;



	}// TODO
	

	var handle_keyDown 		= function(e){
		var input = Application.InputHandler;
		var key = input.keyCodeToChar[e.keyCode];
				
		input.executeKey(key, e);

	}// TODO
	
	var handle_keyUp 		= function(e){
		var input = Application.InputHandler;
		var key = input.keyCodeToChar[e.keyCode];
		
		if(input.keyRegistry[key])
			input.keyRegistry[key].n = 0;
	}// TODO


	//Unused - doesn't do what you'd think :/
	var handle_keyPress 	= function(e){
		//console.debug("from keypress: " + e.keyCode);
		var input = Application.InputHandler;


	}// TODO
	
	//For now, unused
	var handle_mouseOver 	= function(e){
		//console.debug("from mouseover");
		//var input = Application.InputHandler;


	}// TODO
	
	//For now, unused
	var handle_mouseOut 	= function(e){
		//console.debug("from mouseout");
		//var input = Application.InputHandler;
	}// TODO

	//TODO Touch support
	/*
	var handle_touchInput = function(e){
		var touches = e.changedTouches,
		first = touches[0],
		type = "";
		switch(e.type)
	    {
	    case "touchstart":
			type = "mousedown"; 
			break;
		case "touchmove":
			type = "mousemove"; 
			break;
		case "touchend":
			type = "mouseup"; 
			break;
		default: 
			return;
	    }

		//initMouseEvent(type, canBubble, cancelable, view, clickCount, 
	    //screenX, screenY, clientX, clientY, ctrlKey, 
	    //altKey, shiftKey, metaKey, button, relatedTarget);

	    var simulatedEvent = document.createEvent("MouseEvent");
	    simulatedEvent.initMouseEvent(type, true, true, window, 1, 
								first.screenX, first.screenY, 
								first.clientX, first.clientY, false, 
								false, false, false, 0, null);

		first.target.dispatchEvent(simulatedEvent);
		e.preventDefault();
	}
*/
	var handle_mouseClick = function(e){
		//donothing?
	}


	// registering callbacks
	input.canvas.addEventListener('click', handle_mouseClick, false);
	input.canvas.addEventListener('contextmenu', handle_mouseClick, false);
	input.canvas.addEventListener('mousemove', handle_mouseMove, false);
	input.canvas.addEventListener('mouseup', handle_mouseUp, false);
	input.canvas.addEventListener('mousedown', handle_mouseDown, false);
	input.canvas.addEventListener('mouseover', handle_mouseOver, false);
	input.canvas.addEventListener('mouseout', handle_mouseOut, false);
	input.canvas.addEventListener('mousewheel', handle_mouseWheel, false);
	input.canvas.addEventListener('DOMMouseScroll', handle_mouseWheel, false);
	// document.addEventListener('keypress', handle_keyPress, false); does not seem to work as anticipated
	document.addEventListener('keyup', handle_keyUp, false);
	document.addEventListener('keydown', handle_keyDown, false);
	// input.canvas.addEventListener("touchstart", handle_touchInput, true);
	// input.canvas.addEventListener("touchmove", handle_touchInput, true);
	// input.canvas.addEventListener("touchend", handle_touchInput, true);
	// input.canvas.addEventListener("touchcancel", handle_touchInput, true);


	// disables context menu
	input.canvas.oncontextmenu = function(){ return false; };


	//Big Ugly Reference. Put it at the bottom to save eyes and brains

	input.keyCodeToChar = {8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause/Break",20:"Caps Lock",27:"Esc",32:"Space",33:"Page Up",34:"Page Down",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",45:"Insert",46:"Delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z",91:"Windows",93:"Right Click",96:"Numpad 0",97:"Numpad 1",98:"Numpad 2",99:"Numpad 3",100:"Numpad 4",101:"Numpad 5",102:"Numpad 6",103:"Numpad 7",104:"Numpad 8",105:"Numpad 9",106:"Numpad *",107:"Numpad +",109:"Numpad -",110:"Numpad .",111:"Numpad /",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"Num Lock",145:"Scroll Lock",182:"My Computer",183:"My Calculator",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"};
	input.keyCharToCode = {"Backspace":8,"Tab":9,"Enter":13,"Shift":16,"Ctrl":17,"Alt":18,"Pause/Break":19,"Caps Lock":20,"Esc":27,"Space":32,"Page Up":33,"Page Down":34,"End":35,"Home":36,"Left":37,"Up":38,"Right":39,"Down":40,"Insert":45,"Delete":46,"0":48,"1":49,"2":50,"3":51,"4":52,"5":53,"6":54,"7":55,"8":56,"9":57,"A":65,"B":66,"C":67,"D":68,"E":69,"F":70,"G":71,"H":72,"I":73,"J":74,"K":75,"L":76,"M":77,"N":78,"O":79,"P":80,"Q":81,"R":82,"S":83,"T":84,"U":85,"V":86,"W":87,"X":88,"Y":89,"Z":90,"Windows":91,"Right Click":93,"Numpad 0":96,"Numpad 1":97,"Numpad 2":98,"Numpad 3":99,"Numpad 4":100,"Numpad 5":101,"Numpad 6":102,"Numpad 7":103,"Numpad 8":104,"Numpad 9":105,"Numpad *":106,"Numpad +":107,"Numpad -":109,"Numpad .":110,"Numpad /":111,"F1":112,"F2":113,"F3":114,"F4":115,"F5":116,"F6":117,"F7":118,"F8":119,"F9":120,"F10":121,"F11":122,"F12":123,"Num Lock":144,"Scroll Lock":145,"My Computer":182,"My Calculator":183,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222};

	return input;
}



