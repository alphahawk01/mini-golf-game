// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('resetButton');

canvas.width = 800;
canvas.height = 600;

let ball = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  radius: 10,
  dx: 0,
  dy: 0,
};

let hole = {
  x: canvas.width / 2,
  y: 50,
  radius: 15,
};

let score = 0;
let isDragging = false;

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#ffeb3b';
  ctx.fill();
  ctx.closePath();
}

function drawHole() {
  ctx.beginPath();
  ctx.arc(hole.x, hole.y, hole.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#000';
  ctx.fill();
  ctx.closePath();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function detectCollision() {
  const dx = ball.x - hole.x;
  const dy = ball.y - hole.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < ball.radius + hole.radius) {
    score++;
    scoreDisplay.textContent = score;
    resetBall();
  }
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height - 30;
  ball.dx = 0;
  ball.dy = 0;
}

canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (
    mouseX > ball.x - ball.radius &&
    mouseX < ball.x + ball.radius &&
    mouseY > ball.y - ball.radius &&
    mouseY < ball.y + ball.radius
  ) {
    isDragging = true;
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    ball.dx = (mouseX - ball.x) * 0.1;
    ball.dy = (mouseY - ball.y) * 0.1;
  }
});

canvas.addEventListener('mouseup', () => {
  isDragging = false;
});

function update() {
  clearCanvas();
  drawHole();
  drawBall();

  if (!isDragging) {
    ball.x += ball.dx;
    ball.y += ball.dy;

    ball.dx *= 0.98;
    ball.dy *= 0.98;

    if (Math.abs(ball.dx) < 0.1) ball.dx = 0;
    if (Math.abs(ball.dy) < 0.1) ball.dy = 0;
  }

  detectCollision();
  requestAnimationFrame(update);
}

resetButton.addEventListener('click', () => {
  score = 0;
  scoreDisplay.textContent = score;
  resetBall();
});

update();
