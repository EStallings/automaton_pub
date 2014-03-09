App.SimulationInstruction = function(level,x,y,color,type){
	// this assumes valid input from the planning level

	level.instructions.push(this);
	level.getCell(x,y).instructions[color] = this;

	this.gfx = App.Game.instructionGfx;
	this.level = level;
	this.cell = level.getCell(x,y);
	this.x = x;
	this.y = y;
	this.color = color;
	this.type = type;

	this.rFunc;
	this.staticRender = function(){
		var cs = App.Game.cellSize;
		this.gfx.save();
		switch(this.color){
			case App.COLORS.RED:
				this.gfx.translate(this.x*cs,this.y*cs);
				this.gfx.fillStyle="#660000";
				this.gfx.fillRect(2,2,cs/2-4,cs/2-4);
				this.gfx.strokeStyle="#ff0000";
				break;
			case App.COLORS.GREEN:
				this.gfx.translate(this.x*cs+cs/2,this.y*cs);
				this.gfx.fillStyle="#006600";
				this.gfx.fillRect(2,2,cs/2-4,cs/2-4);
				this.gfx.strokeStyle="#00ff00";
				break;
			case App.COLORS.BLUE:
				this.gfx.translate(this.x*cs,this.y*cs+cs/2);
				this.gfx.fillStyle="#000066";
				this.gfx.fillRect(2,2,cs/2-4,cs/2-4);
				this.gfx.strokeStyle="#0000ff";
				break;
			case App.COLORS.YELLOW:
				this.gfx.translate(this.x*cs+cs/2,this.y*cs+cs/2);
				this.gfx.fillStyle="#666600";
				this.gfx.fillRect(2,2,cs/2-4,cs/2-4);
				this.gfx.strokeStyle="#ffff00";
				break;
		}

		this.gfx.beginPath();
		this.gfx.moveTo(2,2);
		this.gfx.lineTo(2,cs/2-2);
		this.gfx.lineTo(cs/2-2,cs/2-2);
		this.gfx.lineTo(cs/2-2,2);
		this.gfx.lineTo(2,2);
		this.gfx.stroke();

		if(App.Game.cellSize>30)this.rFunc();
		this.gfx.restore();
	}

	// ========================================================== //
	// ================= I N S T R U C T I O N S ================ //
	// ========================================================== //

	switch(type){

		case 0: // spawn up ============================

			new App.SimulationAutomaton(level,x,y,App.DIRECTIONS.UP,color);

			this.execute = function(a){ // do nothing
			};this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.arc(cs/4,cs/4,cs/16,-Math.PI,Math.PI);
				this.gfx.moveTo(3*cs/16,2*cs/16);
				this.gfx.lineTo(4*cs/16,cs/16);
				this.gfx.lineTo(5*cs/16,2*cs/16);
				this.gfx.stroke();
			};break;

		case 1: // spawn down ==========================

			new App.SimulationAutomaton(level,x,y,App.DIRECTIONS.DOWN,color);

			this.execute = function(a){ // do nothing
			};this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.arc(cs/4,cs/4,cs/16,-Math.PI,Math.PI);
				this.gfx.moveTo(3*cs/16,6*cs/16);
				this.gfx.lineTo(4*cs/16,7*cs/16);
				this.gfx.lineTo(5*cs/16,6*cs/16);
				this.gfx.stroke();
			};break;

		case 2: // spawn left ==========================

			new App.SimulationAutomaton(level,x,y,App.DIRECTIONS.LEFT,color);

			this.execute = function(a){ // do nothing
			};this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.arc(cs/4,cs/4,cs/16,-Math.PI,Math.PI);
				this.gfx.moveTo(2*cs/16,3*cs/16);
				this.gfx.lineTo(cs/16,4*cs/16);
				this.gfx.lineTo(2*cs/16,5*cs/16);
				this.gfx.stroke();
			};break;

		case 3: // spawn right =========================

			new App.SimulationAutomaton(level,x,y,App.DIRECTIONS.RIGHT,color);

			this.execute = function(a){ // do nothing
			};this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.arc(cs/4,cs/4,cs/16,-Math.PI,Math.PI);
				this.gfx.moveTo(6*cs/16,3*cs/16);
				this.gfx.lineTo(7*cs/16,4*cs/16);
				this.gfx.lineTo(6*cs/16,5*cs/16);
				this.gfx.stroke();
			};break;

		case 4: // up ==================================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				a.direction = App.DIRECTIONS.UP;
			};this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.moveTo(cs/4,cs/8);
				this.gfx.lineTo(cs/8,3*cs/8);
				this.gfx.lineTo(3*cs/8,3*cs/8);
				this.gfx.lineTo(cs/4,cs/8);
				this.gfx.stroke();
			};break;

		case 5: // down ================================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				a.direction = App.DIRECTIONS.DOWN;
			};this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.moveTo(cs/4,3*cs/8);
				this.gfx.lineTo(cs/8,cs/8);
				this.gfx.lineTo(3*cs/8,cs/8);
				this.gfx.lineTo(cs/4,3*cs/8);
				this.gfx.stroke();
			};break;

		case 6: // left ================================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				a.direction = App.DIRECTIONS.LEFT;
			};this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.moveTo(cs/8,cs/4);
				this.gfx.lineTo(3*cs/8,cs/8);
				this.gfx.lineTo(3*cs/8,3*cs/8);
				this.gfx.lineTo(cs/8,cs/4);
				this.gfx.stroke();
			};break;

		case 7: // right ===============================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				a.direction = App.DIRECTIONS.RIGHT;
			};this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.moveTo(3*cs/8,cs/4);
				this.gfx.lineTo(cs/8,cs/8);
				this.gfx.lineTo(cs/8,3*cs/8);
				this.gfx.lineTo(3*cs/8,cs/4);
				this.gfx.stroke();
			};break;

		case 8: // rotate cw ===========================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				a.direction = (a.direction+3)%4;
			};this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.arc(cs/4,cs/4,cs/8,Math.PI/2,2*Math.PI);
				this.gfx.moveTo(3*cs/8,cs/4);
				this.gfx.lineTo(3*cs/8,cs/8);
				this.gfx.stroke();
			};break;

		case 9: // rotate ccw ==========================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				a.direction = (a.direction+1)%4;
			};this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.arc(cs/4,cs/4,cs/8,Math.PI,Math.PI/2);
				this.gfx.moveTo(cs/8,cs/4);
				this.gfx.lineTo(cs/8,cs/8);
				this.gfx.stroke();
			};break;

		case 10: // in stream ==========================

			if(level.inStreams[color] === undefined)
				level.inStreams[color] = [];
			level.inStreams[color].push(this);

			this.input = function(){
				new App.SimulationToken(this.level,this.x,this.y,0);
				App.Game.requestStaticRenderUpdate = true; // XXX: move this to token...?
			}

			// TODO: override render func
			this.execute = function(a){ // do nothing
			};this.rFunc = function(){
				// TODO: make letters for each stream
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.moveTo(3*cs/8,1*cs/8);
				this.gfx.lineTo(1*cs/8,1*cs/8);
				this.gfx.lineTo(1*cs/8,2*cs/8);
				this.gfx.lineTo(3*cs/8,2*cs/8);
				this.gfx.lineTo(3*cs/8,3*cs/8);
				this.gfx.lineTo(1*cs/8,3*cs/8);
				this.gfx.stroke();
			};break;

		case 11: // out stream =========================

			if(level.outStreams[color] === undefined)
				level.outStreams[color] = [];
			level.outStreams[color].push(this);

			this.output = function(){
				if(this.cell.tokens.length !== 0){
					this.cell.tokens.splice(0,1);
					App.Game.requestStaticRenderUpdate = true; // XXX: move this to token...?
				}
			}

			// TODO: override render func
			this.execute = function(a){ // do nothing
			};this.rFunc = function(){
				// TODO: make letters for each stream
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.moveTo(3*cs/8,1*cs/8);
				this.gfx.lineTo(1*cs/8,1*cs/8);
				this.gfx.lineTo(1*cs/8,2*cs/8);
				this.gfx.lineTo(3*cs/8,2*cs/8);
				this.gfx.lineTo(3*cs/8,3*cs/8);
				this.gfx.lineTo(1*cs/8,3*cs/8);
				this.gfx.stroke();
			};break;

		case 12: // in =================================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				if(!this.level.inStreams[this.color])return;
				for(var i in this.level.inStreams[this.color])
					this.level.inStreams[this.color][i].input();
			};this.rFunc = function(){
				// TODO: this should NOT be an "I" (streams get letters as symbols)
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.moveTo(cs/4,cs/8);
				this.gfx.lineTo(cs/4,3*cs/8);
				this.gfx.moveTo(cs/8,cs/8);
				this.gfx.lineTo(3*cs/8,cs/8);
				this.gfx.moveTo(cs/8,3*cs/8);
				this.gfx.lineTo(3*cs/8,3*cs/8);
				this.gfx.stroke();
			};break;

		case 13: // out ================================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				for(var i in this.level.outStreams[this.color])
					this.level.outStreams[this.color][i].output();
			};this.rFunc = function(){
				// TODO: this should NOT be an "O" (streams get letters as symbols)
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.arc(cs/4,cs/4,cs/8,-Math.PI,Math.PI);
				this.gfx.stroke();
			};break;

		case 14: // grab ===============================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				if(a.tokenHeld === undefined && this.cell.tokens.length !== 0){
					a.tokenHeld = this.cell.tokens[0];
					this.cell.tokens.splice(0,1);
					App.Game.requestStaticRenderUpdate = true; // XXX: move this to token...?
				}
			};this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.moveTo(cs/8,3*cs/8);
				this.gfx.lineTo(3*cs/8,3*cs/8);
				this.gfx.moveTo(cs/4,cs/8);
				this.gfx.lineTo(cs/4,3*cs/8);
				this.gfx.moveTo(3*cs/16,3*cs/16);
				this.gfx.lineTo(cs/4,cs/8);
				this.gfx.lineTo(5*cs/16,3*cs/16);
				this.gfx.stroke();
			};break;

		case 15: // drop ===============================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				if(a.tokenHeld !== undefined){
					this.cell.tokens.push(a.tokenHeld);
					a.tokenHeld = undefined;
					App.Game.requestStaticRenderUpdate = true; // XXX: move this to token...?
				}
			};this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.moveTo(cs/8,3*cs/8);
				this.gfx.lineTo(3*cs/8,3*cs/8);
				this.gfx.moveTo(cs/4,cs/8);
				this.gfx.lineTo(cs/4,3*cs/8);
				this.gfx.moveTo(3*cs/16,5*cs/16);
				this.gfx.lineTo(cs/4,3*cs/8);
				this.gfx.lineTo(5*cs/16,5*cs/16);
				this.gfx.stroke();
			};break;

		case 16: // grab/drop ==========================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				if(a.tokenHeld === undefined){
					if(this.cell.tokens.length !== 0){
						a.tokenHeld = this.cell.tokens[0];
						this.cell.tokens.splice(0,1);
						App.Game.requestStaticRenderUpdate = true; // XXX: move this to token...?
					}
				}else{
					this.cell.tokens.push(a.tokenHeld);
					a.tokenHeld = undefined;
					App.Game.requestStaticRenderUpdate = true; // XXX: move this to token...?
				}
			};this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.moveTo(cs/8,3*cs/8);
				this.gfx.lineTo(3*cs/8,3*cs/8);
				this.gfx.moveTo(cs/4,cs/8);
				this.gfx.lineTo(cs/4,3*cs/8);
				this.gfx.moveTo(3*cs/16,3*cs/16);
				this.gfx.lineTo(cs/4,cs/8);
				this.gfx.lineTo(5*cs/16,3*cs/16);
				this.gfx.moveTo(3*cs/16,5*cs/16);
				this.gfx.lineTo(cs/4,3*cs/8);
				this.gfx.lineTo(5*cs/16,5*cs/16);
				this.gfx.stroke();
			};break;

		case 17: // inc ================================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				if(a.tokenHeld !== undefined)++a.tokenHeld.number;
			};this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.moveTo(cs/8,cs/4);
				this.gfx.lineTo(3*cs/8,cs/4);
				this.gfx.moveTo(cs/4,cs/8);
				this.gfx.lineTo(cs/4,3*cs/8);
				this.gfx.stroke();
			};break;

		case 18: // dec ================================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				if(a.tokenHeld !== undefined)--a.tokenHeld.number;
			};this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.moveTo(cs/8,cs/4);
				this.gfx.lineTo(3*cs/8,cs/4);
				this.gfx.stroke();
			};break;

		case 19: // switch 0 ===========================

			// TODO: UP DOWN LEFT RIGHT
			this.execute = function(a){
			};this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.stroke();
			};break;

		case 20: // switch +- ==========================

			// TODO: UP DOWN LEFT RIGHT
			this.execute = function(a){
			};this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.stroke();
			};break;

		case 21: // switch even odd ====================

			// TODO: UP DOWN LEFT RIGHT
			this.execute = function(a){
			};this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.stroke();
			};break;

		case 22: // sync ===============================

			// TODO: override this.render | custom syms for each color
			// TODO: 22 is hardcoded in cell.sync... fix that
			this.execute = function(a){
				this.cell.sync();
			};this.rFunc = function(){
			};break;

		case 23: // color toggle =======================

			// TODO: this doesn't have a color check
			this.execute = function(a){
				a.colorFlags[this.color] = !a.colorFlags[this.color];
			};this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.moveTo(1*cs/8,1*cs/8);
				this.gfx.lineTo(3*cs/8,1*cs/8);
				this.gfx.moveTo(2*cs/8,1*cs/8);
				this.gfx.lineTo(2*cs/8,3*cs/8);
				this.gfx.stroke();
			};break;

		case 24: // pause ==============================

			this.execute = function(a){
				App.Game.pause();
			};this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.moveTo(1*cs/8,2*cs/8);
				this.gfx.lineTo(3*cs/8,2*cs/8);
				this.gfx.lineTo(3*cs/8,1*cs/8);
				this.gfx.lineTo(1*cs/8,1*cs/8);
				this.gfx.lineTo(1*cs/8,3*cs/8);
				this.gfx.stroke();
			};break;
	}
}
