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


function attempt(board, queue, solveType) {
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
            if (solveType === "instant") {
                document.querySelectorAll('input')[row*9 + col].value = i.toString();
            } else {
                queue.push([row*9 + col, i.toString()]);
            } 
            
            if (attempt(board, queue, solveType) === true) {
                return true;
            } else {
                board[row][col] = "";
                if (solveType === "instant") {
                    document.querySelectorAll('input')[row*9 + col].value = "";
                } else {
                    queue.push([row*9 + col, ""]);
                }
            }
        }
    }
    return false;
}
// back tracking algorithm ends here
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


function displayBackTracking(queue, speed) {
    var inputList = document.querySelectorAll('input');
    
    var move = setInterval(function(){
        if (queue.length === 0) {
            clearInterval(move)
        } else {
            nextMove = queue.shift();
            inputList[nextMove[0]].value = nextMove[1];
        }
    }, speed);
}
 
function solvePuzzle(solveType) {
    var array = document.querySelectorAll('td input');
    var puzzle = arrayToPuzzle(array);
    var queue = [];
    attempt(puzzle, queue, solveType);

    var speedTable = {
        "difficultPuzzle": 1,
        "normalPuzzle": 10,
        "simplePuzzle": 110
    };

    var speed = speedTable[document.querySelector("#selectDisplaySpeed").value];

    if (solveType === "withProgress") {
        displayBackTracking(queue, speed);
    }
}


document.querySelector('#solve').addEventListener("click", function(){
    solvePuzzle("instant")
});

document.querySelector('#showBackTracking').addEventListener("click", function(){
    solvePuzzle("withProgress")
});
