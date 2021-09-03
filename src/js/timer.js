import {CountdownTimer} from './classTimer'
import timerMarkupTpl from '../templates/timer-markup.hbs';

const parent = document.body;
const targetDate = '2022/01/01';
const targetEvent = 'New Year party!';
const timerPlaceTarget = 'afterbegin';

const newTimer = new CountdownTimer(targetDate, targetEvent, parent);

newTimer.addTimerMarkup(timerPlaceTarget, timerMarkupTpl);

newTimer.timerCountdown();