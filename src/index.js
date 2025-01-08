import Player from "./player";
import "./style.css";

const playerBoard = document.querySelector(".boxes-player");
const computerBoard = document.querySelector(".boxes-computer");

let boardsize = 10;
const human = new Player('Human', boardsize);
const computer = new Player('Computer', boardsize);


function CreateBoard(parentElement, size){
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
            console.log(box.dataset.col, box.dataset.row);
        })

        parentElement.appendChild(box);
    }
}


CreateBoard(playerBoard, boardsize);
CreateBoard(computerBoard, boardsize);