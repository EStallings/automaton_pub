Do not use the input class directly, or modify it unless necessary.

Instead use either gameinput or guiinput.

Make direct modifications for adjustments to mouse logic, as it is complex and interacts with other logic.

For keys, register a key callback with the following syntax:

gameInput.registerKey(key, callback);

where 'key' is a string literal (ie, 'K' or 'Esc'). Note that it must start with a capital letter (or be a capital letter if it is a single character). For the full list of valid keys, look inside input.js; at the very bottom, there are a pair of large arrays mapping keys to numbers and vice versa. Unfortunately, this is the only real way to do this in Javascript. :(

where 'callback' is a function to call back. Make sure you don't use the 'this' keyword inside of a callback. Instead, declare 'var that = this' outside of your function, and use 'that' instead. This is also standard, despite how terrible it is.;