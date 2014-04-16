
//A backgound panel. You can add things to these to organize your components for
//relative positioning and rapid gui alterations.
App.GuiPanel = function(guiCollider){
	this.guiCollider = guiCollider;
	this.children = [];
	this.xAlignment = 'left';
	this.yAlignment = 'top';
	this.color = App.GuiPanel.rgba;

	this.addChild = function(comp){
		this.children.push(comp);
		comp.guiCollider.positionRelative(this);
	}

	this.removeChild = function(comp){
		var index =this.children.indexOf(comp);
		if (index > -1) {
		  this.children.splice(index, 1);
		}
	}

	this.updatePosition = function(){
		var x = this.guiCollider.baseX;
		var y = this.guiCollider.baseY;
		var ox = (this.guiCollider.w) ? this.guiCollider.w : 0;
		var oy = (this.guiCollider.h) ? this.guiCollider.h : 0;
		var r = (this.guiCollider.r) ? this.guiCollider.r : 0;
		var w = App.Canvases.width;
		var h = App.Canvases.height;

		if(this.xAlignment === 'left'){
			this.guiCollider.x = x + r;
		}
		else if(this.xAlignment === 'right'){
			this.guiCollider.x = x + w - ox - r;
		}
		else if(this.xAlignment === 'center'){
			this.guiCollider.x = x + (w/2) - (ox/2) - r;
		}

		if(this.yAlignment === 'top'){
			this.guiCollider.y = y + r;
		}
		else if(this.yAlignment === 'bottom'){
			this.guiCollider.y = y + h - oy - r;
		}
		else if(this.yAlignment === 'center'){
			this.guiCollider.y = y + (h/2) - (oy/2) - r;
		}

		for (var c in this.children){
			this.children[c].guiCollider.positionRelative(this);
		}
	}

	this.render = function(gfx){
		gfx.fillStyle = this.color;
		gfx.fillRect(this.guiCollider.getx(), this.guiCollider.gety(), this.guiCollider.w, this.guiCollider.h);
	}

}
App.GuiPanel.rgba = 'rgba(0,0,0, 0.75)';

//Subclassing in JS is awful. Breaks everything. Use factories instead usually
App.makeBlockingPanel = function(){
	var p = new App.GuiPanel(new App.GuiCollisionRect(0,0,App.Canvases.width, App.Canvases.height));
	p.color = 'rgba(0,0,0,0.50)';
	return p;
}