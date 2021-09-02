import timerMarkup from '../templates/timer-markup.hbs';

let timerIdNum = 1;

createTimerMarkup(timerIdNum);

const refs = {
    days: document.querySelector('span[data-value="days"]'),
    hours: document.querySelector('span[data-value="hours"]'),
    mins: document.querySelector('span[data-value="mins"]'),
    secs: document.querySelector('span[data-value="secs"]'),
};

const targetDate = new Date('2022/01/1');

const currentTime = Date.now();

console.log(currentTime);

console.log(targetDate);


function createTimerMarkup(id) {
    document.body.insertAdjacentHTML('afterbegin', timerMarkup(id));
    timerIdNum += 1;
}

function time() {
    return targetDate - Date.now();
}

setInterval((() => {
    const days = Math.floor(time() / (1000 * 60 * 60 * 24));
    
    const hours = Math.floor((time() % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    const mins = Math.floor((time() % (1000 * 60 * 60)) / (1000 * 60));
    
    const secs = Math.floor((time() % (1000 * 60)) / 1000);
    
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = mins;
    refs.secs.textContent = secs;
}), 1000);