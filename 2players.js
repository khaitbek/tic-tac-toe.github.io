let board = document.querySelector("#board");
let restartBtn = document.querySelector("#restartButton");
let cells = document.querySelectorAll("[data-cell]");
let win_message = document.querySelector("#winningMessage");
let win_h1 = win_message.querySelector("h1");
const winning_combinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [2, 5, 8],
    [2, 4, 6],
    [1, 4, 7],
    [6, 7, 8],
    [3, 4, 5]
]
const circleClass = 'o';
const xClass = 'x';
let circleTurn;

startGame();
restartBtn.addEventListener("click", startGame);

function startGame() {
    cells.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(circleClass);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick);
    })
    win_message.style.display = "none";
    setBoardHover();
}

function handleClick(e) {
    const cell = e.target;
    let cr_class = circleTurn ? circleClass : xClass;
    placeMark(cell, cr_class);
    if (checkWin(cr_class)) endGame(false);
    else if (isDraw()) endGame(true);
    else {
        swapTurns();
        setBoardHover();
    }
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function setBoardHover() {
    board.classList.remove(xClass);
    board.classList.remove(circleClass);
    board.classList.add(circleTurn ? circleClass : xClass);
}

function endGame(isDraw) {
    if (isDraw) win_h1.innerText = "Draw";
    else win_h1.innerText = `${circleTurn ? "O's" : "X's"} win`;
    win_message.style.display = "grid";
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(circleClass);
    })
}

function checkWin(currentClass) {
    return winning_combinations.some(comb => {
        return comb.every(index => {
            return cells[index].classList.contains(currentClass);
        })
    })
}