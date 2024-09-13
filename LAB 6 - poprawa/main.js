const canvas = document.getElementById('gameCanvas')
const context = canvas.getContext('2d')
const scoreDisplay = document.getElementById('score')
const timerDisplay = document.getElementById('timer')
const ballRadius = 15
const holeRadius = 70
const numberOfHoles = 2
let ball = { x: 100, y: 100 }
//let hole = { x: Math.random() * (canvas.width - (2 * holeRadius)) + holeRadius, y: Math.random() * (canvas.height - (2 * holeRadius)) + holeRadius }
let holes = [];
let currentHoleIndex = 0;
let score = 0
let remainingTime = 60
let startTime = Date.now()
let duration = 60000
let tilt = { alpha: 0, beta: 0, gamma: 0 }

function drawBall() 
{
  context.beginPath()
  context.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2)
  context.fillStyle = 'Blue'
  context.fill()
  context.closePath()
}

function createHoles() 
{
    holes = []
    for (let i = 0; i < numberOfHoles; i++) 
    {
        holes.push(
        {
            x: Math.random() * (canvas.width - 2 * holeRadius) + holeRadius, 
            y: Math.random() * (canvas.height - 2 * holeRadius) + holeRadius
        })
    }
}

function drawHoles() 
{
    holes.forEach(hole => 
    {
        context.beginPath()
        context.arc(hole.x, hole.y, holeRadius, 0, Math.PI * 2)
        context.fillStyle = 'Black'
        context.fill()
        context.closePath()
    });
}

function draw() 
{
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawBall()
    drawHoles()
    requestAnimationFrame(draw)
}

function updateScore() 
{
    scoreDisplay.innerText = `Punkty: ${score}`
}

function updateTimer() 
{
    const currentTime = Date.now()
    const elapsedTime = (currentTime - startTime) / 1000
    remainingTime = 60 - elapsedTime
    timerDisplay.textContent = `Czas: ${Math.max(remainingTime, 0).toFixed(0)}` // zero miejsc po przecinu
}

window.addEventListener('deviceorientation', (event) => 
{
    tilt.alpha = event.alpha
    tilt.beta = event.beta
    tilt.gamma = event.gamma
})
  
function updateBallPosition() 
{
    ball.x -= tilt.gamma * 0.02
    ball.y -= tilt.beta * 0.02
  
    if (ball.x < ballRadius) 
        ball.x = ballRadius

    if (ball.x > canvas.width - ballRadius) 
        ball.x = canvas.width - ballRadius

    if (ball.y < ballRadius) 
        ball.y = ballRadius

    if (ball.y > canvas.height - ballRadius) 
        ball.y = canvas.height - ballRadius
  
    checkCollision()
}

function checkCollision() 
{
    for (let i = 0; i < holes.length; i++) 
    {
        const dx = ball.x - holes[i].x
        const dy = ball.y - holes[i].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < ballRadius + holeRadius) 
        {
            score++
            updateScore()
    
            holes.splice(i, 1)
    
            ball.x = 100
            ball.y = 100

            break
        }
    }

    if (holes.length === 0) 
    {
        alert(`Koniec, wyni: ${score}`)
        score = 0
        updateScore()
        startTime = Date.now()
        ball = { x: 100, y: 100 }
        currentHoleIndex = 0;
        createHoles()
        draw()
        requestAnimationFrame(gameLoop)
    }
}

function gameLoop() 
{
    if (Date.now() - startTime < duration) 
    {
        updateTimer()
        updateBallPosition()
        requestAnimationFrame(gameLoop)
    } 
    else 
    {
        alert(`Koniec czasu. Twój wynik to ${score}`)

        score = 0
        updateScore()
        startTime = Date.now()
        ball = { x: 100, y: 100 }
        currentHoleIndex = 0;
        createHoles()
        draw()
        //hole = { x: Math.random() * (canvas.width - 2 * holeRadius) + holeRadius, y: Math.random() * (canvas.height - 2 * holeRadius) + holeRadius }
        requestAnimationFrame(gameLoop)
    }
}

createHoles()
draw()
requestAnimationFrame(gameLoop)