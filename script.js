const canvas = document.querySelector('canvas')

const canvasHeight = getComputedStyle(canvas).height
const canvasWidth = getComputedStyle(canvas).width

canvas.setAttribute('height', canvasHeight)
canvas.setAttribute('width', canvasWidth)

const context = canvas.getContext('2d')

class Rectangle {
  constructor(x, y, width, height, color) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
  }

  render() {
    // x, y, width, height
    context.fillStyle = this.color
    context.fillRect(this.x, this.y, this.width, this.height)
  }

  leftEdge() {
    return this.x
  }

  rightEdge() {
    return this.x + this.width
  }

  topEdge() {
    return this.y
  }

  bottomEdge() {
    return this.y + this.height
  }

  isCollidingWith(other) {
    const horizHit = this.leftEdge() <= other.rightEdge() && this.rightEdge() >= other.leftEdge()
    const vertHit = this.topEdge() <= other.bottomEdge() && this.bottomEdge() >= other.topEdge()

    return horizHit && vertHit
  }
}

class Enemy extends Rectangle {
  constructor(x, y) {
    super(x, y, 50, 80, 'orange')
    this.alive = true
  }

  render() {
    super.render()
    this.y -= 1
  }
}

const player = new Rectangle(100, 200, 50, 50, 'green')

const enemies = [
  new Enemy(175, 250),
  new Enemy(250, 300),
  new Enemy(500, 125)
]

const PLAYER_SPEED = 20

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    player.y -= PLAYER_SPEED
  } else if (event.key === 'ArrowDown') {
    player.y += PLAYER_SPEED
  } else if (event.key === 'ArrowLeft') {
    player.x -= PLAYER_SPEED
  } else if (event.key === 'ArrowRight') {
    player.x += PLAYER_SPEED
  }
})

const checkCollision = (enemy) => {
  if (player.isCollidingWith(enemy)) {
    enemy.alive = false
  }
}

const checkWin = () => {
  if (enemies.every(e => !e.alive)) {
    clearInterval(intervalId)
    alert('you win!')
  }
}

const intervalId = setInterval(() => {
  checkWin()
  context.clearRect(0, 0, canvas.width, canvas.height)
  player.render()
  enemies.forEach(e => {
    if (e.alive) e.render()
    checkCollision(e)
  })
}, 50);

