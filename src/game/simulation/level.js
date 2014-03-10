App.SimulationLevel = function(width,height){
	this.gfx    = App.Game.borderGfx;
	this.width  = width;
	this.height = height;
	this.grid         = [];
	this.tokens       = [];
	this.automatons   = [];
	this.instructions = [];
	this.inStreams    = [];
	this.outStreams   = [];

	// ========================================================== //

	this.getCell = function(x,y){
		x = addr(x,this.width);
		y = addr(y,this.height);
		var i = this.grid[x];
		if(i === undefined)i = this.grid[x] = [];
		var j = i[y];
		if(j === undefined)j = i[y] = new App.SimulationCell(this,x,y);
		return j;
	}

	this.removeCell = function(x,y){
		x = addr(x,this.width);
		y = addr(y,this.height);
		var i = this.grid[x];
		if(i === undefined)return;
		i[y] = undefined;
	}

	// ========================================================== //

	this.update = function(){
		// cell verification
		// TODO: TOKEN MID-CELL COLLISION
		for(var i in this.grid)for(var j in this.grid[i]){
			var cell = this.grid[i][j];
			if(cell === undefined)continue;
			this.grid[i][j].process();
		}

		// ALL automatons MUST be processes before theyre moved
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

		App.Game.translateCanvas(App.Game.instructionGfx);
		App.Game.instructionGfx.lineWidth = 2;
		App.Game.translateCanvas(App.Game.tokenSGfx);
		App.Game.tokenSGfx.textAlign = "center";
		App.Game.tokenSGfx.textBaseline = "middle";
		App.Game.tokenSGfx.font = "bold "+App.Game.cellSize/2+"px arial";

		for(var i in this.grid)/* TODO: if i intersects with window */
		for(var j in this.grid[i])/* TODO: if j intersects with window */{
			var cell = this.grid[i][j];
			if(cell === undefined)continue;
			this.grid[i][j].staticRender();
		}

		App.Game.instructionGfx.restore();
		App.Game.tokenSGfx.restore();
	}

	this.dynamicRender = function(){
		App.Game.translateCanvas(App.Game.automGfx);
		App.Game.translateCanvas(App.Game.tokenDGfx);
		App.Game.tokenDGfx.textAlign = "center";
		App.Game.tokenDGfx.textBaseline = "middle";
		App.Game.tokenDGfx.font = "bold "+App.Game.cellSize/2+"px arial";
		// TODO: OPTIMIZE RENDERING: ONLY RENDER STUFF INSIDE WINDOW
		for(var i in this.automatons)this.automatons[i].dynamicRender();
		// TODO: render sfx animation layers
		App.Game.automGfx.restore();
		App.Game.tokenDGfx.restore();
	}
}
