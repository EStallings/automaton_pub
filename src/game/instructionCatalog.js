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
		'COND + U'	: 28,		'COND + D'	: 29,
		'COND + L'	: 30,		'COND + R'	: 31,
	};

	// TODO: SPECIAL RENDER FUNCS (STREAM, SYNC)
	ins.render = function(gfx,type,x,y,c,cs){
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
		}gfx.fillRect(2,2,cs-4,cs-4);

		switch(c){
			case App.COLORS.RED:    gfx.strokeStyle='#800000';break;
			case App.COLORS.GREEN:  gfx.strokeStyle='#008000';break;
			case App.COLORS.BLUE:   gfx.strokeStyle='#000080';break;
			case App.COLORS.YELLOW: gfx.strokeStyle='#808000';break;
		}

		if(cs>11){
			gfx.beginPath();
			gfx.moveTo(2,2);
			gfx.lineTo(2,cs-2);
			gfx.lineTo(cs-2,cs-2);
			gfx.lineTo(cs-2,2);
			gfx.lineTo(2,2);
			gfx.stroke();
		}

		if(cs>15){
			switch(Math.round(Math.log(cs/6)/Math.log(2)+2)){
				case 4:gfx.lineWidth = 2;break;
				case 5:gfx.lineWidth = 4;break;
				case 6:gfx.lineWidth = 6;break;
				case 7:gfx.lineWidth = 8;break;
			}

	// ========================================================== //
	// ================= I N S T R U C T I O N S ================ //
	// ========================================================== //

	switch(type){
		case ins.TYPES['SPAWN UP']:
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
		break;

		case ins.TYPES['SPAWN DOWN']:
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
		break;

		case ins.TYPES['SPAWN LEFT']:
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
		break;

		case ins.TYPES['SPAWN RIGHT']:
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
		break;

		case ins.TYPES['UP']:
			gfx.beginPath();
			gfx.moveTo(  cs/4,3*cs/4);
			gfx.lineTo(  cs/2,  cs/4);
			gfx.lineTo(3*cs/4,3*cs/4);
			gfx.stroke();
		break;

		case ins.TYPES['DOWN']:
			gfx.beginPath();
			gfx.moveTo(  cs/4,  cs/4);
			gfx.lineTo(  cs/2,3*cs/4);
			gfx.lineTo(3*cs/4,  cs/4);
			gfx.stroke();
		break;

		case ins.TYPES['LEFT']:
			gfx.beginPath();
			gfx.moveTo(3*cs/4,  cs/4);
			gfx.lineTo(  cs/4,  cs/2);
			gfx.lineTo(3*cs/4,3*cs/4);
			gfx.stroke();
		break;

		case ins.TYPES['RIGHT']:
			gfx.beginPath();
			gfx.moveTo(  cs/4,  cs/4);
			gfx.lineTo(3*cs/4,  cs/2);
			gfx.lineTo(  cs/4,3*cs/4);
			gfx.stroke();
		break;

		case ins.TYPES['IN STREAM']:
			// TODO: override render func
			// TODO: make letters for each stream
			gfx.beginPath();
			gfx.moveTo(cs/2,2*cs/8);
			gfx.lineTo(cs/2,5*cs/8);
			gfx.moveTo(cs/2,6*cs/8);
			gfx.lineTo(cs/2,6*cs/8);
			gfx.stroke();
		break;

		case ins.TYPES['OUT STREAM']:
			// TODO: override render func
			// TODO: make letters for each stream
			gfx.beginPath();
			gfx.moveTo(cs/2,2*cs/8);
			gfx.lineTo(cs/2,5*cs/8);
			gfx.moveTo(cs/2,6*cs/8);
			gfx.lineTo(cs/2,6*cs/8);
			gfx.stroke();
		break;

		case ins.TYPES['IN']:
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
		break;

		case ins.TYPES['OUT']:
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
		break;

		case ins.TYPES['GRAB']:
			gfx.beginPath();
			gfx.moveTo(cs/4,3*cs/4);
			gfx.lineTo(3*cs/4,3*cs/4);
			gfx.moveTo(cs/2,cs/4);
			gfx.lineTo(cs/2,3*cs/4);
			gfx.moveTo(3*cs/8,3*cs/8);
			gfx.lineTo(cs/2,cs/4);
			gfx.lineTo(5*cs/8,3*cs/8);
			gfx.stroke();
		break;

		case ins.TYPES['DROP']:
			gfx.beginPath();
			gfx.moveTo(cs/4,3*cs/4);
			gfx.lineTo(3*cs/4,3*cs/4);
			gfx.moveTo(cs/2,cs/4);
			gfx.lineTo(cs/2,3*cs/4);
			gfx.moveTo(3*cs/8,5*cs/8);
			gfx.lineTo(cs/2,3*cs/4);
			gfx.lineTo(5*cs/8,5*cs/8);
			gfx.stroke();
		break;

		case ins.TYPES['GRAB/DROP']:
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
		break;

		case ins.TYPES['INC']:
			gfx.beginPath();
			gfx.moveTo(cs/4,cs/2);
			gfx.lineTo(3*cs/4,cs/2);
			gfx.moveTo(cs/2,cs/4);
			gfx.lineTo(cs/2,3*cs/4);
			gfx.stroke();
		break;

		case ins.TYPES['DEC']:
			gfx.beginPath();
			gfx.moveTo(cs/4,cs/2);
			gfx.lineTo(3*cs/4,cs/2);
			gfx.stroke();
		break;

		case ins.TYPES['SYNC']:
			// TODO: override render | custom syms for each color
/*
			staticRender = function(){
				gfx.save();
				gfx.beginPath();
				switch(color){
					case App.COLORS.RED:
			break;			gfx.translate(x*cs,y*cs);
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
		break;

		case ins.TYPES['COLOR TOGGLE']:
			gfx.beginPath();
			gfx.moveTo(1*cs/4,1*cs/4);
			gfx.lineTo(3*cs/4,1*cs/4);
			gfx.moveTo(2*cs/4,1*cs/4);
			gfx.lineTo(2*cs/4,3*cs/4);
			gfx.stroke();
		break;

		case ins.TYPES['PAUSE']:
			gfx.beginPath();gfx.arc(cs/2,cs/2,cs/4,-Math.PI,Math.PI);gfx.stroke();
			gfx.beginPath();
			gfx.moveTo(cs/2,cs/2);
			gfx.lineTo(cs/2,3*cs/8);
			gfx.moveTo(cs/2,cs/2);
			gfx.lineTo(5*cs/8,cs/2);
			gfx.stroke();
		break;

		case ins.TYPES['COND 0 U']:break;
		case ins.TYPES['COND 0 D']:break;
		case ins.TYPES['COND 0 L']:break;
		case ins.TYPES['COND 0 R']:break;
		case ins.TYPES['COND TOKEN U']:break;
		case ins.TYPES['COND TOKEN D']:break;
		case ins.TYPES['COND TOKEN L']:break;
		case ins.TYPES['COND TOKEN R']:break;
		case ins.TYPES['COND + U']:break;
		case ins.TYPES['COND + D']:break;
		case ins.TYPES['COND + L']:break;
		case ins.TYPES['COND + R']:break;
	}

	// ========================================================== //

		}gfx.restore();
	}

	return ins;
}

/*

*/
