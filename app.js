let gameSeq = [];
let userSeq = [];

let startBtn = document.querySelector(".start-btn");

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highest = level;

let h3 = document.querySelector(".show-details");

if (window.innerWidth <= 768) {
    h3.innerHTML = "Press <b>start</b> button to start";
}

document.addEventListener("keypress", function() {
    if(started == false) {
        console.log("Game started...");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) { 
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },250); 
}

function userFlash(btn) { 
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    },250); 
}

function levelUp() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;

    let randIndex = Math.floor(Math.random() * 4);
    let randColor = btns[randIndex];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
            highestScore();
        }
    } else {
        if (isMobileDevice()) {
            if(level == 0) {
                h3.innerHTML = `Game Over! Your score is <b>${level}</b> <br> Press <b>start</b> button to start`;
            } else {
               h3.innerHTML = `Game Over! Your score is <b>${level - 1}</b> <br> Press <b>start</b> button to start`;
            }
            startBtn.innerText = "Start";
        } else {
            if(level == 0) {
                h3.innerHTML = `Game Over! Your score is <b>${level}</b> <br> Press any key to start`;
            } else {
               h3.innerHTML = `Game Over! Your score is <b>${level - 1}</b> <br> Press any key to start`;
            }
        }

        
        reset();
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        },250);
    }
}

function highestScore() {
    if(highest < level) {
        highest = level;
    }
    document.querySelector("p").innerHTML = `<b>Highest Score : ${highest}<b>`;
}

function btnPress() {
    console.log(this); 
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn")
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

startBtn.addEventListener("click", function() {
    if (started == false) {
        console.log("Game started...");
        started = true;
        setTimeout(levelUp, 1000);
        startBtn.innerText = "Game started...";
    }
});

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}