/*
For displaying leaderboards and level select.
*/


App.GuiTable = function(x, y, maxRows, descrip){
	App.GuiTools.Component.call(this, x, y, descrip.length * 132 + 2, 26*maxRows+2, 100, 100, null, null);
	this.json = null;

	this.table = [];
	for(var k in descrip){
		this.table[k] = [];
	}

	this.color = this.baseColor = '#000000';
	this.descrip = descrip;
	this.emptyMessage = 'No levels found; try another search?';

	this.rowHeight       = 24;
	this.colWidth        = 130;
	this.x               = x;
	this.y               = y;
	this.border          = 2;

	this.lastSortedCol   = null;
	this.lastSortedSign  = 1;

	this.activeRow       = -1; //-1 for none
	this.testActiveRow   = -1;

	this.buttonColor     = '#ffffff';
	this.oddColor        = '#f0f0f0';
	this.evenColor       = '#c0c0c0';
	this.activeColor     = '#707070';
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

	var that = this;
	this.renderLayers['Table'] = function(gfx){
		var x = that.getx()+that.border;
		var y = that.gety()+that.border;
		var i = 0;

		if(!that.json){
			gfx.textBaseline = "alphabetic";
			gfx.font = "800 "+(this.h-6)*1.37+"px arial";

			var tw = gfx.measureText(that.emptyMessage).width + (that.emptyMessage.length) * -2;
			gfx.fillStyle = that.buttonColor;
			text(gfx, that.emptyMessage,that.getx() + that.w/2 - 3*tw/13, that.gety() + (that.h/2), that.rowHeight-6, -2 );
			console.log(tw/2);
		}
		for(var k in that.table){
			gfx.fillStyle = that.buttonColor;
			gfx.fillRect(x, y, that.colWidth, that.rowHeight);
			gfx.fillStyle = that.textColor;
			if(i == 0) text(gfx, that.descrip[k].name, x+2, y+3, that.rowHeight-6, -2);
			x += that.border + that.colWidth
		}
		//render buttons

		//render table

	}

	this.clickStart = function(){
		if(!this.json)
			return;

		var x = App.InputHandler.mouseData.x;
		var y = App.InputHandler.mouseData.y;



		//determine row, if any
		y = Math.floor((y - this.gety())/this.rowHeight);
		//determine column
		x = Math.floor((x - this.getx())/this.colWidth);
		console.log("x, y  " + x + " , " + y);

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
App.GuiTable.prototype = Object.create(g.Component);
App.GuiTable.prototype.constructor = App.GuiTable;