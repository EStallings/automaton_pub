App.makeInstructionCatalog = function(){
	var ins = {};

	// Instruction type id's
	// TODO: ALL SWITCHES NEED UP DOWN LEFT RIGHT
	ins.TYPES = {
	// --------------------------------------------- AUTOMATON SPAWN
		'SPAWN UP'	: 0,		'SPAWN DOWN'	: 1,
		'SPAWN LEFT'	: 2,		'SPAWN RIGHT'	: 3,
	// ------------------------------------------- DIRECTION CONTROL
		'UP'		: 4,		'DOWN'		: 5,
		'LEFT'		: 6,		'RIGHT'		: 7,
	// ---------------------------------------------------- TOKEN IO
		'IN STREAM'	: 8,		'OUT STREAM'	: 9,
		'IN'		: 10,		'OUT'		: 11,
	// ------------------------------------------ TOKEN MANIPULATION
		'GRAB'		: 12,		'DROP'		: 13,
		'GRAB/DROP'	: 14,		'INC'		: 15,
		'DEC'		: 16,
	// -------------------------------------------------------- MISC
		'SYNC'		: 17,		'COLOR TOGGLE'	: 18,
		'PAUSE'		: 19,
	// ----------------------------------------- CONDITIONAL CONTROL
		'COND 0 U'	: 20,		'COND 0 D'	: 21,
		'COND 0 L'	: 22,		'COND 0 R'	: 23,
		'COND TOKEN U'	: 24,		'COND TOKEN D'	: 25,
		'COND TOKEN L'	: 26,		'COND TOKEN R'	: 27,
		'COND +- U'	: 28,		'COND +- D'	: 29,
		'COND +- L'	: 30,		'COND +- R'	: 31,
	};

	// TODO: SPECIAL RENDER FUNCS (STREAM, SYNC)
	ins.render = function(gfx,type,x,y,c,size){
		gfx.save();
		gfx.translate(x,y);
		gfx.lineCap  = 'round';
		gfx.lineJoin = 'round';
		gfx.lineWidth = 2;

		switch(c){
			case App.COLORS.RED:    gfx.fillStyle='#ff0000';break;
			case App.COLORS.GREEN:  gfx.fillStyle='#00ff00';break;
			case App.COLORS.BLUE:   gfx.fillStyle='#0000ff';break;
			case App.COLORS.YELLOW: gfx.fillStyle='#ffff00';break;
		}gfx.fillRect(2,2,size-4,size-4);

		switch(c){
			case App.COLORS.RED:    gfx.strokeStyle='#800000';break;
			case App.COLORS.GREEN:  gfx.strokeStyle='#008000';break;
			case App.COLORS.BLUE:   gfx.strokeStyle='#000080';break;
			case App.COLORS.YELLOW: gfx.strokeStyle='#808000';break;
		}

		if(size>11){
			gfx.beginPath();
			gfx.moveTo(2,2);
			gfx.lineTo(2,size-2);
			gfx.lineTo(size-2,size-2);
			gfx.lineTo(size-2,2);
			gfx.lineTo(2,2);
			gfx.stroke();
		}

		if(size>15){
			switch(Math.round(Math.log(size/6)/Math.log(2)+2)){
				case 4:gfx.lineWidth = 2;break;
				case 5:gfx.lineWidth = 4;break;
				case 6:gfx.lineWidth = 6;break;
				case 7:gfx.lineWidth = 8;break;
			}ins.rFunc[type](gfx,size);
		}gfx.restore();
	}

	// ========================================================== //
	// ================= I N S T R U C T I O N S ================ //
	// ========================================================== //

	ins.rFunc = {
	//	ins.TYPES['SPAWN UP']:function(){
		0:function(gfx,cs){
			gfx.beginPath();gfx.arc(cs/2,cs/2,cs/4,-Math.PI*0.92,-Math.PI*0.58);gfx.stroke();
			gfx.beginPath();gfx.arc(cs/2,cs/2,cs/4,-Math.PI*0.42,-Math.PI*0.08);gfx.stroke();
			gfx.beginPath();gfx.arc(cs/2,cs/2,cs/4, Math.PI*0.08, Math.PI*0.42);gfx.stroke();
			gfx.beginPath();gfx.arc(cs/2,cs/2,cs/4, Math.PI*0.58, Math.PI*0.92);gfx.stroke();
			gfx.beginPath();
			gfx.moveTo(3*cs/8,  cs/2);
			gfx.lineTo(4*cs/8,3*cs/8);
			gfx.lineTo(5*cs/8,  cs/2);
			gfx.moveTo(4*cs/8,3*cs/8);
			gfx.lineTo(4*cs/8,5*cs/8);
			gfx.stroke();
		},

	//	ins.TYPES['SPAWN DOWN']:function(){
		1:function(gfx,cs){
			gfx.beginPath();gfx.arc(cs/2,cs/2,cs/4,-Math.PI*0.92,-Math.PI*0.58);gfx.stroke();
			gfx.beginPath();gfx.arc(cs/2,cs/2,cs/4,-Math.PI*0.42,-Math.PI*0.08);gfx.stroke();
			gfx.beginPath();gfx.arc(cs/2,cs/2,cs/4, Math.PI*0.08, Math.PI*0.42);gfx.stroke();
			gfx.beginPath();gfx.arc(cs/2,cs/2,cs/4, Math.PI*0.58, Math.PI*0.92);gfx.stroke();
			gfx.beginPath();
			gfx.moveTo(3*cs/8,  cs/2);
			gfx.lineTo(4*cs/8,5*cs/8);
			gfx.lineTo(5*cs/8,  cs/2);
			gfx.moveTo(4*cs/8,3*cs/8);
			gfx.lineTo(4*cs/8,5*cs/8);
			gfx.stroke();
		},

	//	ins.TYPES['SPAWN LEFT']:function(){
		2:function(gfx,cs){
			gfx.beginPath();gfx.arc(cs/2,cs/2,cs/4,-Math.PI*0.92,-Math.PI*0.58);gfx.stroke();
			gfx.beginPath();gfx.arc(cs/2,cs/2,cs/4,-Math.PI*0.42,-Math.PI*0.08);gfx.stroke();
			gfx.beginPath();gfx.arc(cs/2,cs/2,cs/4, Math.PI*0.08, Math.PI*0.42);gfx.stroke();
			gfx.beginPath();gfx.arc(cs/2,cs/2,cs/4, Math.PI*0.58, Math.PI*0.92);gfx.stroke();
			gfx.beginPath();
			gfx.moveTo(  cs/2,3*cs/8);
			gfx.lineTo(3*cs/8,4*cs/8);
			gfx.lineTo(  cs/2,5*cs/8);
			gfx.moveTo(3*cs/8,4*cs/8);
			gfx.lineTo(5*cs/8,4*cs/8);
			gfx.stroke();
		},

	//	ins.TYPES['SPAWN RIGHT']:function(){
		3:function(gfx,cs){
			gfx.beginPath();gfx.arc(cs/2,cs/2,cs/4,-Math.PI*0.92,-Math.PI*0.58);gfx.stroke();
			gfx.beginPath();gfx.arc(cs/2,cs/2,cs/4,-Math.PI*0.42,-Math.PI*0.08);gfx.stroke();
			gfx.beginPath();gfx.arc(cs/2,cs/2,cs/4, Math.PI*0.08, Math.PI*0.42);gfx.stroke();
			gfx.beginPath();gfx.arc(cs/2,cs/2,cs/4, Math.PI*0.58, Math.PI*0.92);gfx.stroke();
			gfx.beginPath();
			gfx.moveTo(  cs/2,3*cs/8);
			gfx.lineTo(5*cs/8,4*cs/8);
			gfx.lineTo(  cs/2,5*cs/8);
			gfx.moveTo(3*cs/8,4*cs/8);
			gfx.lineTo(5*cs/8,4*cs/8);
			gfx.stroke();
		},

	//	ins.TYPES['UP']:function(){
		4:function(gfx,cs){
			gfx.beginPath();
			gfx.moveTo(  cs/4,3*cs/4);
			gfx.lineTo(  cs/2,  cs/4);
			gfx.lineTo(3*cs/4,3*cs/4);
			gfx.stroke();
		},

	//	ins.TYPES['DOWN']:function(){
		5:function(gfx,cs){
			gfx.beginPath();
			gfx.moveTo(  cs/4,  cs/4);
			gfx.lineTo(  cs/2,3*cs/4);
			gfx.lineTo(3*cs/4,  cs/4);
			gfx.stroke();
		},

	//	ins.TYPES['LEFT']:function(){
		6:function(gfx,cs){
			gfx.beginPath();
			gfx.moveTo(3*cs/4,  cs/4);
			gfx.lineTo(  cs/4,  cs/2);
			gfx.lineTo(3*cs/4,3*cs/4);
			gfx.stroke();
		},

	//	ins.TYPES['RIGHT']:function(){
		7:function(gfx,cs){
			gfx.beginPath();
			gfx.moveTo(  cs/4,  cs/4);
			gfx.lineTo(3*cs/4,  cs/2);
			gfx.lineTo(  cs/4,3*cs/4);
			gfx.stroke();
		},

	//	ins.TYPES['IN STREAM']:
		8:function(gfx,cs){
			// TODO: override render func
			// TODO: make letters for each stream
			gfx.beginPath();
			gfx.moveTo(cs/2,2*cs/8);
			gfx.lineTo(cs/2,5*cs/8);
			gfx.moveTo(cs/2,6*cs/8);
			gfx.lineTo(cs/2,6*cs/8);
			gfx.stroke();
		},

	//	ins.TYPES['OUT STREAM']:
		9:function(gfx,cs){
			// TODO: override render func
			// TODO: make letters for each stream
			gfx.beginPath();
			gfx.moveTo(cs/2,2*cs/8);
			gfx.lineTo(cs/2,5*cs/8);
			gfx.moveTo(cs/2,6*cs/8);
			gfx.lineTo(cs/2,6*cs/8);
			gfx.stroke();
		},

	//	ins.TYPES['IN']:function(){
		10:function(gfx,cs){
			gfx.beginPath();gfx.arc(cs/2,15*cs/32,cs/8,-Math.PI,Math.PI);gfx.stroke();
			gfx.beginPath();
			gfx.moveTo(  cs/2,  cs/4); // i loop like this to avoid square joints
			gfx.lineTo(3*cs/4,  cs/4);
			gfx.lineTo(3*cs/4,9*cs/16);
			gfx.lineTo(  cs/2,3*cs/4);
			gfx.lineTo(  cs/4,9*cs/16);
			gfx.lineTo(  cs/4,  cs/4);
			gfx.lineTo(  cs/2,  cs/4);
			gfx.moveTo(  cs/4,3*cs/4);
			gfx.lineTo(3*cs/4,3*cs/4);
			gfx.stroke();
		},

	//	ins.TYPES['OUT']:function(){
		11:function(gfx,cs){
			gfx.beginPath();gfx.arc(cs/2,17*cs/32,cs/8,-Math.PI,Math.PI);gfx.stroke();
			gfx.beginPath();
			gfx.moveTo(  cs/2,3*cs/4); // i loop like this to avoid square joints
			gfx.lineTo(3*cs/4,3*cs/4);
			gfx.lineTo(3*cs/4,7*cs/16);
			gfx.lineTo(  cs/2,  cs/4);
			gfx.lineTo(  cs/4,7*cs/16);
			gfx.lineTo(  cs/4,3*cs/4);
			gfx.lineTo(  cs/2,3*cs/4);
			gfx.stroke();
		},

	//	ins.TYPES['GRAB']:function(){
		12:function(gfx,cs){
			gfx.beginPath();
			gfx.moveTo(cs/4,3*cs/4);
			gfx.lineTo(3*cs/4,3*cs/4);
			gfx.moveTo(cs/2,cs/4);
			gfx.lineTo(cs/2,3*cs/4);
			gfx.moveTo(3*cs/8,3*cs/8);
			gfx.lineTo(cs/2,cs/4);
			gfx.lineTo(5*cs/8,3*cs/8);
			gfx.stroke();
		},

	//	ins.TYPES['DROP']:function(){
		13:function(gfx,cs){
			gfx.beginPath();
			gfx.moveTo(cs/4,3*cs/4);
			gfx.lineTo(3*cs/4,3*cs/4);
			gfx.moveTo(cs/2,cs/4);
			gfx.lineTo(cs/2,3*cs/4);
			gfx.moveTo(3*cs/8,5*cs/8);
			gfx.lineTo(cs/2,3*cs/4);
			gfx.lineTo(5*cs/8,5*cs/8);
			gfx.stroke();
		},

	//	ins.TYPES['GRAB/DROP']:function(){
		14:function(gfx,cs){
			gfx.beginPath();
			gfx.moveTo(cs/4,3*cs/4);
			gfx.lineTo(3*cs/4,3*cs/4);
			gfx.moveTo(cs/2,cs/4);
			gfx.lineTo(cs/2,3*cs/4);
			gfx.moveTo(3*cs/8,3*cs/8);
			gfx.lineTo(cs/2,cs/4);
			gfx.lineTo(5*cs/8,3*cs/8);
			gfx.moveTo(3*cs/8,5*cs/8);
			gfx.lineTo(cs/2,3*cs/4);
			gfx.lineTo(5*cs/8,5*cs/8);
			gfx.stroke();
		},

	//	ins.TYPES['INC']:function(){
		15:function(gfx,cs){
			gfx.beginPath();
			gfx.moveTo(cs/4,cs/2);
			gfx.lineTo(3*cs/4,cs/2);
			gfx.moveTo(cs/2,cs/4);
			gfx.lineTo(cs/2,3*cs/4);
			gfx.stroke();
		},

	//	ins.TYPES['DEC']:function(){
		16:function(gfx,cs){
			gfx.beginPath();
			gfx.moveTo(cs/4,cs/2);
			gfx.lineTo(3*cs/4,cs/2);
			gfx.stroke();
		},

	//	ins.TYPES['SYNC']:
		17:function(gfx,cs){
			// TODO: override render | custom syms for each color
/*
			staticRender = function(){
				gfx.save();
				gfx.beginPath();
				switch(color){
					case App.COLORS.RED:
						gfx.translate(x*cs,y*cs);
						gfx.fillStyle='#660000';
						gfx.strokeStyle='#ff0000';
						gfx.moveTo(2,cs-2);
						gfx.lineTo(2,2);
						gfx.lineTo(cs-2,2);
						if(App.Game.cellSize>30){
							gfx.lineTo(cs-2,cs/2);
							gfx.lineTo(cs/2,cs/2);
							gfx.lineTo(cs/2,cs-2);
							gfx.lineTo(2,cs-2);
						}else{
							gfx.lineTo(cs-2,cs-2);
							gfx.lineTo(2,cs-2);
						}
						break;
					case App.COLORS.GREEN:
						gfx.translate(x*cs+cs,y*cs);
						gfx.fillStyle='#006600';
						gfx.strokeStyle='#00ff00';
						gfx.moveTo(2,2);
						gfx.lineTo(cs-2,2);
						gfx.lineTo(cs-2,cs-2);
						if(App.Game.cellSize>30){
							gfx.lineTo(cs/2,cs-2);
							gfx.lineTo(cs/2,cs/2);
							gfx.lineTo(2,cs/2);
							gfx.lineTo(2,2);
						}else{
							gfx.lineTo(2,cs-2);
							gfx.lineTo(2,2)
						}
						break;
					case App.COLORS.BLUE:
						gfx.translate(x*cs,y*cs+cs);
						gfx.fillStyle='#000066';
						gfx.strokeStyle='#0000ff';
						gfx.moveTo(cs-2,cs-2);
						gfx.lineTo(2,cs-2);
						gfx.lineTo(2,2);
						if(App.Game.cellSize>30){
							gfx.lineTo(cs/2,2);
							gfx.lineTo(cs/2,cs/2);
							gfx.lineTo(cs-2,cs/2);
							gfx.lineTo(cs-2,cs-2);
						}else{
							gfx.lineTo(cs-2,2);
							gfx.lineTo(cs-2,cs-2);
						}
						break;
					case App.COLORS.YELLOW:
						gfx.translate(x*cs+cs,y*cs+cs);
						gfx.fillStyle='#666600';
						gfx.strokeStyle='#ffff00';
						gfx.moveTo(cs-2,2);
						gfx.lineTo(cs-2,cs-2);
						gfx.lineTo(2,cs-2);
						if(App.Game.cellSize>30){
							gfx.lineTo(2,cs/2);
							gfx.lineTo(cs/2,cs/2);
							gfx.lineTo(cs/2,2);
							gfx.lineTo(cs-2,2);
						}else{
							gfx.lineTo(2,2);
							gfx.lineTo(cs-2,2);
						}
						break;
				}gfx.fill();
				gfx.stroke();

				gfx.restore();
*/
		},

	//	ins.TYPES['COLOR TOGGLE']:function(){
		18:function(gfx,cs){
			gfx.beginPath();
			gfx.moveTo(1*cs/4,1*cs/4);
			gfx.lineTo(3*cs/4,1*cs/4);
			gfx.moveTo(2*cs/4,1*cs/4);
			gfx.lineTo(2*cs/4,3*cs/4);
			gfx.stroke();
		},

	//	ins.TYPES['PAUSE']:function(){
		19:function(gfx,cs){
			gfx.beginPath();
			gfx.moveTo(1*cs/4,2*cs/4);
			gfx.lineTo(3*cs/4,2*cs/4);
			gfx.lineTo(3*cs/4,1*cs/4);
			gfx.lineTo(1*cs/4,1*cs/4);
			gfx.lineTo(1*cs/4,3*cs/4);
			gfx.stroke();
		},

	//	ins.TYPES['COND 0 U']:
		20:function(gfx,cs){},

	//	ins.TYPES['COND 0 D']:
		21:function(gfx,cs){},

	//	ins.TYPES['COND 0 L']:
		22:function(gfx,cs){},

	//	ins.TYPES['COND 0 R']:
		23:function(gfx,cs){},

	//	ins.TYPES['COND TOKEN U']:
		24:function(gfx,cs){},

	//	ins.TYPES['COND TOKEN D']:
		25:function(gfx,cs){},

	//	ins.TYPES['COND TOKEN L']:
		26:function(gfx,cs){},

	//	ins.TYPES['COND TOKEN R']:
		27:function(gfx,cs){},

	//	ins.TYPES['COND +- U']:
		28:function(gfx,cs){},

	//	ins.TYPES['COND +- D']:
		29:function(gfx,cs){},

	//	ins.TYPES['COND +- L']:
		30:function(gfx,cs){},

	//	ins.TYPES['COND +- R']:
		31:function(gfx,cs){},
	};

	return ins;
}

/*

*/
