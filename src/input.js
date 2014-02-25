

getMousePos = function(evt){
    if(evt.toElement === null) return null;
    var rect = evt.toElement.getBoundingClientRect();

    return{
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
     };
}


function _InputHandler(canvas){

  this.canvas = canvas;
  this.context = GameView.canvas.getContext('2d');
  trackTransforms(this.context);
  this.lastX=canvas.width/2;
  this.lastY=canvas.height/2;
  this.dragStart = null,
  this.dragged = false;

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

  this.mouseDown      = function(evt){ /* write me! */ 

    document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
      InputHandler.lastX = evt.offsetX || (evt.pageX - InputHandler.canvas.offsetLeft);
      InputHandler.lastY = evt.offsetY || (evt.pageY - InputHandler.canvas.offsetTop);
      InputHandler.dragStart = InputHandler.context.transformedPoint(InputHandler.lastX, InputHandler.lastY);
      InputHandler.dragged = false;

  }

  this.mouseUp        = function(evt){ /* write me! */ 
     InputHandler.dragStart = null;
      if (!InputHandler.dragged) GameView.zoom(evt.shiftKey ? -1 : 1 );
  }

  this.mouseMove      = function(evt){ /* write me! */ 
     var imageSpace = InputHandler.context.transformedPoint(
        evt.pageX-InputHandler.canvas.offsetLeft,
        evt.pageY-InputHandler.canvas.offsetTop
      );

      InputHandler.lastX = evt.offsetX || (evt.pageX - InputHandler.canvas.offsetLeft);
      InputHandler.lastY = evt.offsetY || (evt.pageY - InputHandler.canvas.offsetTop);
      InputHandler.dragged = true;
      if (InputHandler.dragStart){
        var pt = InputHandler.context.transformedPoint(InputHandler.lastX,InputHandler.lastY);
        var x = pt.x-InputHandler.dragStart.x;
        var y = pt.y-InputHandler.dragStart.y;
        InputHandler.context.translate(x, y);
        GameView.offsetX -= x;
        GameView.offsetY -= y;
      }
  }

  this.handleScroll   = function(evt){
      var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
      if (delta) GameView.zoom(delta);
      return evt.preventDefault() && false;
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
  this.keyDown        = function(evt){ /* write me! */ }
 
  
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

  this.canvas.addEventListener('mousewheel', that.handleScroll, false);
  this.canvas.addEventListener('DOMMouseScroll', that.handleScroll, false);


  //God DAMN the right mouse button.
  this.canvas.addEventListener('contextmenu', that.mouseClick   ,false);
  this.canvas.oncontextmenu = function(){return false;}
 
}
