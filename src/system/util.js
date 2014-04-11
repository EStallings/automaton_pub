// should fmod and addr be in App...?

function fmod(a,b){ // you should only be using this for integer values
	var c=a%b;
	if(c<0)return c+b;
	return c;
}

function addr(i,dimension){
	if(dimension===0)return i;
	return fmod(i,dimension);
}

function expInterp(val,goal,speed,threshold){
	var factor = App.Engine.elapsed*speed;
	if(factor>1)factor=1;
	var retVal = (goal-val)*factor;
	if(Math.abs(val+retVal-goal)<threshold)retVal=goal-val;
	return retVal;
}
