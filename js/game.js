let node = document.getElementById("main-game");
for (let i = 1; i <= 16; i++) {
  for (let j = 1; j <= 10; j++) {
    let createMatrix = document.createElement("div");
    createMatrix.classList.add("matrix-box");
    node.appendChild(createMatrix);
  }
}
const O = [
  [
    [1, 1],
    [1, 1],
  ],
];
const L = [
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],

  [
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0],
  ],

  [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],

  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
];
const J = [
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1],
  ],

  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],

  [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],

  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
  ],
];
const T = [
  [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],

  [
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
  ],

  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],

  [
    [1, 0, 0],
    [1, 1, 1],
    [1, 0, 0],
  ],
];
const I = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],

  [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],

  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],

  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
];
const S = [
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],

  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 1],
  ],

  [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
  ],

  [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
];
const Z = [
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],

  [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
  ],

  [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ],

  [
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0],
  ],
];
let broad = Array.from({ length: 16 }, () => Array(10).fill(0));
function createPiece() {
  let allPiece = [O, L, J, T, I, S, Z];
  let randomPiece = allPiece[Math.floor(Math.random() * allPiece.length)];
  return {
    thePiece: randomPiece[0],
    row: 0,
    col: 4,
  };
}
let fallPiece = createPiece();
let getAllBox = document.querySelectorAll(".matrix-box");
const drawBox = () => {
  for (let i = 0; i < fallPiece.thePiece.length; i++) {
    for (let j = 0; j < fallPiece.thePiece[i].length; j++) {
      if (fallPiece.thePiece[i][j] === 1) {
        let row = fallPiece.row + i;
        let col = fallPiece.col + j;
        getAllBox[row * 10 + col].classList.add("piece");
      }
    }
  }
};
function eraseBox() {
  for (let i = 0; i < fallPiece.thePiece.length; i++) {
    for (let j = 0; j < fallPiece.thePiece[i].length; j++) {
      if (fallPiece.thePiece[i][j] === 1) {
        let row = fallPiece.row + i;
        let col = fallPiece.col + j;
        getAllBox[row * 10 + col].classList.remove("piece");
      }
    }
  }
}
function checkHitPiece() {
  for (let i = 0; i < fallPiece.thePiece.length; i++) {
    for (let j = 0; j < fallPiece.thePiece[i].length; j++) {
      if (fallPiece.thePiece[i][j] === 1) {
        let curr = fallPiece.row + i + 1;
        if (curr >= 16 || broad[curr][fallPiece.col + j] === 1) {
          return false;
        }
      }
    }
  }
  return true;
}
function newPiece() {
  fallPiece = createPiece();
}
function savePiece() {
  for (let i = 0; i < fallPiece.thePiece.length; i++) {
    for (let j = 0; j < fallPiece.thePiece[i].length; j++) {
      if (fallPiece.thePiece[i][j] === 1) {
        let row = fallPiece.row + i;
        let col = fallPiece.col + j;
        broad[row][col] = 1;
        getAllBox[row * 10 + col].classList.add("piece-save");
      }
    }
  }
}
drawBox();
setInterval(() => {
  eraseBox();
  if (checkHitPiece()) {
    fallPiece.row++;
  } else {
    savePiece();
    newPiece();
  }
  drawBox();
}, 1000);
