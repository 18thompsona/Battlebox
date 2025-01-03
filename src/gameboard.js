class Gameboard {
    constructor(length, width) {
        this.length = length;
        this.width = width;
        this.board = Array(width).fill('').map(() => new Array(length).fill('x'));
    }

    receiveAttack(){

    }
}

module.exports = Gameboard;