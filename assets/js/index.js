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
    const minusBtns = document.querySelectorAll('.counter-minus');
    const plusBtn = document.querySelector('.counter-plus');
    const plusBtns = document.querySelectorAll('.counter-plus');
    const counterInput = document.querySelector('.counter-input');
    const counterInputs = document.querySelectorAll('.counter-input');
    const goodsOrderBtn = document.querySelectorAll('.goods-order-btn');
    const modal = document.querySelector('.modal');
    const modals = document.querySelectorAll('.modal');
    const closeModal = document.querySelector('.close');


    minusBtn.addEventListener('click', function() {
        const currentValue = parseInt(counterInput.value);
        if (currentValue > 0) {
            counterInput.value = currentValue - 1;
        }
        updateCounterBtns();
    });

    // Потрібно налагодити логіку, не те отримує

    // minusBtns.forEach(button => {
    //     button.addEventListener('click', function () {
    //         const input = button.nextElementSibling;
    //         console.log(input + 'inp');
    //         const currentValue = parseInt(input.value);
    //         console.log(currentValue + 'curr');
    //
    //         if (currentValue > 0) {
    //             input.value = currentValue - 1;
    //             if (input.value === 0) {
    //                 // button.disabled = true;
    //             }
    //         }
    //         updateCounterBtns();
    //     });
    // });

    plusBtns.forEach(button => {
        button.addEventListener('click', function () {
            const input = button.previousElementSibling;
            const currentValue = parseInt(input.value);
            input.value = currentValue + 1;
            if (input.value > 0) {
                input.previousElementSibling.disabled = false;
            }
            updateCounterBtns();
        });
    });

    counterInputs.forEach(input => {
        input.addEventListener('change', function () {
            if (parseInt(input.value) < 0) {
                input.value = 0;
            }
            updateCounterBtns();
        })
    })

    // counterInput.addEventListener('change', function () {
    //     if (parseInt(counterInput.value) < 0) {
    //         counterInput.value = 0;
    //     }
    //     updateCounterBtns();
    // })

    // для вспливаючого вікна з товаром
    goodsOrderBtn.forEach(button => {
        button.addEventListener('click', function () {
            // modal-order-accepted
            modals.forEach(modal => {
                if (modal.id === 'modal-item') {
                    getValueFields(button, modal);
                    modal.style.display = 'flex';
                }
            })
        });

    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function ({target}) {
        if (target === modal) {
            modal.style.display = 'none';
        }
    });

    function updateCounterBtns() {
        const currentValue = parseInt(counterInput.value);
        minusBtn.style.color = currentValue > 0 ? '#949CBE' : '#D4D8EB';
        plusBtn.style.color = '#949CBE';
    }

    function getValueFields(button, modal) {
        const itemTitle = button.parentElement.querySelector('.good-title').textContent;
        const itemImage = button.parentElement.querySelector('.good-image img').src;
        const itemCount = button.parentElement.querySelector('.good-input').value;
        const itemPrice = button.parentElement.querySelector('.good-price').textContent;

        const imageName = itemImage.split('/').pop();
        const imagePath = `../../assets/images/${imageName}`;
        console.log(imagePath);

        modal.querySelector('.modal-title').textContent = itemTitle;
        modal.querySelector('.modal-image').src = imagePath;
        console.log(itemImage);
        modal.querySelector('.modal-input').value = itemCount;
        modal.querySelector('.modal-price').textContent = itemPrice;
    }
});