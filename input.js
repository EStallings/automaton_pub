getMousePos = function(evt){
  var rect = Canvas.getBoundingClientRect();
  return{
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
   };
}


/*
  EVENT HANDLERS :: MOUSE
*/

//Stub
mouseMove = function(evt){
  var mousePos = getMousePos(evt);
}

//Stub
mouseClick = function(evt){
  var mousePos = getMousePos(evt);
}

//Stub
mouseDblClick = function(evt){
  var mousePos = getMousePos(evt);
}

//Stub
mouseDown = function(evt){
  var mousePos = getMousePos(evt);
}

//Stub
mouseUp = function(evt){
  var mousePos = getMousePos(evt);
}

//Stub
mouseOver = function(evt){
  var mousePos = getMousePos(evt);
}

//Stub
mouseOut = function(evt){
  var mousePos = getMousePos(evt);
}


/*
  EVENT HANDLERS :: KEYBOARD
*/

//Stub
keyDown = function(evt){

}

//Stub
keyPress = function(evt){

}

//Stub
keyUp = function(evt){

}


/*
  EVENT HANDLERS :: MISC/WINDOW
*/

onResize = function(evt){

}

onBlur = function(evt){

}

onFocus = function(evt){

}
