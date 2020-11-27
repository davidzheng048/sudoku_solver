# sudoku_solver
A practice html/css/javaScript project, it is a web app that can solve sudoku puzzle.

Currently the web App work, but there are a lot of things to be imporved:

* The looking of the web page is too simple. Same with the game board
* The js code is not directly solving the puzzle on table, but generate a 9 by 9 2D array and put all data into that array, then solve the puzzle on array and change the value of the table during execution. 
This is not the best way to do a sudoku_solver, which should be improved later.
* There is a button to create a default puzzle, which is hard coded inside js file. I want to make an algorithm to generate different puzzle.