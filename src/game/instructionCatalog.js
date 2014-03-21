App.makeInstructionCatalog = function(){
	var ins = {};

	// Instruction type id's
	// TODO: ALL SWITCHES NEED UP DOWN LEFT RIGHT
	ins.TYPES = {
	// --------------------------------------------- AUTOMATON SPAWN
		"SPAWN UP"	: 0,		"SPAWN DOWN"	: 1,
		"SPAWN LEFT"	: 2,		"SPAWN RIGHT"	: 3,
	// ------------------------------------------- DIRECTION CONTROL
		"UP"		: 4,		"DOWN"		: 5,
		"LEFT"		: 6,		"RIGHT"		: 7,
		"ROTATE CW"	: 8,		"ROTATE CCW"	: 9,
	// ---------------------------------------------------- TOKEN IO
		"IN STREAM"	: 10,		"OUT STREAM"	: 11,
		"IN"		: 12,		"OUT"		: 13,
	// ------------------------------------------ TOKEN MANIPULATION
		"GRAB"		: 14,		"DROP"		: 15,
		"GRAB/DROP"	: 16,		"INC"		: 17,
		"DEC"		: 18,
	// ----------------------------------------- CONDITIONAL CONTROL
		"COND 0"	: 19,		"COND +-"	: 20,
		"COND EVEN ODD"	: 21,
	// -------------------------------------------------------- MISC
		"SYNC"		: 22,		"COLOR TOGGLE"	: 23,
		"PAUSE"		: 24,
	};

	ins.render = function(type,x,y,c,size){
		this.gfx.save();
		switch(this.color){
			case App.COLORS.RED:
				this.gfx.translate(this.x*size,this.y*size);
				this.gfx.fillStyle="#660000";
				this.gfx.fillRect(2,2,size/2-4,size/2-4);
				this.gfx.strokeStyle="#ff0000";
				break;
			case App.COLORS.GREEN:
				this.gfx.translate(this.x*size+size/2,this.y*size);
				this.gfx.fillStyle="#006600";
				this.gfx.fillRect(2,2,size/2-4,size/2-4);
				this.gfx.strokeStyle="#00ff00";
				break;
			case App.COLORS.BLUE:
				this.gfx.translate(this.x*size,this.y*size+size/2);
				this.gfx.fillStyle="#000066";
				this.gfx.fillRect(2,2,size/2-4,size/2-4);
				this.gfx.strokeStyle="#0000ff";
				break;
			case App.COLORS.YELLOW:
				this.gfx.translate(this.x*size+size/2,this.y*size+size/2);
				this.gfx.fillStyle="#666600";
				this.gfx.fillRect(2,2,size/2-4,size/2-4);
				this.gfx.strokeStyle="#ffff00";
				break;
		}

		this.gfx.beginPath();
		this.gfx.moveTo(2,2);
		this.gfx.lineTo(2,size/2-2);
		this.gfx.lineTo(size/2-2,size/2-2);
		this.gfx.lineTo(size/2-2,2);
		this.gfx.lineTo(2,2);
		this.gfx.stroke();

		if(App.Game.cellSize>30)this.rFunc();
		this.gfx.restore();
	}return ins;
}

//============================================================================//
//============================================================================//
//============================================================================//

/*
App.SimulationInstruction = function(level,x,y,color,type){

	// ========================================================== //
	// ================= I N S T R U C T I O N S ================ //
	// ========================================================== //

	switch(type){

		case 0: // spawn up ============================

			this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.arc(cs/4,cs/4,cs/16,-Math.PI,Math.PI);
				this.gfx.moveTo(3*cs/16,2*cs/16);
				this.gfx.lineTo(4*cs/16,cs/16);
				this.gfx.lineTo(5*cs/16,2*cs/16);
				this.gfx.stroke();
			};break;

		case 1: // spawn down ==========================

			this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.arc(cs/4,cs/4,cs/16,-Math.PI,Math.PI);
				this.gfx.moveTo(3*cs/16,6*cs/16);
				this.gfx.lineTo(4*cs/16,7*cs/16);
				this.gfx.lineTo(5*cs/16,6*cs/16);
				this.gfx.stroke();
			};break;

		case 2: // spawn left ==========================

			this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.arc(cs/4,cs/4,cs/16,-Math.PI,Math.PI);
				this.gfx.moveTo(2*cs/16,3*cs/16);
				this.gfx.lineTo(cs/16,4*cs/16);
				this.gfx.lineTo(2*cs/16,5*cs/16);
				this.gfx.stroke();
			};break;

		case 3: // spawn right =========================

			this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.arc(cs/4,cs/4,cs/16,-Math.PI,Math.PI);
				this.gfx.moveTo(6*cs/16,3*cs/16);
				this.gfx.lineTo(7*cs/16,4*cs/16);
				this.gfx.lineTo(6*cs/16,5*cs/16);
				this.gfx.stroke();
			};break;

		case 4: // up ==================================

			this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.moveTo(cs/4,cs/8);
				this.gfx.lineTo(cs/8,3*cs/8);
				this.gfx.lineTo(3*cs/8,3*cs/8);
				this.gfx.lineTo(cs/4,cs/8);
				this.gfx.stroke();
			};break;

		case 5: // down ================================

			this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.moveTo(cs/4,3*cs/8);
				this.gfx.lineTo(cs/8,cs/8);
				this.gfx.lineTo(3*cs/8,cs/8);
				this.gfx.lineTo(cs/4,3*cs/8);
				this.gfx.stroke();
			};break;

		case 6: // left ================================

			this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.moveTo(cs/8,cs/4);
				this.gfx.lineTo(3*cs/8,cs/8);
				this.gfx.lineTo(3*cs/8,3*cs/8);
				this.gfx.lineTo(cs/8,cs/4);
				this.gfx.stroke();
			};break;

		case 7: // right ===============================

			this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.moveTo(3*cs/8,cs/4);
				this.gfx.lineTo(cs/8,cs/8);
				this.gfx.lineTo(cs/8,3*cs/8);
				this.gfx.lineTo(3*cs/8,cs/4);
				this.gfx.stroke();
			};break;

		case 8: // rotate cw ===========================

			this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.arc(cs/4,cs/4,cs/8,Math.PI/2,2*Math.PI);
				this.gfx.moveTo(3*cs/8,cs/4);
				this.gfx.lineTo(3*cs/8,cs/8);
				this.gfx.stroke();
			};break;

		case 9: // rotate ccw ==========================

			this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.arc(cs/4,cs/4,cs/8,Math.PI,Math.PI/2);
				this.gfx.moveTo(cs/8,cs/4);
				this.gfx.lineTo(cs/8,cs/8);
				this.gfx.stroke();
			};break;

		case 10: // in stream ==========================

			// TODO: override render func
			this.rFunc = function(){
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

			// TODO: override render func
			this.rFunc = function(){
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

			this.rFunc = function(){
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

			this.rFunc = function(){
				// TODO: this should NOT be an "O" (streams get letters as symbols)
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.arc(cs/4,cs/4,cs/8,-Math.PI,Math.PI);
				this.gfx.stroke();
			};break;

		case 14: // grab ===============================

			this.rFunc = function(){
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

			this.rFunc = function(){
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

			this.rFunc = function(){
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

			this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.moveTo(cs/8,cs/4);
				this.gfx.lineTo(3*cs/8,cs/4);
				this.gfx.moveTo(cs/4,cs/8);
				this.gfx.lineTo(cs/4,3*cs/8);
				this.gfx.stroke();
			};break;

		case 18: // dec ================================

			this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.moveTo(cs/8,cs/4);
				this.gfx.lineTo(3*cs/8,cs/4);
				this.gfx.stroke();
			};break;

		case 19: // switch 0 ===========================

			// TODO: UP DOWN LEFT RIGHT
			this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();

				this.gfx.fillStyle="#0F0F0F";
				this.gfx.strokeStyle="#FF0000";

				this.gfx.moveTo(12*cs/64,16*cs/64);
				this.gfx.lineTo(52*cs/64,16*cs/64);

				this.gfx.moveTo(52*cs/64,16*cs/64);
				this.gfx.lineTo(52*cs/64,24*cs/64);

				this.gfx.moveTo(52*cs/64,24*cs/64);
				this.gfx.lineTo(20*cs/64,24*cs/64);

				this.gfx.moveTo(20*cs/64,24*cs/64);
				this.gfx.lineTo(20*cs/64,28*cs/64);

				this.gfx.moveTo(20*cs/64,28*cs/64);
				this.gfx.lineTo(52*cs/64,28*cs/64);

				this.gfx.moveTo(52*cs/64,28*cs/64);
				this.gfx.lineTo(52*cs/64,48*cs/64);

				this.gfx.moveTo(52*cs/64,48*cs/64);
				this.gfx.lineTo(12*cs/64,48*cs/64);

				this.gfx.moveTo(12*cs/64,48*cs/64);
				this.gfx.lineTo(12*cs/64,40*cs/64);

				this.gfx.moveTo(12*cs/64,40*cs/64);
				this.gfx.lineTo(44*cs/64,40*cs/64);

				this.gfx.moveTo(44*cs/64,40*cs/64);
				this.gfx.lineTo(44*cs/64,36*cs/64);

				this.gfx.moveTo(44*cs/64,36*cs/64);
				this.gfx.lineTo(12*cs/64,36*cs/64);

				this.gfx.moveTo(12*cs/64,36*cs/64);
				this.gfx.lineTo(12*cs/64,16*cs/64);

				this.gfx.stroke();
				this.gfx.closePath();
			};break;

		case 20: // switch +- ==========================

			// TODO: UP DOWN LEFT RIGHT
			this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.stroke();
			};break;

		case 21: // switch even odd ====================

			// TODO: UP DOWN LEFT RIGHT
			this.rFunc = function(){
				var cs = App.Game.cellSize;


				switch(this.color) {
					// XXX: why do we need a color switch here?
					// TODO
				}

				this.gfx.fillStyle="#0F0F0F";
				this.gfx.fillRect(0,0,cs/4,cs/4);

				this.gfx.strokeStyle="#AAAAAA";
				this.gfx.strokeRect(0,0,cs/4,cs/4);

				this.gfx.fillStyle="#F0F0F0";
				this.gfx.fillRect(cs/4,0,cs/4,cs/4);

				this.gfx.strokeRect(cs/4,0,cs/4,cs/4);

				this.gfx.fillStyle="#F0F0F0";
				this.gfx.fillRect(0,cs/4,cs/4,cs/4);

				this.gfx.strokeRect(0,cs/4,cs/4,cs/4);

				this.gfx.fillStyle="#0F0F0F";
				this.gfx.fillRect(cs/4,cs/4,cs/4,cs/4);

				this.gfx.strokeRect(cs/4,cs/4,cs/4,cs/4);

				this.gfx.stroke();
			};break;

		case 22: // sync ===============================

			// TODO: override this.render | custom syms for each color
			// TODO: 22 is hardcoded in cell.sync... fix that
			this.staticRender = function(){
				var cs = App.Game.cellSize;
				this.gfx.save();
				this.gfx.beginPath();
				switch(this.color){
					case App.COLORS.RED:
						this.gfx.translate(this.x*cs,this.y*cs);
						this.gfx.fillStyle="#660000";
						this.gfx.strokeStyle="#ff0000";
						this.gfx.moveTo(2,cs/2-2);
						this.gfx.lineTo(2,2);
						this.gfx.lineTo(cs/2-2,2);
						if(App.Game.cellSize>30){
							this.gfx.lineTo(cs/2-2,cs/4);
							this.gfx.lineTo(cs/4,cs/4);
							this.gfx.lineTo(cs/4,cs/2-2);
							this.gfx.lineTo(2,cs/2-2);
						}else{
							this.gfx.lineTo(cs/2-2,cs/2-2);
							this.gfx.lineTo(2,cs/2-2);
						}
						break;
					case App.COLORS.GREEN:
						this.gfx.translate(this.x*cs+cs/2,this.y*cs);
						this.gfx.fillStyle="#006600";
						this.gfx.strokeStyle="#00ff00";
						this.gfx.moveTo(2,2);
						this.gfx.lineTo(cs/2-2,2);
						this.gfx.lineTo(cs/2-2,cs/2-2);
						if(App.Game.cellSize>30){
							this.gfx.lineTo(cs/4,cs/2-2);
							this.gfx.lineTo(cs/4,cs/4);
							this.gfx.lineTo(2,cs/4);
							this.gfx.lineTo(2,2);
						}else{
							this.gfx.lineTo(2,cs/2-2);
							this.gfx.lineTo(2,2)
						}
						break;
					case App.COLORS.BLUE:
						this.gfx.translate(this.x*cs,this.y*cs+cs/2);
						this.gfx.fillStyle="#000066";
						this.gfx.strokeStyle="#0000ff";
						this.gfx.moveTo(cs/2-2,cs/2-2);
						this.gfx.lineTo(2,cs/2-2);
						this.gfx.lineTo(2,2);
						if(App.Game.cellSize>30){
							this.gfx.lineTo(cs/4,2);
							this.gfx.lineTo(cs/4,cs/4);
							this.gfx.lineTo(cs/2-2,cs/4);
							this.gfx.lineTo(cs/2-2,cs/2-2);
						}else{
							this.gfx.lineTo(cs/2-2,2);
							this.gfx.lineTo(cs/2-2,cs/2-2);
						}
						break;
					case App.COLORS.YELLOW:
						this.gfx.translate(this.x*cs+cs/2,this.y*cs+cs/2);
						this.gfx.fillStyle="#666600";
						this.gfx.strokeStyle="#ffff00";
						this.gfx.moveTo(cs/2-2,2);
						this.gfx.lineTo(cs/2-2,cs/2-2);
						this.gfx.lineTo(2,cs/2-2);
						if(App.Game.cellSize>30){
							this.gfx.lineTo(2,cs/4);
							this.gfx.lineTo(cs/4,cs/4);
							this.gfx.lineTo(cs/4,2);
							this.gfx.lineTo(cs/2-2,2);
						}else{
							this.gfx.lineTo(2,2);
							this.gfx.lineTo(cs/2-2,2);
						}
						break;
				}this.gfx.fill();
				this.gfx.stroke();

				this.gfx.restore();
			};break;

		case 23: // color toggle =======================

			this.rFunc = function(){
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.moveTo(1*cs/8,1*cs/8);
				this.gfx.lineTo(3*cs/8,1*cs/8);
				this.gfx.moveTo(2*cs/8,1*cs/8);
				this.gfx.lineTo(2*cs/8,3*cs/8);
				this.gfx.stroke();
			};break;

		case 24: // pause ==============================

			this.rFunc = function(){
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
*/
