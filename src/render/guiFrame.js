Application.GuiFrame = function(){

	this.comps = [];

	this.update = function(){
		for(var c in this.comps){
			if(this.comps[c].update)
				this.comps[c].update();
		}
	};

	this.render = function(){
		for(var c in this.comps){
			if(this.comps[c].render)
				this.comps[c].render();
		}
	};


}

Application.CheckGuiClick = function(data, evt){
	var ret = false;
	var gui = Application.Gui;
	var x = data.x;
	var y = data.y;
	for(var c in gui.comps){
		var comp = gui.comps[c];
		if(x > comp.x && x < (comp.x + comp.width) 
			&& y > comp.y && y < (comp.y + comp.height)){
			comp.callback();
			ret = true;
		}
	}
	return ret;
}
	

Application.Button = function(x,y,width,height,text,callback,gfx){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.callback = callback;
	this.gfx = gfx;

	this.render = function(){
		this.gfx.fillStyle="rgb(0,0,0)";
		this.gfx.fillRect(this.x,this.y,this.width,this.height);
		this.gfx.fillStyle="rgb(255,255,255)";
		this.gfx.fillText(this.text, this.x + 5, this.y + 20); //TODO offset text
		this.gfx.strokeStyle = "rgb(255,255,255)";
		this.gfx.strokeRect(this.x,this.y,this.width,this.height);
	}
}

Application.changeMenu = function(menuName){

	if(Application.Menus[menuName]){
		Application.Gui = Application.Menus[menuName];
	}
}

function constructMenus(){
	var canvas = Application.Canvases.layers['GUI'];
	var gfx = canvas.getContext('2d');
	Application.Menus = [];

	Application.Menus['temp'] = new Application.GuiFrame();
	Application.Menus['temp'].comps.push(new Application.Button(10,10,100,30,'TEMP',function(){Application.changeMenu('mainMenu'); console.log("bar")},gfx));	

	Application.Menus['mainMenu'] = new Application.GuiFrame();
	Application.Menus['mainMenu'].comps.push(new Application.Button(10,10,100,30,'PLAY',function(){Application.Game.enterPlanningMode(); },gfx));	

	Application.Menus['mainMenu'].comps.push(new Application.Button(10,50,100,30,'LIBRARY',function(){alert("BAR");},gfx));
	Application.Menus['mainMenu'].comps.push(new Application.Button(10,90,100,30,'EDITOR',function(){Application.Game.enterPlanningMode();},gfx));

	Application.Menus['planning'] = new Application.GuiFrame();


	Application.Menus['simulation'] = new Application.GuiFrame();



}