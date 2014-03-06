function Cell(level,x,y){
	this.level = level;
	this.x = x;
	this.y = y;
	this.tokens       = [];
	this.automatons   = [];
	this.instructions = [];

	this.update = this[0] = function(){
/*
		// remove this cell if its empty
		if(this.tokens.length       === 0 && this.automatons.length === 0 &&
		   this.instructions.length === 0){
			level.removeCell(this.x,this.y);
			return;
		}

		// TODO: REMOVE THIS, PUT IT IN AUTOMATON
		// process all instructions
		for(var a in this.automatons)
		for(var i in this.instructions) // TODO: this NEEDS to execute in color order (rgby)
		// TODO: if colors match
			this.instructions[i].execute(this.automatons[a]);
*/
	}

	this.verify = this[1] = function(){
/*
		var total = this.tokens.length;
		for(var i in this.automatons)
		if(this.automatons[i].tokenHeld !== undefined)
			++total;
		if(total > 1)App.Game.simulationError(); // TODO: tell level reached invalid state (token collision)
*/
	}

	this.render = this[2] = function(){
/*
		// TODO: CHANGE THIS BECAUSE OF MULTI-LAYERED RENDERER
		for(var i in this.instructions)this.instructions[i].render();
		for(var t in this.tokens)this.tokens[t].render(x*cellSize,y*cellSize);
*/
	}
}
