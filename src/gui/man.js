
/*
AUTOMATON MANUAL

Automaton
An Automaton is an autonomous agent instantiated by the Spawn Instruction.
Each automaton may have one to four Colors.  Each Automaton moves
independently on the Grid.  The direction of the movement is determined
by the Up, Down, Left, Right Instructions.  The velocity of all
Automatons on the Grid can be incremented or decremented.

Token
A Token is a datum holding a numerical variable that can be manipulated
by Instructions.  A Token can be grabbed, dropped, and held by an
Automaton.  Tokens are accepted by Streams.  To solve a puzzle, you
must equate the Token variable with the value the Stream accepts.

Grid
The Grid is the 2-dimensional world in which Instructions may operate on 
Automatons.  The Grid represents the set of all possible Cells.  The size
of the Grid is defined by a width and length of Cells but the width and 
length can be infinite.

Cell
Cells are discrete locations on the 2-dimensional Grid.  Each Cell may contain
Automatons, Instructions, Tokens, or Input/Output Streams.  Instructions
can placed on a Cell by using the mouse to drag and drop an Instruction from
the Instruction Menu Bar located at the bottom of the display window.

Color
Colors are relationships between Automatons and Instructions.  
An Instruction will be applied to an Automaton if and only if the Instruction 
and the Automaton share the same color. There can be 0 to 4 colored Instructions 
on any Cell in the Grid.  Each Automaton is represented by a quarter arc and indicate 
if an Instruction of that Color can apply to that Automaton.  Each Instruction 
has a Color indicating which Automatons it will apply to.

Red is represented by the color value: 0xFF0000
Blue is represented by the color value: 0x00FF00
Green is represented by the color value: 0x0000FF
Yellow is represented by the color value: 0xFFFF00

Menu Bar
The Menu Bar displays the Instructions a user can place in a Cell on the Grid.
The Color of all Instructions can be changed by the user.  The Menu Bar also
allows the user to change the speed of the Automatons.

Stream
There are two types of Streams: Input Streams and Output Streams.  Input 
Streams and Output Streams accept Tokens.

Instruction
Instructions are functions which are applied to Automatons.  Each Instruction
has a Color component.  Instructions are only applied to Automatons who share 
the same Color as the Instruction.
	- Move Up: Moves an Automaton North on the Grid
	- Move Down: Moves an Automaton South on the Grid
	- Move Left: Moves an Automaton West on the Grid
	- Move Right: Moves an Automaton East on the Grid
	- Fork: 
	- Toggle: 
	- Drop: 
	- Grab: 
	- Grab & Drop: 
*/

// automaton text
info[0] = function(gfx) {
	var str = "An Automaton is an autonomous agent which moves independently on the Grid.
		Each automaton may have one to four Colors.  The behavior of each Automaton
		is determined Instructions that have the same Color.  The speed of all
		Automatons on the Grid can be incremented or decremented."
	// background
	gfx.fillStyle('#000000');
	gfx.drawRect();
	// foreground	
	
	// text();
}
// token text
info[1] = function(gfx) {
	var str = "A Token is a datum holding a numerical variable that can be manipulated
		by Instructions.  A Token can be grabbed, dropped, and held by an
		Automaton.  Tokens are accepted by Streams.  To solve a puzzle, you
		must equate the Token variable with the value the Stream accepts."
	// text();
}
// grid text
info[2] = function(gfx) {
	var str = "The Grid is the 2-dimensional world in which Instructions may operate on 
		Automatons.  The Grid represents the set of all possible Cells.  The size
		of the Grid is defined by a width and length of Cells but the width and 
		length can be infinite."
	// text();
}
// cell text
info[3] = function(gfx) {
	var str = "Cells are discrete locations on the 2-dimensional Grid.  Each Cell may contain
		Automatons, Instructions, Tokens, or Input/Output Streams.  Instructions
		can placed on a Cell by using the mouse to drag and drop an Instruction from
		the Instruction Menu Bar located at the bottom of the display window."
	// text();
}
// colors
info[4] = function(gfx) {
	var str = "Colors are relationships between Automatons and Instructions.  
		An Instruction will be applied to an Automaton if and only if the Instruction 
		and the Automaton share the same color. There can be 0 to 4 colored Instructions 
		on any Cell in the Grid.  Each Automaton is represented by a quarter arc and indicate 
		if an Instruction of that Color can apply to that Automaton.  Each Instruction 
		has a Color indicating which Automatons it will apply to."
	// text();
}
// instructions

// move up
instr[0] = function(gfx) {
		
}
// move down
instr[1] = function(gfx) {
	
}
// move right
instr[2] = function(gfx) {
	
}
// move left
instr[3] = function(gfx) {

}
instr[4] = function(gfx) {

}
instr[5] = function(gfx) {

}
instr[6] = function(gfx) {

}
instr[7] = function(gfx) {

}
instr[8] = function(gfx) {

}
