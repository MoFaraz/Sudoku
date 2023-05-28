import {isSafe, sudokuCheck} from "./sudoku.js";
import {Cell} from "./cell.js";
let degrees = []
export function backtracking(board) {

    let n = CONSTANT.GRID_SIZE
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 0) {
                row = i;
                col = j;

                // We still have some remaining
                // missing values in Sudoku
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty) {
            break;
        }
    }
    if (isEmpty) {
        return true;
    }

    // Else for each-row backtrack
    for (let num = 1; num <= n; num++) {
        if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (backtracking(board)) {
                return true;
            } else {

                // Replace it
                board[row][col] = 0;
            }
        }
    }
    return false;
}

let main_cells = []
let maxCount = 0
export function solve1(board) {
    main_cells = []
    for (let i = 0 ; i < Math.pow(CONSTANT.GRID_SIZE,2); i++) {
        let row = Math.floor(i / CONSTANT.GRID_SIZE);
        let col = i % CONSTANT.GRID_SIZE;
        main_cells.push(new Cell(board[row][col], row, col))
    }

    setMapDomain()
    return CSP(board)
}
export function CSP(board) {
    if (sudokuCheck(board)){
        console.log('yes')
        return true
    }else {

        setMapDomain()
        let next = chooseCell()
        let row = next.getRow()
        let col = next.getCol()


        if (next.getMrv().length === 0){
            console.log('mrv length')
            return false
        }

        if (row === -1 || col === -1) {
            if (sudokuCheck(board)){
                console.log('complete')
                console.log(board)
                return true
            } else {
                console.log('col = -1')
                return false
            }
        }

        next.getMrv().forEach(value => {
            if (isSafe(board, row, col, value)) {
                board[row][col] = value
                main_cells[row * CONSTANT.GRID_SIZE + col] = new Cell(value, row, col)
                if (CSP(board)) {
                    forwardChecking(next)
                } else {
                    board[row][col] = 0
                }
            }


        })
        if (sudokuCheck(board))
            return true
        console.log('function')
        return false

    }
}


function removeItemOnce(arr, value) {
    let index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

function removeAll(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr.splice(i,1)
    }
}
function setDomain(cell) {
    let row = cell.row
    let col = cell.col
    let number = CONSTANT.GRID_SIZE
    if (cell.value === 0) {
        for (let i = 0; i < number; i++) {
            if (i === col)
                continue
            removeItemOnce(cell.mrv, main_cells[row * number + i].value)
            if (main_cells[row * number + i].getMrv().length === 0 && main_cells[row * number + i].value === 0)
                return false
        }

        for (let j = 0; j < number; j++) {
            if (j === row)
                continue
            removeItemOnce(cell.mrv, main_cells[j * number + col].value)
            if (main_cells[j * number + col].getMrv().length === 0 && main_cells[j * number + col].value === 0)
                return false
        }
    }
    return true
}

function setMapDomain() {
    let x;
    for (let i = 0 ; i < Math.pow(CONSTANT.GRID_SIZE,2); i++)
        x = setDomain(main_cells[i])
    return x;
}


function degree(cell) {
    let row = cell.row
    let col = cell.col
    let number = CONSTANT.GRID_SIZE

    if (cell.value === 0) {
        for (let i = 0; i < number; i++) {
            if (i === col)
                continue
            if (main_cells[row * number + i].value === 0 && row * number + i !== row * number + col)
                degrees[row*number+col]++
        }
        for (let j = 0; j < number; j++) {
            if (j === row)
                continue
            if (main_cells[j*number + col].value === 0 && j*number + col !== row * number + col)
                degrees[row*number+col]++
        }
    }
}

function setMapDegree() {
    for (let k = 0 ; k < Math.pow(CONSTANT.GRID_SIZE,2); k++)
        degrees.push(0)
    for (let i = 0 ; i < Math.pow(CONSTANT.GRID_SIZE,2); i++)
        degree(main_cells[i])
    return degrees
}
function chooseCell() {
    let mux_degree_cells = setMapDegree()
    let min_mrv_cell = new Cell(0,-1,-1)
    for (let i = 0 ; i < Math.pow(CONSTANT.GRID_SIZE,2);i++){
        if (main_cells[i].getMrv().length === min_mrv_cell.getMrv().length
            && mux_degree_cells[i] > min_mrv_cell[min_mrv_cell.getRow()*CONSTANT.GRID_SIZE + min_mrv_cell.getCol()] ) {
            min_mrv_cell = main_cells[i]
        }
        if (main_cells[i].getMrv().length < min_mrv_cell.getMrv().length && main_cells[i].getMrv().length !== 0)
            min_mrv_cell = main_cells[i]
    }
    return min_mrv_cell
}

function forwardChecking(cell) {
    return setDomain(cell)
}

function countNonZero() {
    for (let i = 0 ; i < Math.pow(CONSTANT.GRID_SIZE,2);i++) {
        if (main_cells[i].value === 0)
            return false
    }
}
