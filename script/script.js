/* eslint-disable no-useless-escape */
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

    countTimer('26 february 2022');

    // menu
    const toggleMenu = () => {
        const menu = document.querySelector('menu');

        document.addEventListener('click', event => {
            const target = event.target;

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
                if (document.documentElement.clientWidth < 768) {
                    popup.style.display = 'block';
                } else {
                    popup.style.display = 'block';
                    popupContent.style.top = '-50%';
                    modalAnimate = requestAnimationFrame(popupAnimate);
                }
            });
        });

        popup.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
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

    // слайдер

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            portfolioDots = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval;


        const addDots = slide => {
            slide.forEach(() => {
                const li = document.createElement('li');
                li.classList.add('dot');
                portfolioDots.append(li);
            });
        };

        addDots(slide);

        const dot = document.querySelectorAll('.dot');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        startSlide(2000);

        slider.addEventListener('click', event => {
            event.preventDefault();
            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }

        });
    };

    slider();

    //калькулятор

    const calc = () => {
        const calcItem = document.querySelectorAll('.calc-item');

        calcItem.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/\D/g, '');
            });
        });

    };

    calc();

    //команда

    const command = () => {
        const commandPhoto = document.querySelectorAll('.command__photo');

        commandPhoto.forEach(item => {
            let dataImg;

            item.addEventListener('mouseover', e => {
                const target = e.target;
                dataImg = target.src;
                console.log(dataImg);
                if (target.classList.contains('command__photo')) {
                    target.src = target.dataset.img;
                }

            });

            item.addEventListener('mouseout', e => {
                const target = e.target;
                if (target.classList.contains('command__photo')) {
                    target.src = dataImg;
                }
            });
        });
    };

    command();

    //обратная связь

    const handler = () => {

        const inputs = document.querySelectorAll('input');

        document.addEventListener('input', e => {
            const target = e.target;
            if (target.matches('input[name="user_name"]') || target.matches('input[name="user_message"]')) {
                target.value = target.value.replace(/[^а-яА-Яё-\s]/ig, '');
            }
            if (target.matches('input[name="user_email"]')) {
                // eslint-disable-next-line no-useless-escape
                target.value = target.value.replace(/[^a-zA-Z_\-\.\!\~\`\d\*\@]/ig, '');
            }
            if (target.matches('input[name="user_phone"]')) {
                target.value = target.value.replace(/[^\d\()\-\+]/ig, '');
            }
        });

        inputs.forEach(elem => {
            elem.addEventListener('blur', e => {
                const target = e.target,
                    regExp1 = /^[\s\-]+|[\s\-]+$/g,
                    regExp2 = /\s{2,}/g,
                    regExp3 = /\-{2,}/g;

                target.value = target.value.replace(regExp1, ' ');
                target.value = target.value.replace(regExp2, ' ');
                target.value = target.value.replace(regExp3, '-');
                if (target.matches('input[name="user_name"]')) {
                    target.value = target.value.replace(/(^|\s)\S/ig, match => match.toUpperCase());
                }

                return;
            });

        });



    };

    handler();
});

