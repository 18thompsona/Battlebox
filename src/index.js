import Player from "./player";
import "./style.css";

const playerBoard = document.querySelector(".boxes-player");
const computerBoard = document.querySelector(".boxes-computer");
const setupBoard = document.querySelector(".boxes-setup");
const setupModal = document.querySelector(".placement-board");
const startButton = document.querySelector(".startgame-button");
const toggleRotationButton = document.querySelector(".toggleRotate-button");
const restartGameButton = document.querySelector(".restart-button");

const EndDialog = document.querySelector(".Endgame");
const EndText = document.querySelector(".LoseText");


let human = '';
let computer = '';

let boardsize = 10;
let axisX = 1;
let axisY = 0;
let shipSizes = [5,4,3,2,1];
let shipIndex = 0;

startButton.addEventListener("click", () =>{
    if(shipIndex >= shipSizes.length){
        ShowShips(playerBoard, human);
        computer.RandomShipPlacement(shipSizes);
        computer.PrintBoard();
        setupModal.close();
    }
})

toggleRotationButton.addEventListener("click", ToggleRotation);
restartGameButton.addEventListener('click', () => {
    StartGame();
    EndDialog.close();
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

        if(player === computer){
            box.addEventListener("click", () => {
                if(HandleAttack(box.dataset.col, box.dataset.row, player, box)){
                    console.log(player.CheckLoss());
                    player.PrintBoard();
                    if (player.CheckLoss()){
                        CallLoser(player);
                    }
                    AttackPlayer(player);
                }
            })
        }
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
                let valid = player.PlaceShip(x, y, shipSizes[shipIndex], axisY, axisX);
                if(valid){
                    shipIndex += 1;
                    ShowShips(parentElement, player);                    
                }
            }
        })

        parentElement.appendChild(box);
    }
}

function HandleAttack(x, y, player, element){
    let isShip = player.CheckShip(x,y);
    if(player.Attacked(y, x)){    
        if(isShip){
            element.classList.add("hit-ship");
        }
        else{
            element.classList.add("hit-water");
        }
        return true;
    }
    return false;
}

function AttackPlayer(player){
    human.RandomlyAttacked();
    UpdateBoard(playerBoard, human);
    if (human.CheckLoss()){
        CallLoser(human);
    }
}

function ShowShips(board, player){
    for(const child of board.children){
        if(player.CheckShip(Number(child.dataset.col), Number(child.dataset.row))){
            child.classList.add("ship");
        }
    }
}

function UpdateBoard(board, player){
    for(const child of board.children){
        let spaceValue = player.CheckSpace(Number(child.dataset.col), Number(child.dataset.row));
        if(spaceValue === "o"){
            child.classList.add("hit-water");
        }
        if(spaceValue === "s"){
            child.classList.add("hit-ship");
        }
    }
}

function ToggleRotation(){
    if(axisX == 1){
        axisX = 0;
        axisY = 1;
    }
    else{
        axisX = 1;
        axisY = 0;
    }
}

function CallLoser(loser){
    let nameLoser = ';';
    if (loser === human){
        nameLoser = "Human";
    }
    else{
        nameLoser = "Computer";
    }
    EndText.textContent = `${nameLoser} Has Lost All Their Blocks!!!`
    EndDialog.showModal();

}

function StartGame(){
    human = new Player('Human', boardsize);
    computer = new Player('Computer', boardsize);
    shipIndex = 0;

    CreateBoard(playerBoard, boardsize, human);
    CreateBoard(computerBoard, boardsize, computer);
    setupModal.showModal();
    CreateSetupBoard(setupBoard, boardsize, human);  
}

StartGame();


