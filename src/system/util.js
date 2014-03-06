function fmod(a,b){
	var c=a%b;
	if(c<0)return c+b;
	return c;
}

function addr(i,dimension){
	if(dimension===0)return i;
	return fmod(i,dimension);
}

var print = console.log
