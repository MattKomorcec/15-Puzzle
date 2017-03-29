window.onload = function () {

    // Global variables needed for the game
    var board = [], boardSize = 4, num, puzzleHolder, emptyLoc = [];

    // Get the puzzleHolder div
    puzzleHolder = document.querySelector(".puzzle-holder");

    // Initalize the board for playing
    var init = function () {
        // Max number for the board. - 1 because one tile should be 0 - empty tile
        num = (boardSize * boardSize) - 1;
        
        for (var i = 0; i < boardSize; i++) {
            // Push the array for the first row
            board[i] = [];
            // Loop through the row and push the numbers. Also decrease the number after each push
            for (var j = 0; j < boardSize; j++) {
                board[i].push(num);
                num--;
            }
        }
    }

    // Draw the board to the DOM
    var draw = function () {
        var isEmpty = false;

        // Reset the puzzle holder before rendering
        puzzleHolder.innerHTML = "";

        for (var i = 0; i < boardSize; i++) {
            for (var j = 0; j < boardSize; j++) {
                // Call the helper function to create each puzzle piece, and append it to the holder div
                if (board[i][j] === 0) {
                    isEmpty = true;
                }
                else {
                    isEmpty = false;
                }
                puzzleHolder.append(createPuzzlePiece(board[i][j], isEmpty));
            }
        }
    }

    // Helper function to create each puzzle piece
    var createPuzzlePiece = function (tile, isEmpty) {
        // Puzzle piece to be pushed to the puzzle holder
        var puzzlePiece = document.createElement("div");

        // Add a class to it, and add the value
        puzzlePiece.className = "one-piece puzzle-" + tile;
        puzzlePiece.innerHTML = tile;
        if (isEmpty) {
            puzzlePiece.className += " empty-tile";
            puzzlePiece.innerHTML = "&nbsp";
        }

        puzzlePiece.onclick = move.bind(this, tile);

        return puzzlePiece;
    }

    // Accept a tile, and move it if the move is legal
    var move = function (tile) {
        // Loop through the board and store the empty tile location once found
        for (var k = 0; k < boardSize; k++) {
            for (var l = 0; l < boardSize; l++) {
                if (board[k][l] == 0) {
                    emptyLoc[0] = l;
                    emptyLoc[1] = k;
                }
            }
        }

        // Temp value to store the tile when swapping with empty tile
        var tempVal;

        for (var i = 0; i < boardSize; i++) {
            for (var j = 0; j < boardSize; j++) {
                // If it's the tile that the user selected
                if (board[i][j] === tile) {
                    // Find out if the move is legal and swap the tiles. Also update the location of the empty tile after swapping!
                    if (((emptyLoc[0] + 0 === j) && (emptyLoc[1] + 1 === i)) || ((emptyLoc[0] + 0 === j) && (emptyLoc[1] - 1 === i))
                        || ((emptyLoc[0] - 1 === j) && (emptyLoc[1] + 0 === i)) || ((emptyLoc[0] + 1 === j) && (emptyLoc[1] + 0 === i))) {
                        tempVal = board[i][j];
                        board[i][j] = 0;
                        board[emptyLoc[1]][emptyLoc[0]] = tempVal;
                        emptyLoc[0] = j;
                        emptyLoc[1] = i;
                        document.querySelector(".puzzle-" + tile).className += " animate";
                        window.setTimeout(function() {
                            draw();
                        }, 300);
                        return true;
                    }
                }
            }
        }
    }

    // Check if the game is won
    var won = function () {
        var isWon = false;

        for (var k = 0; k < boardSize; k++) {
            for (var l = 0; l < boardSize; l++) {
                if (l < boardSize - 1) {
                    if (l + 1 === boardSize - 1 && k === boardSize - 1) {
                        if (board[k][l + 1] === 0) {
                            isWon = true;
                        }
                        else {
                            isWon = false;
                        }
                    }
                    else {
                        if (((board[k][l] + 1) == board[k][l + 1])) {
                            isWon = true;
                        }
                        else {
                            isWon = false;
                            break;
                        }
                    }
                }
            }
        }

        return isWon;
    }

    // Win the game btn
    var winBtn = document.getElementById("winTheGame");
    var resetBtn = document.getElementById("resetTheGame");

    winBtn.onclick = function () {

        board = [];

        num = 1;

        for (var i = 0; i < boardSize; i++) {
            // Push the array for the first row
            board[i] = [];
            // Loop through the row and push the numbers. Also decrease the number after each push
            for (var j = 0; j < boardSize; j++) {
                if(num === 16) {
                    board[i].push(0);
                }
                else {
                    board[i].push(num);
                    num++;
                }
            }
        }

        draw();
    }

    resetBtn.onclick = function () {

        init();
        draw();
    }

    init();
    draw();

}
