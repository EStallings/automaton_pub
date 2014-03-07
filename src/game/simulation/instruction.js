/*
// TODO: visual feedback on execution
// TODO: 0switch, +-switch, %2switch

var cs/4 = cellSize/4;
var cs/8 = cellSize/8;
var cs/16 = cellSize/16;

var 3*cs/8 = 3*cs/8;
var 3*cs/16 = 3*cs/16;
var 5*cs/16 = 5*cs/16;
*/

App.SimulationInstruction = function(level,x,y,color,type){
	// TODO: return if instruction is already present, this will get garbage collected
	// TODO: planning level shouldn't be trying to put conflicting instructions here...

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

	// ========================================================== //
	// ================= I N S T R U C T I O N S ================ //
	// ========================================================== //

	switch(type){

		case 0: // spawn up ============================

			// TODO: add to special spawn list in level
			this.execute = function(a){ // do nothing
			};this.rFunc = function(){
			};break;

		case 1: // spawn down ==========================

			// TODO: add to special spawn list in level
			this.execute = function(a){ // do nothing
			};this.rFunc = function(){
			};break;

		case 2: // spawn left ==========================

			// TODO: add to special spawn list in level
			this.execute = function(a){ // do nothing
			};this.rFunc = function(){
			};break;

		case 3: // spawn right =========================

			// TODO: add to special spawn list in level
			this.execute = function(a){ // do nothing
			};this.rFunc = function(){
			};break;

		case 4: // up ==================================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				a.direction = App.DIRECTIONS.UP;
			};this.rFunc = function(){
				var cs = App.Game.cellSize;
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

		case 10: // stream =============================

			// TODO: add to special stream list in level
			// TODO: special render function for stream (add stream render layer)
			this.execute = function(a){
			};this.rFunc = function(){
			};break;

		case 11: // in =================================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				// TODO: IMPLEMENT THIS
			//	for(var i in this.level.streams)
			//		this.level.streams[i].IO(INPUT,this.color);
			};this.rFunc = function(){
				// TODO: this should NOT be an I (streams)
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

		case 12: // out ================================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				// TODO: IMPLEMENT THIS
			//	for(var i in this.level.streams)
			//		this.level.streams[i].IO(OUTPUT,this.color);
			};this.rFunc = function(){
				// TODO: this should NOT be an O (streams)
				var cs = App.Game.cellSize;
				this.gfx.beginPath();
				this.gfx.arc(cs/4,cs/4,cs/8,-Math.PI,Math.PI);
				this.gfx.stroke();
			};break;

		case 13: // grab ===============================

			this.execute = function(a){
			};this.rFunc = function(){
			};break;

		case 14: // drop ===============================

			this.execute = function(a){
			};this.rFunc = function(){
			};break;

		case 15: // grab/drop ==========================

			this.execute = function(a){
				if(!a.colorFlags[this.color])return;
				if(a.tokenHeld === undefined){
					if(this.cell.tokens.length !== 0){
						a.tokenHeld = this.cell.tokens[0];
						this.cell.tokens.splice(0,1);
					}
				}else{
					this.cell.tokens.push(a.tokenHeld);
					a.tokenHeld = undefined;
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

		case 16: // inc ================================

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

		case 17: // dec ================================

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

		case 18: // switch 0 ===========================

			this.execute = function(a){
			};this.rFunc = function(){
			};break;

		case 19: // switch +- ==========================

			this.execute = function(a){
			};this.rFunc = function(){
			};break;

		case 20: // switch even odd ====================

			this.execute = function(a){
			};this.rFunc = function(){
			};break;

		case 21: // sync ===============================

			// TODO: override this.render
			// TODO: custom syms for each color
			this.execute = function(a){
			};this.rFunc = function(){
			};break;

		case 22: // color toggle =======================

			// TODO: this doesn't have a color check
			this.execute = function(a){
			};this.rFunc = function(){
			};break;

		case 23: // pause ==============================

			this.execute = function(a){
			};this.rFunc = function(){
			};break;
	}

	// ========================================================== //
	// ========================================================== //
	// ========================================================== //

	this.render = function(){
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

		this.rFunc();
		this.gfx.restore();
	}
}
