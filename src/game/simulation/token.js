App.SimulationToken = function(level,x,y,number){
	level.tokens.push(this);
	level.getCell(x,y).tokens.push(this);

	this.gfxS = App.Game.tokenSGfx;
	this.gfxD = App.Game.tokenDGfx;
	this.number = number;

	this.increment = function(){if(++this.number>127)this.number=-128;}
	this.decrement = function(){if(--this.number<-128)this.number=127;}

	this.rFunc = function(x,y,gfx){
		gfx.lineCap  = 'round';
		gfx.lineJoin = 'round';

		var cs = App.Game.cellSize;

		gfx.fillStyle = '#ffffff';
		gfx.strokeStyle = '#aaaaaa';
		gfx.lineWidth = 2;
		gfx.beginPath();
		gfx.arc(x+cs/2,y+cs/2,13*cs/32,-Math.PI,Math.PI);
		gfx.fill();
		gfx.stroke();

		gfx.strokeStyle = '#000000';
		gfx.lineWidth = 2; // TODO: MAKE THIS CONSISTENT WITH INSTRUCTION GLYPH LINE WIDTH
		gfx.save();

		var str = this.number.toString();
		gfx.translate(x+Math.floor(17*cs/32-str.length*3*cs/32),y);
		for(var i=0;i<str.length;++i){
			switch(this.number.toString().charAt(i)){
				case '1':
					gfx.beginPath();
					gfx.moveTo(0     ,3*cs/8);
					gfx.lineTo(cs/16 ,3*cs/8);
					gfx.lineTo(cs/16 ,5*cs/8);
					gfx.moveTo(0     ,5*cs/8);
					gfx.lineTo(cs/8  ,5*cs/8);
					gfx.stroke();
					break;
				case '2':
					gfx.beginPath();
					gfx.moveTo(0    ,3*cs/8);
					gfx.lineTo(cs/8 ,3*cs/8);
					gfx.lineTo(cs/8 ,4*cs/8);
					gfx.lineTo(0    ,4*cs/8);
					gfx.lineTo(0    ,5*cs/8);
					gfx.lineTo(cs/8 ,5*cs/8);
					gfx.stroke();
					break;
				case '3':
					gfx.beginPath();
					gfx.moveTo(0    ,3*cs/8);
					gfx.lineTo(cs/8 ,3*cs/8);
					gfx.lineTo(cs/8 ,5*cs/8);
					gfx.lineTo(0    ,5*cs/8);
					gfx.moveTo(0    ,4*cs/8);
					gfx.lineTo(cs/8 ,4*cs/8);
					gfx.stroke();
					break;
				case '4':
					gfx.beginPath();
					gfx.moveTo(cs/8 ,3*cs/8);
					gfx.lineTo(cs/8 ,5*cs/8);
					gfx.moveTo(0    ,3*cs/8);
					gfx.lineTo(0    ,4*cs/8);
					gfx.lineTo(cs/8 ,4*cs/8);
					gfx.stroke();
					break;
				case '5':
					gfx.beginPath();
					gfx.moveTo(cs/8 ,3*cs/8);
					gfx.lineTo(0    ,3*cs/8);
					gfx.lineTo(0    ,4*cs/8);
					gfx.lineTo(cs/8 ,4*cs/8);
					gfx.lineTo(cs/8 ,5*cs/8);
					gfx.lineTo(0    ,5*cs/8);
					gfx.stroke();
					break;
				case '6':
					gfx.beginPath();
					gfx.moveTo(cs/8 ,3*cs/8);
					gfx.lineTo(0    ,3*cs/8);
					gfx.lineTo(0    ,5*cs/8);
					gfx.lineTo(cs/8 ,5*cs/8);
					gfx.lineTo(cs/8 ,4*cs/8);
					gfx.lineTo(0    ,4*cs/8);
					gfx.stroke();
					break;
				case '7':
					gfx.beginPath();
					gfx.moveTo(0    ,3*cs/8);
					gfx.lineTo(cs/8 ,3*cs/8);
					gfx.lineTo(cs/8 ,5*cs/8);
					gfx.stroke();
					break;
				case '8':
					gfx.beginPath();
					gfx.moveTo(0    ,3*cs/8);
					gfx.lineTo(cs/8 ,3*cs/8);
					gfx.lineTo(cs/8 ,5*cs/8);
					gfx.lineTo(0    ,5*cs/8);
					gfx.lineTo(0    ,3*cs/8);
					gfx.moveTo(0    ,4*cs/8);
					gfx.lineTo(cs/8 ,4*cs/8);
					gfx.stroke();
					break;
				case '9':
					gfx.beginPath();
					gfx.moveTo(cs/8 ,4*cs/8);
					gfx.lineTo(0    ,4*cs/8);
					gfx.lineTo(0    ,3*cs/8);
					gfx.lineTo(cs/8 ,3*cs/8);
					gfx.lineTo(cs/8 ,5*cs/8);
					gfx.stroke();
					break;
				case '0':
					gfx.beginPath();
					gfx.moveTo(0    ,3*cs/8);
					gfx.lineTo(cs/8 ,3*cs/8);
					gfx.lineTo(cs/8 ,5*cs/8);
					gfx.lineTo(0    ,5*cs/8);
					gfx.lineTo(0    ,3*cs/8);
					gfx.stroke();
					break;
				case '-':
					gfx.beginPath();
					gfx.moveTo(0    ,cs/2);
					gfx.lineTo(cs/8 ,cs/2);
					gfx.stroke();
					break;
			}gfx.translate(3*cs/16,0);
		}

		gfx.restore();
	}

	this.staticRender = function(x,y){this.rFunc(x,y,this.gfxS);}
	this.dynamicRender = function(x,y){this.rFunc(x,y,this.gfxD);}
}
