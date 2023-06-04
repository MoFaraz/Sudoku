
export function addToInputs(sudoku) {
    const inputs = document.querySelectorAll('.main-grid-cell')
    let savedBoard = []
    for (let j = 0 ; j < CONSTANT.GRID_SIZE ; j++) {
        for (let k = 0; k < CONSTANT.GRID_SIZE; k++) {
            savedBoard.push(sudoku[j][k])
        }
    }

    for(let i=0; i<savedBoard.length; i++) {
        if(savedBoard[i] === 0) {
            inputs[i].setAttribute('data-value', "0")
        } else {
            inputs[i].innerHTML = savedBoard[i]
            inputs[i].setAttribute('data-value', `${savedBoard[i]}`)
        }
    }
    savedBoard = []
}