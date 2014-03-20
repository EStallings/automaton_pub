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

	this.staticRender = function(){
		this.gfx.save();
		if(App.Game.cellSize>30); // TODO: USE INSTRUCTION RENDERER
		this.gfx.restore();
	}

	// ========================================================== //
	// ================= I N S T R U C T I O N S ================ //
	// ========================================================== //

	switch(type){ // TODO: Cases 0-24? YUCK PLEASE CLEAN UP

		case 0: // spawn up ============================

			new App.SimulationAutomaton(level,x,y,App.DIRECTIONS.UP,color);

			this.execute = function(a){ // do nothing
			};break;

		case 1: // spawn down ==========================

			new App.SimulationAutomaton(level,x,y,App.DIRECTIONS.DOWN,color);

			this.execute = function(a){ // do nothing
			};break;

		case 2: // spawn left ==========================

			new App.SimulationAutomaton(level,x,y,App.DIRECTIONS.LEFT,color);

			this.execute = function(a){ // do nothing
			};break;

		case 3: // spawn right =========================

			new App.SimulationAutomaton(level,x,y,App.DIRECTIONS.RIGHT,color);

			this.execute = function(a){ // do nothing
			};break;

		case 4: // up ==================================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				a.direction = App.DIRECTIONS.UP;
			};break;

		case 5: // down ================================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				a.direction = App.DIRECTIONS.DOWN;
			};break;

		case 6: // left ================================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				a.direction = App.DIRECTIONS.LEFT;
			};break;

		case 7: // right ===============================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				a.direction = App.DIRECTIONS.RIGHT;
			};break;

		case 8: // rotate cw ===========================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				a.direction = (a.direction+3)%4;
			};break;

		case 9: // rotate ccw ==========================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				a.direction = (a.direction+1)%4;
			};break;

		case 10: // in stream ==========================

			if(level.inStreams[color] === undefined)
				level.inStreams[color] = [];
			level.inStreams[color].push(this);

			this.input = function(){
				new App.SimulationToken(this.level,this.x,this.y,0);
				App.Game.requestStaticRenderUpdate = true; // XXX: move this to token...?
			}

			this.execute = function(a){ // do nothing
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

			this.execute = function(a){ // do nothing
			};break;

		case 12: // in =================================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				if(!this.level.inStreams[this.color])return;
				for(var i in this.level.inStreams[this.color])
					this.level.inStreams[this.color][i].input();
			};break;

		case 13: // out ================================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				for(var i in this.level.outStreams[this.color])
					this.level.outStreams[this.color][i].output();
			};break;

		case 14: // grab ===============================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				if(a.tokenHeld === undefined && this.cell.tokens.length !== 0){
					a.tokenHeld = this.cell.tokens[0];
					this.cell.tokens.splice(0,1);
					App.Game.requestStaticRenderUpdate = true; // XXX: move this to token...?
				}
			};break;

		case 15: // drop ===============================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				if(a.tokenHeld !== undefined){
					this.cell.tokens.push(a.tokenHeld);
					a.tokenHeld = undefined;
					App.Game.requestStaticRenderUpdate = true; // XXX: move this to token...?
				}
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
			};break;

		case 17: // inc ================================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				if(a.tokenHeld !== undefined)++a.tokenHeld.number;
			};break;

		case 18: // dec ================================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				if(a.tokenHeld !== undefined)--a.tokenHeld.number;
			};break;

		case 19: // switch 0 ===========================

			// TODO: UP DOWN LEFT RIGHT
			this.execute = function(a){
			};break;

		case 20: // switch +- ==========================

			// TODO: UP DOWN LEFT RIGHT
			this.execute = function(a){
			};break;

		case 21: // switch even odd ====================

			// TODO: UP DOWN LEFT RIGHT
			this.execute = function(a){
			};break;

		case 22: // sync ===============================

			// TODO: override this.render | custom syms for each color
			// TODO: 22 is hardcoded in cell.sync... fix that
			this.execute = function(a){
				this.cell.sync();
			};break;

		case 23: // color toggle =======================

			// TODO: this doesn't have a color check
			this.execute = function(a){
				a.colorFlags[this.color] = !a.colorFlags[this.color];
			};break;

		case 24: // pause ==============================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				App.Game.requestPause = true;
			};break;
	}
}
