import {
  balls,
  paddle,
  lockedBlock,
  listLockedBlocks,
  doors,
  blocks,
} from "./component.js";
import "./events.js";

const params = new URLSearchParams(window.location.search);
const nameLevel = params.get("name");
document.getElementById("name-level").textContent = `LEVEL: ${nameLevel}`;

let scoreValue = 0;
let score = document.getElementById("score-value");
score.textContent = `Điểm: ${scoreValue}`;

const canvas = document.getElementById("ping-pong-map");
const ctx = canvas.getContext("2d");

function drawBlocks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  if(nameLevel === "2"){
    let rotate = true;
    if (rotate) {
      ctx.translate(canvas.width, canvas.height);
      ctx.rotate(Math.PI);
    }
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

  ctx.fillStyle = "red";
  for (const b of blocks) {
    if (b.hp > 0) ctx.fillRect(b.x, b.y, b.width, b.height);
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
  ctx.fillStyle = "black";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(balls.x, balls.y, balls.radius, 0, Math.PI * 2);
  ctx.fill();
  window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    if(nameLevel === "2"){
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
  if (nameLevel === "3") {
    for (const b of listLockedBlocks) {
      if (
        balls.y + balls.radius >= b.y &&
        balls.y - balls.radius < b.y &&
        balls.x + balls.radius >= b.x &&
        balls.x - balls.radius < b.x + b.width
      ) {
        balls.y = b.y - balls.radius;
        balls.dy = -Math.abs(balls.dy);
      }
      if (
        balls.y - balls.radius <= b.y + b.height &&
        balls.y + balls.radius > b.y + b.height &&
        balls.x + balls.radius >= b.x &&
        balls.x - balls.radius < b.x + b.width
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
        balls.x - balls.radius < d.x + d.width
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
        balls.x - balls.radius < d.x + d.width
      ) {
        balls.y = d.y + d.height + balls.radius;
        d.hp--;
        balls.dy = -balls.dy;
      }
    }
  }
  if (nameLevel === "2") {
    if (
      balls.y + balls.radius >= lockedBlock.y &&
      balls.y - balls.radius < lockedBlock.y &&
      balls.x + balls.radius >= lockedBlock.x &&
      balls.x - balls.radius < lockedBlock.x + lockedBlock.width
    ) {
      balls.y = lockedBlock.y - balls.radius;
      balls.dy = -Math.abs(balls.dy);
    }
    if (
      balls.y - balls.radius <= lockedBlock.y + lockedBlock.height &&
      balls.y + balls.radius > lockedBlock.y + lockedBlock.height &&
      balls.x + balls.radius >= lockedBlock.x &&
      balls.x - balls.radius < lockedBlock.x + lockedBlock.width
    ) {
      balls.y = lockedBlock.y + lockedBlock.height + balls.radius;
      balls.dy = -balls.dy;
    }
  }

  if (
    balls.y + balls.radius >= paddle.y &&
    balls.y - balls.radius <= paddle.y &&
    balls.x + balls.radius >= paddle.x &&
    balls.x - balls.radius <= paddle.x + paddle.width
  ) {
    balls.y = paddle.y - balls.radius;
    balls.dy = -Math.abs(balls.dy);
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
      scoreValue += 10;
      score.textContent = `Điểm: ${scoreValue}`;
    }
  }
}
const gameOver = new bootstrap.Modal(document.getElementById("gameover"));
const checkGameOver = () => {
  if (balls.y + balls.radius > canvas.height) return true;

};
function gameLoop() {
  drawBlocks();
    if (checkGameOver()) {
      gameOver.show();
      return;
    }
  moveBall();
  requestAnimationFrame(gameLoop);
}

gameLoop();
