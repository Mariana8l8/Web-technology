const player = document.querySelector(".player");
const victory = document.querySelector(".victory");
const defeat = document.querySelector(".defeat");
const timer = document.querySelector(".timer");
const dollInner = document.querySelector(".doll-inner");
const playAgainBtns = document.querySelectorAll(".play-again-btn");

let translateX = 0;
let moveInterval = null;
let gameOver = false;
let timerRunning = false;
let firstPress = true;
let dollTurned = false;

let dollFlip;
let dollBackFlip;

gunAudio = new Audio("sounds/gun.mp3");
turnAudio = new Audio("sounds/turn-sound.mp3");
songAudio = new Audio("sounds/doll-song.mp3");

function move() {
    if (dollTurned) {
        gameOver = true;
        defeat.classList.add("active");
        clearTimeout(dollFlip);
        clearTimeout(dollBackFlip);
        gunAudio.play();
        return
    }

    translateX++;
    player.style.transform = `translateX(${translateX}px)`;

    if (translateX >= 1150) {
        clearInterval(moveInterval);
        moveInterval = null;
        gameOver = true;
        victory.classList.add("active");
        clearTimeout(dollFlip);
        clearTimeout(dollBackFlip);
        songAudio.pause();
    }
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && moveInterval === null && !gameOver) {
        moving = true;
        moveInterval = setInterval(move, 100);

        if (firstPress) {
            dollTurnAfter();
            timerRunning = true;
            changeTime();
            firstPress = false;
        }
    }
})

document.addEventListener("keyup", function (event) {
    if (event.code === "Space") {
        clearInterval(moveInterval);
        moveInterval = null;
    }
})

function changeTime() {
    if (gameOver) {
        return;
    }

    let time = timer.textContent;
    let minutes = parseInt(time.split(":")[0]);
    let seconds = parseInt(time.split(":")[1]);

    if (seconds === 0 && minutes !== 0) {
        minutes--;
        seconds = 59;
    } else if (seconds !== 0) {
        seconds--;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    timer.textContent = `0${minutes} : ${seconds}`;

    if (minutes === 0 && seconds === "00") {
        defeat.classList.add("active");
        gunAudio.play();
        gameOver = true;
        clearInterval(moveInterval);
        moveInterval = null;
        return;
    }

    setTimeout(changeTime, 1000);
}

function flipDoll() {
    if (dollInner.classList.contains("flipped")) {
        dollInner.classList.remove("flipped");
        dollTurned = false;
    } else {
        dollInner.classList.add("flipped");
    }
}

function dollTurnAfter() {
    songAudio.currentTime = 0;
    let ms = (Math.random() * 5 + 3) * 1000;
    songAudio.play();
    dollFlip = setTimeout(function () {
        songAudio.pause()
        turnAudio.play()
        flipDoll();
    }, ms);

    setTimeout(function () {
        dollTurned = true;
    }, ms + 500);

    dollBackFlip = setTimeout(function () {
        flipDoll();
        dollTurnAfter();
    }, ms + 3000);
}

songAudio.addEventListener("ended", function () {
    songAudio.currentTime = 0;
    songAudio.play();
})

for(let i = 0; i < playAgainBtns.length; i++) {
    playAgainBtns[i].addEventListener("click", function () {
        victory.classList.remove("active");
        defeat.classList.remove("active");
        translateX = 0;
        player.style.transform = `translateX(${translateX}px)`;
        timer.textContent = "05 : 00";
    
        moveInterval = null;
        gameOver = false;
        timerRunning = false;
        firstPress = true;
    
        if (dollTurned) {
            dollInner.classList.remove("flipped");
            dollTurned = false;
        }
    })
}