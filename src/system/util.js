function addr(i,dimension){
	if(dimension===0)return i;
	while(i<0)i+=dimension;
	return i%dimension;
}

var print = console.log
