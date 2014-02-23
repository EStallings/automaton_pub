function Game(){

	this.currentLevel = null;


	this.loadLevel = function(levelName){
		//Ohh boy. Server stuff?
	}

	this.loadLevel = function(stringFormat){
		this.currentLevel = LoadLevel(stringFormat); //this is a method inside of the level.js file that returns a level.
	}

	this.update = function(){
		
	}

}