function GuiButton(rect, rgba, text, tRgba, tOffsetX, tOffsetY, callback){
	this.pane = new GuiPane(rect, rgba, 3);
	this.text = new GuiRawText(new Rect(rect.x + tOffsetX, rect.y + tOffsetY, 0, 0), 
								tRgba, text);

	this.pane.c.addChild(this.text.c);
	this.collider = new GuiColliderComponent(callback, rect);
}



function GuiRawText(rect, rgba, text, font){
	this.t = (text) ? text : "Default GuiText";
	this.font = (font) ? font : Font();

	this.c = new GuiComponent(rect, this, 10);
	this.rgba = rgba;

	this.drawGui = function(context, baseGridSize){
		context.font = this.font;
		context.fillStyle = this.rgba;
		context.fillText(this.t, this.c.x, this.c.y);
	}

}

function GuiFrame(rect, rgba){

	this.c = new GuiComponent(rect, this, 0);
	this.rgba = rgba;

	this.drawGui = function(context, baseGridSize){
		context.fillStyle = this.rgba;
		context.fillRect(this.c.x, this.c.y, this.c.w, this.c.h);
		context.strokeRect(this.c.x, this.c.y, this.c.w, this.c.h);
	}
}

function GuiPane(rect, rgba, layer){
	this.c = new GuiComponent(rect, this, (layer) ? layer : 1);
	this.rgba = rgba;

	this.drawGui = function(context, baseGridSize){
		context.fillStyle = this.rgba;
		context.fillRect(this.c.x, this.c.y, this.c.w, this.c.h);
	}
}

function GuiColliderComponent(callback, rect){
	GuiView.addCollider(this);
	this.rect = rect;

	this.checkCollide = function(px, py, evt){
		var x1 = this.rect.x;
		var y1 = this.rect.y;
		var y2 = this.rect.h + y1;
		var x2 = this.rect.w + x1;

		if(px >= x1 && px < x2 && py >= y1 && py < y2){
			callback(evt);
			return true;
		}

	}

}



function Font(size, weight, variant, style, font){
	var size = (size) ? size : 10;
	var weight = (weight) ? weight : "normal";
	var variant = (variant) ? variant : "normal";
	var style = (style) ? style : "normal";
	var font = (font) ? font : "sans-serif";

	return style + " " + variant + " " + weight + " " + size + "px " + font;
}

function Rgba (r, g, b, a){
	return "rgba(" + r + "," + g + "," + b + "," + a +")";
}

function Rect (x, y, w, h){
	this.x = (isIntegral(x)) ? x : 0;
	this.y = (isIntegral(y)) ? y : 0;
	this.w = (isIntegral(w)) ? w : 0;
	this.h = (isIntegral(h)) ? h : 0;
}

function GuiComponent(rect, obj, layer){
	this.x = rect.x; //I restate these so you don't have to do this.c.r.x or something stupid looking like that.
	this.y = rect.y;
	this.w = rect.w;
	this.h = rect.h;

	this.children = [];
	GuiView.addObject(obj, layer);

	this.addChild = function(component, relX, relY){
		this.children.push(component);
		if(relX && relY){
			component.x += relX;
			component.y += relY;
		}
	}

	this.updatePosition = function(x, y){
		var dX = x - this.x;
		var dY = y - this.y;

		for(var i = 0; i < this.children.length; i++){
			this.children[i].updatePosition(this.children[i].x + dX, this.children[i].y + dY);
		}

		this.x = x;
		this.y = y;
	}

	this.updateSize = function(w, h){
		this.w = w;
		this.h = h;
	}
}

