const puzzle = document.querySelector('.main-sudoku-grid')

export function drawBoard(number) {
    const cells = [];
    let square = number*number;
    let size = number*60;
    puzzle.style.width = `${size}px`
    puzzle.style.height = `${size}px`
    puzzle.style.setProperty('grid-template-columns', `repeat(${number}, auto)`)
    for (let i=0; i<square; i++) {
        const inputElement = document.createElement("div")
        inputElement.classList.add('main-grid-cell')
        cells.push(inputElement)
        puzzle.appendChild(inputElement)
    }
    return cells
}

