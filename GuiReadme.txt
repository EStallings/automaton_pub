Note that the present state of the GUI is hardly complete - it is intended to serve as a prototype to build a better one and for testing.

For an example use case, see in main.js, at the bottom there is a makeDemoGui function.

-----------------------------
To create a new frame (menu, context) inside of gui:

App.Gui.addNewFrame('name');


To add a component to the frame:

App.Gui.addNewComponent('name', component);
(where 'name' is the id of the frame)

make sure you create the components before adding them to the frame.


To change the current frame:

App.Gui.setCurrentFrame('name');
------------------------------

Currently (March 7th) there are the following components supported:

Static Components: Will never redraw unless specifically forced to:

-- App.GuiTextBox
	* Draws text on top of a rectangle
	* Quick way to relay instructions
	* Can be used to show data, IF
		* You tell Gui to draw static stuff

-- App.GuiPanel
	* Draws a semi-transparent box
	* Used to visually partition components
	* Used to organize components according to relative coordinates instead of screen space

Dynamic Components: Will redraw IF they are the active component (the user is clicking them or otherwise interacting with them):

-- App.GuiTextButton
	* Draws text on a rectangle
	* Calls a callback upon click, IF
		* The x,y coordinates are inside both on click AND release
	* Calls a callback continuously, IF
		* the continuous flag is set to true.
	* Visually shows whether or not it's being clicked

-- App.GuiDragButton
	* TODO draw vector icon
	* Can be dragged around the screen
	* Will call a instruction placement function upon being "dropped"
		* To be used for dragging instructions into the game, and nothing else.
		* So, we might as well hard code this guy!

-- App.GuiEditableTextBox
	* Allows user to enter their own text
	* Hijacks all input, preventing any clicks or key presses until the user presses escape or enter.
		* This might not be totally necessary, but we can fix it further down the road.
	* Has a blinking cursor, backspace, arrow key cursor navigation.
	* Only supports spacebar as a special character. Won't recognize shift+num keys.
	* Won't allow typing beyond end of box


In general, proper use for the above would be:

GuiTextButton:
	To register a callback with a click.

GuiDragButton:
	To handle drag 'n' drop for instructions. Hard code this, for now at least.

GuiEditableTextBox:
	To get user text. Use the .text field to grab the current text.


For all component types, except for panels, you can add the component to a panel by passing a reference to a panel on construction. This will set position to relative instead of absolute, which means changing the position of the panel (statically ONLY, for now) will move all components.

The panel argument is always the last one, and is not required.

Major TODOs:

Update position if positioned relative to a panel, and panel is moved
	Not sure if this is necessary; do we need to move the gui inside the game? ever?

Flesh out App.GuiVectorButton
	Needs to draw a vector. Otherwise identical to text button. Could abstract this similarity out.

Draw the DragButton with vector graphics too
	Currently just a box

Improve the EditableTextBox
	Needs to be able to handle special characters for entering code (for user level creation)

	Needs to be able to handle multi-line text

	Ideally would have clickable text for cursor support as well as arrow keys

	Needs support for Ctrl+V, Ctrl+C, etc
		* This might be super easy or super hard

	Maybe clean it up; it's kind of big. Might not be easy to clean up, however.