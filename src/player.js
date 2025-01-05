import Gameboard from "./gameboard";

class Player {
    constructor(name, size) {
        this.name = name;
        this.board = new Gameboard(size, size)
    }

    PlaceShip(x1, y1, size, axis_y, axis_x){
        this.board.AddShip(x1, y1, size, axis_y, axis_x);
    }

    Attack(x, y){
        this.board.ReceiveAttack(y, x);
    }

    CheckLoss(){
        return this.board.CheckGameOver();
    }
}

module.exports = Player;