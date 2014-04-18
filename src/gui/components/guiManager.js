
/*Creates a Gui object that:
3. allows adding components
5. updates components that have an update method
6. renders components that have a render method (all should)
*/
App.guiFrame = function(gfx){
	this.gfx = gfx;

	this.frame = [];

	//gets reset after one frame.
	this.drawStatic = false;
	this.guilock = false;

	this.load = function(){
		this.guilock = false;
		this.drawStatic = true;
	}

	this.testCoordinates = function(x,y){

		var ret = {f:[],p:[]};
		for(var c in this.frame){
			if(this.frame[c].collides(x, y)){
					if(this.frame[c].functional)
						ret.f.push(this.frame[c]);
					ret.p.push(this.frame[c]);
			}
		}
		return ret;
	}

	//lmb must be true or false. if it's false, it will block input but not do anything
	this.mouseDown = function(x, y, lmb){
		var comps = this.testCoordinates(x, y);
		if(!comps.f && !comps.p)
			return false;

		if(!lmb)
			return true;

		for(var fn in comps.f){
			if(comps.f[fn].locked) continue;
			comps.f[fn]._clickStart();
			comps.f[fn].clickStart();
		}

		return true;
	}

	//Only needs to be called when lmb is released. Returns nothing.
	this.mouseUp = function(x, y){
		var comps = this.testCoordinates(x, y);

		for(var fn in comps.f){
			if(comps.f[fn].locked) continue;
			comps.f[fn]._clickEnd();
			if(comps.f[fn].active)
				comps.f[fn].clickEnd();
		}
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

	this.clear = function(){
		this.gfx.clearRect(0,0,App.Canvases.width, App.Canvases.height);
	}

	this.render = function(){

		if(this.drawStatic){
			this.clear();

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

