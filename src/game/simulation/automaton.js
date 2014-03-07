App.SimulationAutomaton = function(level,x,y,direction,red,green,blue,yellow){
	level.automatons.push(this);
	level.getCell(x,y).automatons.push(this);

	this.level = level;
	this.cell = level.getCell(x,y);
	this.gfx = App.Game.automGfx;
	this.x = x;
	this.y = y;
	this.direction = direction;
	this.colorFlags = [];                        // TODO: STREAMLINE THIS
	this.colorFlags[0] = red;       // TODO: STREAMLINE THIS
	this.colorFlags[1] = green;   // TODO: STREAMLINE THIS
	this.colorFlags[2] = blue;     // TODO: STREAMLINE THIS
	this.colorFlags[3] = yellow; // TODO: STREAMLINE THIS
	this.tokenHeld = undefined;

	this.move = function(){
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
		var c = App.Game.cellSize;
		var h = App.Game.cellSize/2;

		// interpolation adjustment
		switch(this.direction){
			case App.DIRECTIONS.UP    : y+=(1-App.Game.interpolation);break;
			case App.DIRECTIONS.DOWN  : y-=(1-App.Game.interpolation);break;
			case App.DIRECTIONS.LEFT  : x+=(1-App.Game.interpolation);break;
			case App.DIRECTIONS.RIGHT : x-=(1-App.Game.interpolation);break;
		}

		// TODO: CALL TOKEN DYNAMIC RENDER?
		// render token if holding one
		if(this.tokenHeld != undefined)this.tokenHeld.dynamicRender(x*c,y*c);

		// render automaton
		if(this.colorFlags[App.COLORS.RED]){
			this.gfx.strokeStyle = "#ff0000";
			this.gfx.beginPath();
			this.gfx.arc(x*c+h,y*c+h,h,-Math.PI,-Math.PI/2);
			this.gfx.stroke();
		}if(this.colorFlags[App.COLORS.GREEN]){
			this.gfx.strokeStyle = "#00ff00";
			this.gfx.beginPath();
			this.gfx.arc(x*c+h,y*c+h,h,-Math.PI/2,0);
			this.gfx.stroke();
		}if(this.colorFlags[App.COLORS.BLUE]){
			this.gfx.strokeStyle = "#0000ff";
			this.gfx.beginPath();
			this.gfx.arc(x*c+h,y*c+h,h,Math.PI/2,Math.PI);
			this.gfx.stroke();
		}if(this.colorFlags[App.COLORS.YELLOW]){
			this.gfx.strokeStyle = "#ffff00";
			this.gfx.beginPath();
			this.gfx.arc(x*c+h,y*c+h,h,0,Math.PI/2);
			this.gfx.stroke();
		}
	}

	this.render = function(){
		// wrap-around rendering
		var x=this.x,y=this.y,w=this.level.width,h=this.level.height;
		if(x == 0){
			if(y == 0){
				this.rFunc(x,y+h);
				this.rFunc(x+w,y+h);
			}else if(y == h-1){
				this.rFunc(x,y-h);
				this.rFunc(x+w,y-h);
			}this.rFunc(x+w,y);
		}else if(x == w-1){
			if(y == 0){
				this.rFunc(x,y+h);
				this.rFunc(x-w,y+h);
			}else if(y == h-1){
				this.rFunc(x,y-h);
				this.rFunc(x-w,y-h);
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
