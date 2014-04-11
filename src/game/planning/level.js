var PlanningLevel = function(){
	this.name;
	this.dateCreated;
	this.width;
	this.height;
	this.grid = [];

	this.insert = function(x,y,color,type){
		var i = this.grid[x];
		if(i === undefined)i = this.grid[x] = [];
		var j = i[y];
		if(j === undefined)j = i[y] = [];
		var c = j[color];
		if(c !== undefined)return false;
		j[color] = type;
		return true;
	}

	this.generateSimulationLevel = function(){
		var level = new App.SimulationLevel(this.width,this.height);
		for(var i in this.grid)
		for(var j in this.grid[i])
		for(var c in this.grid[i][j])
		if(this.grid[i][j][c])
			new App.SimulationInstruction(level,parseInt(i),parseInt(j),parseInt(c),this.grid[i][j][c]);
		return level;
	};

	this.generateParseString = function(){
		var str = [];
		str.push(this.name+'`'+this.dateCreated+'`'+this.width+'`'+this.height);
		for(var i in this.grid)
		for(var j in this.grid[i])
		for(var c in this.grid[i][j])
		if(this.grid[i][j][c])
			str.push(i+'`'+j+'`'+c+'`'+this.grid[i][j][c]);
		return str.join('~');
	};

	this.staticRender = function(){
		var cs = App.GameRenderer.cellSize;
		for(var c=0;c<4;++c){
			App.GameRenderer.instructionGfx.save();
			switch(c){
				case 0:App.GameRenderer.instructionGfx.translate(0,0);break;
				case 1:App.GameRenderer.instructionGfx.translate(cs/2,0);break;
				case 2:App.GameRenderer.instructionGfx.translate(0,cs/2);break;
				case 3:App.GameRenderer.instructionGfx.translate(cs/2,cs/2);break;
			}

			for(var i in this.grid)
			for(var j in this.grid[i])
			if(this.grid[i][j][c])
				App.InstCatalog.render(App.GameRenderer.instructionGfx,this.grid[i][j][c],i*cs,j*cs,c,cs/2);

			App.GameRenderer.instructionGfx.restore();
		}
	}

	this.dynamicRender = function(){}
}
