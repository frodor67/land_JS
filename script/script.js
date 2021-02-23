window.addEventListener('DOMContentLoaded', () => {


    // Timer
    const countTimer = deadline => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        const getTimerRemaining = () => {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
                //day = Math.floor(timeRemaining / 60 / 60 / 24);
            return { timeRemaining, hours, minutes, seconds };
        };

        const timerWrite = () => {
            const timer = getTimerRemaining();

            if (String(timer.hours).length === 1) {
                timerHours.textContent = ('0' + timer.hours);
            } else {
                timerHours.textContent = timer.hours;
            }

            if (String(timer.minutes).length === 1) {
                timerMinutes.textContent = ('0' + timer.minutes);
            } else {
                timerMinutes.textContent = timer.minutes;
            }

            if (String(timer.seconds).length === 1) {
                timerSeconds.textContent = ('0' + timer.seconds);
            } else {
                timerSeconds.textContent = timer.seconds;
            }

            if (timer.timeRemaining <= 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';

            }
        };
        const timerId = setInterval(() => {
            timerWrite();
            const timer = getTimerRemaining();
            if (timer.timeRemaining <= 0) {
                clearInterval(timerId);
            }
        }, 1000);
        timerWrite();

    };

    countTimer('24 february 2021');
});
