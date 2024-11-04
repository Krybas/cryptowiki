const toggleBtn = document.getElementById('toggle-btn');
const navbar = document.getElementById('navbar');
const mainContent = document.querySelector('main');
const footerContent = document.querySelector('footer');
const navbarContainer = document.querySelector('.navbar-container');

function isTabletOrLess() {
    return window.innerWidth <= 768;
}

toggleBtn.addEventListener('click', () => {
    if (isTabletOrLess()) {
        navbarContainer.classList.toggle('closeTablet');
        toggleBtn.classList.toggle('closeTablet');
        mainContent.classList.toggle('closeTablet');
    } else {
        navbar.classList.toggle('close');
        mainContent.classList.toggle('close');
        footerContent.classList.toggle('close');
        toggleBtn.classList.toggle('close');
    }
});