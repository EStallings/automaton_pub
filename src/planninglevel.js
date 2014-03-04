Application.PlanningLevel = function(){
	this.width;
	this.height;
	this.numColors = 4;
	this.grid = []; // grid[x][y][color] = instruction
	this.undoStack = [];
	this.redoStack = [];
	this.deletions = []; // stack that holds deleted instructions for undo/redo

	this.getCell = function(x,y){ return this.grid[x][y]; };

	// clears an entire cell
	this.removeCell = function(x,y){
		for(var c = 0; c < this.numColors; c++){
			if(this.grid[x][y][c]){ this.grid[x][y][c] = null; };
		}
	};
	
	this.forEachCell = function(f){
		for(var y = 0; y < this.height; y++){
			for(var x = 0; x < this.width; x++){
				for(var c = 0; c < this.numColors; c++){
					if(this.grid[x][y][c]){ f(this.grid[x][y][c]); };
				}
			}
		}
	};

	// moves an instruction from one cell to another, does the reverse if r is set to 1
	this.moveOp = function(x,y,c,nx,ny,r){

		this.x = x; this.y = y; this.c = c;
		this.nx = nx; this.ny = ny; this.r = r;

		this.apply = function(){
			if(this.r !== 1){
				this.grid[nx][ny][c] = this.grid[x][y][c];
				this.grid[x][y][c] = null;
			}
			else{
				this.moveOp(nx,ny,c,x,y,0);
			}
		}
	};

	//this.modifyOp = function(x,y,){}; // TODO
	
	// inserts an instruction, does the reverse if r is set to 1
	// TODO update stacks when apply is called
	this.insertOp = function(ins,r){
		
		this.x = ins.x; this.y = ins.y;
		this.ins = ins; this.r = r;

		this.apply = function(){ // TODO the 'this' points to the operation, not the planning level
			if(r !== 1){
				this.grid[x][y][c] = ins; // TODO make this safe
			}
			else{
				this.grid[x][y][c] = null;
			}
		}
	};
	
	// deletes an instruction, does the reverse if r is set to 1
	this.deleteOp = function(x,y,c,r){
		
		this.x = x; this.y = y;
		this.c = c; this.r = r;

		this.apply = function(){
			if(r !== 1){
				this.deletions.push(this.grid[x][y][c]);
				this.grid[x][y][c] = null;
			}
			else{
				this.grid[x][y][c] = this.deletions.pop();
			}
		}
	};

	// TODO
	this.undo = function(){

	};

	// TODO
	this.redo = function(){

	};

	// TODO
	this.generateParseString = function(){};
	
	// TODO
	this.generateSimulationLevel = function(){};
}