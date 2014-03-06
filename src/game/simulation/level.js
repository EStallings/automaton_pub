App.SimulationLevel = function(width,height){
	this.gfx    = App.Game.gridGfx; // TODO: CHANGE THIS TO GRIDthis.gfx
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

	this.forEachCell = function(f){
		for(var i in this.grid)for(var j in this.grid[i]){
			var cell = this.grid[i][j];
			if(cell === undefined)continue;
			this.grid[i][j][f]();
		}
	}

	// ========================================================== //

	this.update = function(){
/*
		this.forEachCell(0); // update cells
		this.forEachCell(1); // verify cells
*/
		for(var i in this.automatons)this.automatons[i].move();
	}

	// TODO: OPTIMIZE GRID RENDERING, MOVE GRID RENDERING TO GAME
	this.staticRender = function(){
		var cs = App.Game.cellSize;
		var w = this.width*cs;  // DELETE
		var h = this.height*cs; // DELETE
		var rx = fmod(App.Game.renderX,App.Game.cellSize);
		var ry = fmod(App.Game.renderY,App.Game.cellSize);

		// draw level bounds
		this.gfx.strokeStyle = "#ffffff";
		this.gfx.beginPath();
		this.gfx.moveTo(0-4,0-4);this.gfx.lineTo(w+4,0-4);
		this.gfx.moveTo(0-4,0-4);this.gfx.lineTo(0-4,h+4);
		this.gfx.moveTo(0-4,h+4);this.gfx.lineTo(w+4,h+4);
		this.gfx.moveTo(w+4,0-4);this.gfx.lineTo(w+4,h+4);
		this.gfx.stroke();

		// TODO: render static tokens
		// TODO: render static instruction layers
		// TODO: render any other static stuff
	}

	this.dynamicRender = function(){
		App.Game.automGfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
		App.Game.automGfx.save();
		App.Game.automGfx.translate(App.Game.renderX,App.Game.renderY);
		App.Game.automGfx.lineWidth = 4;
		for(var i in this.automatons)this.automatons[i].render();
		App.Game.automGfx.restore();

		// TODO: render sfx animation layers
	}
}
