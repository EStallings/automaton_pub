App.SimulationLevel = function(width,height){
	this.gfx    = App.Game.borderGfx; // TODO: CHANGE THIS TO GRIDthis.gfx
	this.width  = width;
	this.height = height;
	this.grid         = [];
	this.tokens       = [];
	this.automatons   = [];
	this.instructions = [];
	this.streams      = [];

	// ========================================================== //

	this.getCell = function(x,y){
		x = addr(x,this.width);  // wrap-around, assuming toroidal rendering
		y = addr(y,this.height); // wrap-around, assuming toroidal rendering
		var i = this.grid[x];
		if(i === undefined)i = this.grid[x] = [];
		var j = i[y];
		if(j === undefined)j = i[y] = new App.SimulationCell(this,x,y);
		return j;
	}

	this.removeCell = function(x,y){
		x = addr(x,this.width);  // wrap-around, assuming toroidal rendering
		y = addr(y,this.height); // wrap-around, assuming toroidal rendering
		var i = this.grid[x];
		if(i === undefined)return;
		i[y] = undefined;
	}

	// ========================================================== //

	this.update = function(){
		// cell verification
		for(var i in this.grid)for(var j in this.grid[i]){
			var cell = this.grid[i][j];
			if(cell === undefined)continue;
			this.grid[i][j].verify();
		}

		// ALL automatons MUST be processes before theyre moved
		for(var i in this.automatons)this.automatons[i].process();
		for(var i in this.automatons)this.automatons[i].move();
	}

	this.staticRender = function(){
		// draw level bounds | XXX: SHOULD WE EVEN RENDER THIS...
		App.Game.translateCanvas(this.gfx);
		App.Game.borderGfx.lineWidth = 2;
		var cs = App.Game.cellSize;
		var w = this.width*cs;
		var h = this.height*cs;
		this.gfx.strokeStyle = "#888888";
		this.gfx.beginPath();
		this.gfx.moveTo(0-4,0-4);this.gfx.lineTo(w+4,0-4);
		this.gfx.moveTo(0-4,0-4);this.gfx.lineTo(0-4,h+4);
		this.gfx.moveTo(0-4,h+4);this.gfx.lineTo(w+4,h+4);
		this.gfx.moveTo(w+4,0-4);this.gfx.lineTo(w+4,h+4);
		this.gfx.stroke();
		this.gfx.restore();

		// TODO: render static tokens
		// TODO: render static instruction layers
		// TODO: render any other static stuff
	}

	this.dynamicRender = function(){
		App.Game.translateCanvas(App.Game.automGfx);
		App.Game.translateCanvas(App.Game.tokenDGfx);
		App.Game.automGfx.lineWidth = 4;
		App.Game.tokenDGfx.textAlign = "center";
		App.Game.tokenDGfx.textBaseline = "middle";
		App.Game.tokenDGfx.font = "bold "+App.Game.cellSize/2+"px arial";
		for(var i in this.automatons)this.automatons[i].render();
		// TODO: render sfx animation layers
		App.Game.automGfx.restore();
		App.Game.tokenDGfx.restore();
	}
}
