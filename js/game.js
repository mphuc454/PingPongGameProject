let node = document.getElementById("main-game");
for (let i = 1; i <= 16; i++) {
  for (let j = 1; j <= 10; j++) {
    let createMatrix = document.createElement("div");
    createMatrix.classList.add("matrix-box");
    node.appendChild(createMatrix);
  }
}
window.addEventListener("keydown", (e) => {
  if (
    e.ctrlKey &&
    (e.key === "+" || e.key === "-" || e.key === "0" || e.key === "=")
  ) {
    e.preventDefault();
  }
});
window.addEventListener(
  "wheel",
  (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
    }
  },
  { passive: false },
);
const params = new URLSearchParams(window.location.search);
const nameLevel = params.get("name");
document.getElementById("name-level").textContent = `LEVEL: ${nameLevel}`;

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
    row: nameLevel === "2" ? 16 - randomPiece[0].length : 0,
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
function checkHitPieceDown() {
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
function checkHitPieceUp() {
  for (let i = 0; i < fallPiece.thePiece.length; i++) {
    for (let j = 0; j < fallPiece.thePiece[i].length; j++) {
      if (fallPiece.thePiece[i][j] === 1) {
        let curr = fallPiece.row + i - 1;
        if (curr < 0 || broad[curr][fallPiece.col + j] === 1) {
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
function canMoveSide(n) {
  for (let i = 0; i < fallPiece.thePiece.length; i++) {
    for (let j = 0; j < fallPiece.thePiece[i].length; j++) {
      if (fallPiece.thePiece[i][j] === 1) {
        let row = fallPiece.row + i;
        let col = fallPiece.col + j + n;
        if (col < 0 || col >= 10 || broad[row][col] === 1) return false;
      }
    }
  }
  eraseBox();
  fallPiece.col += n;
  drawBox();
}
function checkFullRow() {
  const fullRows = [];
  for (let index = 0; index < broad.length; index++) {
    let isFull = true;
    for (let j = 0; j < broad[index].length; j++) {
      if (broad[index][j] === 0) {
        isFull = false;
        break;
      }
    }
    if (isFull) {
      fullRows.push(index);
    }
  }
  return fullRows;
}
function renderBroad() {
  for (let index = 0; index < broad.length; index++) {
    for (let j = 0; j < broad[index].length; j++) {
      const box = getAllBox[index * 10 + j];
      box.classList.remove("piece-save");
      box.classList.toggle("piece-save", broad[index][j] === 1);
    }
  }
}
function removeFullRows() {
  const isFullRows = checkFullRow();
  if (isFullRows.length <= 0) return 0;
  const kept = [];
  for (let i = 0; i < broad.length; i++) {
    if (!isFullRows.includes(i)) {
      kept.push(broad[i]);
    }
  }
  const empty = [];
  for (let i = 0; i < isFullRows.length; i++) {
    empty.push(Array(10).fill(0));
  }
  broad = [...empty, ...kept];
  renderBroad();
  return isFullRows.length;
}
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    canMoveSide(1);
  } else if (e.key === "ArrowLeft") {
    canMoveSide(-1);
  }
});

drawBox();

setTimeout(() => {
  setInterval(() => {
    eraseBox();
    if (nameLevel === "2") {
      if (checkHitPieceUp()) {
        fallPiece.row--;
      } else {
        savePiece();
        removeFullRows();
        newPiece();
      }
    } else {
      if (checkHitPieceDown()) {
        fallPiece.row++;
      } else {
        savePiece();
        removeFullRows();
        newPiece();
      }
    }
    drawBox();
  }, 1000);
}, 100);
