App.makeModeHandler = function(){
	var modeHandler = {};

	modeHandler.modes = [];
	modeHandler.modeStack = []; // TODO: INITIALIZE MODE STACK WITH MAIN MENU
	modeHandler.currentMode;

	// ========================================================== //

	modeHandler.pushMode = function(name){
		var mode = modeHandler.modes[name];
		if(!mode)return;

		if(modeHandler.currentMode)modeHandler.currentMode.exitFunc();
		modeHandler.modeStack.push(mode);
		modeHandler.currentMode = mode;
		modeHandler.currentMode.entranceFunc();
	}

	modeHandler.popMode = function(){
		modeHandler.currentMode.exitFunc();
		modeHandler.currentMode = modeHandler.pop();
		modeHandler.currentMode.entranceFunc();
	}

	// ========================================================== //

	// REMEMBER TO SET UPDATEFUNC,ENTRANCEFUNC,EXITFUNC WHEN CREATING NEW MODE
	// remember to set updatingActive to false when the transition is complete

	modeHandler.addNewMode = function(name){
		var mode = {};

		// input ---------------------------------------

		mode.keyDownFuncs    = [];
		mode.keyUpFuncs      = [];
		mode.mouseDownFuncs  = [];
		mode.mouseMoveFunc;
		mode.mouseUpFuncs    = [];
		mode.mouseWheelFunc;

		mode.registerKeyDownFunc    = function(key,func){mode.keyDownFuncs[App.InputHandler.keyCharToCode[key]]=func;}
		mode.registerKeyUpFunc      = function(key,func){mode.keyUpFuncs[App.InputHandler.keyCharToCode[key]]=func;}
		mode.registerMouseDownFunc  = function(button,func){mode.mouseDownFuncs[button]=func;}
		mode.registerMouseMoveFunc  = function(func){mode.mouseMoveFunc=func;}
		mode.registerMouseUpFunc    = function(button,func){mode.mouseUpFuncs[button]=func;}
		mode.registerMouseWheelFunc = function(func){mode.mouseWheelFunc=func;}

		// update/render -------------------------------

		mode.updatingActive = false;

		mode.updateFunc = function(){
			if(mode.exitFlag)mode.updatingActive=false;
			console.log("updating "+name+" | TODO: OVERWRITE UPDATEFUNC");
		};

		// transition ----------------------------------

		mode.exitFlag;

		mode.entranceFunc = function(){
			mode.updatingActive=true;
			mode.exitFlag = false;
			console.log(name+' entering'+" | TODO: OVERWRITE ENTRANCEFUNC");
		};

		mode.exitFunc = function(){
			mode.exitFlag=true;
			console.log(name+' exiting'+" | TODO: OVERWRITE EXITFUNC");
		};

		// ---------------------------------------------

		modeHandler.modes[name] = mode;
		return mode;
	}

	// ========================================================== //

	modeHandler.update = function(){
		for(var i in modeHandler.modes)
		if(modeHandler.modes[i].updatingActive)
			modeHandler.modes[i].updateFunc();
	}

	// ========================================================== //

	return modeHandler;
}

// text function
// box collider
// button
