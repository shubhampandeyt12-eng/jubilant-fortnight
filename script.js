// =========================================
// SHUBHAM PANDEY XO
// IMPOSSIBLE AI TIC TAC TOE
// =========================================


// ---------- SCREENS ----------

const nameScreen =
    document.getElementById("nameScreen");

const modeScreen =
    document.getElementById("modeScreen");

const gameScreen =
    document.getElementById("gameScreen");


// ---------- NAME ----------

const playerNameInput =
    document.getElementById(
        "playerNameInput"
    );

const nameBtn =
    document.getElementById(
        "nameBtn"
    );

const nameMessage =
    document.getElementById(
        "nameMessage"
    );

const welcomeText =
    document.getElementById(
        "welcomeText"
    );


// ---------- MODE BUTTONS ----------

const computerModeBtn =
    document.getElementById(
        "computerModeBtn"
    );

const twoPlayerModeBtn =
    document.getElementById(
        "twoPlayerModeBtn"
    );


// ---------- GAME ELEMENTS ----------

const cells =
    document.querySelectorAll(
        ".cell"
    );

const gameStatus =
    document.getElementById(
        "gameStatus"
    );

const playerOneLabel =
    document.getElementById(
        "playerOneLabel"
    );

const playerTwoLabel =
    document.getElementById(
        "playerTwoLabel"
    );

const playerOneScore =
    document.getElementById(
        "playerOneScore"
    );

const playerTwoScore =
    document.getElementById(
        "playerTwoScore"
    );

const resultBox =
    document.getElementById(
        "resultBox"
    );

const resultTitle =
    document.getElementById(
        "resultTitle"
    );

const resultMessage =
    document.getElementById(
        "resultMessage"
    );

const newGameBtn =
    document.getElementById(
        "newGameBtn"
    );


// =========================================
// GAME VARIABLES
// =========================================

let playerName = "";

let gameMode = "";

let currentPlayer = "X";

let gameOver = false;

let playerScore = 0;

let opponentScore = 0;

let board = [

    "",

    "",

    "",

    "",

    "",

    "",

    "",

    "",

    ""

];


// =========================================
// WINNING COMBINATIONS
// =========================================

const winningCombinations = [

    [0, 1, 2],

    [3, 4, 5],

    [6, 7, 8],

    [0, 3, 6],

    [1, 4, 7],

    [2, 5, 8],

    [0, 4, 8],

    [2, 4, 6]

];


// =========================================
// SCREEN FUNCTION
// =========================================

function showScreen(

    screen

){

    document

        .querySelectorAll(

            ".screen"

        )

        .forEach(

            screenItem => {

                screenItem.classList.remove(

                    "active"

                );

            }

        );


    screen.classList.add(

        "active"

    );

}


// =========================================
// NAME SUBMIT
// =========================================

nameBtn.addEventListener(

    "click",

    function(){

        const enteredName =

            playerNameInput.value.trim();


        if(

            enteredName === ""

        ){

            nameMessage.textContent =

                "Please enter your name 😊";


            return;

        }


        playerName =

            enteredName;


        welcomeText.textContent =

            `Welcome, ${playerName}! Choose your mode 🎮`;


        showScreen(

            modeScreen

        );

    }

);


// =========================================
// ENTER KEY
// =========================================

playerNameInput.addEventListener(

    "keydown",

    function(

        event

    ){

        if(

            event.key ===

            "Enter"

        ){

            nameBtn.click();

        }

    }

);


// =========================================
// COMPUTER MODE
// =========================================

computerModeBtn.addEventListener(

    "click",

    function(){

        gameMode =

            "computer";


        playerOneLabel.textContent =

            `${playerName} ❌`;


        playerTwoLabel.textContent =

            "Computer ⭕";


        startGame();

    }

);


// =========================================
// TWO PLAYER MODE
// =========================================

twoPlayerModeBtn.addEventListener(

    "click",

    function(){

        gameMode =

            "twoPlayer";


        playerOneLabel.textContent =

            `${playerName} ❌`;


        playerTwoLabel.textContent =

            "Player 2 ⭕";


        startGame();

    }

);


// =========================================
// START GAME
// =========================================

function startGame(){

    showScreen(

        gameScreen

    );


    resetBoard();


    gameStatus.textContent =

        `${playerName}'s Turn ❌`;

}


// =========================================
// CELL CLICK
// =========================================

cells.forEach(

    function(

        cell

    ){

        cell.addEventListener(

            "click",

            function(){

                const index =

                    Number(

                        this.dataset.index

                    );


                if(

                    board[index] !== ""

                    ||

                    gameOver

                ){

                    return;

                }


                if(

                    gameMode ===

                    "computer"

                    &&

                    currentPlayer !==

                    "X"

                ){

                    return;

                }


                makeMove(

                    index,

                    currentPlayer

                );


                const result =

                    checkWinner();


                if(

                    result

                ){

                    finishGame(

                        result

                    );


                    return;

                }


                switchTurn();


                if(

                    gameMode ===

                    "computer"

                    &&

                    currentPlayer ===

                    "O"

                    &&

                    !gameOver

                ){

                    gameStatus.textContent =

                        "Computer is thinking... 🤖";


                    setTimeout(

                        computerMove,

                        500

                    );

                }

            }

        );

    }

);


// =========================================
// MAKE MOVE
// =========================================

function makeMove(

    index,

    player

){

    board[index] =

        player;


    cells[index].textContent =

        player;


    cells[index].classList.add(

        player ===

        "X"

            ?

        "x"

            :

        "o"

    );

}


// =========================================
// SWITCH TURN
// =========================================

function switchTurn(){

    currentPlayer =

        currentPlayer ===

        "X"

            ?

        "O"

            :

        "X";


    if(

        gameMode ===

        "computer"

    ){

        gameStatus.textContent =

            currentPlayer ===

            "X"

                ?

            `${playerName}'s Turn ❌`

                :

            "Computer's Turn ⭕`;

    }


    else{

        gameStatus.textContent =

            currentPlayer ===

            "X"

                ?

            `${playerName}'s Turn ❌`

                :

            "Player 2's Turn ⭕`;

    }

}


// =========================================
// CHECK WINNER
// =========================================

function checkWinner(){

    for(

        const combination

        of

        winningCombinations

    ){

        const a =

            combination[0];


        const b =

            combination[1];


        const c =

            combination[2];


        if(

            board[a]

            &&

            board[a] ===

            board[b]

            &&

            board[a] ===

            board[c]

        ){

            cells[a].classList.add(

                "winner"

            );


            cells[b].classList.add(

                "winner"

            );


            cells[c].classList.add(

                "winner"

            );


            return board[a];

        }

    }


    if(

        board.every(

            cell =>

                cell !== ""

        )

    ){

        return "draw";

    }


    return null;

}


// =========================================
// FINISH GAME
// =========================================

function finishGame(

    winner

){

    gameOver =

        true;


    resultBox.classList.add(

        "show"

    );


    if(

        winner ===

        "X"

    ){

        playerScore++;


        playerOneScore.textContent =

            playerScore;


        resultTitle.textContent =

            `🎉 ${playerName.toUpperCase()}, YOU WIN! 🏆`;


        resultMessage.textContent =

            "Amazing victory! You defeated the computer! 🔥";

    }


    else if(

        winner ===

        "O"

    ){

        opponentScore++;


        playerTwoScore.textContent =

            opponentScore;


        resultTitle.textContent =

            "😄 WOW, YOU LOSE!";


        resultMessage.textContent =

            "🤖 Computer wins! Can you beat it next time?";

    }


    else{

        resultTitle.textContent =

            "🤝 IT'S A DRAW!";


        resultMessage.textContent =

            "Perfect defense from both sides! 😄";

    }

}


// =========================================
// IMPOSSIBLE COMPUTER AI
// MINIMAX ALGORITHM
// =========================================

function computerMove(){

    if(

        gameOver

    ){

        return;

    }


    let bestScore =

        -Infinity;


    let bestMove =

        null;


    for(

        let i =

            0;

        i <

            board.length;

        i++

    ){

        if(

            board[i] === ""

        ){

            board[i] =

                "O";


            let score =

                minimax(

                    board,

                    0,

                    false

                );


            board[i] =

                "";


            if(

                score >

                bestScore

            ){

                bestScore =

                    score;


                bestMove =

                    i;

            }

        }

    }


    makeMove(

        bestMove,

        "O"

    );


    const result =

        checkWinner();


    if(

        result

    ){

        finishGame(

            result

        );


        return;

    }


    switchTurn();

}


// =========================================
// MINIMAX
// =========================================

function minimax(

    position,

    depth,

    isMaximizing

){

    const result =

        evaluateBoard(

            position

        );


    if(

        result !==

        null

    ){

        return result;

    }


    if(

        isMaximizing

    ){

        let bestScore =

            -Infinity;


        for(

            let i =

                0;

            i <

                position.length;

            i++

        ){

            if(

                position[i] === ""

            ){

                position[i] =

                    "O";


                let score =

                    minimax(

                        position,

                        depth + 1,

                        false

                    );


                position[i] =

                    "";


                bestScore =

                    Math.max(

                        bestScore,

                        score

                    );

            }

        }


        return bestScore;

    }


    else{

        let bestScore =

            Infinity;


        for(

            let i =

                0;

            i <

                position.length;

            i++

        ){

            if(

                position[i] === ""

            ){

                position[i] =

                    "X";


                let score =

                    minimax(

                        position,

                        depth + 1,

                        true

                    );


                position[i] =

                    "";


                bestScore =

                    Math.min(

                        bestScore,

                        score

                    );

            }

        }


        return bestScore;

    }

}


// =========================================
// EVALUATE BOARD
// =========================================

function evaluateBoard(

    position

){

    for(

        const combination

        of

        winningCombinations

    ){

        const a =

            combination[0];


        const b =

            combination[1];


        const c =

            combination[2];


        if(

            position[a]

            &&

            position[a] ===

            position[b]

            &&

            position[a] ===

            position[c]

        ){

            if(

                position[a] ===

                "O"

            ){

                return 10;

            }


            else{

                return -10;

            }

        }

    }


    if(

        position.every(

            cell =>

                cell !== ""

        )

    ){

        return 0;

    }


    return null;

}


// =========================================
// NEW GAME
// =========================================

newGameBtn.addEventListener(

    "click",

    function(){

        resultBox.classList.remove(

            "show"

        );


        resetBoard();

    }

);


// =========================================
// RESET BOARD
// =========================================

function resetBoard(){

    board = [

        "",

        "",

        "",

        "",

        "",

        "",

        "",

        "",

        ""

    ];


    currentPlayer =

        "X";


    gameOver =

        false;


    cells.forEach(

        function(

            cell

        ){

            cell.textContent =

                "";


            cell.classList.remove(

                "x",

                "o",

                "winner"

            );

        }

    );


    gameStatus.textContent =

        `${playerName}'s Turn ❌`;

  }
