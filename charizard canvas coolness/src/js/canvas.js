import utils from './utils'
import Dot from './dot'
import gsap from 'gsap'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const img = document.querySelector('img')
const radius = 300
let isImage = false

canvas.width = innerWidth
canvas.height = innerHeight

function animateDot(dot, canvas){
  const rand = Math.random() * Math.PI * 2

  let x = Math.sin(rand) * radius + canvas.width/2
  let y = Math.cos(rand) * radius + canvas.height/2
  if(isImage){
    x = dot.imageX
    y = dot.imageY
  }

  gsap.to(dot, {
    duration: 1.5 + Math.random(),
    x,
    y,
    ease: 'cubic.inOut',
    onComplete: () =>{
      animateDot(dot, canvas)
    }
  })
}

addEventListener('click', () => {
  isImage = !isImage
})

addEventListener('load', () =>{
  c.drawImage(img, 0,0)
  const imageData = c.getImageData(0,0,img.naturalWidth, img.naturalHeight).data

  const pixels = []
  const dots = []
  for (let i = 0; i < imageData.length; i += 4) {
    if (imageData[i] === 0) continue
    const x = (i/4) % img.naturalWidth
    const y = Math.floor(Math.floor(i / img.naturalWidth) / 4)
    
    if(x%5 === 0 && y % 5 === 0){

      pixels.push({
        x,
        y,
        r: imageData[i],
        g: imageData[i+1],
        b: imageData[i+2]
      })
    }
  }

  pixels.forEach((pixel, i) => {
    const imgX = pixel.x + canvas.width/2 - img.naturalWidth/2
    const imgY = pixel.y + canvas.height/2 - img.naturalHeight/2

    const rand = Math.random() * Math.PI * 2
    const startX = Math.sin(rand) * radius + canvas.width/2
    const startY = Math.cos(rand) * radius + canvas.height/2
    dots.push(new Dot(startX,startY,pixel.r,pixel.g,pixel.b,imgX,imgY))

    animateDot(dots[i], canvas)
  })


  
  function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0,innerWidth, innerHeight)
    dots.forEach(dot => {
      dot.draw(c)
    })
  }

  animate()

  console.log(dots)
})
