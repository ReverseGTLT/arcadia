// import 'animejs';
// import 'parsleyjs'; АКТИВИРОВАТЬ, если используется сборщик модулей
// import anime from "animejs";
// import parsley from "parsleyjs/dist/parsley";


// $(document).ready(function() {
//     $('#contact-form').parsley();
// });

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

    $('.facts-carousel').owlCarousel({
        loop: true,
        autoplay: 1000,
        autoplayHoverPause: true,
        margin: 0,
        nav: false,
        dots: true,
        mouseDrag: true,
        touchDrag: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 3,
            },
            992: {
                items: 3,
            }
        }
    });

//Parsley
    $('#contact-form').parsley();
});

// Header
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
        console.log('asfasfasf')
        header.classList.add('bgcolor-white');
    }
});

// <<<<<<< HEAD
// Открытие меню
const menuOpen = document.querySelector('.header-menu__btn');
const menuWindow = document.querySelector('.modal-menu');
const menuClose = document.querySelector('.modal-menu__close');
menuOpen.addEventListener('click', onMenuOpen);
menuClose.addEventListener('click', onMenuClose)
function onMenuOpen() {
    menuWindow.classList.add('visible')
}
function onMenuClose() {
    menuWindow.classList.remove('visible')
}

// Скролл ап
document.addEventListener("DOMContentLoaded", function() {
    var scrollToTopButton = document.getElementById("scroll-to-top");

    window.addEventListener("scroll", function() {
        if (window.pageYOffset > 100) {
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    });

    scrollToTopButton.addEventListener("click", function(event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

// >>>>>>> 670c0290817281f5e25a798cd4bfb2f4ae422a38

//map. Открытие карты в полноэкранном режиме
// const mapIframe = document.getElementById('map');
//
// mapIframe.addEventListener('click', () => {
//     mapIframe.requestFullscreen();
// });



// let cart =[];


//
// ------------------------------------
// MODAL
// goods order & all modal
document.addEventListener('DOMContentLoaded', function () {
    const minusBtn = document.querySelector('.counter-minus');
    const minusBtns = document.querySelectorAll('.counter-minus');
    const plusBtn = document.querySelector('.counter-plus');
    const plusBtns = document.querySelectorAll('.counter-plus');
    const counterInput = document.querySelector('.counter-input');
    const counterInputs = document.querySelectorAll('.counter-input');
    const goodsOrderBtn = document.querySelector('.goods-order-btn');
    const modal = document.querySelector('.modal');
    const modals = document.querySelectorAll('.modal');
    const modalItem = document.getElementById('modal-item');
    const modalCart = document.getElementById('modal-cart');
    const modalContact = document.getElementById('modal-contact');
    const modalOrderAccepted = document.getElementById('modal-order-accepted');

    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const closeModal = document.querySelector('.close');

    // анимация открытия модалки

    openModalBtns.forEach(button => {
        button.addEventListener('click', function () {
            if (button.className === goodsOrderBtn.className) {
                modals.forEach(modal => {
                    if (modal.id === 'modal-item') {
                        getValueFields(button, modal);
                        modal.style.display = 'flex';
                        // animeModal();
                    }
                });
            }
            if (button.id === 'btn-modal-item') {
                modalCart.style.display = 'flex';
            } else if (button.id === 'btn-modal-cart') {
                modalContact.style.display = 'flex';
            } else if (button.id === 'btn-modal-contact') {
                cart = [];
                updateCart();
                modalOrderAccepted.style.display = 'flex';
            }
        });
    });

    closeModal.addEventListener('click', function () {
        anime({
            targets: modal,
            scale: [1, 0],
            duration: 400,
            easing: 'easeOutElastic',
            complete: () => {
                modal.style.display = 'none';
            }
        });
        // modal.style.display = 'none';
    });

    window.addEventListener('click', function ({target}) {
        if (target === modal) {
            modal.style.display = 'none';
        }
    });

    function animeModal() {
        anime({
            targets: modal,
            scale: [0, 1],
            duration: 400,
            easing: 'easeOutElastic'
        });
    }

    // anime({
    //     targets: cartModal,
    //     translateY: [-500, 0],
    //     opacity: [0, 1],
    //     duration: 300,
    //     easing: 'easeOutQuad'
    // });

    // closeModal.addEventListener('click', () => {
    //     anime({
    //         targets: cartModal,
    //         translateY: 500,
    //         opacity: 0,
    //         duration: 300,
    //         easing: 'easeOutQuad'
    //     });
    //     modal.classList.remove('open');
    // });

    minusBtn.addEventListener('click', function () {
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

//-----------------------------
// modal cart
const cartModal = document.getElementById('modal-cart');
const closeCartModal = document.querySelector('.close');
const cartOrderBtn = document.getElementById('btn-modal-contact');
const cartItems = document.querySelector('.cart-items');

let cart = [];

function addToCart(product) {
    cart.push(product);
    updateCart();
}

function deleteFromCart(product) {
    cart = cart.filter(item => item !== product);
    updateCart();
}


// НЕ полностью реализовано

// function updateCart() {
//     cartModal.querySelector('.modal-title').textContent = `Ваша корзина (${cart.length})`;
//
//     cartItems.innerHTML = '';
//
//     let total = 0;
//
//     cart.forEach(product => {
//         const cartItem = document.createElement('div');
//         cartItem.classList.add('cart-item');
//         cartItem.innerHTML = `
//       <div class="cart-item__info">
//         <div class="for-img">
//           <img src="${product.image}" alt="Product Image">
//         </div>
//         <p class="icon">x</p>
//         <p class="cart-item__quantity">${product.quantity}</p>
//         <p class="cart-item__title">${product.title}</p>
//       </div>
//       <div class="cart-item__total-price">
//         <p>Итого: <span>${product.price * product.quantity}</span> грн</p>
//         <button class="cart-item__delete-btn" onclick="deleteFromCart(${product})">&times;</button>
//       </div>
//     `;
//         cartItems.append(cartItem);
//         total += product.price * product.quantity;
//     });
//
//     cartModal.querySelector('.cart-total span').textContent = total;
// }

// closeCartModal.addEventListener('click', () => {
//     cartModal.classList.remove('open');
// });

// cartOrderBtn.addEventListener('click', () => {
//     alert('Заказ оформлен!');
//     cartModal.classList.remove('open');
//     cart = [];
//     updateCart();
// });

document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const product = {
            image: btn.dataset.image,
            title: btn.dataset.title,
            price: btn.dataset.price,
            quantity: 1
        };
        addToCart(product);
        cartModal.classList.add('open');
    });
});

updateCart();

//обработчик для изменения количества товара
const cartItemQuantityInputs = document.querySelectorAll('.cart-item__quantity input');

cartItemQuantityInputs.forEach(input => {
    input.addEventListener('change', () => {
        const product = cart.find(item => item.title === input.dataset.title);
        product.quantity = Number(input.value);
        updateCart();
    });
});

const cartItemPriceInputs = document.querySelectorAll('.cart-item__price input');

//обработчик на изменение цены
cartItemPriceInputs.forEach(input => {
    input.addEventListener('change', () => {
        const product = cart.find(item => item.title === input.dataset.title);
        product.price = Number(input.value);
        updateCart();
    });
});

// localStorage сохранение корзины
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    cart = JSON.parse(localStorage.getItem('cart'));
    if (cart === null) cart = [];
    updateCart();
}

loadCart();

// ...

cartOrderBtn.addEventListener('click', () => {
    alert('Заказ оформлен!');
    cartModal.classList.remove('open');
    cart = [];
    saveCart();
    updateCart();
});
