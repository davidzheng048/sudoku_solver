// sudoku solver functions
function findEmpty(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] === "") {
                return [i, j];
            }
        }
    }

    return null
}


function valid(board, num, position) {
    // row
    for (var i = 0; i < 9; i++) {
        if (board[position[0]][i] === num && i !== position[1]) {
            return false;
        }
    }
    // col
    for (var i = 0; i < 9; i++) {
        if (board[i][position[1]] === num && i !== position[0]) {
            return false;
        }
    }
    // 3 by 3 box
    var box_x = Math.floor(position[1] / 3);
    var box_y = Math.floor(position[0] / 3);
    
    for (var i = box_y*3; i < box_y*3 + 3; i++) {
        for (var j = box_x*3; j < box_x*3 + 3; j++) {
            if (board[i][j] === num && position !== [i, j]) {
                return false;
            } 
        }
    }

    return true;
}

function solve(board) {
    var find = findEmpty(board);
    if (find === null) {
        return true;
    } else {
        var row = find[0];
        var col = find[1];
    }
    
    for (var i = 1; i < 10; i++) {
        if (valid(board, i.toString(), [row, col]) === true) {
            board[row][col] = i.toString();
            document.querySelectorAll('input')[row*9 + col].value = i.toString();

            if (solve(board) === true) {
                return true;
            } else {
                board[row][col] = "";
                document.querySelectorAll('input')[row*9 + col].value = "";
            }
        }
    }

    return false;
}


// ----------------------------------------------
function arrayToPuzzle(array) {
    var puzzle = [];
    for (var i = 0; i < 9; i++) {
        var row =[];
        
        for (var j = 0; j < 9; j++) {
            row.push(array[i*9 + j].value);
        } 
        puzzle.push(row);
    }
    return puzzle;
}


function get_dummy() {
    var dummy = [
        "5","3", "", "","7", "", "", "", "",
        "6", "", "","1","9","5", "", "", "",
         "","9","8", "", "", "", "","6", "",
        "8", "", "", "","6", "", "", "","3",
        "4", "", "","8", "","3", "", "","1",
        "7", "", "", "","2", "", "", "","6",
         "","6", "", "", "", "","2","8", "",
         "", "", "","4","1","9", "", "","5",
         "", "", "", "","8", "", "","7","9"];
    
    var inputs = document.querySelectorAll('input');
    
    for (i = 0; i < 81; i++) {
        inputs[i].value = dummy[i];
    }
}

  
function sudoku() {
    var array = document.querySelectorAll('td input');
    var puzzle = arrayToPuzzle(array);
    var result = solve(puzzle);
    if (result === true) {
        alert("Puzzle solved!");
    } else {
        alert("Puzzle cannot be solved");
    }
}


function clearBoard() {
    var inputs = document.querySelectorAll('input');
    for (i = 0; i < 81; i++) {
        inputs[i].value = "";
    }
}


$('#default').on('click', get_dummy);
$('#solve').on('click', sudoku);
$('#clear').on('click', clearBoard);


// limit the input to the game board
for (input of document.querySelectorAll('tr input')){
    input.addEventListener('input', function(){
        var key = this.value;
        var regex = /[1-9]/;
        if (!regex.test(key)){
            this.value = "";
        }

    })
}