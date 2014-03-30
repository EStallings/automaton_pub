/*
For displaying leaderboards and level select.
*/

App.GuiTable = function(x, y){
	this.json = null;
	this.table = []; //to be filled with GuiTableRow objects
	this.cbuttons = []; //to be filled with column button objects

	this.panel = new App.GuiPanel(new App.GuiCollisionRect(x, y, 100, 50)); //will be resized
	this.panel.color = '#102020';
	this.guiCollider = this.panel.guiCollider;
	this.guiCollider.functional = true;

	this.rowHeight = 50;
	this.colWidth  = 100;
	this.x = x;
	this.y = y;
	this.widthInCells = 0;
	this.heightInCells = 0;

	this.update = function(){
		for(var b in this.cbuttons){
			this.cbuttons[b].update();
		}
	}

	this.render = function(gfx){
		this.panel.render(gfx);
		for(var b in this.cbuttons){
			this.cbuttons[b].render(gfx);
		}
		for(var o in this.table){
		}
	}

	this.clickStart = function(){

	}

	this.clickEnd = function(){

	}

	this.clickDrag = function(){

	}

	this.selectEntry = function(x, y){
		if(!this.json)
			return;
	}

	this.setData = function(json){
		if(!json)
			return;
		this.json = json;
		if(json.length <= 0)
			return;

		for(var o in json){
			this.table.push(new App.GuiTable.TableRow(json[o]));
		}

		var i = 0, that = this;
		for(var c in json[0]){
			var b = new App.GuiTextButton(this.x + (this.colWidth * i), this.y, c, function(){that.cbutClicked(i)}, false, this.panel);
			this.cbuttons.push(b);
			i++;
		}

		this.width = i * this.colWidth;
		this.height = json.length * this.rowHeight;
		this.guiCollider.w = this.width;
		this.guiCollider.h = this.height;

		App.Gui.drawStatic = true;

	}

	this.cbutClicked = function(c){

	}
}


App.GuiTable.TableRow = function(json){
	this.entries = [];
}

App.GuiTable.TableEntry = function(string){
	this.value = string;
}