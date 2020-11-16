var canvas = document.getElementById("canv");
var c = canvas.getContext("2d");
var Ballspeed = 1;
var Paddlespeed = 1;

class Paddle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 200;
        this.h = 20;
        this.xSpeed = 0;
    }
    show() {
        c.fillStyle = 'black';
        c.fillRect(this.x, this.y, this.w, this.h);
    }
    update() {
        this.x += this.xSpeed * Paddlespeed;
        
        if (this.x + this.w/2 > ball.x && this.x < ball.x + ball.w && this.y + this.h > ball.y && this.y < ball.y + ball.h) {
            ball.ySpeed = -6 * Ballspeed;
            ball.xSpeed = -5 * Ballspeed;
        }        
        if (this.x + this.w > ball.x && this.x+this.w/2 < ball.x + ball.w && this.y + this.h > ball.y && this.y < ball.y + ball.h) {
            ball.ySpeed = -6 * Ballspeed;
            ball.xSpeed = 5 * Ballspeed;
        }
    }
}

class Brick {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.w = 70;
        this.h = 40;
        this.color = color;
        this.visible = true;
    }
    show() {
        if (this.visible) {
            c.fillStyle = this.color
            c.fillRect(this.x, this.y, this.w, this.h)
        }
        
        if (this.x + this.w > ball.x && this.x < ball.x + ball.w && this.y + this.h > ball.y && this.y < ball.y + ball.h && this.visible) {
            this.visible = false
            ball.ySpeed = 6 * Ballspeed;
            /*if (this.y === 210) {
                score += 1;
            } else if (this.y === 160) {
                score += 2;
            } else if (this.y === 110) {
                score += 3;
            } else if (this.y === 60) {
                score += 4;
            } else {
                score += 5;
            }*/
            if (this.color == 'blue') {
                score += 1;
            }
            else if (this.color == 'red') {
                score += 3;
                Ballspeed += 0.2;
            }
            else if (this.color == 'orange') {
                score -= 1;
                Paddlespeed += 2;
            }
            else if (this.color == 'purple') {
                score += 10;
            }
                

            

            document.getElementById("showScore").innerHTML = "Score " + score;
        }
        
    }
}

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;
        this.xSpeed = 0;
        this.ySpeed = 0;
    }
    show() {
        c.fillStyle = 'purple';
        c.fillRect(this.x, this.y, this.w, this.h);
        
        this.x += this.xSpeed*Ballspeed;
        this.y += this.ySpeed*Ballspeed;
        
        if (this.x <= 0) {
            this.xSpeed = 6 * Ballspeed
        }
        if (this.x + this.w >= 800) {
            this.xSpeed = -6 * Ballspeed;
        }
        
        if (this.y <= 0) {
            this.ySpeed = 6 * Ballspeed;
        }
    }
}

var paddle;
var bricks = [];

var bx = 5;
var by = 210;

var brickColor = 'red'

var ball;

var ballMoving = false;

var score = 0;

var started = false;

var lost = false;

var won = false;

window.onload = function() {
    start();
    setInterval(update, 10);
}

function start() {
    paddle = new Paddle(300, 700);
    
    for (let i = 0; i < 50; i++) {
        if (Math.floor((Math.random() * 20) + 1) == 1) {
            brickColor = 'red';
        }
        else if (Math.floor((Math.random() * 20) + 1) == 1) {
            brickColor = 'orange'
        }
        else if (Math.floor((Math.random() * 20) + 1) == 1) {
            brickColor = 'purple'
        }
        else {
            brickColor = 'blue';
        }
        var b = new Brick(bx, by, brickColor);
        bricks.push(b);
        bx+=80;
        if (bx >= 740) {
            bx = 5;
            by-=50;
        }
    }
    ball = new Ball(400-10, 700-20);
}

function update() {
    //background
    c.fillStyle = 'lightblue';
    c.fillRect(0, 0, 800, 800);
    //paddle
    paddle.show();
    paddle.update();
    //bricks
    for (let i = 0; i < bricks.length; i++) {
        bricks[i].show();
    }
    //ball
    ball.show();
    if (!ballMoving) {
        ball.x = paddle.x+paddle.w/2-ball.w/2;
        ball.xSpeed = 0;
        ball.ySpeed = 0;
    }
    //menu
    if (!started) {
        document.getElementById("start").style.display = "block";
    } else {
        document.getElementById("start").style.display = "none";
    }
    //game over
    if (ball.y >= 800) {
        lost = true;
    }
    else if (ball.y <= 0) {
        won = true
    }
    if (lost) {
        document.getElementById("gameEnd").style.display = "block";
        document.getElementById("restart").style.display = "block";
        document.getElementById("continue").style.display = "block";
    }
    if (won) {
        document.getElementById("gameWon").style.display = "block";
        document.getElementById("restart").style.display = "block";
        document.getElementById("continue").style.display = "block";
    }
}

function keyDown(e) {
    if (e.keyCode === 39) {
        paddle.xSpeed = 8;
    }
    if (e.keyCode === 37) {
        paddle.xSpeed = -8;
    }
    if (e.keyCode === 13 && !ballMoving) {
        ball.ySpeed = -6;
        ballMoving = true;
        started = true;
    }
}

function keyUp(e) {
    if (e.keyCode === 39) {
        paddle.xSpeed = 0;
    }
    if (e.keyCode === 37) {
        paddle.xSpeed = 0;
    }
}

document.onkeydown = keyDown;
document.onkeyup = keyUp;

function cont() {
    started = false;
    ballMoving = false;
    ball.ySpeed = 0;
    ball.xSpeed = 0;
    ball.x = paddle.x;
    ball.y = paddle.y;
    lost = false;
    won = false;
    document.getElementById("gameEnd").style.display = "none";
    document.getElementById("restart").style.display = "none";
    document.getElementById("continue").style.display = "none";
    ball.ySpeed = 0;
}