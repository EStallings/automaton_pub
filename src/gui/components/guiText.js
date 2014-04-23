
//NOT a simple text display.
App.GuiTextBox = function(x, y, w, h, defaultText, en, ex, xorigin, yorigin){
	App.GuiTools.Component.call(this, x, y, w, h, en, ex, xorigin, yorigin);

	this.activeColor = this.baseColor;
	this.activeTextColor = this.textColor;
	this.hoverColor = this.baseColor;

	this.txt = defaultText;
	this.spacing = -2;

	this.cursorSpos = null;
	this.cursorEpos = null;

	this.cursortime = 0;
	this.cursormax = 30;

	this.editing = false;
	this.functional = true;

	var that = this;

	this.renderLayers['Text'] = function(gfx){
		gfx.fillStyle = that.textColor;

		var split = that.splitText();

		beforeWidth = App.GuiTextBox.textMeasure.measureText(split.beforeStart).width     + (split.beforeStart.length * that.spacing);
		middleWidth = App.GuiTextBox.textMeasure.measureText(split.betweenStartEnd).width + (split.betweenStartEnd.length * that.spacing);
		afterWidth  = App.GuiTextBox.textMeasure.measureText(split.afterEnd).width        + (split.afterEnd.length * that.spacing);
		beforeStart = that.getx()+2;
		middleStart = beforeStart+beforeWidth;

		text(gfx,that.txt,that.getx()+2,that.gety()+3,that.h-6,that.spacing);
		if(that.cursorEpos){
			gfx.fillRect(middleStart-(that.spacing/2), that.gety()+3, middleWidth, that.h -6);
			gfx.fillStyle = '#ffffff';
			text(gfx,split.betweenStartEnd,middleStart,that.gety()+3,that.h-6,that.spacing);
		}
		else if(that.cursortime > 0){
			gfx.fillRect(middleStart-(that.spacing/2), that.gety()+1, 1, that.h-2);
		}

	};

	this.update = function(){
		if(!(this.gui.lastActive === this))
		{
			this.editing = false;
			App.InputHandler.releaseKeys();
			this.cursorSpos = null;
			this.cursorEpos = null;

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

		var i = this.getTextCoord();

		if(this.cursorSpos === null) this.cursortime = this.cursormax;
		this.cursorSpos = i;

		console.log(this.cursorSpos);
	}

	this.getTextCoord = function(){
		var xcoord = App.InputHandler.mouseX - this.getx();
		var gfx = App.GuiTextBox.textMeasure;
		gfx.textBaseline = "alphabetic";
		gfx.font = "800 "+(this.h-6)*1.37+"px arial";

		var x = 2, i = -1;
		do{
			i++;
			var cw = gfx.measureText(this.txt.charAt(i)).width+this.spacing;
			x += cw;

		}while(i<this.txt.length && (x < xcoord));

		return i;
	}

	this.clickEnd = function(){
		var i = this.getTextCoord();

		//No-move
		if(i == this.cursorSpos){
			//this.cursorEpos = null;
			return;
		}

		//dragged from right to left; swap
		if(i < this.cursorSpos){
			this.cursorEpos = this.cursorSpos;
			this.cursorSpos = i;
			return;
		}

		//dragged from left to right
		this.cursorEpos = i;
	}

	//returns the text split into an array of 3 parts: the text before the first index, the text between indices, and the text after
	this.splitText = function(){
		return {beforeStart:this.txt.substring(0, this.cursorSpos),
			betweenStartEnd:(this.cursorEpos)?this.txt.substring(this.cursorSpos, this.cursorEpos):"",
			afterEnd:(this.cursorEpos)?this.txt.substring(this.cursorEpos,this.txt.length):this.txt.substring(this.cursorSpos, this.txt.length)};
	}

	this.keyHandler = function(key){
		console.log(key);
		var k = App.InputHandler.keyCodeToChar[key].toLowerCase();
		var ret = false;

		console.log(App.InputHandler.keysDown);
		if(App.InputHandler.checkKey("Shift")){
			console.log("Shift held down!");
			k = k.toUpperCase();
		}
		var split = that.splitText();

		if(App.InputHandler.alphaNumeric(key)){
			that.txt = split.beforeStart + k + split.afterEnd;
			that.cursorEpos = null;
			that.cursorSpos ++;
		}
		else if(k === 'backspace'){
			if(that.cursorEpos)
				that.txt = split.beforeStart + split.afterEnd;
			else
				that.txt = split.beforeStart.substring(0, split.beforeStart.length-1) + split.afterEnd;

			that.cursorEpos = null;
			that.cursorSpos --;
			ret = true; //let the input handler know to block the default action: don't want to go back a page
		}

		return ret;
	}
	if(!App.GuiTextBox.textMeasure){
		App.GuiTextBox.textMeasure = App.Canvases.addNewLayer('textMeasure').getContext('2d');

	}

}
App.GuiTextBox.textMeasure;
App.GuiTextBox.prototype = Object.create(g.Component);
App.GuiTextBox.prototype.constructor = App.GuiTextBox;
