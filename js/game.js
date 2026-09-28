let node = document.getElementById("main-game")
for (let i = 1; i <= 20 ; i++) {
    for (let j = 1; j <= 10 ; j++) {
        let createMatrix = document.createElement("div")
        createMatrix.classList.add("matrix-box")
        node.appendChild(createMatrix)
    }
}