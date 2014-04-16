
/*Creates a Gui object that:
3. allows adding components
5. updates components that have an update method
6. renders components that have a render method (all should)
*/
App.guiFrame = function(gfx){
	this.gfx = gfx;

	this.frame = [];
	this.active = null;
	//gets reset after one frame.
	this.drawStatic = true;


	this.testCoordinates = function(x,y){

		var ret = {f:[],p:[]};
		for(var c in this.frame){
			if(this.frame[c].guiCollider && this.frame[c].guiCollider.collides(x, y)){
					if(this.frame[c].guiCollider.functional)
						ret.f.push(this.frame[c]);
					ret.p.push(this.frame[c]);
			}
		}
		return ret;
	}

	this.update = function(){
		for(var c in this.frame)if(this.frame[c].update)
			this.frame[c].update();
	}

	this.windowResized = function(){
		this.drawStatic = true;

		for(var c in this.frame) {
			if(this.frame[c].updatePosition)
				this.frame[c].updatePosition();
		}
	}

	this.render = function(){

		if(this.drawStatic){
			this.gfx.clearRect(0,0,App.Canvases.width, App.Canvases.height);

			for(var c in this.frame){
				if(this.frame[c].render){
					this.gfx.font = App.Canvases.font;
					this.frame[c].render(this.gfx);

				}
			}

		 this.drawStatic = false;
		}
	}
}

