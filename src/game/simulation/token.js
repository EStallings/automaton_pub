App.SimulationToken = function(level,x,y,number){
	level.tokens.push(this);
	level.getCell(x,y).tokens.push(this);

	this.gfxS = App.Game.tokenSGfx;
	this.gfxD = App.Game.tokenDGfx;
	this.number = number;

	this.rFunc = function(x,y,gfx){ // x y = topleft
		gfx.fillStyle = "#ffffff";
		gfx.fillCircle(x+cellSize/2,y+cellSize/2,7*cellSize/16,-Math.PI,Math.PI);
		gfx.fillStyle = "#000000";
		gfx.textAlign = "center";
		gfx.fillText(this.number,x+cellSize/2,y+cellSize/2+7);
	}

	this.staticRender = function(x,y){this.rFunc(x,y,this.gfxS);}
	this.dynamicRender = function(x,y){this.rFunc(x,y,this.gfxD);}
}
