import Ship from './ship'

export default class Gameboard {
    constructor(length, width) {
        this.length = length;
        this.width = width;
        this.board = Array(width).fill('').map(() => new Array(length).fill('x'));
        this.ships = [];
    }

    AddShip(x1, y1, size, axis_x, axis_y){
        if (this.CheckSpaces(y1, x1, size, axis_y, axis_x)){
            this.ships.push(new Ship(size));

            for (let i = 0; i < size; i++){
                this.board[y1 + (i * axis_y)][x1 + (i * axis_x)] = 'S' + this.ships.length;
            }
            return true;
        }
        return false;
    }

    CheckShip(x1, y1){
        return (this.board[y1][x1][0] == 'S');
    }

    CheckSpace(x, y){
        return this.board[y][x][0];
    }

    CheckSpaces(y1, x1, size, axis_y, axis_x){
        if(y1 + ((size - 1) * axis_y) >= this.length ||
           y1 + ((size - 1) * axis_y) < 0 ||
           x1 + ((size - 1) * axis_x) >= this.width  ||
           x1 + ((size - 1) * axis_x) < 0
        ){
            return false;
        }
        for (let i = 0; i < size; i++){
            if(this.board[y1 + (i * axis_y)][x1 + (i * axis_x)][0] == 'S'){
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
        if (this.board[x][y][0] == 'S'){
            this.ships[this.board[x][y][1] - 1].Hit();
            this.board[x][y] = 's';
            return true;
        }
        return false;
    }

    CheckGameOver(){
        return this.ships.every(ship => ship.IsSunk() === true);
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