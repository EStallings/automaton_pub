/*
App.InstructionActions = {}; // TODO populate with action methods

App.InstructionSymbols = {}; // TODO populate with drawing methods

App.SimulationInstruction = function(level,x,y,color,type){ // what about attributes?
	this.level = level;
	this.x = x;
	this.y = y;
	this.color = color;
	this.type = type;
	
	this.action;
	this.drawSelf;

	this.execute = function(a){
		this.action(a);
	}
	
	this.render = function(){
		this.drawSelf();
	}
}
*/

// TODO: visual feedback on execution
// TODO: 0switch, +-switch, %2switch

var cs2 = cellSize/4;
var cs4 = cellSize/8;
var cs8 = cellSize/16;

var cs3o4 = 3*cs4;
var cs3o8 = 3*cs8;
var cs5o8 = 5*cs8;

App.SimulationInstruction = function(level,x,y,color,type){
	// TODO: return if instruction is already present, this will get garbage collected

	level.instructions.push(this);
	level.getCell(x,y).instructions[color] = this;

	this.level = level;
	this.cell = level.getCell(x,y);
	this.x = x;
	this.y = y;
	this.color = color;
	this.type = type;

	this.start;   // autom/stream init
	this.execute; // everything
	this.special; // streams
	this.render;  // everything
/*
	this.action;    // this gets assigned below
	this.renderSym; // this gets assigned below

	switch(type){
		case "u": // Up
			this.action = function(a){a.direction = UP;}
			this.renderSym = function(){
				gfx.beginPath();
				gfx.moveTo(cs2,cs4);
				gfx.lineTo(cs4,cs3o4);
				gfx.lineTo(cs3o4,cs3o4);
				gfx.lineTo(cs2,cs4);
				gfx.stroke();
			};break;
		case "d": // Down
			this.action = function(a){a.direction = DOWN;}
			this.renderSym = function(){
				gfx.beginPath();
				gfx.moveTo(cs2,cs3o4);
				gfx.lineTo(cs4,cs4);
				gfx.lineTo(cs3o4,cs4);
				gfx.lineTo(cs2,cs3o4);
				gfx.stroke();
			};break;
		case "l": // Left
			this.action = function(a){a.direction = LEFT;}
			this.renderSym = function(){
				gfx.beginPath();
				gfx.moveTo(cs4,cs2);
				gfx.lineTo(cs3o4,cs4);
				gfx.lineTo(cs3o4,cs3o4);
				gfx.lineTo(cs4,cs2);
				gfx.stroke();
			};break;
		case "r": // Right
			this.action = function(a){a.direction = RIGHT;}
			this.renderSym = function(){
				gfx.beginPath();
				gfx.moveTo(cs3o4,cs2);
				gfx.lineTo(cs4,cs4);
				gfx.lineTo(cs4,cs3o4);
				gfx.lineTo(cs3o4,cs2);
				gfx.stroke();
			};break;
		case "c": // rotate cCw
			this.action = function(a){a.direction = (a.direction+1)%4;}
			this.renderSym = function(){
				gfx.beginPath();
				gfx.arc(cs2,cs2,cs4,Math.PI,Math.PI/2);
				gfx.moveTo(cs4,cs2);
				gfx.lineTo(cs4,cs4);
				gfx.stroke();
			};break;
		case "w": // rotate cW
			this.action = function(a){a.direction = (a.direction+3)%4;}
			this.renderSym = function(){
				gfx.beginPath();
				gfx.arc(cs2,cs2,cs4,Math.PI/2,2*Math.PI);
				gfx.moveTo(cs3o4,cs2);
				gfx.lineTo(cs3o4,cs4);
				gfx.stroke();
			};break;
		case "t": // Toggle grab/drop
			this.action = function(a){
				if(a.tokenHeld === undefined){
					if(this.cell.tokens.length !== 0){
						a.tokenHeld = this.cell.tokens[0];
						this.cell.tokens.splice(0,1);
						// new Audio("test.ogg").play();
					}
				}else{
					this.cell.tokens.push(a.tokenHeld);
					a.tokenHeld = undefined;
					// new Audio("test.ogg").play();
				}
			};this.renderSym = function(){
				gfx.beginPath();
				gfx.moveTo(cs4,cs3o4);
				gfx.lineTo(cs3o4,cs3o4);
				gfx.moveTo(cs2,cs4);
				gfx.lineTo(cs2,cs3o4);
				gfx.moveTo(cs3o8,cs3o8);
				gfx.lineTo(cs2,cs4);
				gfx.lineTo(cs5o8,cs3o8);
				gfx.moveTo(cs3o8,cs5o8);
				gfx.lineTo(cs2,cs3o4);
				gfx.lineTo(cs5o8,cs5o8);
				gfx.stroke();
			};break;
		case "+": // increment
			this.action = function(a){if(a.tokenHeld !== undefined)++a.tokenHeld.number;}
			this.renderSym = function(){
				gfx.beginPath();
				gfx.moveTo(cs4,cs2);
				gfx.lineTo(cs3o4,cs2);
				gfx.moveTo(cs2,cs4);
				gfx.lineTo(cs2,cs3o4);
				gfx.stroke();
			};break;
		case "-": // decrement
			this.action = function(a){if(a.tokenHeld !== undefined)--a.tokenHeld.number;}
			this.renderSym = function(){
				gfx.beginPath();
				gfx.moveTo(cs4,cs2);
				gfx.lineTo(cs3o4,cs2);
				gfx.stroke();
			};break;
		case "i": // In
			this.action = function(a){
				for(var i in this.level.streams)
					this.level.streams[i].IO(INPUT,this.color);
			};this.renderSym = function(){
				gfx.beginPath();
				gfx.moveTo(cs2,cs4);
				gfx.lineTo(cs2,cs3o4);
				gfx.moveTo(cs4,cs4);
				gfx.lineTo(cs3o4,cs4);
				gfx.moveTo(cs4,cs3o4);
				gfx.lineTo(cs3o4,cs3o4);
				gfx.stroke();
			};break;
		case "o": // Out
			this.action = function(a){
				for(var i in this.level.streams)
					this.level.streams[i].IO(OUTPUT,this.color);
			};this.renderSym = function(){
				gfx.drawCircle(cs2,cs2,cs4,-Math.PI,Math.PI);
			};break;
		case "a": // Autom spawn
			// TODO: add to special spawn list in level
			this.action = function(a){} // do nothing
			this.renderSym = function(){}
			break;
		case "s": // Switch
			this.action = function(a){}
			this.renderSym = function(){}
			break;
		case "y": // sYnc
			// TODO: custom syms for each color
			this.action = function(a){
			};this.renderSym = function(){}
			break;
		case "p": // Pause
			this.action = function(a){}
			this.renderSym = function(){}
			break;
		case "m": // streaM
			// TODO: add to special stream list in level
			// TODO: special render function for stream (add stream render layer)
			this.action = function(a){}
			this.renderSym = function(){}
			break;
	}

	this.execute = function(a){
		// TODO: begin animation
		if(!a.colorFlags[this.color])return; // TODO: COLOR TOGGLE DOESNT WORK WITH THIS
		this.action(a);
	}

	// TODO: DYNAMICALLY CREATE RENDER FUNCTION SO YOU DONT HAVE TO DO THIS EVERY TIME
	this.render = function(){
		gfx.save();
		switch(this.color){
			case RED:
				gfx.translate(this.x*cellSize,this.y*cellSize);
				gfx.fillStyle="#660000";
				gfx.fillRect(2,2,cellSize/2-4,cellSize/2-4);
				gfx.strokeStyle="#ff0000";
				break;
			case GREEN:
				gfx.translate(this.x*cellSize+cellSize/2,this.y*cellSize);
				gfx.fillStyle="#006600";
				gfx.fillRect(2,2,cellSize/2-4,cellSize/2-4);
				gfx.strokeStyle="#00ff00";
				break;
			case BLUE:
				gfx.translate(this.x*cellSize,this.y*cellSize+cellSize/2);
				gfx.fillStyle="#000066";
				gfx.fillRect(2,2,cellSize/2-4,cellSize/2-4);
				gfx.strokeStyle="#0000ff";
				break;
			case YELLOW:
				gfx.translate(this.x*cellSize+cellSize/2,this.y*cellSize+cellSize/2);
				gfx.fillStyle="#666600";
				gfx.fillRect(2,2,cellSize/2-4,cellSize/2-4);
				gfx.strokeStyle="#ffff00";
				break;
		}

		gfx.beginPath();
		gfx.moveTo(2,2);
		gfx.lineTo(2,cellSize/2-2);
		gfx.lineTo(cellSize/2-2,cellSize/2-2);
		gfx.lineTo(cellSize/2-2,2);
		gfx.lineTo(2,2);
		gfx.stroke();

		this.renderSym();
		gfx.restore();
	}
*/
}
