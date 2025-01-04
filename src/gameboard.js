import Ship from "./ship";

class Gameboard {
    constructor(length, width) {
        this.length = length;
        this.width = width;
        this.board = Array(width).fill('').map(() => new Array(length).fill('x'));
        this.ships = [];
    }

    AddShip(x1, y1, size, axis_y, axis_x){
        if (this.CheckSpaces(y1, x1, size, axis_y, axis_x)){
            this.ships.push(new Ship(size))
            for (let i = 0; i < size; i++){
                this.board[y1 + (i * axis_y)][x1 + (i * axis_x)] = 'S'
            }
        }
    }

    CheckSpaces(y1, x1, size, axis_y, axis_x){
        if(y1 + (size * axis_y) > this.length || y1 + (size * axis_y) < 0 ||
           x1 + (size * axis_x) > this.width  || x1 + (size * axis_x) < 0
        ){
            return false;
        }
        for (let i = 0; i < size; i++){
            if(this.board[y1 + (i * axis_y)][x1 + (i * axis_x)] == 'S'){
                return false;
            }
        }
        return true;
    }
 
    ReceiveAttack(y, x){
        if (this.board[x][y] == 'x'){
            this.board[x][y] = 'o';
            return true;
        }
        if (this.board[x][y] == 'S'){
            this.board[x][y] = 'o';
            return true;
        }
        return false;
    }

    TestPrint(){
        for(let i = 0; i < this.board.length; i++){
            let str = '';
            for(let j = 0; j < this.board[i].length; j++){
                str += this.board[i][j];
            }
            console.log(str);
        }
    }
    
}

module.exports = Gameboard;