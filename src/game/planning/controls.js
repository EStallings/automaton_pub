App.PlanningControls = function(){
	var that = this;

	this.mX; this.mY; // current mouse position
	this.lmb = ['up',-1,-1]; // 1st index is for up (0) or down (1). 2nd is for x coordinate of click, 3rd is for y
	this.mmb = ['up',-1,-1];
	this.rmb = ['up',-1,-1];
	this.lmbDrag = false;
	this.mmbDrag = false;
	this.rmbDrag = false;

	this.mouseMove = function(x,y){
		this.mX = x; this.mY = y;
		if(that.lmb[0] === 'down' && (that.lmb[1] !== x || that.lmb[2] !== y)){ that.lmbDrag = true; } else { that.lmbDrag = false; }
		if(that.mmb[0] === 'down' && (that.mmb[1] !== x || that.mmb[2] !== y)){ that.mmbDrag = true; } else { that.mmbDrag = false; }
		if(that.rmb[0] === 'down' && (that.rmb[1] !== x || that.rmb[2] !== y)){ that.rmbDrag = true; } else { that.rmbDrag = false; }
	}

	this.buttonDown = function(button,x,y){
		if(button == 'lmb'){ that.lmb = ['down',x,y]; }
		if(button == 'mmb'){ that.mmb = ['down',x,y]; }
		if(button == 'rmb'){ that.rmb = ['down',x,y]; }
	}

	this.buttonUp = function(button,x,y){
		if(button == 'lmb'){ that.lmb = ['up',x,y]; }
		if(button == 'mmb'){ that.mmb = ['up',x,y]; }
		if(button == 'rmb'){ that.rmb = ['up',x,y]; }
	}

	this.downKeys = [];
	
	this.keyDown = function(x){ that.downKeys.push(x); }

	this.keyUp = function(x){ 
		var idx = that.downKeys.indexOf(x);
		if(idx !== -1){
			that.downKeys.splice(idx-1,idx+1);
		}
	}
}