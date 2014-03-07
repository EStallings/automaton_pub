App.SimulationCell = function(level,x,y){
	this.level = level;
	this.x = x;
	this.y = y;
	this.tokens       = [];
	this.automatons   = [];
	this.instructions = [];

	this.verify = function(){
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
		if(total > 1)App.Game.simulationError(); // TODO: tell level reached invalid state (token collision)

		// TODO: MOVE THIS TO AUTOMATON
		for(var a in this.automatons)for(var i in this.instructions)
			this.instructions[i].execute(this.automatons[a]);
	}

	this.render = function(){
/*
		// MOVE RENDERING TO GAME CTX, DELETE THIS FUNCTION
		for(var i in this.instructions)this.instructions[i].render();
		for(var t in this.tokens)this.tokens[t].render(x*cellSize,y*cellSize);
*/
	}
}
