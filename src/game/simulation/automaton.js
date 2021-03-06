App.SimulationAutomaton = function(level,x,y,direction,color){
	level.automatons.push(this);
	level.getCell(x,y).automatons.push(this);

	this.level = level;
	this.cell = level.getCell(x,y);
	this.gfx = App.GameRenderer.automGfx;
	this.x = x;
	this.y = y;
	this.direction = direction;
	this.colorFlags = [false,false,false,false];
	this.colorFlags[color] = true;
	this.tokenHeld = undefined;
	this.wait = false;

	this.move = function(){
		if(this.wait)return;

		// remove from old cell
		var oldCell = this.level.getCell(this.x,this.y);
		oldCell.automatons.splice(oldCell.automatons.indexOf(this),1);

		// move automaton
		var w = this.level.width;
		var h = this.level.height;
		switch(this.direction){
			case App.DIRECTIONS.UP    : this.y = addr(this.y-1,this.level.height);break;
			case App.DIRECTIONS.DOWN  : this.y = addr(this.y+1,this.level.height);break;
			case App.DIRECTIONS.LEFT  : this.x = addr(this.x-1,this.level.width);break;
			case App.DIRECTIONS.RIGHT : this.x = addr(this.x+1,this.level.width);break;
		}

		// add to new cell
		this.level.getCell(this.x,this.y).automatons.push(this);
	}

	this.rFunc = function(x,y){
		var c = App.GameRenderer.cellSize;
		var h = App.GameRenderer.cellSize/2;

		// interpolation adjustment
		if(!this.wait)switch(this.direction){
			case App.DIRECTIONS.UP    : y+=(1-App.GameRenderer.interpolation);break;
			case App.DIRECTIONS.DOWN  : y-=(1-App.GameRenderer.interpolation);break;
			case App.DIRECTIONS.LEFT  : x+=(1-App.GameRenderer.interpolation);break;
			case App.DIRECTIONS.RIGHT : x-=(1-App.GameRenderer.interpolation);break;
		}

		// render token if holding one
		if(this.tokenHeld != undefined)this.tokenHeld.dynamicRender(x*c,y*c);

		this.gfx.lineWidth = (Math.round(Math.log(c/3)/Math.log(2)+2)-5)*2;
		this.gfx.strokeStyle = 'rgba(255,255,255,0.1)';
		this.gfx.beginPath();
		this.gfx.arc(x*c+h,y*c+h,h,-Math.PI,Math.PI);
		this.gfx.stroke();

		// render automaton outline
		this.gfx.lineWidth = (Math.round(Math.log(c/3)/Math.log(2)+2)-5)*2+4;
		if(this.colorFlags[App.COLORS.RED]){
			this.gfx.strokeStyle = App.STROKE_COLOR[App.COLORS.RED];
			this.gfx.beginPath();
			this.gfx.arc(x*c+h,y*c+h,h,-Math.PI,-Math.PI/2);
			this.gfx.stroke();
		}if(this.colorFlags[App.COLORS.GREEN]){
			this.gfx.strokeStyle = App.STROKE_COLOR[App.COLORS.GREEN];
			this.gfx.beginPath();
			this.gfx.arc(x*c+h,y*c+h,h,-Math.PI/2,0);
			this.gfx.stroke();
		}if(this.colorFlags[App.COLORS.BLUE]){
			this.gfx.strokeStyle = App.STROKE_COLOR[App.COLORS.BLUE];
			this.gfx.beginPath();
			this.gfx.arc(x*c+h,y*c+h,h,Math.PI/2,Math.PI);
			this.gfx.stroke();
		}if(this.colorFlags[App.COLORS.YELLOW]){
			this.gfx.strokeStyle = App.STROKE_COLOR[App.COLORS.YELLOW];
			this.gfx.beginPath();
			this.gfx.arc(x*c+h,y*c+h,h,0,Math.PI/2);
			this.gfx.stroke();
		}

		// render automaton
		this.gfx.lineWidth = (Math.round(Math.log(c/3)/Math.log(2)+2)-5)*2;
		if(this.colorFlags[App.COLORS.RED]){
			this.gfx.strokeStyle = App.FILL_COLOR[App.COLORS.RED];
			this.gfx.beginPath();
			this.gfx.arc(x*c+h,y*c+h,h,-Math.PI,-Math.PI/2);
			this.gfx.stroke();
		}if(this.colorFlags[App.COLORS.GREEN]){
			this.gfx.strokeStyle = App.FILL_COLOR[App.COLORS.GREEN];
			this.gfx.beginPath();
			this.gfx.arc(x*c+h,y*c+h,h,-Math.PI/2,0);
			this.gfx.stroke();
		}if(this.colorFlags[App.COLORS.BLUE]){
			this.gfx.strokeStyle = App.FILL_COLOR[App.COLORS.BLUE];
			this.gfx.beginPath();
			this.gfx.arc(x*c+h,y*c+h,h,Math.PI/2,Math.PI);
			this.gfx.stroke();
		}if(this.colorFlags[App.COLORS.YELLOW]){
			this.gfx.strokeStyle = App.FILL_COLOR[App.COLORS.YELLOW];
			this.gfx.beginPath();
			this.gfx.arc(x*c+h,y*c+h,h,0,Math.PI/2);
			this.gfx.stroke();
		}
	}

	this.dynamicRender = function(){
		// wrap-around rendering
		var x=this.x,y=this.y,w=this.level.width,h=this.level.height;
		if(x == 0){
			if(y == 0){
				this.rFunc(x+w,y+h);
				this.rFunc(x,y+h);
			}else if(y == h-1){
				this.rFunc(x+w,y-h);
				this.rFunc(x,y-h);
			}this.rFunc(x+w,y);
		}else if(x == w-1){
			if(y == 0){
				this.rFunc(x-w,y+h);
				this.rFunc(x,y+h);
			}else if(y == h-1){
				this.rFunc(x-w,y-h);
				this.rFunc(x,y-h);
			}this.rFunc(x-w,y);
		}else{
			if(y == 0){
				this.rFunc(x,y+h);
			}else if(y == h-1){
				this.rFunc(x,y-h);
			}
		}this.rFunc(x,y);
	}
}
