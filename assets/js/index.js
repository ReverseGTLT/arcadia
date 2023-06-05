$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        // autoplay: true,
        autoplaySpeed: 50,
        autoplayHoverPause: true,
        margin: 20,
        nav: true,
        mouseDrag: true,
        touchDrag: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
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