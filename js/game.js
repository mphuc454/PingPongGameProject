import {
  balls,
  paddle,
  lockedBlock,
  listLockedBlocks,
  doors,
  blocks,
  boss, paddle as b
} from "./component.js";
import "./events.js";

const params = new URLSearchParams(window.location.search);
const nameLevel = params.get("name");
document.getElementById("name-level").textContent = `LEVEL: ${nameLevel}`;
document.getElementById("level-name").textContent = `LEVEL: ${nameLevel}`;
document.getElementById("next-level").addEventListener("click", () => {
  let nextLevel = Number(nameLevel) + 1;
  if(nextLevel >= 4){
    location.href = "index.html?name=1"
  }else {
    location.href = `index.html?name=${nextLevel}`;
  }
})
let scoreValue = 0;
let score = document.getElementById("score-value");
score.textContent = `Điểm: ${scoreValue}`;

const canvas = document.getElementById("ping-pong-map");
const ctx = canvas.getContext("2d");

function drawBlocks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  if(nameLevel === "2"|| nameLevel === "4"){
    ctx.translate(canvas.width, canvas.height);
    ctx.rotate(Math.PI);

    if(nameLevel !== "4"){
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
  }
if(nameLevel !== "4"){
  ctx.fillStyle = "red";
  for (const b of blocks) {
    if (b.hp > 0) ctx.fillRect(b.x, b.y, b.width, b.height);
  }
}
if(nameLevel === "4" && boss.hp > 0){
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(boss.x, boss.y, boss.width, boss.height);
  ctx.save();
  ctx.translate(boss.x + boss.width / 2, boss.y + boss.height / 2);
  ctx.rotate(Math.PI);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillText(String(boss.hp), 0, 0)
  ctx.restore();
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
    if(nameLevel === "2" || nameLevel === "4"){
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
  if(nameLevel !== "4"){
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
  if(nameLevel === "4"){
    if (
        boss.hp > 0 &&
        balls.dy < 0 &&
        balls.y - balls.radius <= boss.y + boss.height &&
        balls.x + balls.radius >= boss.x &&
        balls.x - balls.radius < boss.x + boss.width
    ) {
      balls.y = boss.y + boss.height + balls.radius;
      boss.hp--;
      balls.dy = -balls.dy;
    }
  }
}
const gameOver = new bootstrap.Modal(document.getElementById("gameover"));
const gameWinner = new bootstrap.Modal(document.getElementById("winner"));

function checkGameOver ()  {
  if (balls.y + balls.radius > canvas.height) return true;

};
function gameLoop() {
  drawBlocks();
    if (checkGameOver()) {
      gameOver.show();
      return;
    }
    if(scoreValue >= 300 || boss.hp <= 0){
      gameWinner.show();
      return;
    }
  moveBall();
  requestAnimationFrame(gameLoop);
}

gameLoop();
