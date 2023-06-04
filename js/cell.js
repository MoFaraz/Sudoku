export class Cell {
    mrv = []
    flag = true
    isFirst = false
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

    setValue(value) {
        this.value = value
    }

    getIsFirst() {
        return this.isFirst
    }
    setIsFirst(isFirst) {
        this.isFirst = isFirst
    }
    getFlag() {
        return this.flag
    }
    setFlag(flag) {
        this.flag = flag
    }
    calculateMrv() {
        this.mrv = []
        if (this.value === 0)
            for (let i = 1; i <= gridSize(); i++)
                this.mrv.push(i)
    }
    getMrv() {
        return this.mrv;
    }


}


