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

    countTimer('10 march 2021');

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
                //count = -50;
            }
        };

        const popupAnimateReverse = () => {

            modalAnimate = requestAnimationFrame(popupAnimate);

            count--;

            if (+count > -50) {
                popupContent.style.top = +count + '%';
            } else {
                cancelAnimationFrame(modalAnimate);
            }
        };

        if (count === 10) {
            popupAnimateReverse();
        }


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
                count = -50;
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                    count = -50;
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

    const calc = (price = 100) => {
        const calcItem = document.querySelectorAll('.calc-item'),
            calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.querySelector('#total');

        const countSum = () => {
            let total = 20,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            } else {
                total = 0;
            }


            totalValue.textContent = Math.floor(total);
        };

        calcBlock.addEventListener('change', e => {
            const target = e.target;

            if (target.matches('select') || target.matches('input')) {
                countSum();
            }

            if (target.value === '') {
                calcItem.forEach(item => {
                    item.value = '';
                });
            }

        });



        calcItem.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/\D/g, '');
            });
        });

    };

    calc();


    //send-ajax-form

    const sendForm = () => {
        const errorMsg = 'Что-то пошло не так...',
            loadMsg = 'Загрузка...',
            successMsg = 'Спасибо! мы скоро с вами свяжемся!';

        const forms = document.querySelectorAll('form[name="user_form"]'),
            inputs = document.querySelectorAll('input'),
            statusMsg = document.createElement('div');

        statusMsg.textContent = 'Тут будет сообщение';
        statusMsg.style.cssText = 'color: #ffffff;';

        const postData = body => new Promise((resolve, reject) => {

            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    resolve();
                } else {
                    reject(request.statusText);
                }
            });
            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(body));
        });
        const clearInputs = () => {
            inputs.forEach(item => {
                item.value = '';
            });
        };

        const closePopup = () => {
            const popup = document.querySelector('.popup');
            popup.style = 'display: none';
        };

        const addSuccessMsg = () => {
            statusMsg.textContent = successMsg;
            setTimeout(() => {
                statusMsg.textContent = '';
                closePopup();
            }, 3000);
            clearInputs();
        };

        const addErrMsg = () => {
            statusMsg.textContent = errorMsg;
            setTimeout(() => {
                statusMsg.textContent = '';
            }, 3000);
            console.error(errorMsg);
        };

        forms.forEach(item => {
            item.addEventListener('submit', event => {
                event.preventDefault();
                item.appendChild(statusMsg);
                statusMsg.textContent = loadMsg;
                const formData = new FormData(item);
                const body = {};
                formData.forEach((val, key) => {
                    body[key] = val;
                });

                postData(body)
                    .then(addSuccessMsg)
                    .catch(addErrMsg);
            });
        });
    };

    sendForm();

    //команда

    const command = () => {
        const commandPhoto = document.querySelectorAll('.command__photo');

        commandPhoto.forEach(item => {
            let dataImg;

            item.addEventListener('mouseover', e => {
                const target = e.target;
                dataImg = target.src;
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
            if (target.matches('input[name="user_name"]')) {
                target.value = target.value.replace(/[^а-яА-Яё\s]/ig, '');
            }
            if (target.matches('input[name="user_message"]')) {
                target.value = target.value.replace(/[^а-яА-Яё-\s\d\!\,\.\:\"\;\?]/ig, '');
            }
            if (target.matches('input[name="user_email"]')) {
                // eslint-disable-next-line no-useless-escape
                target.value = target.value.replace(/[^a-zA-Z_\-\.\!\~\`\d\*\@]/ig, '');
            }
            if (target.matches('input[name="user_phone"]')) {
                target.value = target.value.replace(/[^\d\+]/g, '');
            }
        });

        inputs.forEach(elem => {
            elem.addEventListener('blur', e => {
                const target = e.target,
                    regExp1 = /^[\s\-]+|[\s\-]+$/g,
                    regExp2 = /\s{2,}/g,
                    regExp3 = /\-{2,}/g;

                target.value = target.value.replace(regExp1, '');
                target.value = target.value.replace(regExp2, ' ');
                target.value = target.value.replace(regExp3, '-');
                if (target.matches('input[name="user_name"]')) {
                    target.value = target.value.replace(/(^|\s)\S/ig, match => match.toUpperCase());
                }
                if (target.matches('input[name="user_phone"]')) {
                    const targetStr = target.value.toString().length;
                    //(11 <= targetStr <= 13)
                    // ((targetStr !== 11) && (targetStr !== 13))
                    if (targetStr >= 14) {
                        target.value = '';
                    } else if (targetStr <= 7) {
                        target.value = '';
                    }
                }

                return;
            });

        });



    };

    handler();
});
