const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const restartBtn = document.getElementById("restart");

let turn = "X"; // Começa com X

const winningCombinations = [
    [0, 1, 2], // Linha 1
    [3, 4, 5], // Linha 2
    [6, 7, 8], // Linha 3
    [0, 3, 6], // Coluna 1
    [1, 4, 7], // Coluna 2
    [2, 5, 8], // Coluna 3
    [0, 4, 8], // Diagonal
    [2, 4, 6]  // Diagonal
];

cells.forEach(cell => {
    cell.addEventListener("click", play, { once: true });
});

restartBtn.addEventListener("click", restart);

function play(e) {
    const cell = e.target;
    cell.innerText = turn;

    if (checkWin(turn)) {
        alert(`Jogador ${turn} venceu!`);
        endGame();
        return;
    }

    if (isDraw()) {
        alert("Deu velha! Empate.");
        return;
    }

    turn = turn === "X" ? "O" : "X"; // troca turno
}

function checkWin(player) {
    return winningCombinations.some(combo => {
        return combo.every(index => cells[index].innerText === player);
    });
}

function isDraw() {
    return [...cells].every(cell => cell.innerText !== "");
}

function endGame() {
    cells.forEach(cell => {
        cell.removeEventListener("click", play);
    });
}

function restart() {
    cells.forEach(cell => {
        cell.innerText = "";
        cell.addEventListener("click", play, { once: true });
    });
    turn = "X";
}
