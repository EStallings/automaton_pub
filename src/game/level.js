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
	

	//Does not actually add -- just ensures capacity of the level!
	this.ensureCapacity(thing, things, maxthings, errstring)
	{
		//Check list size
		if(things.length === maxthings){
		    console.error("Cannot add another " + errstring + "!");
		    return;
	  	}
	  
		//Check level size
		var x = thing.x;
		var y = thing.y;
		  
		if(x >= this.width || x < 0 || y >= this.height || y < 0){
		    console.error("Out of bounds! : " + x + " , " + y);
			return false;
		}
		 
		//Guarantee cell at location
		if(grid[x] === undefined){
		  	grid[x] = [];
		}
		  
		if(grid[x][y] === undefined){
			grid[x][y] = new Cell(x, y);
		}
	}

	/////////
	//Add functions: return true if object added successfully, false otherwise
	/////////
	
	this.addToken = function(token){
	 	if(!this.ensureCapacity(token, this.tokens, this.maxTokens, "token")) return false;
	    if(!grid[token.x][token.y].addToken(token)) return false;
  	    this.tokens.push(token);
  	    return true;
	}
	
  this.addAutomaton = function(automaton){
	    if(!this.ensureCapacity(automaton, this.automatons, this.maxAutomatons, "automaton")) return false;
	    grid[automaton.x][automaton.y].addAutomaton(automaton);
	    this.automatons.push(automaton);
	    return true;
	}
	
	this.addInstruction = function(instruction){
		if(!this.ensureCapacity(instruction, this.instructions, this.maxInstructions, "instruction")) return false;
		if(!grid[instruction.x][instruction.y].addInstruction(instruction)) return false;
		this.instructions.push(instruction);
		return true;
	}
	
	this.addStream = function(stream){
   		if(!this.ensureCapacity(stream, this.streams, Number.MAX_VALUE, "stream")) return false;
   		if(!grid[stream.x][stream.y].addStream(stream)) return false;
    	this.streams.push(stream);
    	return true;
	}

	////////
	//Remove functions: return the object if object found and removed, null otherwise
	////////

	this.removeToken = function(token){
		return this.removeToken(token.x, token.y); //Guaranteed for tokens since only one can exist in a cell
	}

	this.removeToken = function(x, y){
		var c = this.grid[x][y];
		if(!c) 
			return null;
		var e = c.popToken();
		if(!e) return null;
		this.tokens.remove(token);
		return e;
	}

	this.removeAutomaton = function(automaton){
		var c = this.grid[x][y];
		if(!c)
			return null;
		var e = c.removeAutomaton(automaton);
		this.automatons.remove(automaton);
		return e;
	}

	this.removeStream = function(stream){
		var c = this.grid[x][y];
		if(!c)
			return null;
		var  e = c.removeStream(stream);
		this.streams.remove(stream);
		return e;
	}

	this.clearInstructions = function(x, y){
		var c = this.grid[x][y];
		if(!c)
			return null;
		c.clearInstructions();
	}
	

	//OVERRIDE. Also, potentially very slow - we should look into caching this
	this.toString = function(){
		var builder = [];
		var stringy = function(thing){ return thing.toString();};
		builder.addAll(this.tokens.map(stringy));
		builder.addAll(this.automatons.map(stringy));
		builder.addAll(this.instructions.map(stringy));
		builder.addAll(this.streams.map(stringy));
		return builder.join("");
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
