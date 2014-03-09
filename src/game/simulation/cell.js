App.SimulationCell = function(level,x,y){
	this.level = level;
	this.x = x;
	this.y = y;
	this.tokens       = [];
	this.automatons   = [];
	this.instructions = [];

	this.process = function(){
		// remove this cell if its empty
		if(this.tokens.length       === 0 && this.automatons.length === 0 &&
		   this.instructions.length === 0){
			level.removeCell(this.x,this.y);
			return;
		}

		// report error if token collision detected
		var total = this.tokens.length;
		for(var i in this.automatons)
		if(this.automatons[i].tokenHeld !== undefined)++total;
		if(total > 1)App.Game.simulationError(); // TODO: tell game reached invalid state (token collision)

		// execute instructions
		for(var a in this.automatons)for(var i in App.COLORS){
			var instruction = this.instructions[App.COLORS[i]];
			if(instruction)instruction.execute(this.automatons[a]);
		}
	}

	this.staticRender = function(){
		for(var i in this.instructions)this.instructions[i].staticRender();
		for(var t in this.tokens)this.tokens[t].staticRender(x*App.Game.cellSize,y*App.Game.cellSize);
	}

	this.lastSyncTick = -1;
	this.sync = function(){
		// ensure this only gets executed once per cycle per cell
		if(App.Engine.tick === this.lastSyncTick)return;
		this.lastSyncTick = App.Engine.tick;
	}
}
