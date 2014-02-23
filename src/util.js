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


function isNumeric(n) {
  return (!isNaN(parseFloat(n)) && isFinite(n));
}

function parseBoolean(string){
	return (string === 'true');
}