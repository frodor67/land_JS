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

export default togglePopup;