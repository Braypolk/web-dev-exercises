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
var gravity = 1;
var friction = .3;
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

});

window.addEventListener('mouseup',
    function(){
        init();
    }
);

window.addEventListener('resize', function(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

//capital letter indecates js object
function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArr[Math.floor(Math.random()*colorArr.length)];;

    
    this.update = function(){
        if(this.y + this.radius + this.dy >= canvas.height){
            this.dy = -this.dy;
            this.dy *= friction;
            this.dx *= friction;
        }
        else{
            this.dy += gravity;
        }
        //side window bounds for circle
        if(this.x + this.radius >= canvas.width || this.x - this.radius <= 0){
            this.dx = -this.dx * friction;
        }
        //top bounds
        
        this.x += this.dx;
        this.y += this.dy; 

        this.draw();
    }
    this.draw = function() { 
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
    }
}


var circleArr;
var gravityArr = [];

function init(){
    circleArr = [];
    for (let i = 0; i < 1000; i++) {
        var radius = randomIntFromRange(5, 40);
        var x = randomIntFromRange(radius, canvas.width - radius);
        var y = randomIntFromRange(0, canvas.height - radius);
        var dx = randomIntFromRange(-10, 10);
        var dy = randomIntFromRange(-5, 5);
        
        circleArr.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width, canvas.height);
    for (let i = 0; i < circleArr.length; i++) {
        circleArr[i].update();
        
    }
    
}
init(); 
animate();