$(document).ready(function () {
    $('.stages-carousel').owlCarousel({
        loop: true,
        // autoplay: true,
        autoplaySpeed: 50,
        autoplayHoverPause: true,
        margin: 20,
        dots: true,
        dotsEach: 4,
        nav: true,
        items: 1,
        mouseDrag: true,
        touchDrag: true,
    });

    $('.goods-carousel').owlCarousel({
        loop: true,
        // autoplay: true,
        autoplaySpeed: 50,
        autoplayHoverPause: true,
        margin: 20,
        nav: true,
        dots: false,
        mouseDrag: true,
        touchDrag: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });
});


const headerLanguageBtn = document.querySelector('.header-language');
const headerLanguageList = document.querySelector('.header__language-list');
const headerLanguageArrow = document.querySelector('.arrow');

headerLanguageBtn.addEventListener('click', onOpenLanguageList);

function onOpenLanguageList(e) {
    e.preventDefault()
    headerLanguageArrow.classList.toggle('rotate')
    headerLanguageList.classList.toggle('block');
}

window.addEventListener('scroll', onScrollWindow);

function onScrollWindow() {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY;

    if (scrollPosition >= 1) {
        header.classList.add('bgcolor-white');
        localStorage.setItem('scrollPresent', 'true'); // Сохраняем информацию о наличии скролла в Local Storage
    } else {
        header.classList.remove('bgcolor-white');
        localStorage.removeItem('scrollPresent'); // Удаляем информацию о наличии скролла из Local Storage
    }
}

// Проверяем наличие скролла после обновления страницы
window.addEventListener('load', function() {
    const header = document.querySelector('.header');
    const scrollPresent = localStorage.getItem('scrollPresent');

    if (scrollPresent) {
        header.classList.add('bgcolor-white');
    }
});
