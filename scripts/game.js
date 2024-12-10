const cells = document.querySelectorAll("[data-cell]");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restartButton");
const humanScoreElem = document.getElementById("human-score");
const botScoreElem = document.getElementById("bot-score");
const drawScoreElem = document.getElementById("draw-score");

let board = Array(9).fill("");
let currentPlayer = "X";
const botPlayer = "O";
const humanPlayer = "X";

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let humanScore = 0, botScore = 0, drawScore = 0;

const soundClick = new Audio("assets/click.mp3");

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handlePlayerMove(index));
});

function handlePlayerMove(index) {
    if (board[index] || currentPlayer !== humanPlayer) return;
    makeMove(index, humanPlayer);

    if (!checkGameOver(humanPlayer)) {
        currentPlayer = botPlayer;
        statusText.classList.add("thinking");
        updateStatus(`Player ${currentPlayer}'s Turn`);
        setTimeout(botMove, 750);
    }
}
function botMove() {
    const bestMove = minimax(board, botPlayer).index;
    makeMove(bestMove, botPlayer);
    statusText.classList.remove("thinking");
    if (!checkGameOver(botPlayer)) {
        currentPlayer = humanPlayer;
        updateStatus(`Player ${currentPlayer}'s Turn`);
    }
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
    cells[index].classList.add("taken", `player-${player}`);
    soundClick.play();
}

function minimax(board, player) {
    const availableMoves = getAvailableMoves(board);

    if (checkWin(board, humanPlayer)) return { score: -10 };
    if (checkWin(board, botPlayer)) return { score: 10 };
    if (!availableMoves.length) return { score: 0 };

    let bestMove = null;
    let bestScore = player === botPlayer ? -Infinity : Infinity;

    availableMoves.forEach(move => {
        board[move] = player;
        const score = minimax(board, player === botPlayer ? humanPlayer : botPlayer).score;
        board[move] = "";
        if ((player === botPlayer && score > bestScore) || (player === humanPlayer && score < bestScore)) {
            bestScore = score;
            bestMove = { index: move, score: bestScore };
        }
    });

    return bestMove || { score: 0 };
}

function getAvailableMoves(board) {
    return board.reduce((moves, cell, index) => (cell === "" ? [...moves, index] : moves), []);
}

function checkGameOver(player) {
    if (checkWin(board, player)) {
        highlightWinningCells(player);
        updateScores(player);
        updateStatus(`Player ${player} Wins! 🎉`);
        disableBoard();
        return true;
    } else if (board.every(cell => cell)) {
        updateScores("draw");
        updateStatus("It's a Draw! 🤝");
        return true;
    }
    return false;
}

function checkWin(board, player) {
    return winPatterns.some(pattern => pattern.every(index => board[index] === player));
}

function highlightWinningCells(player) {
    const winningPattern = winPatterns.find(pattern => pattern.every(index => board[index] === player));
    if (winningPattern) {
        winningPattern.forEach(index => cells[index].classList.add("winner"));
    }
}

function updateScores(result) {
    if (result === "X") humanScore++;
    else if (result === "O") botScore++;
    else drawScore++;

    humanScoreElem.textContent = `Human: ${humanScore}`;
    botScoreElem.textContent = `Bot: ${botScore}`;
    drawScoreElem.textContent = `Draws: ${drawScore}`;
}

function updateStatus(message) {
    statusText.textContent = message;
}

function disableBoard() {
    cells.forEach(cell => cell.classList.add("taken"));
}

restartButton.addEventListener("click", () => resetGame());

function resetGame() {
    board.fill("");
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken", "winner", "player-X", "player-O");
    });
    currentPlayer = humanPlayer;
    updateStatus("Player X's Turn");
}
