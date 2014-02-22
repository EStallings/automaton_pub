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
		return null;
	}
}