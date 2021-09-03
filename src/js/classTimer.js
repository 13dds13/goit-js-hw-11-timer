import timerMarkupTpl from '../templates/timer-markup.hbs';

export class CountdownTimer {

    static TIMER_ID_NUM = 1;
    static DELAY = 1000;
    static TIMER_LOCATION = 'afterbegin';
    
    constructor({targetDate, eventType, parent}) {
        this.id = `timer-${CountdownTimer.TIMER_ID_NUM}`;
        this.eventType = eventType;
        this.targetDate = targetDate;
        this.parent = parent;
        CountdownTimer.TIMER_ID_NUM += 1;
        this.addTimerMarkup(CountdownTimer.TIMER_LOCATION);
        this.refs = this.findAllSpan();
    }

    addTimerMarkup(place) {
        this.parent.insertAdjacentHTML(`${place}`, timerMarkupTpl(this));
    }
    
    findAllSpan() {
        const container = document.querySelector(`[id=${this.id}`);
        const daysSpan = container.querySelector('span[data-value="days"]');
        const hoursSpan = container.querySelector('span[data-value="hours"]');
        const minsSpan = container.querySelector('span[data-value="mins"]');
        const secsSpan = container.querySelector('span[data-value="secs"]');

        return { daysSpan, hoursSpan, minsSpan, secsSpan };
    }

    timeData() {
        const timeDiff = new Date(this.targetDate) - Date.now();
            
        const days = String(Math.floor(timeDiff / (1000 * 60 * 60 * 24))).padStart(2, 0);
        const hours = String(Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, 0);
        const mins = String(Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, 0);
        const secs = String(Math.floor((timeDiff % (1000 * 60)) / 1000)).padStart(2, 0);
            
        return { days, hours, mins, secs };
        }

    setTimeToSpan({ days, hours, mins, secs }) {
        const { daysSpan, hoursSpan, minsSpan, secsSpan } = this.refs;
        
        daysSpan.textContent = days;
        hoursSpan.textContent = hours;
        minsSpan.textContent = mins;
        secsSpan.textContent = secs;
    }
    
    timerCountdown() {
        const intervalId = setInterval((() => {
            if (this.targetDate <= Date.now()) {
                clearInterval(intervalId);
                return;
            };

            this.setTimeToSpan(this.timeData());
        }), CountdownTimer.DELAY)
    }
};