//For list of all HTML DOM events, see http://www.w3schools.com/jsref/dom_obj_event.asp

//On load function is executed automatically when the window is loaded
window.onload = function(){

  //Declare global variables
  Canvas = document.getElementById('automatonCanvas');
  
  //Register new event handlers
  Canvas.onmouseover = mouseOver;
  Canvas.onmousemove = mouseMove;
  Canvas.onmousedown = mouseDown;
  Canvas.onmouseup = mouseUp;
  Canvas.onclick = mouseClick;
  Canvas.ondblclick = mouseDblClick;
  Canvas.onmouseout = mouseOut;
  Canvas.onkeydown = keyDown;
  Canvas.onkeyup = keyUp;
  Canvas.onkeypress = keyPress;  
  Canvas.onresize = onResize;
  Canvas.onblur = onBlur;
  Canvas.onfocus = onFocus;
  
 
  Game.run();
}


