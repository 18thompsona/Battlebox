class Ship {
    constructor(length,x,y) {
        this.length = length;
        this.destroyed = false;
        this.destroyedSpaces = 0;
    }

    Hit(){
        this.destroyedSpaces += 1;
        this.IsSunk();
    }

    IsSunk(){
        this.destroyed = (this.destroyedSpaces >= this.length) ? true : false;
        return this.destroyed;
    }
}

module.exports = Ship;