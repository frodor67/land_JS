const sendForm = () => {
    const errorMsg = 'Что-то пошло не так...',
        loadMsg = 'Загрузка...',
        successMsg = 'Спасибо! мы скоро с вами свяжемся!';

    const forms = document.querySelectorAll('form[name="user_form"]'),
        inputs = document.querySelectorAll('input'),
        statusMsg = document.createElement('div');

    statusMsg.textContent = 'Тут будет сообщение';
    statusMsg.style.cssText = 'color: #ffffff;';

    const postData = body => fetch('./server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
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

    const addSuccessMsg = request => {
        if (request.status !== 200) {
            throw new Error('status neywork not 200');
        }
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

export default sendForm;