const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const ballRadius = 15;
const holeRadius = 30;
let ball = { x: 100, y: 100 };
let hole = { x: Math.random() * (canvas.width - (2 * holeRadius)) + holeRadius, y: Math.random() * (canvas.height - (2 * holeRadius)) + holeRadius };
let score = 0;
let remainingTime = 60;
let startTime = Date.now();
let duration = 60000;
let keys = {};

function drawBall() 
{
  context.beginPath();
  context.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
  context.fillStyle = 'Blue';
  context.fill();
  context.closePath();
}

function drawHole() 
{
  context.beginPath();
  context.arc(hole.x, hole.y, holeRadius, 0, Math.PI * 2);
  context.fillStyle = 'Black';
  context.fill();
  context.closePath();
}

function draw() 
{
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawHole();
  requestAnimationFrame(draw);
}

function updateScore() 
{
  scoreDisplay.innerText = `Punkty: ${score}`;
}

function updateTimer() 
{
  const currentTime = Date.now();
  const elapsedTime = (currentTime - startTime) / 1000;
  remainingTime = 60 - elapsedTime;
  timerDisplay.textContent = `Czas: ${Math.max(remainingTime, 0).toFixed(0)}`; // zero miejsc po przecinu
}

window.addEventListener('keydown', (event) => 
{
  keys[event.key] = true;
});
  
window.addEventListener('keyup', (event) => 
{
  keys[event.key] = false;
});

function updateBallPosition() 
{
  if (keys.ArrowUp) 
    ball.y -= 2;

  if (keys.ArrowDown) 
    ball.y += 2;

  if (keys.ArrowLeft) 
    ball.x -= 2;

  if (keys.ArrowRight) 
    ball.x += 2;

  if (ball.x < ballRadius) // w sensie ściany żeby nie przechodziło
    ball.x = ballRadius;

  if (ball.x > canvas.width - ballRadius) 
    ball.x = canvas.width - ballRadius;

  if (ball.y < ballRadius) 
    ball.y = ballRadius;

  if (ball.y > canvas.height - ballRadius) 
    ball.y = canvas.height - ballRadius;

  checkCollision();
}

function checkCollision() 
{
  const dx = ball.x - hole.x;
  const dy = ball.y - hole.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < ballRadius + holeRadius) 
  {
    score++;
    updateScore();
    hole.x = Math.random() * (canvas.width - 2 * holeRadius) + holeRadius;
    hole.y = Math.random() * (canvas.height - 2 * holeRadius) + holeRadius;
  }
}

function gameLoop() {
  if (Date.now() - startTime < duration) 
  {
    updateTimer()
    updateBallPosition();
    requestAnimationFrame(gameLoop);
  } 
  else 
  {
    alert(`Koniec czasu. Twój wynik to ${score}`);

    score = 0;
    updateScore();
    startTime = Date.now();
    ball = { x: 100, y: 100 };
    hole = { x: Math.random() * (canvas.width - 2 * holeRadius) + holeRadius, y: Math.random() * (canvas.height - 2 * holeRadius) + holeRadius };
    requestAnimationFrame(gameLoop);
  }
}

draw();
requestAnimationFrame(gameLoop);