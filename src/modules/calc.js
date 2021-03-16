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


export default calc;