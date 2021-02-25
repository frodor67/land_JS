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
        const menu = document.querySelector('menu');

        document.addEventListener('click', event => {
            const target = event.target;
            console.log(target);

            if (target.closest(".menu")) {
                menu.classList.add('active-menu');
            } else if (!target.closest('menu')) {
                menu.classList.remove('active-menu');
            } else if (target.matches('li>a') || target.matches('.close-btn')) {
                menu.classList.remove('active-menu');
            }
        });

    };


    toggleMenu();

    //popup

    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content');
        let modalAnimate;
        let count = -50;

        const popupAnimate = () => {

            modalAnimate = requestAnimationFrame(popupAnimate);

            count++;

            if (+count < 10) {
                popupContent.style.top = +count + '%';
            } else {
                cancelAnimationFrame(modalAnimate);
                count = -50;
            }

            console.log(count);
        };

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                popupContent.style.top = '-50%';
                modalAnimate = requestAnimationFrame(popupAnimate);
            });
        });

        popup.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('.popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                }
            }
        });
    };

    togglePopup();


    //табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }

            }
        };
        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target.classList.contains('service-header-tab')) {

                tab.forEach((item, i) => {

                    if (item === target) {
                        toggleTabContent(i);
                    }

                });

            }


        });
    };

    tabs();
});
