const cells = document.querySelectorAll('.cell')
const restartBtn = document.querySelector('#restartBtn')
const statText = document.querySelector('#statText')
const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let options = ["", "", "", "", "", "", "", "", "" ]
let currentPlayer = "X"
let isRunning = false;

initializeGame()
//then after we need following funcitons
function initializeGame(){
    isRunning = true
    cells.forEach(cell => cell.addEventListener('click', cellClicked))
    restartBtn.addEventListener('click', restartGame)
    statText.textContent = `${currentPlayer}'s turn`
}

function cellClicked(){
    const cellIndex = this.getAttribute('cellIndex')    //getting cell index
    console.log(cellIndex)

    if(options[cellIndex] != "" || !isRunning){
        return;
    }
    else{
        updateCell(this, cellIndex)
        checkWinner()
    }

    this.classList.add('disableMe')
}

function updateCell(cell, index){
    options[index] = currentPlayer
    cell.textContent = currentPlayer
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X"
    statText.textContent = `${currentPlayer}'s turn`
}

function checkWinner(){
    let roundWon = false
    for(let i = 0; i<winCondition.length; i++){
        const condition = winCondition[i]
        const cellA = options[condition[0]]
        const cellB = options[condition[1]]
        const cellC = options[condition[2]]

    if(cellA == "" || cellB =="" || cellC == ""){
        continue;
    }

    if(cellA == cellB && cellB == cellC){
        roundWon = true
        break
    }
}

if(roundWon){
    statText.textContent = `${currentPlayer} win.`
}
else if(!options.includes("")){
    statText.textContent = "Draw"
    isRunning = false
}
else{
    changePlayer()
}

}

function restartGame(){
    options = ["", "", "", "", "", "", "", "", "" ]
    currentPlayer = "X"
    statText.textContent = `${currentPlayer}'s turn`
    cells.forEach(cell => {
        cell.textContent = ""
        cell.classList.remove('disableMe')
 })
    isRunning = true
}