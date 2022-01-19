// select everything
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
        cell.removeEventListener("click",handleClick)
        cell.addEventListener("click", handleClick, {once:true});
    })
    win_message.style.display = "none";
    setBoard();
}

function handleClick(e) {
    const cell = e.target;
    let cr_class = circleTurn ? circleClass : xClass;
    placeMark(cell,cr_class);
    if (checkWin(cr_class)) endGame(false);
    else if (isDraw()) endGame(true);
    else {
        computerMove();
        
        setBoard();
    }
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function placeMark(cell,cr_class) {
    cell.classList.add(xClass);
}

function computerMove() {
    
    let empties = [];
    cells.forEach(cell => {
        if (!cell.classList.contains(xClass) && !cell.classList.contains(circleClass)) empties.push(cell);
    })
    console.log(empties);
    let rand = Math.ceil(Math.random() * empties.length) - 1;
    empties[rand].removeEventListener("click",handleClick);
    empties[rand].classList.add(circleClass);
    if (checkWin(circleClass)) {
        win_message.style.display = "grid";
        win_h1.innerText = "LOOOSEER"
    }
    if (checkWin(xClass)) endGame(false);
    else if (isDraw()) endGame(true);
    
}

function setBoard() {
    board.classList.remove(xClass);
    board.classList.remove(circleClass);
    board.classList.add(xClass);
}

function checkWin(currentClass) {
    return winning_combinations.some(comb => {
      return  comb.every(index => {
          return cells[index].classList.contains(currentClass);
        })
    })
}

function endGame(draw) {
    if (draw) win_h1.innerText = "Draw";
    else win_h1.innerText = `${circleTurn ? "O" : "X"} wins`;
    win_message.style.display = "grid";
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(circleClass) || cell.classList.contains(xClass);
    })
}