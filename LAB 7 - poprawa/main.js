const canvas = document.getElementById('myCanvas')
const context = canvas.getContext('2d')
let ballRadius = 10
let balls = [];

// dx, dy - predkości
class Ball 
{
    constructor(x, y, dx, dy, radius) 
    {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.radius = radius
    }

    draw() 
    {
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.lineWidth = 2
        context.stroke()
        context.closePath()
    }

    update() 
    {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) 
            this.dx = -this.dx

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) 
            this.dy = -this.dy

        this.x += this.dx
        this.y += this.dy

        this.draw()
    }
}

function createBalls(count) 
{
    balls = []
    for (let i = 0; i < count; i++) 
    {
        let x = Math.random() * (canvas.width - ballRadius * 2) + ballRadius
        let y = Math.random() * (canvas.height - ballRadius * 2) + ballRadius
        let dx = (Math.random() - 0.5);
        let dy = (Math.random() - 0.5);
        balls.push(new Ball(x, y, dx, dy, ballRadius))
    }
}

function getDistance(x1, y1, x2, y2) 
{
    const dx = x2 - x1
    const dy = y2 - y1
    return Math.sqrt(dx * dx + dy * dy)
}

function drawLine(ball1, ball2) 
{
    context.beginPath()
    context.moveTo(ball1.x, ball1.y)
    context.lineTo(ball2.x, ball2.y)
    context.strokeStyle = 'black'
    context.lineWidth = 1
    context.stroke()
    context.closePath()
}

function animate() 
{
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)

    balls.forEach((ball, index) => 
    {
        ball.update()

        for (let i = index + 1; i < balls.length; i++) 
        {
            let otherBall = balls[i]
            let distance = getDistance(ball.x, ball.y, otherBall.x, otherBall.y)
            let distanceToDraw = parseInt(document.getElementById('distance').value, 10)

            if (distance < distanceToDraw) 
            {
                drawLine(ball, otherBall)
            }
        }
    })
}

document.getElementById('startSimulation').addEventListener('click', () => 
{
    let numberOfBalls = parseInt(document.getElementById('numberOfBalls').value)
    createBalls(numberOfBalls)
    animate()
})

document.getElementById('resetSimulation').addEventListener('click', () => 
{
    balls = []
    context.clearRect(0, 0, canvas.width, canvas.height)
})
