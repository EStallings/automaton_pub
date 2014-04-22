
//NOT a simple text display.
App.GuiTextBox = function(x, y, w, h, defaultText, en, ex, xorigin, yorigin){
	App.GuiTools.Component.call(this, x, y, w, h, en, ex, xorigin, yorigin);

	this.activeColor = this.baseColor;
	this.activeTextColor = this.textColor;
	this.hoverColor = this.baseColor;

	this.txt = defaultText;
	this.spacing = -2;

	this.cursorSpos = null;
	this.cursorSx = -1;
	this.cursorSw = -1;

	this.cursorEpos = null;
	this.cursorEx = -1;
	this.cursorEw = -1;

	this.cursortime = 0;
	this.cursormax = 30;

	this.editing = false;
	this.functional = true;

	var that = this;

	this.renderLayers['Text'] = function(gfx){
		gfx.fillStyle = that.textColor;
		var col = that.textColor;
		if((that.cursortime > 0) && that.editing){
			gfx.fillRect(that.cursorSx + that.getx(), that.gety()+3, (that.cursorEx - that.cursorSx) + that.cursorEw, that.h -6);
			col = '#ffffff';
		}

		text(gfx,that.txt,that.getx()+2,that.gety()+3,that.h-6,that.spacing, that.textColor, that.cursorSpos, that.cursorEpos, col);
	};

	this.update = function(){
		if(!(this.gui.lastActive === this))
		{
			this.editing = false;
			App.InputHandler.releaseKeys();
			this.cursorSpos = null;
			this.cursorSx = -1;
			this.cursorSw = -1;
			this.cursorEpos = null;
			this.cursorEx = -1;
			this.cursorEw = -1;

			this.cursortime = 0;

			return;
		}
		this.cursortime = (this.cursortime-1 > -(this.cursormax -1))? this.cursortime-1 : this.cursormax;

		if(App.InputHandler.lmb)
			this.clickEnd();

		return true;
	}

	this.clickStart = function(){
		this.editing = true;
		App.InputHandler.seizeKeys(that.keyHandler);
		this.gui.lastActive = this;

		var c = this.getTextCoords();

		if(this.cursorSpos === null) this.cursortime = this.cursormax;
		this.cursorSpos = c.i;
		this.cursorEpos = c.i + 1;

		this.cursorSw = c.cw;
		this.cursorSx = c.x - this.cursorSw - this.spacing;
		this.cursorEw = c.cw;
		this.cursorEx = this.cursorSx;


		//TODO find position in text
	}

	this.getTextCoords = function(){
		var xcoord = App.InputHandler.mouseX - this.getx();
		var gfx = App.Canvases.layers[0].getContext('2d');

		gfx.textBaseline = "alphabetic";
		gfx.font = "800 "+(this.h-6)*1.37+"px arial";
		var x = 2, i = -1;
		do{
			i++;
			var cw = gfx.measureText(this.txt.charAt(i)).width+this.spacing;
			x += cw;

		}while(i<this.txt.length && (x < xcoord));

		return {i:i, x:x, cw:cw};
	}

	this.clickEnd = function(){
		var c = this.getTextCoords();

		this.cursorEpos = c.i;

		this.cursorEw = c.cw;
		this.cursorEx = c.x - this.cursorEw - this.spacing;
	}

	this.keyHandler = function(key){
		console.log(key);
		var k = App.InputHandler.keyCodeToChar[key].toLowerCase();
		console.log(App.InputHandler.keysDown);
		if(App.InputHandler.checkKey("Shift")){
			console.log("Shift held down!");
			k = k.toUpperCase();
		}

		if(App.InputHandler.alphaNumeric(key)){
			that.txt = that.txt.substring(0,that.cursorSpos+1) + k + that.txt.substring(that.cursorEpos, that.txt.length);
			that.cursorEpos = that.cursorSpos = that.cursorSpos+1;
		}
	}

}
App.GuiTextBox.prototype = Object.create(g.Component);
App.GuiTextBox.prototype.constructor = App.GuiTextBox;
