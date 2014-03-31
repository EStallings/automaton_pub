/*
For displaying leaderboards and level select.
*/

App.GuiTable = function(x, y){
	this.json = null;
	this.table = []; //to be filled with GuiTableRow objects
	this.cbuttons = []; //to be filled with column button objects

	this.panel = new App.GuiPanel(new App.GuiCollisionRect(x, y, 100, 50)); //will be resized
	this.guiCollider = this.panel.guiCollider;
	this.guiCollider.functional = true;

	this.rowHeight = 20;
	this.colWidth  = 100;
	this.x = x;
	this.y = y;
	this.widthInCells = 0;
	this.heightInCells = 0;

	this.activeRow = -1; //-1 for none

	this.oddColor = App.GuiColors.gray[4];
	this.evenColor = App.GuiColors.gray[5];
	this.activeColor = App.GuiColors.gray[5];

	this.update = function(){
		for(var b in this.cbuttons){
			this.cbuttons[b].update();
		}
	}

	this.sortBy = function(col){
		this.table.sort(function(a, b){
			return (a.entries[col].text < b.entries[col].text) ? -1 : 1;
		});
		App.Gui.drawStatic = true;
	}

	this.render = function(gfx){
		this.panel.render(gfx);
		for(var b in this.cbuttons){
			this.cbuttons[b].render(gfx);
		}
		for(var o in this.table){
			for(var k in this.table[o].entries){
				var e = this.table[o].entries[k];

				gfx.fillStyle = (o%2 == 0) ? this.evenColor : this.oddColor;
				var x = k * this.colWidth + this.guiCollider.getx();
				var y = o * this.rowHeight + this.guiCollider.gety() + 30;
				gfx.fillRect(x, y,this.colWidth,this.rowHeight);

				gfx.fillStyle = App.GuiTextButton.fg;
				var textX = x + 2;
				var textY = y + this.rowHeight/2;
				gfx.fillText(e.text, textX, textY);
			}

		}
	}

	this.clickStart = function(){
		var x = App.InputHandler.mouseData.x;
		var y = App.InputHandler.mouseData.y;
		for(var b in this.cbuttons){
			this.cbuttons[b].clickStart(x, y);
		}
	}

	this.clickEnd = function(x, y){
		for(var b in this.cbuttons){
			this.cbuttons[b].clickEnd(x, y);
		}
	}

	this.clickDrag = function(){
		for(var b in this.cbuttons){
			this.cbuttons[b].clickDrag(x, y);
		}
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

		var i = 0, that = this;
		for(var o in json){
			this.table.push(new App.GuiTable.TableRow(json[o], this, i));
			i++;
		}

		i=0;
		for(var c in json[0]){
			//var b = new App.GuiTextButton((this.colWidth * i), 0, c, function(){that.cbutClicked(i)}, false, this.panel);
			var b  = new App.GuiTable.TableButton(i, c, this);
			this.cbuttons.push(b);
			i++;
		}

		this.width = i * this.colWidth;
		this.height = json.length * this.rowHeight;
		this.guiCollider.w = this.width;
		this.guiCollider.h = this.height;

		App.Gui.drawStatic = true;

	}

}

App.GuiTable.TableButton = function(x, string, table){
	this.guiCollider = new App.GuiCollisionRect(x * table.colWidth, 0, table.colWidth, 30);
	this.text = string;
	table.panel.addChild(this);

	this.activeColor = App.GuiColors.gray[4];
	this.inactiveColor = App.GuiColors.gray[6];
	this.color = this.inactiveColor;
	this.table = table;
	this.col = x;

	this.clicked = false;


	//For continuous callbacks
	this.update = function(){
		if(this.clicked && this.continuous)
			this.callback();
	}

	//Draws a box and the text! Nothing fancy. Could use some work maybe.
	this.render = function(gfx){
		gfx.fillStyle = this.color;
		gfx.fillRect(this.guiCollider.getx(), this.guiCollider.gety(), this.guiCollider.w, this.guiCollider.h);
		gfx.fillStyle = App.GuiTextButton.fg;
		var textX = this.guiCollider.getx() + 2;
		var textY = this.guiCollider.gety() + (this.guiCollider.h / 2);
		gfx.fillText(this.text, textX, textY);
	}

	//Changes the color and initiates the click
	this.clickStart = function(x, y){
		if(this.guiCollider.collides(x, y)){
			this.clicked = true;
			this.color = this.activeColor;
		}
	}

	//Checks for moving the mouse off of the button
	this.clickDrag = function(x, y){
		if(!this.guiCollider.collides(x,y)){
			this.color = App.GuiTextButton.bg;
			this.clicked = false;
		}
	}

	//If the click was successful, fire the callback
	this.clickEnd = function(x, y){
		this.color = this.inactiveColor;
		if(!this.guiCollider.collides(x,y))
			return;
		if(this.clicked){
			//do resorting of table. OH BOY will THAT be fun! :/
			this.table.sortBy(this.col);
		}
		this.clicked = false;
	}


}

App.GuiTable.TableRow = function(json, table, row){
	this.entries = [];
	var i = 0;
	for(var k in json){
		this.entries.push(new App.GuiTable.TableEntry(json[k], row, i));
		i++;
	}
	this.row = row;
}

App.GuiTable.TableEntry = function(string, row, col){
	this.text = string;
	this.row = row;
	this.col = col;
}