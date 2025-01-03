class Ship {
    constructor(length, width) {
        this.lenght = lenght;
        this.destroyed = false;
        this.destroyedSpaces = 0;
    }

    hit(){
        this.destroyedSpaces += 1;
        this.isSunk();
    }

    isSunk(){
        this.destroyed = (this.destroyedSpaces >= this.lenght) ? true : false;
        return this.destroyed;
    }
}

module.exports = Ship;