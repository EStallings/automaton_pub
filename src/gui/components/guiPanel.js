
//A backgound panel. You can add things to these to organize your components for
//relative positioning and rapid gui alterations.
App.GuiPanel = function(x, y, w, h){
	App.GuiTools.Component.call(this, x, y, w, h);
	this.children = [];
	this.xAlignment = 'left';
	this.yAlignment = 'top';
	this.color = 'rgba(0,0,0, 0.75)';

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
}
App.GuiPanel.prototype = Object.create(App.GuiTools.Component);
App.GuiPanel.prototype.constructor = App.GuiPanel;
