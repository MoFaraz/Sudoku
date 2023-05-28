export class Cell {
    mrv = []
    constructor(value, row, col) {
        this.col = col;
        this.value = value
        this.row = row;
        this.calculateMrv()
    }

    getVal(){
        return this.value
    }
    getCol() {
        return this.col
    }

    getRow() {
        return this.row
    }
    calculateMrv() {
        if (this.value === 0)
            for (let i = 1 ; i <= gridSize(); i++)
                this.mrv.push(i)
    }
    getMrv() {
        return this.mrv;
    }


}


