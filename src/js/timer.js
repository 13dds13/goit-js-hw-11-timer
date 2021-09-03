import {CountdownTimer} from './classTimer'

const timerOptions = {
    parent: document.body,
    targetDate: '2022/01/01',
    eventType: 'New Year party!',
};

const customTimer = new CountdownTimer(timerOptions);

customTimer.timerCountdown();