App.Token = function(level,x,y,number){
	level.tokens.push(this);
	level.getCell(x,y).tokens.push(this);

	this.number = number;

	this.render = function(x,y){ // x y = topleft
/*
		gfx.fillStyle = "#ffffff";
		gfx.fillCircle(x+cellSize/2,y+cellSize/2,7*cellSize/16,-Math.PI,Math.PI);
		gfx.fillStyle = "#000000";
		gfx.textAlign = "center";
		gfx.fillText(this.number,x+cellSize/2,y+cellSize/2+7);
*/
	}
}
