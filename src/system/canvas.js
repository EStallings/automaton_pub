App.createCanvasArray = function(){
	var canvases = {};
	canvases.width;
	canvases.height;
	canvases.layers = [];

	// adds and returns a new canvas to the canvas array
	canvases.addNewLayer = function(name,z){
		var layer = document.createElement("canvas");
		layer.id = name;
		layer.width = canvases.width;
		layer.height = canvases.height;
		layer.style.zIndex = z;
		layer.style.position = "absolute";

		//I like this font. It's not, of course, mandatory that we use it. Just please, not a monospace font in the game... lol
		layer.getContext('2d').font = "12px Futurastd";
		document.body.appendChild(layer);

		canvases.layers[name] = layer;
		return layer;
	}

	// resizes all canvases when browser window is resized
	window.onresize = function(){
		canvases.width = window.innerWidth;
		canvases.height = window.innerHeight;

		for(var i in canvases.layers){
			var layer = canvases.layers[i];
			layer.width = canvases.width;
			layer.height = canvases.height;
		}

		// TODO: everything needs to be re-rendered
		if(App.Game)App.Game.requestStaticRenderUpdate = true;
		if(App.Gui)App.Gui.drawStatic = true;
	}

	window.onresize(); // initializes width and height on page-load
	return canvases;
}
