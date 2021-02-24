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

    // menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');

            // if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
            //     menu.style.transform = `translate(0)`;
            // } else {
            //     menu.style.transform = `translate(-100%)`;
            // }
        };
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
    };


    toggleMenu();

    //popup

    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content');
        let modalAnimate;
        let count = -50;

        const popupAnimate = () => {

            modalAnimate = requestAnimationFrame(popupAnimate);

            
            count++; 

            if (+count < 10){
                popupContent.style.top = +count + '%';
            } else {
                cancelAnimationFrame(modalAnimate);
                count = -50;
            }
            
            console.log(count);
        }

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                popupContent.style.top = '-50%';
                modalAnimate = requestAnimationFrame(popupAnimate);
            });
        });
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };

    togglePopup();
});
