// import 'animejs';
// import 'parsleyjs'; АКТИВИРОВАТЬ, если используется сборщик модулей
// import anime from "animejs";
// import parsley from "parsleyjs/dist/parsley";


$(document).ready(function () {
    $('#myForm').parsley();
});

var element = document.getElementById('order-input-tel');
var maskOptions = {
    mask: '+{38}(000)000-00-00'
};
var mask = IMask(element, maskOptions);

//____________________________________________________________________
// VARIABLES
//____________________________________________________________________

let orders = [
    {
        id: 0,
        dateOrder: '',
        totalOrder: 0,
        typePayment: '',
        typeDelivery: '',
        dateDelivery: '',
        addressDelivery: '',
        comment: '',

        client: {
            id: 0,
            firstName: 'test',
            lastName: 'test',
            phone: '123',
        },

        goods: [
            {
                good: {
                    id: 0,
                    title: 'test',
                    price: 0,
                    count: 0,
                },
            },
        ],
    }
];

let client = {
    id: 0,
    firstName: '',
    lastName: '',
    phone: '',
};

let good = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    count: 0,
};


// $(document).ready(function() {
//     $('#contact-form').parsley();
// });

$(document).ready(function () {
    // Owl Goods
    $('.goods-carousel').owlCarousel({
        loop: true,
        autoplay: 1000,
        autoplayHoverPause: true,
        nav: true,
        dots: false,
        mouseDrag: true,
        touchDrag: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                margin: 0,
            },
            768: {
                items: 1,
                margin: 0,
            },
            992: {
                items: 4,
                margin: 20,
            }
        }
    });

    // Owl Stages
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

    // Owl Certificates
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
            },
            768: {
                items: 1,
            },
            992: {
                items: 4,
            }
        }
    });

    $(".certificates-carousel__item").click(function (e) {
        e.preventDefault();
        const items = $(this).closest(".certificates-carousel").find(".certificates-carousel__item");
        const images = items.map(function () {
            return {src: $(this).find("img").attr("src"), type: "image"};
        }).get();
        const index = items.index(this);
        console.log(index);

        const fancybox = new Fancybox(images, {
            // closeButton: "top",
            mainClass: "fancybox-custom",
            loop: true,
            animationEffect: "fade",
            contentClick: "iterateZoom",
            Images: {
                Panzoom: {
                    maxScale: 2,
                },
            },
            Toolbar: {
                display: {
                    left: [],
                    right: ["zoomIn", "zoomOut", "slideshow", "close"],
                },
            },
            caption: function (instance, item) {
                return $(this).closest(".certificates-carousel__item").find("a").text();
            },
            startIndex: index,
            Thumbs: false,
        });

        fancybox.open();
    });


// Owl Facts
    $('.facts-carousel').owlCarousel({
        loop: true,
        autoplay: 1000,
        autoplayHoverPause: true,
        margin: 0,
        nav: false,
        dots: false,
        mouseDrag: true,
        touchDrag: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1.5,
            },
            768: {
                items: 1.5,
            },
            992: {
                items: 3,
            }
        },
        dotsContainer: '.facts-carousel-dots',
        onInitialized: updateDots,
        onTranslated: updateDots,
    });

    function updateDots(event) {
        const currentIndex = event.item.index; // Получаем индекс текущего слайда
        $('.facts-carousel-dots .owl-dot').removeClass('active'); // Удаляем класс active у всех dots
        $('.facts-carousel-dots .owl-dot').eq(currentIndex).addClass('active'); // Добавляем класс active к соответствующему dots
    }


    $('.facts-carousel-dots').owlCarousel({
        items: 1,
        nav: false,
        dots: true,
        // dotsEach: 3,
        dotClass: 'owl-dot',
        dotContainerClass: 'owl-dots',
        dotClassActive: 'active',
        startPosition: 0,
    });

//Parsley
    $('#contact-form').parsley();


// _____________________________________________
// Появление для всех h2

    setTimeout(function () {
        animateVisibleHeaders();
    }, 5000);

    $(window).scroll(function () {
        animateVisibleHeaders();
    });

    function animateVisibleHeaders() {
        const windowHeight = $(window).height();
        const scrollPos = $(window).scrollTop();
        const windowBottomPos = scrollPos + windowHeight;

        $('h2.animate__animated').each(function (index) {
            const offsetTop = $(this).offset().top;
            if (
                (offsetTop < windowBottomPos && offsetTop > scrollPos) || // Заголовок видим в текущем окне просмотра
                (offsetTop < scrollPos && $(this).hasClass('animate__fadeInUp')) // Заголовок вышел из поля видимости, но уже был анимирован
            ) {
                $(this).addClass('animate__fadeInUp animate__slower delay-' + index); // Добавляем классы анимации
            } else {
                $(this).removeClass('animate__fadeInUp animate__slower delay-' + index); // Удаляем классы анимации
            }
        });
    }
});


// Preloader
window.addEventListener('load', function () {
    setTimeout(function () {
        const preloader = document.getElementById('preloader');
        preloader.style.display = 'none';
    }, 2000); // Задержка в миллисекундах (здесь 2000 мс = 2 секунды)
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

    if (scrollPosition >= 101) {
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


// ______________________________________________
// Скролл ап
document.addEventListener("DOMContentLoaded", function () {
    const scrollToTopButton = document.getElementById("scroll-to-top");

    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 100) {
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    });

    scrollToTopButton.addEventListener("click", function (event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

//_____________________________
function handleOrientationChange() {
    const generalElement = document.getElementById('general');
    const generalWrapperInfo = document.getElementById('generalWrapperInfo');
    const header = document.querySelector('.header');
    const sale = document.querySelector('.sale');

    if (window.innerWidth < 992 && (window.orientation === 90 || window.orientation === -90)) {
        generalElement.classList.remove('height');
        generalWrapperInfo.classList.add('pb-600');
        header.classList.add('absolute');
        sale.classList.add('static');
    } else {
        generalElement.classList.add('height');
        generalWrapperInfo.classList.remove('pb-600');
        header.classList.remove('absolute');
        sale.classList.remove('static');
        const ratio = window.innerHeight / window.innerWidth;
        const generalWrapper = document.querySelector('.general-wrapper');
        const generalWrapperPrice = document.querySelector('.general-wrapper__price');
        if (ratio < 2 && window.innerWidth < 992) {
            generalWrapper.classList.add('bg-size');
            generalWrapperPrice.classList.add('top');
        } else {
            generalWrapper.classList.remove('bg-size');
            generalWrapperPrice.classList.remove('top');
        }
    }
}

window.addEventListener('orientationchange', handleOrientationChange);
window.addEventListener('resize', handleOrientationChange);

// Проверка ориентации и ширины при загрузке страницы
handleOrientationChange();

// >>>>>>> 670c0290817281f5e25a798cd4bfb2f4ae422a38

//map. Открытие карты в полноэкранном режиме
// const mapIframe = document.getElementById('map');
//
// mapIframe.addEventListener('click', () => {
//     mapIframe.requestFullscreen();
// });

//
// ------------------------------------------------------
// MODAL
// goods order & all modal
const openModalBtns = document.querySelectorAll('.open-modal-btn');
const closeButtons = document.querySelectorAll('.close');
const headerCartBtn = document.querySelector('.header-cart__btn');

const modals = [
    document.getElementById('modal-item'),
    document.getElementById('modal-order-in-cart'),
    document.getElementById('modal-cart'),
    document.getElementById('modal-contact'),
    document.getElementById('modal-order-accepted'),
];

let currentModalIndex = -1;

function openNextModal(e) {
    currentModalIndex++;
    if (currentModalIndex <= modals.length - 1) {
        const currentModal = modals[currentModalIndex];
            console.log(currentModal);
        if (currentModal.id === 'modal-item') {
            getValueGoodFields(e, currentModal);
        }
        if (currentModal.id === 'modal-order-in-cart') {
            console.log(currentModal);
            setTimeout(() => {
                closeAllModals();
            }, 2000);
        }
        modals[currentModalIndex].style.display = 'flex';
    }
    if (currentModalIndex === modals.length - 1) {
        setTimeout(() => {
            closeAllModals();
            currentModalIndex = -1;
        }, 2000);
    }
}

function closeAllModals() {
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

openModalBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        closeAllModals();
        openNextModal(e);
    });
});

headerCartBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    closeAllModals();
    currentModalIndex = 2;
    modals[currentModalIndex].style.display = 'flex';
});

closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        const modalIndex = modals.indexOf(modal);
        if (modalIndex !== -1) {
            closeAllModals();
            currentModalIndex = modalIndex - 1;
        }
    });
});


// ______________________________________________
// Counter (value, plus, minus)
const minValue = 0;
const maxValue = 999;
const counterMinusButtons = document.querySelectorAll('.counter-minus');
const counterPlusButtons = document.querySelectorAll('.counter-plus');

counterMinusButtons.forEach(button => {
    button.addEventListener('click', () => {
        const counterValue = button.parentNode.querySelector('.counter-value');
        let currentValue = parseInt(counterValue.textContent);
        if (currentValue > minValue) {
            counterValue.textContent = (currentValue - 1).toString();
            // updateCounterBtns();
        }
    });
});

counterPlusButtons.forEach(button => {
    button.addEventListener('click', () => {
        const counterValue = button.parentNode.querySelector('.counter-value');
        let currentValue = parseInt(counterValue.textContent);
        if (currentValue < maxValue) {
            counterValue.textContent = (currentValue + 1).toString();
            // updateCounterBtns();
        }
    });
});

function updateCounterBtns() {
    // const currentValue = parseInt(counterInput.value);
    // minusBtn.style.color = currentValue > 0 ? '#949CBE' : '#D4D8EB';
    // plusBtn.style.color = '#949CBE';
}

function getValueGoodFields({target}, modal) {
    const itemTitle = target.parentElement.querySelector('.good-title').textContent;
    const itemImage = target.parentElement.querySelector('.good-image img').src;
    const itemCount = target.parentElement.querySelector('.good-value').textContent;
    const itemPrice = target.parentElement.querySelector('.good-price').textContent;

    const imageName = itemImage.split('/').pop();
    const imagePath = `../../assets/images/${imageName}`;
    console.log(imagePath);

    modal.querySelector('.modal-title').textContent = itemTitle;
    modal.querySelector('.modal-image').src = imagePath;
    console.log(itemImage);
    modal.querySelector('.modal-value').textContent = itemCount;
    modal.querySelector('.modal-price').textContent = itemPrice;
}

// __________________________________________________________


// const counterInput = document.querySelector('.counter-input');
//     const minusBtn = document.querySelector('.counter-minus');
//     const plusBtn = document.querySelector('.counter-plus');
//     const counterInputs = document.querySelectorAll('.counter-input');
//     const goodsOrderBtn = document.querySelector('.goods-order-btn');
//     const modal = document.querySelector('.modal');
//     const modals = document.querySelectorAll('.modal');
//     const modalItem = document.getElementById('modal-item');
//     const modalCart = document.getElementById('modal-cart');
//     const modalContact = document.getElementById('modal-contact');
//     const modalOrderAccepted = document.getElementById('modal-order-accepted');
//
//     const openModalBtns = document.querySelectorAll('.open-modal-btn');
//     const closeModal = document.querySelectorAll('.close');
//     const closeModalItem = document.querySelector('#close-item');
//
//     // анимация открытия модалки
//     openModalBtns.forEach(button => {
//         button.addEventListener('click', function(e) {
//             e.stopPropagation();
//             e.preventDefault();
//             if (button.className === goodsOrderBtn.className) {
//                 modals.forEach(modal => {
//                     if (modal.id === 'modal-item') {
//                         getValueFields(button, modal);
//                         modal.style.display = 'flex';
//                         // animeModal();
//                     }
//                 });
//             }
//             if (button.id === 'btn-modal-item') {
//                 modalCart.style.display = 'flex';
//                 closeModales(modalItem);
//             } else if (button.id === 'btn-modal-cart') {
//                 modalContact.style.display = 'flex';
//                 closeModales(modalCart);
//             } else if (button.id === 'btn-modal-contact') {
//                 cart = [];
//                 modalOrderAccepted.style.display = 'flex';
//                 // updateCart();
//                 setTimeout(function() {
//                     modalOrderAccepted.style.display = 'none';
//                 }, 2000);
//                 closeModales(modalContact);
//             }
//         });
//     });
//
//     closeModalItem.addEventListener('click', function() {
//         modalItem.style.display = 'none';
//     });
//
// closeModal.addEventListener('click', function () {
//     anime({
//         targets: modal,
//         scale: [1, 0],
//         duration: 400,
//         easing: 'easeOutElastic',
//         complete: () => {
//             modal.style.display = 'none';
//         }
//     });
//     // modal.style.display = 'none';
// });
//
// window.addEventListener('click', function ({target}) {
//     if (target === modal) {
//         modal.style.display = 'none';
//     }
// });
//
// function animeModal() {
//     anime({
//         targets: modal,
//         scale: [0, 1],
//         duration: 400,
//         easing: 'easeOutElastic'
//     });
// }

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

// minusBtn.addEventListener('click', function () {
//     const currentValue = parseInt(counterInput.value);
//     if (currentValue > 0) {
//         counterInput.value = currentValue - 1;
//     }
//     updateCounterBtns();
// });

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

// plusBtns.forEach(button => {
//     button.addEventListener('click', function () {
//         const input = button.previousElementSibling;
//         const currentValue = parseInt(input.value);
//         input.value = currentValue + 1;
//         if (input.value > 0) {
//             input.previousElementSibling.disabled = false;
//         }
//         updateCounterBtns();
//     });
// });

// counterInputs.forEach(input => {
//     input.addEventListener('change', function () {
//         if (parseInt(input.value) < 0) {
//             input.value = 0;
//         }
//         updateCounterBtns();
//     })
// })

// counterInput.addEventListener('change', function () {
//     if (parseInt(counterInput.value) < 0) {
//         counterInput.value = 0;
//     }
//     updateCounterBtns();
// })


//-----------------------------
// modal cart
const cartModal = document.getElementById('modal-cart');
const closeCartModal = document.querySelector('.close');
const cartOrderBtn = document.getElementById('btn-modal-contact');
const cartItems = document.querySelector('.cart-items');

let cart = [];
// НЕ НУЖНО. Будет на беке
// function addToCart(product) {
//     cart.push(product);
//     updateCart();
// }
//
// function deleteFromCart(product) {
//     cart = cart.filter(item => item !== product);
//     updateCart();
// }

//__________________________________
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
