const handler = () => {

    const inputs = document.querySelectorAll('input');

    document.addEventListener('input', e => {
        const target = e.target;
        if (target.matches('input[name="user_name"]')) {
            target.value = target.value.replace(/[^а-яА-Яё\s{2,}]/ig, '');
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
        if (elem.getAttribute('required') === null) {
            elem.setAttribute('required', '');
        }
        elem.addEventListener('blur', e => {
            const target = e.target,
                regExp1 = /^[\s\-]+|[\s\-]+$/g,
                regExp2 = /\s{2,}/g,
                regExp3 = /\-{2,}/g;

            target.value = target.value.replace(regExp1, '');
            target.value = target.value.replace(regExp2, ' ');
            target.value = target.value.replace(regExp3, '-');
            if (target.matches('input[name="user_name"]')) {
                if (target.value.toString().length < 2) {
                    target.value = '';
                }target.value = target.value.replace(/(^|\s)\S/ig, match => match.toUpperCase());
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


export default handler;
