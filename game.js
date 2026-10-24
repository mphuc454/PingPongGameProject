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
let balls = { x: 200, y: 250, radius: 7, dx: 3, dy: -3 };
let paddle = { x: 160, y: 350, width: 100, height: 30 };
let lockedBlock = { x: 130, y: 180, width: 140, height: 20 };
let lockedBlock2 = { x: 0, y: 180, width: 180, height: 20 };
let listLockedBlocks = [
  { x: 40, y: 180, width: 80, height: 20 },
  { x: 160, y: 180, width: 80, height: 20 },
  { x: 280, y: 180, width: 80, height: 20 },
];
let doors = [
  { x: 0, y: 180, width: 40, height: 20, hp: 5 },
  { x: 120, y: 180, width: 40, height: 20, hp: 5 },
  { x: 240, y: 180, width: 40, height: 20, hp: 5 },
  { x: 360, y: 180, width: 40, height: 20, hp: 5 },
];
let blocks = [];
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 8; j++) {
    blocks.push({
      x: 15 + j * 55,
      y: 15 + i * 25,
      width: 50,
      height: 20,
      hp: 1,
    });
  }
}

const getGamePlay = document.getElementById("game-play");
const getIntro = document.getElementById("intro");
const getSidebar = document.getElementById("sidebar-menu");
const getBtnStart = document.getElementById("btn-start");
const getMusBtn = document.getElementById("music-btn");
const audio = document.createElement("audio");
audio.src = "/audio/musicaudio.mp3";
const params = new URLSearchParams(window.location.search);
const nameLevel = params.get("name");

let changeTextBtn = document.getElementById("next-level");
let isPause = false;
let pause = document.getElementById("btn-pause");
let scoreValue = 0;
let score = document.getElementById("score-value");
let getCountDown = document.getElementById("time-down");
let countdown = 3;
let dx_lockedBlock = 6;

const gameOver = new bootstrap.Modal(document.getElementById("gameover"));
const gameWinner = new bootstrap.Modal(document.getElementById("winner"));
const timeDown = new bootstrap.Modal(document.getElementById("countdown"));
const introduce = new bootstrap.Modal(
  document.getElementById("introduce-game"),
);
const info = new bootstrap.Modal(document.getElementById("info-game"));

getIntro.hidden = false;
getGamePlay.hidden = true;
getSidebar.hidden = true;
getBtnStart.addEventListener("click", () => {
  window.location.href = "index.html?name=1";
});
if (nameLevel === "4") {
  balls.dx = 4;
  balls.dy = 4;
}

if (nameLevel !== null) {
  getIntro.hidden = !getIntro.hidden;
  getGamePlay.hidden = !getGamePlay.hidden;
  getSidebar.hidden = !getSidebar.hidden;
  document.getElementById("name-level").textContent = `LEVEL ${nameLevel}`;
  if (Number(nameLevel) >= 4) {
    changeTextBtn.textContent = "Quay lại màn 1";
  }
  document.getElementById("next-level").addEventListener("click", () => {
    let nextLevel = Number(nameLevel) + 1;
    if (nextLevel >= 4) {
      location.href = "index.html?name=1";
    } else {
      location.href = `index.html?name=${nextLevel}`;
    }
  });
  pause.innerHTML = '<i class="fa-solid fa-pause"></i>';
  document.getElementById("introduce").addEventListener("click", () => {
    isPause = !isPause;
    pause.innerHTML = '<i class="fa-solid fa-play"></i>';
    introduce.show();
  });
  document.getElementById("info").addEventListener("click", () => {
    isPause = !isPause;
    pause.innerHTML = '<i class="fa-solid fa-play"></i>';
    info.show();
  });
  pause.addEventListener("click", () => {
    isPause = !isPause;
    if (isPause) {
      pause.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
      pause.innerHTML = '<i class="fa-solid fa-pause"></i>';
      requestAnimationFrame(gameLoop);
    }
  });
  getMusBtn.innerHTML = '<i class="fa-solid fa-play"></i> Bật âm thanh';
  getMusBtn.addEventListener("click", () => {
    if (!audio.paused) {
      getMusBtn.innerHTML = '<i class="fa-solid fa-play"></i> Bật âm thanh';
      audio.pause();
    } else {
      getMusBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Tắt âm thanh';
      audio.play();
    }
  });
  score.textContent = `Điểm ${scoreValue}`;

  const canvas = document.getElementById("ping-pong-map");
  const ctx = canvas.getContext("2d");

  function drawBlocks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    if (nameLevel === "2") {
      ctx.translate(canvas.width, canvas.height);
      ctx.rotate(Math.PI);

      let grd = ctx.createLinearGradient(
        lockedBlock.x,
        0,
        lockedBlock.x + lockedBlock.width,
        0,
      );
      grd.addColorStop(0, "#667eea");
      grd.addColorStop(1, "#764ba2");
      ctx.fillStyle = grd;
      ctx.fillRect(
        lockedBlock.x,
        lockedBlock.y,
        lockedBlock.width,
        lockedBlock.height,
      );
    }

    if (nameLevel === "3") {
      for (const b of listLockedBlocks) {
        let grd = ctx.createLinearGradient(b.x, 0, b.x + b.width, 0);
        grd.addColorStop(0, "#667eea");
        grd.addColorStop(1, "#764ba2");
        ctx.fillStyle = grd;
        ctx.fillRect(b.x, b.y, b.width, b.height);
      }
      for (const d of doors) {
        if (d.hp > 0) {
          ctx.fillStyle = "orange";
          ctx.fillRect(d.x, d.y, d.width, d.height);
          ctx.fillStyle = "black";
          ctx.font = "15px Arial";
          ctx.textAlign = "center";
          ctx.fillText(String(d.hp), d.x + d.width / 2, d.y - 5);
        }
      }
    }

    if (nameLevel === "4") {
      ctx.translate(canvas.width, canvas.height);
      ctx.rotate(Math.PI);
      let grd = ctx.createLinearGradient(
        lockedBlock2.x,
        0,
        lockedBlock2.x + lockedBlock2.width,
        0,
      );
      grd.addColorStop(0, "#667eea");
      grd.addColorStop(1, "#764ba2");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = grd;
      ctx.fillRect(
        lockedBlock2.x,
        lockedBlock2.y,
        lockedBlock2.width,
        lockedBlock2.height,
      );
      lockedBlock2.x += dx_lockedBlock;
      if (
        lockedBlock2.x + lockedBlock2.width >= canvas.width ||
        lockedBlock2.x <= 0
      ) {
        dx_lockedBlock = -dx_lockedBlock;
      }
    }
    ctx.fillStyle = "red";
    for (const b of blocks) {
      if (b.hp > 0) ctx.fillRect(b.x, b.y, b.width, b.height);
    }

    ctx.fillStyle = "#f6f34c";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = "#090CB3";
    ctx.beginPath();
    ctx.arc(balls.x, balls.y, balls.radius, 0, Math.PI * 2);
    ctx.fill();
    window.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      let mouseX = e.clientX - rect.left;
      if (nameLevel === "2" || nameLevel === "4") {
        mouseX = canvas.width - mouseX;
      }
      paddle.x = Math.max(
        0,
        Math.min(mouseX - paddle.width / 2, canvas.width - paddle.width),
      );
    });
    ctx.restore();
  }
  function moveBall() {
    balls.x += balls.dx;
    balls.y += balls.dy;
    if (balls.x - balls.radius < 0 || balls.x + balls.radius > canvas.width) {
      balls.dx = -balls.dx;
    }
    if (balls.y - balls.radius < 0) {
      balls.dy = -balls.dy;
    }
    if (nameLevel === "2") {
      if (
        balls.dy > 0 &&
        balls.y + balls.radius >= lockedBlock.y &&
        balls.y - balls.radius < lockedBlock.y &&
        balls.x + balls.radius >= lockedBlock.x &&
        balls.x - balls.radius <= lockedBlock.x + lockedBlock.width
      ) {
        balls.y = lockedBlock.y - balls.radius;
        balls.dy = -Math.abs(balls.dy);
      }
      if (
        balls.dy < 0 &&
        balls.y - balls.radius <= lockedBlock.y + lockedBlock.height &&
        balls.y + balls.radius > lockedBlock.y + lockedBlock.height &&
        balls.x + balls.radius >= lockedBlock.x &&
        balls.x - balls.radius <= lockedBlock.x + lockedBlock.width
      ) {
        balls.y = lockedBlock.y + lockedBlock.height + balls.radius;
        balls.dy = -balls.dy;
      }
    }

    if (nameLevel === "3") {
      for (const b of listLockedBlocks) {
        if (
          balls.y + balls.radius >= b.y &&
          balls.y - balls.radius < b.y &&
          balls.x + balls.radius >= b.x &&
          balls.x - balls.radius <= b.x + b.width
        ) {
          balls.y = b.y - balls.radius;
          balls.dy = -Math.abs(balls.dy);
        }
        if (
          balls.y - balls.radius <= b.y + b.height &&
          balls.y + balls.radius > b.y + b.height &&
          balls.x + balls.radius >= b.x &&
          balls.x - balls.radius <= b.x + b.width
        ) {
          balls.y = b.y + b.height + balls.radius;
          balls.dy = -balls.dy;
        }
      }
      for (const d of doors) {
        if (
          d.hp > 0 &&
          balls.dy > 0 &&
          balls.y + balls.radius >= d.y &&
          balls.y - balls.radius < d.y &&
          balls.x + balls.radius >= d.x &&
          balls.x - balls.radius <= d.x + d.width
        ) {
          balls.y = d.y - balls.radius;
          d.hp--;
          balls.dy = -Math.abs(balls.dy);
        }
        if (
          d.hp > 0 &&
          balls.dy < 0 &&
          balls.y - balls.radius <= d.y + d.height &&
          balls.y + balls.radius > d.y + d.height &&
          balls.x + balls.radius >= d.x &&
          balls.x - balls.radius <= d.x + d.width
        ) {
          balls.y = d.y + d.height + balls.radius;
          d.hp--;
          balls.dy = -balls.dy;
        }
      }
    }

    if (
      balls.y + balls.radius >= paddle.y &&
      balls.y - balls.radius <= paddle.y + paddle.height &&
      balls.x + balls.radius >= paddle.x &&
      balls.x - balls.radius <= paddle.x + paddle.width
    ) {
      balls.dy = -Math.abs(balls.dy);
      balls.y = paddle.y - balls.radius;
    }

    for (const block of blocks) {
      if (
        block.hp > 0 &&
        balls.y - balls.radius <= block.y + block.height &&
        balls.y + balls.radius >= block.y &&
        balls.x + balls.radius >= block.x &&
        balls.x - balls.radius <= block.x + block.width
      ) {
        block.hp = 0;
        balls.dy = -balls.dy;
        scoreValue = Math.min(scoreValue + 10, 300);
        score.textContent = `Điểm ${scoreValue}`;
      }
    }

    if (nameLevel === "4") {
      if (
        balls.dy > 0 &&
        balls.y + balls.radius >= lockedBlock2.y &&
        balls.y - balls.radius < lockedBlock2.y &&
        balls.x + balls.radius >= lockedBlock2.x &&
        balls.x - balls.radius <= lockedBlock2.x + lockedBlock2.width
      ) {
        balls.y = lockedBlock2.y - balls.radius;
        balls.dy = -Math.abs(balls.dy);
      }
      if (
        balls.dy < 0 &&
        balls.y - balls.radius <= lockedBlock2.y + lockedBlock2.height &&
        balls.y + balls.radius > lockedBlock2.y + lockedBlock2.height &&
        balls.x + balls.radius >= lockedBlock2.x &&
        balls.x - balls.radius <= lockedBlock2.x + lockedBlock2.width
      ) {
        balls.y = lockedBlock2.y + lockedBlock2.height + balls.radius;
        balls.dy = -balls.dy;
      }
    }
  }
  function checkGameOver() {
    if (balls.y + balls.radius > canvas.height) return true;
  }
  function gameLoop() {
    if (isPause) {
      return;
    }
    drawBlocks();
    if (checkGameOver()) {
      gameOver.show();
      return;
    }
    if (scoreValue >= 300) {
      gameWinner.show();
      return;
    }
    moveBall();
    requestAnimationFrame(gameLoop);
  }
  function countDown() {
    if (countdown > 0) {
      getCountDown.textContent = countdown;
      countdown--;
      setTimeout(countDown, 1000);
    } else {
      timeDown.hide();
      gameLoop();
    }
  }
  timeDown.show();
  countDown();
}
