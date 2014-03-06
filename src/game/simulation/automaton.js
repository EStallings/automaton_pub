App.SimulationAutomaton = function(level,x,y,direction,red,green,blue,yellow){
	level.automatons.push(this);
	level.getCell(x,y).automatons.push(this);

	this.level = level;
	this.x = x;
	this.y = y;
	this.direction = direction;
	this.colorFlags = [];             // TODO: STREAMLINE THIS
	this.colorFlags[RED] = red;       // TODO: STREAMLINE THIS
	this.colorFlags[GREEN] = green;   // TODO: STREAMLINE THIS
	this.colorFlags[BLUE] = blue;     // TODO: STREAMLINE THIS
	this.colorFlags[YELLOW] = yellow; // TODO: STREAMLINE THIS
	this.tokenHeld = undefined;

	this.update = function(){
		// TODO: MOVE FUNCTIONALITY FROM cell.update() HERE
	}

	this.move = function(){
		// remove from old cell
		var oldCell = this.level.getCell(this.x,this.y);
		oldCell.automatons.splice(oldCell.automatons.indexOf(this),1);

		// move automaton
		var w = level.width;
		var h = level.height;
		switch(this.direction){
			case UP    : --this.y;if(h!=0&&this.y<0 )this.y=h-1;break;
			case DOWN  : ++this.y;if(h!=0&&this.y>=h)this.y=0;  break;
			case LEFT  : --this.x;if(w!=0&&this.x<0 )this.x=w-1;break;
			case RIGHT : ++this.x;if(w!=0&&this.x>=w)this.x=0;  break;
		}

		// add to new cell
		this.level.getCell(this.x,this.y).automatons.push(this);
	}

	this.rFunc = function(x,y,interpolation){
/*
		var c = cellSize;
		var h = cellSize/2;

		// interpolation adjustment
		switch(this.direction){
			case UP    : y+=(1-interpolation);break;
			case DOWN  : y-=(1-interpolation);break;
			case LEFT  : x+=(1-interpolation);break;
			case RIGHT : x-=(1-interpolation);break;
		}

		// render token if holding one
		if(this.tokenHeld != undefined)this.tokenHeld.render(x*c,y*c);

		// render automaton
		gfx.lineWidth = 4;
		if(this.colorFlags[RED]){
			gfx.strokeStyle = "#ff0000";
			gfx.drawCircle(x*c+h,y*c+h,h,-Math.PI,-Math.PI/2);
		}if(this.colorFlags[GREEN]){
			gfx.strokeStyle = "#00ff00";
			gfx.drawCircle(x*c+h,y*c+h,h,-Math.PI/2,0);
		}if(this.colorFlags[BLUE]){
			gfx.strokeStyle = "#0000ff";
			gfx.drawCircle(x*c+h,y*c+h,h,Math.PI/2,Math.PI);
		}if(this.colorFlags[YELLOW]){
			gfx.strokeStyle = "#ffff00";
			gfx.drawCircle(x*c+h,y*c+h,h,0,Math.PI/2);
		}
*/
	}

	this.render = function(interpolation){
/*
		// wrap-around rendering
		var x=this.x,y=this.y,w=this.level.width,h=this.level.height,i=interpolation;
		if(x == 0){
			if(y == 0){
				this.rFunc(x,y+h,i);
				this.rFunc(x+w,y+h,i);
			}else if(y == h-1){
				this.rFunc(x,y-h,i);
				this.rFunc(x+w,y-h,i);
			}this.rFunc(x+w,y,i);
		}else if(x == w-1){
			if(y == 0){
				this.rFunc(x,y+h,i);
				this.rFunc(x-w,y+h,i);
			}else if(y == h-1){
				this.rFunc(x,y-h,i);
				this.rFunc(x-w,y-h,i);
			}this.rFunc(x-w,y,i);
		}else{
			if(y == 0){
				this.rFunc(x,y+h,i);
			}else if(y == h-1){
				this.rFunc(x,y-h,i);
			}
		}this.rFunc(x,y,i);
*/
	}
}
