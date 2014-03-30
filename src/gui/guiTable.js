/*
For displaying leaderboards and level select.
*/



App.GuiTable = function(){
	this.json = null;
	this.table = []; //to be filled with GuiTableRow objects


	this.selectEntry = function(x, y){
		if(!this.json)
			return;
	}

	this.setData = function(json){
		if(!json)
			return;
		this.json = json;

		for(var o in json){

		}

	}

	this.GuiTableRow = function(json){

	}


}
