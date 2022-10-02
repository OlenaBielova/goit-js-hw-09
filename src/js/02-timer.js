import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const timeInput = document.querySelector('#datetime-picker')
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;

let intervalId = null;
console.log(intervalId);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    console.log(selectedDates[0]);
        const delta = selectedDates[0] - Date.now();
        console.log(delta);
    
        if (delta <= 0) {
            Notify.failure("Please choose a date in the future");
            startBtn.disabled = true;
            return;
        }
        startBtn.disabled = false;
        localStorage.setItem("deadline", selectedDates[0])
        
    }
};

const fp = flatpickr(timeInput, options);

startBtn.addEventListener('click', onStartBtnClick);

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function onStartBtnClick() {
    startBtn.disabled = true;
    timeInput.disabled = true;
    if (intervalId) {
        return;
    } else {
        intervalId = setInterval(() => {
        const savedDeadline = localStorage.getItem("deadline");
        const deadline = new Date(savedDeadline);
        const delta = deadline - Date.now();
        
        console.log(Date.now());
        console.log(delta);
        
        if (delta <= 1000) {
            clearInterval(intervalId);
            Notify.warning('Time is over!')
        }
            
        const date = convertMs(delta);
        console.log(date);

        days.textContent = addLeadingZero(date.days);
        hours.textContent = addLeadingZero(date.hours);
        minutes.textContent = addLeadingZero(date.minutes);
        seconds.textContent = addLeadingZero(date.seconds);

    }, 1000);
    }
};

  function  convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

return { days, hours, minutes, seconds };
}


