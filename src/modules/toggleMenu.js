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

export default toggleMenu;