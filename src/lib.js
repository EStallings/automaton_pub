///////////
//WARNING//
///////////

/*
	This file is for making modifications to the BUILT IN OBJECTS.

	USE WITH CAUTION

	TEST YOUR CODE
*/


//Modifies Array to have a contains method
Array.prototype.contains = function(elem){
	if(this.indexOf(elem) !== -1) return true;
	return false;
}

//Modifies Array to have a remove-by-reference method
//Returns the element if it exists
Array.prototype.remove = function(elem){
	var index = this.indexOf(elem);
	if(index > -1){
		return this.splice(index, 1)[0];
	}
	return null;
}

//Modifies Array to have a map method. Stores all outputs into a new array and returns it.
Array.prototype.map = function(predicate){
	var ret = [];
	for(var i = 0; i < this.length; i++){
		ret[i] = predicate(this[i]);
	}
	return ret;
}

//Modifies Array to have a fold method. Stores all outputs in a variable and returns it.
//Start is mostly needed for type safety
Array.prototype.fold = function(predicate, start){
	var ret = start;
	for(var i = 0; i < this.length; i++){
		ret = predicate(this[i], ret);
	}
	return ret;
}

//Modifies Array to have an addAll method. Returns length to keep with conventions for other means of adding to arrays.
Array.prototype.addAll = function(array){
	for(var i = 0; i < array.length; i++){
		this.push(array[i]);
	}
	return this.length;
}


