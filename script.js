const getSearchDate = window.location.search.slice(1);

const targetDate = new Date(getSearchDate);

function remaingSecs() {
    return (targetDate.getTime() - new Date().getTime()) / 1000;
}

let oldmins, oldHours, oldDays;

function handelSecs() {
    const oldNum = document.querySelector(".secs .down-old");
    const newNum = document.querySelector(".secs .down-new");
    let secs = Math.trunc(remaingSecs() % 60);
    if (secs >= 0) {
        oldNum.innerHTML = secs <= 9 ? `0${secs}` : secs;
        oldNum.className = "down-new";
        newNum.className = "down-old";
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

handelSecs();
handelMins(1);
handelHours();
handelDays();

setInterval(() => {
    handelSecs();
    handelMins();
    handelHours();
    handelDays();
}, 1000);
