function Cell(x,y){
	this.x = x;
	this.y = y;

	this.instructions   = [null, null, null, null]; //initialize this guy! INTENTIONAL.
	this.automatons		= [];
	this.tokens 		= [];
	this.streams 		= [];
	this.instFlags = {"R":false, "G":false, "B":false, "Y":false};

	this.addInstruction = function(instruction){
		if(instFlags[instruction.color]) return false;
		this.instructions[instruction.color] = instruction;
		return true;
	}

	this.addAutomaton = function(automaton){
		this.automatons.push(automaton);
		return true;
	}

	this.addToken = function(token){
		if(this.tokens.length > 0){
			//To my understanding this is what should happen.
			return false;
		}
		this.tokens.push(token);
		return true;
	}

	this.addStream = function(stream){
		if(this.streams.length > 0){
			//having two streams on a cell seems ludicrous
			return false;
		}
		this.streams.push(stream);
		return true;
	}

	this.peekToken = function(){
		return (this.tokens[0]) ? this.tokens[0] : null;
	}

	this.popToken = function(){
		return this.tokens.pop();
	}

	this.getInstruction(color){
		return this.instructions[color];
	}


	this.resetInstructions(){
		this.instructions = [];
		this.instFlags = {"R":false, "G":false, "B":false, "Y":false};
	}

	this.resetInstruction(color){
		this.instructions[color] = null;
		this.instFlags[color] = false;
	}

	this.removeAutomaton(automaton){
		return this.automatons.remove(automaton);
	}

	this.removeStream(stream){
		return this.streams.remove(stream);
	}


}
