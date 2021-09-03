import timerMarkupTpl from '../templates/timer-markup.hbs';

class CountdownTimer {

    static TIMER_ID_NUM = 1;
    
    constructor(targetDate, parent) {
        this.id = `timer-${CountdownTimer.TIMER_ID_NUM}`;
        this.targetDate = targetDate;
        this.parent = parent;
        CountdownTimer.TIMER_ID_NUM += 1;
    }

    addTimerMarkup(place, cb) {
        this.parent.insertAdjacentHTML(`${place}`, cb());
    }
    
    timeData() {
        const intervalId = setInterval((() => {
            const timeDiff = new Date(this.targetDate) - Date.now();

            const days = String(Math.floor(timeDiff / (1000 * 60 * 60 * 24))).padStart(2, 0);
            const hours = String(Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, 0);
            const mins = String(Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, 0);
            const secs = String(Math.floor((timeDiff % (1000 * 60)) / 1000)).padStart(2, 0);

            document.querySelector('span[data-value="days"]').textContent = days;
            document.querySelector('span[data-value="hours"]').textContent = hours;
            document.querySelector('span[data-value="mins"]').textContent = mins;
            document.querySelector('span[data-value="secs"]').textContent = secs;

            if (days === '00' && hours === '00' && mins === '00' && secs === '00') {
                clearInterval(intervalId);
                return;
            }
        }), 1000)
    }

};


const parent = document.body;

const newTimer = new CountdownTimer('2022/01/01', parent);

newTimer.addTimerMarkup('afterbegin', timerMarkupTpl);

newTimer.timeData();