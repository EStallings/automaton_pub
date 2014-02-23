

getMousePos = function(evt){
    if(evt.toElement === null) return null;
    var rect = evt.toElement.getBoundingClientRect();

    return{
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
     };
}

LMB_DOWN = false;
RMB_DOWN = false;
CLICK_POINT = {x:NaN, y:NaN};
MOVE_POINT = {x:NaN, y:NaN};

function _InputHandler(canvas){

  this.canvas = canvas;

  this.mouseClick     = function(e){ /* write me! */ 
    var mpos = getMousePos(e);

    //Doing it this way because some people have mice with like 30 buttons
    var lmb = false;
    var rmb = false;

    if ( !e.which && e.button !== undefined ) {
      e.which = ( e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) ) );
    }
    
    if(e.which === 1)
      rmb = true;
    else if (e.which === 3)
      lmb = true;

    if(!GuiView.doClicking(mpos.x, mpos.y, lmb, rmb, e)) //GUI gets priority
    {
      GameView.doClicking(mpos.x, mpos.y, lmb, rmb, e);

    }
  }

  this.keyDown        = function(evt){ /* write me! */ 
    //console.log(evt.which);

    ///Horribly hardcoded for testing
    var amt = 5;
    switch(evt.which){
      case 37:
        //left arrow
        GameView.translate(-amt,0);
      break;
      case 38:
        //up
        GameView.translate(0, -amt);
      break;
      case 39:
        //right
        GameView.translate(amt, 0);
      break;
      case 40:
        //down
        GameView.translate(0, amt);
      break;
      default:

      break;
    }

  }

  this.mouseDown      = function(e){ /* write me! */ 

    //Doing it this way because some people have mice with like 30 buttons
    if ( !e.which && e.button !== undefined ) {
      e.which = ( e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) ) );
    }
    
    LMB_DOWN = (e.which === 1) ? true : LMB_DOWN;
    RMB_DOWN = (e.which === 3) ? true : RMB_DOWN;
    CLICK_POINT = getMousePos(e);

  }
  this.mouseUp        = function(e){ /* write me! */ 
    //Doing it this way because some people have mice with like 30 buttons
    var lmb = false;
    var rmb = false;

    if ( !e.which && e.button !== undefined ) {
      e.which = ( e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) ) );
    }
    
    LMB_DOWN = (e.which === 1) ? false : LMB_DOWN;
    RMB_DOWN = (e.which === 3) ? false : RMB_DOWN;
    CLICK_POINT = {x:NaN, y:NaN};
  }
  this.mouseMove      = function(evt){ /* write me! */ 
    var mpos = getMousePos(evt);
    MOVE_POINT = mpos;
    
  }

  ///Change these!
  
  


  this.mouseDblClick  = function(evt){ /* write me! */ }
  this.mouseOver      = function(evt){ /* write me! */ }
  this.mouseOut       = function(evt){ /* write me! */ } 
  this.keyPress       = function(evt){ /* write me! */ }
  this.keyUp          = function(evt){ /* write me! */ }
  this.onResize       = function(evt){ /* write me! */ }
  this.onBlur         = function(evt){ /* write me! */ }
  this.onFocus        = function(evt){ /* write me! */ }

 
  
  //Not this \/



  var that = this;
  this.canvas.addEventListener('mousemove', that.mouseMove      ,false);
  this.canvas.addEventListener('mouseover', that.mouseOver      ,false);
  this.canvas.addEventListener('mousedown', that.mouseDown      ,false);
  this.canvas.addEventListener('mouseup'  , that.mouseUp        ,false);
  this.canvas.addEventListener('click'    , that.mouseClick     ,false);
  this.canvas.addEventListener('dblclick' , that.mouseDblClick  ,false);
  this.canvas.addEventListener('mouseout' , that.mouseOut       ,false);
  document.addEventListener('keydown'  , that.keyDown        ,false);
  document.addEventListener('keyup'    , that.keyUp          ,false);
  document.addEventListener('keypress' , that.keyPress       ,false);
  this.canvas.addEventListener('resize'   , that.onResize       ,false);
  this.canvas.addEventListener('blur'     , that.onBlur         ,false);
  this.canvas.addEventListener('focus'    , that.onFocus        ,false);


  //God DAMN the right mouse button.
  this.canvas.addEventListener('contextmenu', that.mouseClick   ,false);
  this.canvas.oncontextmenu = function(){return false;}
 
}
