//For list of all HTML DOM events, see http://www.w3schools.com/jsref/dom_obj_event.asp

//On load function is executed automatically when the window is loaded
window.onload = function(){


  

  GameView = new _GameView();
  GuiView = new _GuiView();
  InputHandler = new _InputHandler(GuiView.canvas);
  Engine = new _Engine();


  Engine.run({render:Render, update:Update,canvas:GameView.canvas});

}


function Render(){
  GameView.draw();
  GuiView.draw();
}

function Update(){

}



