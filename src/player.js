import Gameboard from "./gameboard";

export default class Player {
    constructor(name, size) {
        this.name = name;
        this.board = new Gameboard(size, size)
    }

    PlaceShip(x1, y1, size, axis_y, axis_x){
        return this.board.AddShip(x1, y1, size, axis_x, axis_y);
    }

    Attacked(x, y){
        this.board.ReceiveAttack(y, x);
    }

    CheckLoss(){
        return this.board.CheckGameOver();
    }

    RandomShipPlacement(shipSizeArray){
        for(let i = 0; i < shipSizeArray.length; i++){
            let axisX = Math.floor(Math.random()*2);
            let axisY = (axisX == 0) ? 1 : 0;
            let x = Math.floor(Math.random()*this.board.width);
            let y = Math.floor(Math.random()*this.board.length);
            let good = this.PlaceShip(x, y, shipSizeArray[i], axisX, axisY);
            
            console.log(x,y,shipSizeArray[i], axisX, axisY, good);
            while (!good){
                axisX = Math.round(Math.random());
                axisY = (axisX == 0) ? 1 : 0;
                x = Math.floor(Math.random()*this.board.width);
                y = Math.floor(Math.random()*this.board.length);
                good = this.PlaceShip(x, y, shipSizeArray[i], axisX, axisY);
                console.log(x,y,shipSizeArray[i], axisX, axisY, good);
            }
            
        }
    }

    RandomlyAttacked(){
        let x = Math.floor(Math.random()*this.board.width);
        let y = Math.floor(Math.random()*this.board.length);

        let good = this.Attacked(x, y);
        while (!good)
        {
            x = Math.floor(Math.random()*this.board.width);
            y = Math.floor(Math.random()*this.board.length);
            good = this.Attacked(x, y);
        }
    }
}