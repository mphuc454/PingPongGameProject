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

const canvas = document.getElementById("ping-pong-map");
const ctx = canvas.getContext("2d");
let balls = { x: 200, y: 250, radius: 7, dx: 3, dy: -3 };
let paddle = { x: 160, y: 350, width: 100, height: 30 };
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
function drawBlocks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "red";
  for (const b of blocks) {
    if (b.hp > 0) ctx.fillRect(b.x, b.y, b.width, b.height);
  }

  ctx.fillStyle = "black";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(balls.x, balls.y, balls.radius, 0, Math.PI * 2);
  ctx.fill();
}

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  paddle.x = Math.max(
    0,
    Math.min(mouseX - paddle.width / 2, canvas.width - paddle.width),
  );
});
function moveBall() {
  balls.x += balls.dx;
  balls.y += balls.dy;
  if (balls.x - balls.radius < 0 || balls.x + balls.radius > canvas.width) {
    balls.dx = -balls.dx;
  }
  if (balls.y - balls.radius < 0) {
    balls.dy = -balls.dy;
  }
  if (
    balls.dy > 0 &&
    balls.y + balls.radius >= paddle.y &&
    balls.x >= paddle.x &&
    balls.x < paddle.x + paddle.width
  ) {
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
    }
  }
}
const gameOver = new bootstrap.Modal(document.getElementById("gameover"));
const checkGameOver = () => {
  if (balls.y + balls.radius > canvas.height) {
    return true;
  }
  return false;
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
