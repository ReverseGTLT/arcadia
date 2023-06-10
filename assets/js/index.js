$(document).ready(function () {
    // Owl
    $('.goods-carousel').owlCarousel({
        loop: true,
        autoplay: 1000,
        autoplayHoverPause: true,
        margin: 20,
        nav: true,
        dots: false,
        mouseDrag: true,
        touchDrag: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            }
        }
    });


    $('.stages-carousel').owlCarousel({
        loop: true,
        items: 1,
        autoplay: 1000,
        margin: 10,
        dots: true,
        // dotsEach: 4,
        slideBy: 1,
        nav: true,
        mouseDrag: true,
        touchDrag: true,
    });


    $('.certificates-carousel').owlCarousel({
        loop: true,
        autoplay: 1000,
        autoplayHoverPause: true,
        margin: 0,
        nav: true,
        dots: false,
        mouseDrag: true,
        touchDrag: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
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
window.addEventListener('load', function () {
    const header = document.querySelector('.header');
    const scrollPresent = localStorage.getItem('scrollPresent');

    if (scrollPresent) {
        header.classList.add('bgcolor-white');
    }
});

//map. Открытие карты в полноэкранном режиме
// const mapIframe = document.getElementById('map');
//
// mapIframe.addEventListener('click', () => {
//     mapIframe.requestFullscreen();
// });

// goods order
document.addEventListener('DOMContentLoaded', function () {
    const minusBtn = document.querySelector('.counter-minus');
    const plusBtn = document.querySelector('.counter-plus');
    const counterInput = document.querySelector('.counter-input');
    const goodsOrderBtn = document.querySelector('.goods-order-btn');
    const modals = document.querySelectorAll('.modal');

    minusBtn.addEventListener('click', function () {
        let currentValue = parseInt(counterInput.value);
        console.log(currentValue);
        if (currentValue > 0) {
            counterInput.value = currentValue - 1;
        }
        updateCounterBtns();
    })

    plusBtn.addEventListener('click', function () {

        let currentValue = parseInt(counterInput.value);
        console.log(currentValue);
        counterInput.value = currentValue + 1;
        updateCounterBtns();
    })

    counterInput.addEventListener('change', function () {
        if (parseInt(counterInput.value) < 0) {
            counterInput.value = 0;
        }
        updateCounterBtns();
    })

    // для вспливаючого вікна з товаром
    goodsOrderBtn.addEventListener('click', function () {
        // modal-order-accepted
        modals.forEach(modal => {
            if (modal.id === 'modal-order-accepted') {
                modal.style.display = 'flex';
            }
        })
    })

    modals.forEach(modal => {
        modal.addEventListener('click', function ({target}) {
            if (target === modal) {
                modal.style.display = 'none';
            }
        })
    })

    function updateCounterBtns() {
        let currentValue = parseInt(counterInput.value);
        minusBtn.style.color = currentValue > 0 ? '#949CBE' : '#D4D8EB';
        plusBtn.style.color = '#949CBE';
    }
});