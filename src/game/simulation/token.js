App.SimulationToken = function(level,x,y,number){
	level.tokens.push(this);

	this.number = number;

	this.increment = function(){if(++this.number>127)this.number=-128;}
	this.decrement = function(){if(--this.number<-128)this.number=127;}

	this.rFunc = function(x,y,gfx){
		App.renderToken(gfx,x,y,this.number);
	}

	this.staticRender = function(x,y){this.rFunc(x,y,App.GameRenderer.tokenSGfx);}
	this.dynamicRender = function(x,y){this.rFunc(x,y,App.GameRenderer.tokenDGfx);}
}
