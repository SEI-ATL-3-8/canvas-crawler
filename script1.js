console.log("Linked")


const canvas = document.querySelector('canvas')

canvas.setAttribute('height', getComputedStyle(canvas).height)
canvas.setAttribute('width', getComputedStyle(canvas).width)

// used to show we are using 2d context
const context = canvas.getContext('2d')

class Rectangle {
    constructor(x, y, width, height, color){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }
    render(){
        console.log(this)
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, this.width, this.height)
        console.log("render")
    }
    leftEdge(){
        return this.x
    }
    rightEdge(){
        return this.x + this.width
    }
    topEdge(){
        return this.y
    }
    bottomEdge(){
        return this.y + this.height
    }
}

class Enemy extends Rectangle{
    constructor(x, y) {
        super(x, y, 50, 50, 'red')
    }
}



const player = new Rectangle(100, 100, 50, 50, "green")
const enemies =[
    new Enemy(10, 100),
    new Enemy(100, 10),
    new Enemy(10, 10),
]


document.addEventListener ('keydown', (event) => {
    console.log(event.key);
    if(event.key == "a"){
        console.log("left");
        player.x += -5
        
    }
    else if(event.key == 'd'){
        console.log("right")
        player.x  += 5
    }
    else if(event.key == 'w'){
        console.log("up")
        player.y += -5
    }
    else if(event.key == 's'){
        console.log("down")
        player.y += 5
    }
})


setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    player.render()
    enemies.forEach(e => {
        e.render()
        checkCollision(e)
    })
}, 50)



const checkCollision = (enemy) => {
    const horizHit = player.leftEdge() < enemy.rightEdge() && player.rightEdge() > enemy.leftEdge()
    const vertHit = player.topEdge() < enemy.bottomEdge() && player.bottomEdge() > enemy.topEdge()

    if (horizHit && vertHit){
        console.log("hit for reals")
    }
}






