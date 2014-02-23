
//NOT intended for the game layer!
//Leading underscore to emphasize there should only be one at a time
//(I'm reconsidering this; it might be nice to have multiple GuiViews for different
	//menus and such)

	
_GuiView = function(){

	this.mouseX = 0;
	this.mouseY = 0;

	this.baseGridSize = 50;

	//have to draw these objects. They must have a draw function.
	this.drawObjects = [];
	this.lmbColliders = [];
	this.rmbColliders = [];

	this.canvas = document.getElementById('guiCanvas');
  	this.context = this.canvas.getContext('2d');


  	this.addCollider = function(obj, rmb){
  		if(!rmb)
  			this.lmbColliders.push(obj);
  		else
  			this.rmbColliders.push(obj);
  	}

  	this.addObject = function(obj, layer){
  		if(this.drawObjects.length < layer)
  		{
  			for(var i = this.drawObjects.length; i <= layer; i++){
  				this.drawObjects[i] = [];
  			}
  		}

  		this.drawObjects[layer].push(obj);
  	}

	this.draw = function(){
		//Clear artifacts
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);

		for(var layer = 0; layer < this.drawObjects.length; layer++){
			for(var i = 0; i < this.drawObjects[layer].length; i++){
				this.drawObjects[layer][i].drawGui(this.context, this.baseGridSize);
			}
		}
	}


	this.resize = function(width, height){
		canvas.width = width;
		canvas.height = height;
	}

	this.doClicking = function(x, y, lmb, rmb, evt){
		var flag = false;

		if(lmb){
			for(var i = 0; i < this.lmbColliders.length; i++){
				if(this.lmbColliders[i].checkCollide(x, y, evt))
					flag = true;
			} 
		}
		else if (rmb){
			for(var i = 0; i < this.rmbColliders.length; i++){
				if(this.rmbColliders[i].checkCollide(x, y, evt))
					flag = true;
			} 
		}
		return flag;
	}


}

