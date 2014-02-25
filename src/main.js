//For list of all HTML DOM events, see http://www.w3schools.com/jsref/dom_obj_event.asp

//On load function is executed automatically when the window is loaded
window.onload = function(){

	RED = 'R';
	GREEN = 'G';
	BLUE = 'B';
	YELLOW = 'Y';

	LEFT = 'W';
	RIGHT = 'E';
	UP = 'N';
	DOWN = 'S';

	LASTCYCLETICK = 0;
	NEXTCYCLETICK = 0;
	FIRSTCYCLE = true;
	INTERPOLATE = 0;

  
	GuiView = new _GuiView();
	GameView = new _GameView();
	  
	InputHandler = new _InputHandler(GuiView.canvas);
	Engine = new _Engine();


	Engine.run({render:Render, update:Update,canvas:GameView.canvas});

	//this is super-duper test-casey
	GameView.level = LoadLevel(";0;0;1.7976931348623157e+308;1.7976931348623157e+308;" 
		+"1.7976931348623157e+308;t,0,3,6,1;t,1,4,2,2;t,2,23,86,3;t,3,6,23,4;t,4,8,42"
		+",5;t,5,6,21,6;t,6,4,53,7;t,7,2,22,8;t,8,4,11,9;t,9,1,12,0;a,0,1,1,N,true,tr"
		+"ue,false,false,-1;a,1,25,25,S,true,true,false,true,-1;a,2,31,31,E,false,tru"
		+"e,true,false,-1;a,3,26,26,W,true,false,false,false,-1;a,4,15,15,E,false,fal"
		+"se,true,true,-1;i,0,1,2,R,200;i,1,1,2,G,12;i,2,1,3,R,2;i,3,1,32,R,20;i,4,1,"
		+"12,R,21;s,0,1,1,in,B,1,2,5,6,4,9;s,1,56,102,out,R,8,3,6,2,5,7,0");
}


function Render(){
  GameView.draw();
  GuiView.draw();
}

function Update(tick){
	if(FIRSTCYCLE) {
		NEXTCYCLETICK = tick;
		FIRSTCYCLE = false;
	}

	if(tick < NEXTCYCLETICK){
		//do updating
		//do verifying
		//do moving

	}
	INTERPOLATE = (tick -LASTCYCLETICK) / (NEXTCYCLETICK - LASTCYCLETICK);
}



