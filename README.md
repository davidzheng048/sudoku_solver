# sudoku_solver
A practice html/css/javaScript project, it is a web app that can solve sudoku puzzle.

Few things to be imporved:

* If the puzzle is too difficult and user clicks "display process", the browser might crash because there are too much things in the queue. I need to find a way to avoid this.
* Currently the "create puzzle" button only generates a hardcoded puzzle in js file. I need to write a puzzle generator function to do that.
* The type of input tag in puzzle board are "tel". When user fill in the puzzle board, it suppose to pop up a numeric keyboard instead of a normal one. So I need to either 
fix this, or put 9 boxes with 9 integers that user can drag them into the puzzle board, like most of the other sudoku solver webpage.