import Player from "./player";
import "./style.css";

const playerBoard = document.querySelector(".boxes-player");
const computerBoard = document.querySelector(".boxes-computer");
const setupBoard = document.querySelector(".boxes-setup");
const setupModal = document.querySelector(".placement-board");
const startButton = document.querySelector(".startgame-button");

let boardsize = 10;
const human = new Player('Human', boardsize);
const computer = new Player('Computer', boardsize);

let axisX = 1;
let axisY = 0;
let shipSizes = [5,4,3,2,1];
let shipIndex = 0;

startButton.addEventListener("click", () =>{
    SetShipStyles(playerBoard, human);
    setupModal.close();
})


function CreateBoard(parentElement, size, player){
    parentElement.innerHTML = '';
    parentElement.style.display = "grid";
    parentElement.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    parentElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for(let i = 0; i < boardsize*boardsize;i++){
        const box = document.createElement('div');
        box.classList.add("box");
        box.dataset.row = Math.floor(i / size);
        box.dataset.col = i % size;

        box.addEventListener("click", () => {
            if (!box.classList.contains('hit')){
                box.classList.add('hit');
                console.log(box.dataset.col, box.dataset.row);
                player.Attacked(box.dataset.row, box.dataset.col);
                player.PrintBoard();
            }
            else{
                console.log("already hit")
            }

        })

        parentElement.appendChild(box);
    }
}

function CreateSetupBoard(parentElement, size, player){
    parentElement.innerHTML = '';
    parentElement.style.display = "grid";
    parentElement.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    parentElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for(let i = 0; i < boardsize*boardsize;i++){
        const box = document.createElement('div');
        box.classList.add("box");
        box.dataset.row = Math.floor(i / size);
        box.dataset.col = i % size;

        box.addEventListener("click", () => {
            let x = Number(box.dataset.col);
            let y = Number(box.dataset.row);
            if(shipIndex <= shipSizes.length){
                player.PlaceShip(x, y, shipSizes[shipIndex], axisY, axisX);
                shipIndex += 1;
                SetShipStyles(parentElement, player);
            }

        })

        parentElement.appendChild(box);
    }
}

function SetShipStyles(board, player){
    // let children = board.children;
    for(const child of board.children){
        if(player.CheckShip(Number(child.dataset.col), Number(child.dataset.row))){
            child.classList.add("ship");
        }
    }
}


CreateBoard(playerBoard, boardsize, human);
CreateBoard(computerBoard, boardsize, computer);

setupModal.showModal();
CreateSetupBoard(setupBoard, boardsize, human);

