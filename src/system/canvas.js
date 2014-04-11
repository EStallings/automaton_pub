App.createCanvasArray = function(){
	var canvases = {};
	canvases.width;
	canvases.height;
	canvases.halfWidth;
	canvases.halfHeight;
	canvases.layers = [];

	// adds and returns a new canvas to the canvas array
	canvases.addNewLayer = function(name,z){
		var layer = document.createElement('canvas');

		layer.id = name;
		layer.width = canvases.width;
		layer.height = canvases.height;
		layer.style.zIndex = z;
		layer.style.position = 'absolute';
		document.body.appendChild(layer);

		canvases.layers[name] = layer;
		return layer.getContext('2d'); //skip the middleman for most of these...
	}

	// resizes all canvases when browser window is resized
	window.onresize = function(){
		canvases.width = window.innerWidth;
		canvases.height = window.innerHeight;
		canvases.halfWidth = canvases.width/2;
		canvases.halfHeight = canvases.height/2;

		for(var i in canvases.layers){
			var layer = canvases.layers[i];
			layer.width = canvases.width;
			layer.height = canvases.height;
		}

		// TODO: everything needs to be re-rendered
		App.GameRenderer.requestStaticRenderUpdate = true;
		App.GameRenderer.requestUltraStaticRenderUpdate = true;
		App.ModeHandler.callResizeFuncs();
	}

	return canvases;
}
