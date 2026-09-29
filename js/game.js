let node = document.getElementById("main-game")
for (let i = 1; i <= 16 ; i++) {
    for (let j = 1; j <= 10 ; j++) {
        let createMatrix = document.createElement("div")
        createMatrix.classList.add("matrix-box")
        node.appendChild(createMatrix)
    }
}
const O = [
    [   [1,1],
        [1,1]]]
const L = [
    [   [0,1,0],
        [0,1,0],
        [0,1,1]],

    [   [0,0,0],
        [1,1,1],
        [1,0,0]],

    [   [1,1,0],
        [0,1,0],
        [0,1,0]],

    [   [0,0,1],
        [1,1,1],
        [0,0,0]],
]
const J = [
    [   [0,1,0],
        [0,1,0],
        [1,1,]],

    [   [1,0,0],
        [1,1,1],
        [0,0,0]],

    [   [0,1,1],
        [0,1,0],
        [0,1,0]],

    [   [0,0,0],
        [1,1,1],
        [0,0,1]],
]
const T = [
    [   [1,1,1],
        [0,1,0],
        [0,1,0]],

    [   [1,0,1],
        [1,1,1],
        [0,0,1]],

    [   [0,1,0],
        [0,1,0],
        [1,1,1]],

    [   [1,0,0],
        [1,1,1],
        [1,0,0]],
]
const I = [
    [   [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]],

    [   [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0]],

    [   [0,0,0,0],
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0]],

    [   [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]],
]
const S = [
    [   [0,1,1],
        [1,1,0],
        [0,0,0]],

    [   [0,1,0],
        [0,1,1],
        [0,0,1]],

    [   [0,0,0],
        [0,1,1],
        [1,1,0]],

    [   [1,0,0],
        [1,1,0],
        [0,1,0]],
]
const Z = [
    [   [1,1,0],
        [0,1,1],
        [0,0,0]],

    [   [0,0,1],
        [0,1,1],
        [0,1,0]],

    [   [0,0,0],
        [1,1,0],
        [0,1,1]],

    [   [0,1,0],
        [1,1,0],
        [1,0,0]],
]

let allPiece = [O,L,J,T,I,S,Z]
let randomPiece = allPiece[Math.floor(Math.random() * allPiece.length)]
const fallPiece = {
    thePiece : randomPiece[0],
    row : 0,
    col: 4
}
let getAllBox = document.querySelectorAll(".matrix-box")
const drawBox = () => {
    for (let i = 0; i < fallPiece.thePiece.length; i++) {
        for (let j = 0; j < fallPiece.thePiece[i].length ; j++) {
                if(fallPiece.thePiece[i][j] === 1){
                    getAllBox[fallPiece.row + i * 10 + fallPiece.col + j].classList.add("piece")
                }
        }
    }
}
drawBox()
