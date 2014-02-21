function Level(){
	this.width;
	this.height;
	this.grid = [[],[]]; //a 2d array
	this.maxTokens;
	this.maxAutomatons;
	this.maxInstructions;
	this.tokens;
	this.automatons;
	this.instructions;
	this.streams;
	
	this.tryAdd(thing, things, maxthings, errstring){
	  if(things.length === maxthings){
	    console.error("Cannot add another " + errstring + "!");
	    return;
	  }
	  
	  var x = thing.x;
	  var y = thing.y;
	  
	  if(x >= this.width || x < 0 || y >= this.height || y < 0){
	    console.error("Out of bounds! : " + x + " , " + y);
	    return false;
	  }
	  
	  if(grid[x] === undefined){
	    grid[x] = [];
	  }
	  
	  if(grid[x][y] === undefined){
	    grid[x][y] = new Cell(x, y);
	  }
	  
	  
	  things.push(thing);
	}
	
	this.addToken = function(token){
	  this.tryAdd(token, this.tokens, this.maxTokens, "token");
	}
	
  this.addAutomaton = function(automaton){
	  this.tryAdd(automaton, this.automatons, this.maxAutomatons, "automaton");
	}
	
	this.addInstruction = function(instruction){
	 this.tryAdd(instruction, this.instructions, this.maxInstructions, "instruction");
	}
	
	this.addStream = function(stream){
    this.tryAdd(stream, this.streams, Number.MAX_VALUE, "stream");
	}
	
	

}

function MakeLevel(width, height, maxTokens, maxAutomatons, maxInstructions){
  var level = Level();
  level.width = width;
  level.height = height;
  level.maxTokens = maxTokens;
  level.maxInstructions = maxInstructions;
  level.maxAutomatons = maxAutomatons;
}

//Stub
function LoadLevel(levelString){

}
