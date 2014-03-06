// TODO: WRITE THIS ========================================================= //

App.makeGUI = function(){
	var gui = {};
	gui.gfx = App.Canvases.addNewLayer("GUI",0);

	gui.menus = [];
	gui.currentMenu;

	gui.addNewMenu = function(){}
	gui.setCurrentMenu = function(){}

	gui.addNewButton = function(menu){}

	gui.update = function(){}
	gui.render = function(){}
}

// ========================================================================== //


	// =========================================================== //
	// = EVERYTHING BELOW IS TEMP, THE ABOVE NEEDS TO BE WRITTEN = //
	// =========================================================== //


App.GuiFrame = function(){
	this.components = [];

	this.update = function(){
		for(var c in this.components)if(this.components[c].update)
			this.components[c].update();
	};

	this.render = function(){
		// TODO: THE GUI SHOULD HAVE A REFERENCE TO ITS OWN CANVAS | CLEAR THE GUI INSIDE GUI'S RENDER, NOT HERE
		var guiCanvas = App.Canvases.layers['GUI'];                                                // TODO: CLEAN THIS UP
		guiCanvas.getContext('2d').clearRect(0,0,App.Canvases.width, App.Canvases.height); // TODO: CLEAN THIS UP

		for(var c in this.components)if(this.components[c].render)
			this.components[c].render();
	};
}

App.CheckGuiClick = function(data,evt){
	var gui = App.Gui;
	var ret = false;
	var x = data.x;
	var y = data.y;

	for(var c in gui.components){
		var comp = gui.components[c];
		if(x > comp.x && x < (comp.x + comp.width) &&
		   y > comp.y && y < (comp.y + comp.height)){
			comp.callback();
			ret = true;
		}
	}

	return ret;
}

App.Button = function(menuName,x,y,width,height,text,callback){
	App.Menus[menuName].components.push(this);

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.callback = callback;
	this.gfx = App.GuiCanvas.getContext("2d");

	var textX = this.x + (this.width / 2); // for centering text
	var textY = this.y + (this.height / 2); // for centering text

	this.render = function(){
		this.gfx.fillStyle = "rgb(0,0,0)";
		this.gfx.fillRect(this.x,this.y,this.width,this.height);
		this.gfx.fillStyle = "rgb(255,255,255)";
		// this.gfx.textAlign = 'center';
		// this.gfx.fillText(this.text, textX, textY)
		this.gfx.fillText(this.text, this.x + 5, this.y + 20);
		this.gfx.strokeStyle = "rgb(255,255,255)";
		this.gfx.strokeRect(this.x,this.y,this.width,this.height);
	}
}

App.changeMenu = function(menuName){
	if(App.Menus[menuName])
		App.Gui = App.Menus[menuName];
}

function constructMenus(){
	App.GuiCanvas = App.Canvases.addNewLayer("GUI",0);

	App.Menus = [];

	App.Menus['mainMenu'] = new App.GuiFrame();
	new App.Button('mainMenu',10,10,100,30,'PLAY',function(){App.Game.enterPlanningMode();});	
	new App.Button('mainMenu',10,50,100,30,'LIBRARY',function(){alert("BAR");});
	new App.Button('mainMenu',10,90,100,30,'EDITOR',function(){App.Game.enterPlanningMode();});

	App.Menus['planning'] = new App.GuiFrame();
	new App.Button('planning',10,10,100,30,'Main Menu',function(){App.changeMenu('mainMenu');});

	App.Menus['simulation'] = new App.GuiFrame();
}
