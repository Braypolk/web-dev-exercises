var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//context
var c = canvas.getContext('2d');

//rectangle
// c.fillStyle = "blue";
// c.fillRect(100, 100, 100, 100);

//line
// c.beginPath();
// c.moveTo(100, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 29);
// c.strokeStyle = "red";
// c.stroke();

//arc / circle

// for (let index = 0; index < 100; index++) {
//     var rand = Math.random()*canvas.width;
//     var rand2 = Math.random()*canvas.height;
//     var r = (Math.random()*255);
//     var r1 = (Math.random()*255);
//     var r2 = (Math.random()*255);
//     c.beginPath();
//     c.strokeStyle = `rgba(${r},${r1},${r2},1)`;
//     c.arc(rand, rand2, 30, 0, Math.PI * 2, false);
//     c.stroke();
    
// }

var maxRadius = 50;
var minRadius = 5;
var colorArr = [
    '#734C4F',
    '#B4D9D5',
    '#F24130',
    '#BF584E',
    '#F2F2F2'    
]

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', 
    //event returns MouseEvent Object
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
        this.console.log(mouse);

})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

//capital letter indecates js object
function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArr[Math.floor(Math.random()*colorArr.length)];;

    this.draw = function() { 
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = function(){
        //side window bounds for circle
        if(this.x + radius >= innerWidth || this.x - radius <= 0){
            this.dx = -this.dx;
        }
        //top bounds
        if(this.y + radius >= innerHeight || this.y - radius <= 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //ineractions
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if(this.radius < maxRadius){
                this.radius += 10;
            }
        }
        else if (this.radius > this.minRadius){
            this.radius -=1;
        }


        this.draw();
    }
}


var circleArr = [];
function init(){
    circleArr = [];
    for (let i = 0; i < 1000; i++) {
        var radius = Math.random() * 10 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (((Math.random() - 0.5) * 2) * 5);
        var dy = (((Math.random() - 0.5) * 2) * 5);
        
        circleArr.push(new Circle(x, y, dx, dy, radius))    
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth, innerHeight);
    for (let i = 0; i < circleArr.length; i++) {
        circleArr[i].update();
        
    }
    



}
init();
animate();