const grid_size = document.getElementById('grid-size')
function gridSize() {
    if (parseInt(grid_size.value) > 0)
        return parseInt(grid_size.value)
    return 9
}
function numbers() {
    let arr = [];
    for (let i = 1; i <= gridSize(); i++)
        arr.push(i)
    return arr
}

function level() {
    let square = gridSize() * gridSize()
    return [0.35 * square, 0.46 * square, 0.58 * square, 0.69 * square, 0.8 * square, 0.91 * square]
}
const CONSTANT = {
    UNASSIGNED: 0,
    GRID_SIZE: gridSize(),
    NUMBERS: numbers(),
    LEVEL_NAME: [
        'Easy',
        'Medium',
        'Hard',
        'Very hard',
        'Insane',
        'Inhuman'
    ],
    LEVEL: level()
}