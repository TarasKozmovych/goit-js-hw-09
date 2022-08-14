import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix";
const refs = {
    input: document.querySelector('input[type="text"]'),
    btnStart: document.querySelector('button[data-start]'),
    daysData: document.querySelector('[data-days]'),
    hoursData: document.querySelector('[data-hours]'),
    minutesData: document.querySelector('[data-minutes]'),
    secondsData: document.querySelector('[data-seconds]'),
};

function convertMs(ms) {
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

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
};


let interval = null;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() - Date.now() <= 0) {
            Notify.warning('Будь ласка, виберіть майбутню дату.');
            ref.btnStart.setAttribute('disabled', 'disabled');
            return;
        }
        refs.btnStart.removeAttribute('disabled');
    },
};

function startTimer() {
    refs.btnStart.setAttribute('disabled', 'true');
    refs.input.setAttribute('disabled', 'true');
    const date = new Date(refs.input.value).getTime();
    interval = setInterval(() => {
        const { days, hours, minutes, seconds } = convertMs(date - Date.now());

        refs.daysData.textContent = addLeadingZero(days);
        refs.hoursData.textContent = addLeadingZero(hours);
        refs.minutesData.textContent = addLeadingZero(minutes);
        refs.secondsData.textContent = addLeadingZero(seconds);
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(interval);
            Notify.success('Кінець');
            refs.btnStart.removeAttribute('disabled');
            refs.input.removeAttribute('disabled');
        }
    }, 1000);
};

flatpickr('#datetime-picker', options);

refs.btnStart.addEventListener('click', startTimer);