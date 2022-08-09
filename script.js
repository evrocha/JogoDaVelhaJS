const callElements = document.querySelectorAll('[data-cell]')
const board = document.querySelector('[data-board]')
const winningMessageTextElement = document.querySelector(['data-winning-message-text'])
const winningMessage = document.querySelector(['data-winning-message'])

let isCircleTurn;

const winningCombinations = [
    [0,1,2],[3,4,5],[6,7,8], /**horiznontal */
    [0,3,6], [1,4,7],[2,5,8], /*vertical*/ 
    [0,4,8], [2,4,6] /*diagonais */
]

const startGame = () =>{
    isCircleTurn = false;

    for(const cell of callElements){
        cell.addEventListener("click", handleClick, {once:true})
    }

    
    board.classList.add('x')
}

const endGame = (isDrawn) =>{
    if (isDrawn){
        winningMessageTextElement.innerText = 'Empate!'
    }
    else{
        winningMessageTextElement.innerHTML = isCircleTurn ? 'O Venceu!' : "X Venceu! "
    }
    winningMessage.classList.add("show-winning-message")
}
const checkForWin =(currentPlayer) => {
    return winningCombinations.some((combination) => { 
        return combination.every((index) => {
            return callElements[index].classList.contains(currentPlayer)
        })
    })
}
const placeMark = (cell, classToAdd) =>{
    cell.classList.add(classToAdd)
}

const swapTurns = () =>{
    isCircleTurn = !isCircleTurn
    board.classList.remove('circle')
    board.classList.remove('x')

    if(isCircleTurn){
        board.classList.add('circle')
    }
    else{
        board.classList.add('x')
    }
}

const handleClick = (e) => {
    const cell = e.target
    const classToAdd = isCircleTurn ? 'circle' : 'x'

    placeMark(cell, classToAdd)

    const isWin = checkForWin(classToAdd)
    if (isWin){
      endGame(false)
    }
    swapTurns()
}
startGame()