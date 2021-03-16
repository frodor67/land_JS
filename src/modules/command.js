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

export default command;