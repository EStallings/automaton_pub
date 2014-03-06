App.SimulationToken = function(level,x,y,number){
	level.tokens.push(this);
	level.getCell(x,y).tokens.push(this);

	this.gfx = App.Game.tokenGfx;
	this.number = number;

	// TODO: STATIC VS DYNAMICALLY RENDERED TOKENS
	this.render = function(x,y){ // x y = topleft
		this.gfx.fillStyle = "#ffffff";
		this.gfx.fillCircle(x+cellSize/2,y+cellSize/2,7*cellSize/16,-Math.PI,Math.PI);
		this.gfx.fillStyle = "#000000";
		this.gfx.textAlign = "center";
		this.gfx.fillText(this.number,x+cellSize/2,y+cellSize/2+7);
	}
}
