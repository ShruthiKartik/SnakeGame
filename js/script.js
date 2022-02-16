let inputDirection = { x: 0, y: 0 };
let foodSound = new Audio('music/food.mp3');
let gameoverSound = new Audio('music/gameover.mp3');
let moveSound = new Audio('music/move.mp3');
let musicSound = new Audio('music/music.mp3');
let lastPaintime = 0;
let speed = 5;
let snakeArr = [           //Array of objects
    { x: 12, y: 15 }
];
let food = { x: 5, y: 13 };
let score = 0,highScoreval=0;

function main(ctime) {
    window.requestAnimationFrame(main);   //Requests browser to call animation function before the next repaint
    let elasped = (ctime - lastPaintime) / 1000;
    if (elasped < 1 / speed) {
        return;
    }
    lastPaintime = ctime;
    gameEngine();
}

function isCollide(sarr) {
    for (let i = 1; i < sarr.length; i++) {
        if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
            return true;
        }
    }
    if (sarr[0].y <= 0 || sarr[0].y >= 18 || sarr[0].x >= 18 || sarr[0].x <= 0) {
        return true;
    }
    return false;
}
function gameEngine() {
    //Updation of snake and food

    if (isCollide(snakeArr)) {
        gameoverSound.play();
        musicSound.pause();
        inputDirection = { x: 0, y: 0 };
        alert('Game Over. Press any key to play again!');
        score = 0;
        musicSound.play();
        snakeArr = [{ x: 12, y: 15 }];
    }

    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) { //When snake eats food
        foodSound.play();
        score += 1;
        if(score>highScoreval){
            highScoreval=score;
            localStorage.setItem("highScore",JSON.stringify(highScoreval));
            HiscoreBox.innerHTML="High Score: "+highScoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y });
        let a = 2, b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };  //spread operator to clone properties from one object to another
    }
    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;


    //Display of snake
    board.innerHTML = "";
    snakeArr.forEach((element, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //Display of food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}





//Main Logic
let highScore=localStorage.getItem("highScore");
if(highScore===null){
    highScoreval=0;
    localStorage.setItem("highScore",JSON.stringify(highScoreval));
}
else{
    highScoreval=JSON.parse(highScore);
    HiscoreBox.innerHTML="High Score: "+highScoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', element => {
    scoreBox.innerHTML = "Score: " + score;
    inputDirection = { x: 0, y: 1 };
    musicSound.play();
    moveSound.play();
    switch (element.key) {
        case "ArrowUp":
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;
        case "ArrowDown":
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;
        case "ArrowLeft":
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;
        case "ArrowRight":
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;

        default:
            break;
    }
});