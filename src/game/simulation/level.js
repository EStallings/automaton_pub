App.SimulationLevel = function(width,height){
	this.gfx    = App.Game.gfx; // TODO: CHANGE THIS TO GRIDthis.gfx
	this.width  = width;
	this.height = height;
	this.grid         = [];
	this.tokens       = [];
	this.automatons   = [];
	this.instructions = [];
	this.streams      = [];

	// ========================================================== //

	this.getCell = function(x,y){
		x = addr(x,this.width);  // wrap-around
		y = addr(y,this.height); // wrap-around
		var i = this.grid[x];
		if(i === undefined)i = this.grid[x] = [];
		var j = i[y];
		if(j === undefined)j = i[y] = new Cell(this,x,y);
		return j;
	}

	this.removeCell = function(x,y){
		x = addr(x,this.width);  // wrap-around
		y = addr(y,this.height); // wrap-around
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
		for(var i in this.automatons)this.automatons[i].move();
*/
	}

	// TODO: THE GRID STUFF SHOULD BE CALLED IN STATIC RENDER
	this.render = function(){
		var cs = App.Game.cellSize;
		var w = this.width*cs;
		var h = this.height*cs;

		// draw grid lines
		this.gfx.strokeStyle = "#111111";
		this.gfx.beginPath();
		for(var i=0;i<=w;i+=cs){
			this.gfx.moveTo(i,0);
			this.gfx.lineTo(i,h);
		}for(var j=0;j<=h;j+=cs){
			this.gfx.moveTo(0,j);
			this.gfx.lineTo(w,j);
		}this.gfx.stroke();

		// draw grid corners
		this.gfx.strokeStyle = "#444444";
		for(var i=0;i<=w;i+=cs)
		for(var j=0;j<=h;j+=cs){
			this.gfx.beginPath();
			this.gfx.moveTo(i-4,j);
			this.gfx.lineTo(i+4,j);
			this.gfx.moveTo(i,j-4);
			this.gfx.lineTo(i,j+4);
			this.gfx.stroke();
		}

		this.gfx.strokeStyle = "#222222";
		for(var i=cs/2;i<w;i+=cs)
		for(var j=cs/2;j<h;j+=cs){
			this.gfx.beginPath();
			this.gfx.moveTo(i-4,j);
			this.gfx.lineTo(i+4,j);
			this.gfx.moveTo(i,j-4);
			this.gfx.lineTo(i,j+4);
			this.gfx.moveTo(i-7,j);
			this.gfx.arc(i,j,7,-Math.PI,Math.PI);
			this.gfx.stroke();
		}

		// draw level bounds
		this.gfx.strokeStyle = "#ffffff";
		this.gfx.beginPath();
		this.gfx.moveTo(0-4,0-4);
		this.gfx.lineTo(w+4,0-4);
		this.gfx.moveTo(0-4,0-4);
		this.gfx.lineTo(0-4,h+4);
		this.gfx.moveTo(0-4,h+4);
		this.gfx.lineTo(w+4,h+4);
		this.gfx.moveTo(w+4,0-4);
		this.gfx.lineTo(w+4,h+4);
		this.gfx.stroke();

/*
		// render level
		this.forEachCell(2); // render cells
		for(var i in this.automatons)this.automatons[i].render(interpolation);
*/
	}
}
