function StaticInfo(){
	this.staticID = 0;
	this.registry = [];


	this.reset = function(){
		this.staticID = 0;
		this.registry.map(function(x){delete x});
		this.registry = [];
	}

	this.getFromID = function(id){
		var e = this.registry[id];
		if(e) return e;
		return null; //for -1 case as well!
	}

	this.register = function(id, obj){
		var realID = this.staticID;
		if(isNumeric(id) && id >= 0 && id !== undefined){
			realID = id;
		}
		else{
			this.staticID ++;
		}
		this.registry[realID] = obj;
		return realID;
	}
}

//Used to route all level traffic. Guarantees only one active level instance at a time
//stores levels as string values in a "stack". Supports:
//A "push" operation: stashCurrentLevel.
//A "pop" operation: restorePreviousLevel
//A load from string operation: loadLevelFromString
//A getLevelString operation
//A "clear" operation: clearCache
//an "isSafe" operation, that returns true if the current level is saved.

function _LevelManager(){
	this.levelcache = [];
	this.level = null;
	this.levelcached = false;

	this.isSafe = function(){
		return this.levelcached;
	}

	//does not touch current level
	this.clearCache = function(){
		this.levelcache = [];
		this.levelcached = false;
	}

	//stashes, does not otherwise alter cache
	this.loadLevelFromString = function(levelString){
		this.stashCurrentLevel();
		RESET_STATICS();
		this.level = LOAD(levelString);
		this.levelcached = false;
	}

	//does not alter internal state at all
	this.getLevelString = function(){
		return this.level.toString();
	}

	//does not alter  current level
	this.stashCurrentLevel = function(){
		if(!this.level)
			return;
		this.levelcache.push(this.level.toString());
		this.levelcached = true;
	}

	//destroys current level and pulls from the cache
	this.restorePreviousLevel = function(number){
		RESET_STATICS();
		this.level = LOAD(this.levelcache.pop());
	}

	var RESET_STATICS = function(){
		Automaton.staticInfo.reset();
		Token.staticInfo.reset();
		Instruction.staticInfo.reset();
		Stream.staticInfo.reset();
	}

	var LOAD = function(levelString){
		var brk = levelString.split(";");
		var level = new Level();

		console.log(brk);

		level.name = brk.shift();
		level.width = brk.shift();
		level.height = brk.shift();
		level.maxTokens = brk.shift();
		level.maxInstructions = brk.shift();
		level.maxAutomatons = brk.shift();

		while(brk.length){
			var str = brk.shift();
			switch(str[0]){
				case 't':
					var token = Token.fromString(str);
					level.addToken(token);
				break;
				case 'a':
					var auto = Automaton.fromString(str);
					level.addAutomaton(auto);
				break;
				case 's':
					var stream = Stream.fromString(str);
					level.addStream(stream);
				break;
				case 'i':
					var inst = Instruction.fromString(str);
					level.addInstruction(inst);
				break;
				default:
					console.log("Something went wrong while loading the level!");
				break;
			}
		}

		return level;
	}
}

function isNumeric(n) {
  return (!isNaN(parseFloat(n)) && isFinite(n));
}

function isIntegral(n){
	return (isNumeric(n) && n % 1 === 0)
}

function parseBoolean(string){
	return (string === 'true');
}

function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}