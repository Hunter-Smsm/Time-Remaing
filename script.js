let targetDate = new Date();

// Buttons, Inputs, TimerForm Start
const newBtn = document.querySelector(".main-container .btns .new");
const resetBtn = document.querySelector(".main-container .btns .reset");
const pauseBtn = document.querySelector(".main-container .btns .pause");
const newTime = document.querySelector(".main-container .new-time");
const timerOptionBtn = document.querySelector(
    ".main-container .new-time .options .timer"
);
const timerForm = document.querySelector(
    ".main-container .new-time .timer-form"
);
const secsInput = document.querySelector(
    ".main-container .new-time .timer-form .inputs div #seconds"
);
const minsInput = document.querySelector(
    ".main-container .new-time .timer-form .inputs div #mintues"
);
const hoursInput = document.querySelector(
    ".main-container .new-time .timer-form .inputs div #hours"
);
const createTimer = document.querySelector(
    ".main-container .new-time .timer-form .createTimer"
);
// Buttons, Inputs, TimerForm End

// set Target Time
function setTargetTime(addedHours, addedMins, addedSecs) {
    const initTimer = new Date();
    const currentHours = initTimer.getHours();
    const currentMins = initTimer.getMinutes();
    const currentSecs = initTimer.getSeconds();
    initTimer.setHours(
        currentHours + +addedHours,
        currentMins + +addedMins,
        currentSecs + +addedSecs
    );
    targetDate = initTimer;
    handelSecs();
    handelMins();
    handelHours();
    handelDays();
}

newBtn.addEventListener("click", () => {
    newTime.style.display =
        newTime.style.display === "block" ? "none" : "block";
});

timerOptionBtn.addEventListener("click", () => {
    timerForm.style.display =
        timerForm.style.display === "block" ? "none" : "block";
});

// Add Timer Events Start
createTimer.addEventListener("click", () => {
    window.localStorage.addedHours = hoursInput.value;
    window.localStorage.addedMins = minsInput.value;
    window.localStorage.addedSecs = secsInput.value;
    setTargetTime(hoursInput.value, minsInput.value, secsInput.value);
    newTime.style.display = "none";
    timerForm.style.display = "none";
});

resetBtn.addEventListener("click", () => {
    setTargetTime(
        window.localStorage.addedHours,
        window.localStorage.addedMins,
        window.localStorage.addedSecs
    );
});

pauseBtn.addEventListener("click", () => {
    if (pauseBtn.innerText === "Pause") {
        pauseBtn.innerText = "Resume";
        const CurrentTime = new Date();
        const currentHours = CurrentTime.getHours();
        const currentMins = CurrentTime.getMinutes();
        const currentSecs = CurrentTime.getSeconds();
        window.localStorage.remaingHours = targetDate.getHours() - currentHours;
        window.localStorage.remaingMins = targetDate.getMinutes() - currentMins;
        window.localStorage.remaingSecs = targetDate.getSeconds() - currentSecs;
        clearInterval(handelTimeLoop);
    } else if (pauseBtn.innerText === "Resume") {
        pauseBtn.innerText = "Pause";
        setTargetTime(
            window.localStorage.remaingHours,
            window.localStorage.remaingMins,
            window.localStorage.remaingSecs
        );
        handelTimeLoop = setInterval(() => {
            if (remaingSecs() >= 0) {
                handelSecs();
                handelMins();
                handelHours();
                handelDays();
            }
        }, 1000);
    }
});
// Add Timer Events End

function remaingSecs() {
    return (targetDate.getTime() - new Date().getTime()) / 1000;
}

let oldsecs = 0,
    oldmins = 0,
    oldHours = 0,
    oldDays = 0;

function handelSecs() {
    const oldNum = document.querySelector(".secs .down-old");
    const newNum = document.querySelector(".secs .down-new");
    let secs = Math.trunc(remaingSecs() % 60);
    if (secs >= 0 && secs !== oldsecs) {
        oldsecs = secs;
        oldNum.innerHTML = secs <= 9 ? `0${secs}` : secs;
        oldNum.className = "down-new";
        newNum.className = "down-old";
    }
    if (remaingSecs() > 0 && remaingSecs() < 1) {
        const end = new Audio("end.mp3");
        end.play();
    }
}

function handelMins() {
    const oldNum = document.querySelector(".mins .down-old");
    const newNum = document.querySelector(".mins .down-new");
    let mins = Math.trunc((remaingSecs() / 60) % 60);
    if (mins !== oldmins && mins >= 0) {
        oldmins = mins;
        oldNum.innerHTML = mins <= 9 ? `0${mins}` : mins;
        oldNum.className = "down-new";
        newNum.className = "down-old";
    }
}

function handelHours() {
    const oldNum = document.querySelector(".hours .down-old");
    const newNum = document.querySelector(".hours .down-new");
    let hours = Math.trunc((remaingSecs() / 60 / 60) % 24);
    if (hours !== oldHours && hours >= 0) {
        oldHours = hours;
        oldNum.innerHTML = hours <= 9 ? `0${hours}` : hours;
        oldNum.className = "down-new";
        newNum.className = "down-old";
    }
}

function handelDays() {
    const oldNum = document.querySelector(".days .down-old");
    const newNum = document.querySelector(".days .down-new");
    let days = Math.trunc((remaingSecs() / 60 / 60 / 24) % 365);
    if (days !== oldDays && days >= 0) {
        oldDays = days;
        oldNum.innerHTML =
            days <= 9 ? `00${days}` : days <= 99 ? `0${days}` : days;
        oldNum.className = "down-new";
        newNum.className = "down-old";
    }
}

let handelTimeLoop = setInterval(() => {
    if (remaingSecs() >= 0) {
        handelSecs();
        handelMins();
        handelHours();
        handelDays();
    }
}, 1000);
