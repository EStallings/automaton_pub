To use the input handler, please use the following conventions:

---------------

To register for a mouse event, use the following syntax:

Application.InputHandler.registerMouse(type, callback, layer);

---

"type" is one of these events inside of (Application.InputHandler.mouseTypes):

---
MOVE
LEFT_CLICK
RIGHT_CLICK
MIDDLE_CLICK
LEFT_DRAG
RIGHT_DRAG
MIDDLE_DRAG
SCROLL
---

"callback" is a callback function of your choice that will be called when the event occurs. Note that the drag event happens as the user moves their mouse, NOT repeatedly after dragging initially.

Make SURE to NOT include the () on the callback, or the function will be evaluated and the parameter passed to the registerMouse function will be the return value.

In other words, use "myFunction", NOT "myFunction()"

---

"layer" is the logical layer being used. Use the string literal "GUI" or "GAME" as the value for layer.

----------------

EXAMPLE:

Application.InputHandler.registerMouse(Application.InputHandler.mouseTypes.MOVE, myFunction, 'GUI');

----------------

To register for a keyboard event is simpler. Call the following:

Application.InputHandler.registerKey(key, callback, repeat);

---

key is a string literal representing the key. For example, "ctrl", "alt", "K", "1", etc. Make sure for letter keys you use upper case.

---

callback is as above for the registerMouse function.

---

repeat is a boolean determining whether or not to repeatedly call the callback function if the key is held down.

----------------

EXAMPLE:

Application.InputHandler.registerKey("E, myFunction, false);
