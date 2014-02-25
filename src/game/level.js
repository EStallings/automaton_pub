//Description: describes a Level object containing game objects and a 2d spatial system
//Contents: 
//////State: tokens, automatons, instructions, streams, and cells.
//////Logic: adding and removing gameplay objects
//Responsibilities: ensuring consistency and legality of all internal state. Delegates logic to atomic classes where necessary.

//NOT responsible for gameplay logic
//NOT to be used for storing levels, only to be used for CURRENT WORKING LEVELS
//Use strings to represent stored levels.

//For now, use the toString method of Level.

function Level(){
	this.name 		    = "";
	this.width 			 = 0;
	this.height			 = 0;
	this.grid 	  		= [];  
	this.maxTokens 		 = 0;
	this.maxAutomatons	 = 0;
	this.maxInstructions = 0;
	this.tokens 		= [];
	this.automatons 	= [];
	this.instructions 	= [];
	this.streams		= [];
	

	//Does not actually add -- just ensures capacity of the level!
	this.ensureCapacity = function(thing, things, maxthings, errstring)
	{
		//Check list size
		if(things.length === maxthings && maxthings > 0){
		    console.error("Cannot add another " + errstring + "!");
		    return false;
	  	}
	  
		//Check level size
		var x = thing.x;
		var y = thing.y;
		  
		if(((x >= this.width || x < 0) && (this.width > 0)) || ((y >= this.height || y < 0)  && (this.height > 0))) {
		    console.error("Out of bounds! : " + x + " , " + y);
			return false;
		}
		 
		//Guarantee cell at location
		if(this.grid[x] === undefined){
		  	this.grid[x] = [];
		}
		  
		if(this.grid[x][y] === undefined){
			this.grid[x][y] = new Cell(x, y);
		}
		return true;
	}

	/////////
	//Add functions: return true if object added successfully, false otherwise
	/////////
	
	this.addToken = function(token){
	 	if(!this.ensureCapacity(token, this.tokens, this.maxTokens, "token")) return false;
	    if(!this.grid[token.x][token.y].addToken(token)) return false;
  	    this.tokens.push(token);
  	    return true;
	}
	
 	this.addAutomaton = function(automaton){
	    if(!this.ensureCapacity(automaton, this.automatons, this.maxAutomatons, "automaton")) return false;
	    this.grid[automaton.x][automaton.y].addAutomaton(automaton);
	    this.automatons.push(automaton);
	    return true;
	}
	
	this.addInstruction = function(instruction){
		if(!this.ensureCapacity(instruction, this.instructions, this.maxInstructions, "instruction")) return false;
		if(!this.grid[instruction.x][instruction.y].addInstruction(instruction)) return false;
		this.instructions.push(instruction);
		return true;
	}
	
	this.addStream = function(stream){
   		if(!this.ensureCapacity(stream, this.streams, Number.MAX_VALUE, "stream")) return false;
   		if(!this.grid[stream.x][stream.y].addStream(stream)) return false;
    	this.streams.push(stream);
    	return true;
	}

	////////
	//Remove functions: return the object if object found and removed, null otherwise
	////////

	this.removeToken = function(token){
		var x = token.x;
		var y = token.y;
		var c = this.grid[x][y];
		if(!c) 
			return null;
		var e = c.popToken();
		if(!e) return null;
		this.tokens.remove(token);
		return e;
	}

	this.removeAutomaton = function(automaton){
		var x = automaton.x;
		var y = automaton.y;
		var c = this.grid[x][y];
		if(!c)
			return null;
		var e = c.removeAutomaton(automaton);
		this.automatons.remove(automaton);
		return e;
	}

	this.removeStream = function(stream){
		var x = stream.x;
		var y = stream.y;
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
	//This is probably the easiest way to do level saving. Don't have to save cells!!
	this.toString = function(){
		var builder = [];
		var stringy = function(thing){ return thing.toString();};
		builder.push(this.name);
		builder.push(this.width);
		builder.push(this.height);
		builder.push(this.maxTokens);
		builder.push(this.maxInstructions);
		builder.push(this.maxAutomatons);

		builder.addAll(this.tokens.map(stringy));
		builder.addAll(this.automatons.map(stringy));
		builder.addAll(this.instructions.map(stringy));
		builder.addAll(this.streams.map(stringy));
		return builder.join(";");
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





/*


If you want a test case, here:


HARDCODED:

var a1 = new Automaton(1,32,"N", {"R":true,"G":true,"B":false,"Y":false});
var a2 = new Automaton(25,26,"S", {"R":true,"G":true,"B":false,"Y":true});
var a3 = new Automaton(31,14,"E", {"R":false,"G":true,"B":true,"Y":false});
var a4 = new Automaton(26,52,"W", {"R":true,"G":false,"B":false,"Y":false});
var a5 = new Automaton(15,21,"E", {"R":false,"G":false,"B":true,"Y":true});

var s1 = new Stream(1, 1, "in", "B");
var s2 = new Stream(56, 102, "out", "R");

s1.tokens = [1,2,5,6,4,9];
s2.tokens = [8,3,6,2,5,7,0];

var t0 = new Token(3,6,1);
var t1 = new Token(4,2,2);
var t2 = new Token(23,86,3);
var t3 = new Token(6,23,4);
var t4 = new Token(8,42,5);
var t5 = new Token(6,21,6);
var t6 = new Token(4,53,7);
var t7 = new Token(2,22,8);
var t8 = new Token(4,11,9);
var t9 = new Token(1,12,0);

var i1 = new Instruction(1,2,"R",200);
var i2 = new Instruction(1,2,"G",12);
var i3 = new Instruction(1,3,"R",2);
var i4 = new Instruction(1,32,"R",20);
var i5= new Instruction(1,12,"R",21);

var level = new Level();
level.maxInstructions = Number.MAX_VALUE;
level.maxTokens = Number.MAX_VALUE;
level.maxAutomatons = Number.MAX_VALUE;
level.addAutomaton(a1);
level.addAutomaton(a2);
level.addAutomaton(a3);
level.addAutomaton(a4);
level.addAutomaton(a5);

level.addStream(s1);
level.addStream(s2);

level.addToken(t0);
level.addToken(t1);
level.addToken(t2);
level.addToken(t3);
level.addToken(t4);
level.addToken(t5);
level.addToken(t6);
level.addToken(t7);
level.addToken(t8);
level.addToken(t9);

level.addInstruction(i1);
level.addInstruction(i2);
level.addInstruction(i3);
level.addInstruction(i4);
level.addInstruction(i5);




AS A STRING (for the LoadLevel function) (Sorry, it's long)

";0;0;1.7976931348623157e+308;1.7976931348623157e+308;1.7976931348623157e+308;t,0,3,6,1;t,1,4,2,2;t,2,23,86,3;t,3,6,23,4;t,4,8,42,5;t,5,6,21,6;t,6,4,53,7;t,7,2,22,8;t,8,4,11,9;t,9,1,12,0;a,0,1,1,N,true,true,false,false,-1;a,1,25,25,S,true,true,false,true,-1;a,2,31,31,E,false,true,true,false,-1;a,3,26,26,W,true,false,false,false,-1;a,4,15,15,E,false,false,true,true,-1;i,0,1,2,R,200;i,1,1,2,G,12;i,2,1,3,R,2;i,3,1,32,R,20;i,4,1,12,R,21;s,0,1,1,in,B,1,2,5,6,4,9;s,1,56,102,out,R,8,3,6,2,5,7,0"





















*/