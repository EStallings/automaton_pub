App.SimulationLevel = function(){
	this.width;
	this.height;
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

	this.render = function(){
/*
		var w = this.width*cellSize;
		var h = this.height*cellSize;

		// draw grid
		gfx.strokeStyle = "#111111";
		for(var i=0;i<w;i+=cellSize)gfx.drawLine(i,0,i,h);
		for(var j=0;j<h;j+=cellSize)gfx.drawLine(0,j,w,j);
		gfx.strokeStyle = "#444444";
		for(var i=0;i<=w;i+=cellSize)for(var j=0;j<=h;j+=cellSize){
			gfx.beginPath();
			gfx.moveTo(i-4,j);
			gfx.lineTo(i+4,j);
			gfx.moveTo(i,j-4);
			gfx.lineTo(i,j+4);
			gfx.stroke();
		}gfx.strokeStyle = "#222222";
		for(var i=cellSize/2;i<w;i+=cellSize)for(var j=cellSize/2;j<h;j+=cellSize){
			gfx.beginPath();
			gfx.moveTo(i-4,j);
			gfx.lineTo(i+4,j);
			gfx.moveTo(i,j-4);
			gfx.lineTo(i,j+4);
			gfx.moveTo(i-7,j);
			gfx.arc(i,j,7,-Math.PI,Math.PI);
			gfx.stroke();
		}

		// draw level bounds
		gfx.strokeStyle = "#ffffff";
		gfx.drawLine(0-4,0-4,w+4,0-4);
		gfx.drawLine(0-4,0-4,0-4,h+4);
		gfx.drawLine(0-4,h+4,w+4,h+4);
		gfx.drawLine(w+4,0-4,w+4,h+4);

		// render level
		var interpolation = (tick-this.lastCycleTick)/(this.nextCycleTick-this.lastCycleTick);
		this.forEachCell(2); // render cells
		for(var i in this.automatons)this.automatons[i].render(interpolation);
*/
	}
}
