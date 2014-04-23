/*
For displaying leaderboards and level select.
*/

App.GuiTable = function(x, y, ppanel){
	this.json = null;
	this.table = []; //to be filled with GuiTableRow objects
	this.buttons = []; //to be filled with column button objects



	this.rowHeight = 20;
	this.colWidth  = 100;
	this.x = x;
	this.y = y;

	this.lastSortedCol = null;
	this.lastSortedSign = 1;

	this.activeRow = -1; //-1 for none
	this.testActiveRow = -1;

	this.oddColor = '#f0f0f0';
	this.evenColor = '#c0c0c0';


	this.activeColor = '#707070';
	this.testActiveColor = '#101010';

	this.update = function(){
	}


	//takes a column and whether or not to sort alphabetically
	this.sortBy = function(col){
		var sign = (this.lastSortedCol === col)? this.lastSortedSign * -1 : 1;
		this.lastSortedCol = col;
		this.lastSortedSign = sign;

		this.table.sort(function(a, b){
			var res = 0;
			if(a.entries[col] === b.entries[col])
				return 0;
			return (a.entries[col] < b.entries[col]) ? (-1 * sign) : (1 * sign);

		});
		App.Gui.drawStatic = true;
	}

	this.renderLayers['Table'] = function(gfx){
		//Render background
		//render buttons
		//render table

	}

	this.clickStart = function(){
		if(!this.json)
			return;

		var x = App.InputHandler.mouseData.x;
		var y = App.InputHandler.mouseData.y;

		//check for a click on a button
		for(var b in this.bbuttons){
			this.buttons[b].clickStart(x, y);
		}

		//determine row, if any
		y = Math.floor((y - this.gety()-30)/this.rowHeight);

		this.testActiveRow = -1;
		this.activeRow = -1;

		if(this.table[y])
			this.testActiveRow = y;
	}

	this.clickEnd = function(){
		if(!this.json)
			return;
		var x = App.InputHandler.mouseX;
		var y = App.InputHandler.mouseY;

		for(var b in this.cbuttons){
			this.cbuttons[b].clickEnd(x, y);
		}

		y = Math.floor((y - this.gety() - 30)/this.rowHeight);

		this.activeRow = -1;

		if(this.table[y] && y === this.testActiveRow)
			this.activeRow = y;
		this.testActiveRow = -1
	}

	this.clickDrag = function(x, y){
		for(var b in this.cbuttons){
			this.cbuttons[b].clickDrag(x, y);
		}

		y = Math.floor((y - this.gety() - 30)/this.rowHeight);

		if(y !== this.testActiveRow)
			this.testActiveRow = -1;
	}

	this.setData = function(json){
		if(!json)
			return;
		this.table = [];
		this.json = json;
		this.cbuttons = [];


	}

}