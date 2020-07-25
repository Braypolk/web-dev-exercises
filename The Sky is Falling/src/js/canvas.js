import utils, { randomIntFromRange } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Star {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = {
      x: utils.randomIntFromRange(-4,4),
      y: 3
    }
    this.friction = 0.8
    this.gravity = 1
  }

  draw() {
    c.save()
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.shadowColor = '#e3eaef'
    c.shadowBlur = 20
    c.fill()
    c.closePath()
    c.restore()
  }

  update() {
    this.draw()

    //when ball hits bottom of screen
    if(this.y + this.radius + this.velocity.y> canvas.height - groundHeight){
      this.velocity.y = -this.velocity.y * this.friction;
      this.shatter()
    }
    else{
      this.velocity.y += this.gravity;
    }

    //hits side of screen
    if(this.x + this.radius + this.velocity.x > canvas.width || this.x - this.radius <= 0){
      this.velocity.x = -this.velocity.x
      this.shatter()
    }


    this.x += this.velocity.x
    this.y += this.velocity.y;
  }

  shatter() {
    this.radius -= 5
    for (let i = 0; i < 8; i++) {
      miniStars.push(new MiniStar(this.x, this.y, 2, 'blue'))
    }
  }
}

class MiniStar {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = {
      x: utils.randomIntFromRange(-5, 5),
      y: utils.randomIntFromRange(-15, 15)
    }
    this.friction = 1
    this.gravity = 0.6
    this.ttl = 100
    this.opacity = 1
  }

  draw() {
    c.save()
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = `rgba(227,234,239,${this.opacity})`
    c.shadowColor = '#e3eaef'
    c.shadowBlur = 20
    c.fill()
    c.closePath()
    c.restore()
  }

  update() {
    this.draw()

    //when ball hits bottom of screen
    if(this.y + this.radius + this.velocity.y> canvas.height - groundHeight){
      this.velocity.y = -this.velocity.y * this.friction;
    }
    else{
      this.velocity.y += this.gravity;
    }

    this.y += this.velocity.y;
    this.x += this.velocity.x;
    this.ttl -= 1;
    this.opacity -= 1/this.ttl 
  }
}

class createMountainRange {
  constructor(mountainAmount, height, color){
    this.mountainAmount = mountainAmount
    this.height = height
    this.color = color
    for (let i = 0; i < mountainAmount; i++) {
      const mountainWidth = canvas.width / mountainAmount
      c.beginPath()
      // drawing counter clockwise
      c.moveTo(i * mountainWidth, canvas.height)
      c.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height)
      c.lineTo(i * mountainWidth + mountainWidth/2, canvas.height - this.height)
      c.lineTo(i * mountainWidth - 325, canvas.height)
      c.fillStyle = this.color
      c.fill()
      c.closePath()
    }
  }
}

// Implementation
const backgroundGradient = c.createLinearGradient(0,0,0,canvas.height)
backgroundGradient.addColorStop(0, '#171e26')
backgroundGradient.addColorStop(1, '#3f586b')

let stars
let miniStars
let backgroundStars
let ticker = 0
let randomSpawnRate = 75
let groundHeight = 50
function init() {
  stars = []
  miniStars = []
  backgroundStars = []

  for(let i = 0; i < 150; i++){
    backgroundStars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 3, '#e3eaef'))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = backgroundGradient
  c.fillRect(0, 0, canvas.width, canvas.height)

  backgroundStars.forEach(backgroundStars => {
    backgroundStars.draw()
  })

  new createMountainRange(1, canvas.height-75, '#384551')
  new createMountainRange(2, canvas.height-100, '#2b3843')
  new createMountainRange(3, canvas.height-300, '#26333E')

  c.fillStyle = '#182028'
  c.fillRect(0,canvas.height - groundHeight, canvas.width, canvas.height)

  stars.forEach((star, index) => {
    star.update()
    if(star.radius == 0){
      stars.splice(index, 1)
    }
  })

  miniStars.forEach((miniStar, index) => {
    miniStar.update()
    if(miniStar.ttl == 0){
      miniStars.splice(index, 1)
    }
  })

  ticker++

  if(ticker % randomSpawnRate == 0){
    const radius = 15
    const x = Math.max(radius, (Math.random() * canvas.width - radius))
    stars.push(new Star(x, -100, radius, '#e3eaef'))
    randomSpawnRate = utils.randomIntFromRange(50,150)
  }
}

init()
animate()
