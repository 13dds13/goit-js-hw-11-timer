import timerMarkupTpl from '../templates/timer-markup.hbs';

class CountdownTimer {

    static TIMER_ID_NUM = 1;
    
    constructor(targetDate, eventType, parent) {
        this.id = `timer-${CountdownTimer.TIMER_ID_NUM}`;
        this.eventType = eventType;
        this.targetDate = targetDate;
        this.parent = parent;
        CountdownTimer.TIMER_ID_NUM += 1;
    }

    addTimerMarkup(place, cb) {
        this.parent.insertAdjacentHTML(`${place}`, cb(this));
    }
    
    findAllSpan() {
        const daysSpan = document.querySelector('span[data-value="days"]');
        const hoursSpan = document.querySelector('span[data-value="hours"]');
        const minsSpan = document.querySelector('span[data-value="mins"]');
        const secsSpan = document.querySelector('span[data-value="secs"]');

        return { daysSpan, hoursSpan, minsSpan, secsSpan };
    }

    timeData() {
        const intervalId = setInterval((() => {
            const timeDiff = new Date(this.targetDate) - Date.now();
            const refs = this.findAllSpan();

            const days = String(Math.floor(timeDiff / (1000 * 60 * 60 * 24))).padStart(2, 0);
            const hours = String(Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, 0);
            const mins = String(Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, 0);
            const secs = String(Math.floor((timeDiff % (1000 * 60)) / 1000)).padStart(2, 0);

            refs.daysSpan.textContent = days;
            refs.hoursSpan.textContent = hours;
            refs.minsSpan.textContent = mins;
            refs.secsSpan.textContent = secs;

            if (days === '00' && hours === '00' && mins === '00' && secs === '00') {
                clearInterval(intervalId);
                return;
            }
        }), 1000)
    }

};


const parent = document.body;

const newTimer = new CountdownTimer('2022/01/01', 'New Year', parent);
console.log(newTimer);

newTimer.addTimerMarkup('afterbegin', timerMarkupTpl);

newTimer.timeData();