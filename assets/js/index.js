// import 'animejs';
// import 'parsleyjs'; АКТИВИРОВАТЬ, если используется сборщик модулей
// import anime from "animejs";
// import parsley from "parsleyjs/dist/parsley";


$(document).ready(function () {
    $('#myForm').parsley();
});

const element = document.getElementById('order-input-tel');
const maskOptions = {
    mask: '+{38}(000)000-00-00'
};
const mask = IMask(element, maskOptions);

//____________________________________________________________________
// VARIABLES
//____________________________________________________________________

const currencySymbol = 'грн';
let selectedDate;

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
    $('.general').ripples({
        resolution: 512,
        dropRadius: 20,
        interactive: true,
        perturbance: 0.02,
    });

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
                margin: 8,
            },
            768: {
                items: 1,
                margin: 15,
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
        nav: false,
        dots: true,
        dotsEach: 1,
        margin: 0,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1.5
            },
            992: {
                items: 3
            }
        }
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
    }, 1000); // Задержка в миллисекундах (здесь 2000 мс = 2 секунды)
});

// _____________________
//
const canvasContainer = document.getElementById('canvas-container');
const generalWrapper = document.querySelector('.general-wrapper');
const title = document.querySelector('.general-wrapper__title');
const description = document.querySelector('.general-wrapper__description');

gsap.set([generalWrapper, title, description], {opacity: 0, y: 20});

const tl = gsap.timeline({onComplete: startAnimation});

tl.to(canvasContainer, {opacity: 1, duration: 1});

function startAnimation() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    PIXI.utils.skipHello();

    const app = new PIXI.Application({
        width: windowWidth,
        height: windowHeight,
        transparent: true,
        resolution: 1,
        autoResize: true,
    });

    $('#canvas-container').append(app.view);

    const backgroundImage = PIXI.Sprite.from('assets/images/main.png');
    backgroundImage.anchor.set(0.5);
    const container = new PIXI.Container();
    backgroundImage.x = app.renderer.width / 2;
    backgroundImage.y = app.renderer.height / 2;
    backgroundImage.alpha = 0;

    container.addChild(backgroundImage);
    app.stage.addChild(container);

    let bg = PIXI.Sprite.from('assets/images/main.png');

    if (window.innerWidth <= 576) {
        bg = PIXI.Sprite.from('assets/images/main_mob.png');
    }

    bg.width = app.renderer.width;
    bg.height = app.renderer.height;
    bg.alpha = 0; //1
    container.addChild(bg);

    const bgTween = gsap.timeline({onComplete: showContent});
    bgTween.to(bg, {
        alpha: 1,
        duration: 1,
        ease: 'power3.out',
    });

    function showContent() {
        gsap.to([generalWrapper, title, description], {opacity: 1, y: 0, duration: 1});
        startWaterAnimation();
    }

    function startWaterAnimation() {
        const displacementSprite = PIXI.Sprite.from("assets/images/waterTemp.jpg");
        const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

        displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        displacementSprite.scale.set(0.5);
        app.stage.addChild(displacementSprite);

        const options1 = {
            amplitude: 40, //300
            wavelength: 30, //160
            speed: 100, //500
            radius: 80
        };

        const shockwaveFilter1 = new PIXI.filters.ShockwaveFilter(
            [Math.random() * app.screen.width, Math.random() * app.screen.height],
            options1,
            0
        );

        const options2 = {
            amplitude: 80, //300
            wavelength: 45, //160
            speed: 140, //500
            radius: 160
        };

        const shockwaveFilter2 = new PIXI.filters.ShockwaveFilter(
            [Math.random() * app.screen.width, Math.random() * app.screen.height],
            options2,
            0
        );

        const options3 = {
            amplitude: 100, //300
            wavelength: 100, //160
            speed: 400, //500
            radius: 600
        };

        const shockwaveFilter3 = new PIXI.filters.ShockwaveFilter(
            [Math.random() * app.screen.width, Math.random() * app.screen.height],
            options3,
            0
        );

        container.filters = [
            displacementFilter,
            shockwaveFilter1,
            shockwaveFilter2,
            shockwaveFilter3
        ];

        app.ticker.add(function () {
            displacementSprite.x++;
            if (displacementSprite.x > displacementSprite.width)
                displacementSprite.x = 0;

            createRaindrops(shockwaveFilter1, 1.6);
            createRaindrops(shockwaveFilter2, 1.8);
            createRaindrops(shockwaveFilter3, 3);
        });

        displacementFilter.scale.x = 40;
        displacementFilter.scale.y = 40;
        displacementSprite.anchor.set(0.5);


        app.stage.interactive = true;
        app.stage.on('pointermove', onPointerMove);
        // app.stage.on('touchmove', onPointerMove);
        app.stage.on('pointerdown', onPointerDown);
        // app.stage.on('touchstart', onPointerDown);

        app.ticker.add(function (delta) {
            displacementSprite.rotation += 0.001 * delta;
        });

        function onPointerMove(event) {
            const {x, y} = event.data.global;
            const displacementX = (x / window.innerWidth) * app.screen.width;
            const displacementY = (y / window.innerHeight) * app.screen.height;
            displacementSprite.position.set(displacementX, displacementY);

        }

        function onPointerDown(eventData) {
            const pointerX = eventData.data.global.x;
            const pointerY = eventData.data.global.y;
            createRaindrops(shockwaveFilter3, 3, pointerX, pointerY);

        }

        function createRaindrops(filter, resetTime) {
            filter.time += 0.01;
            if (filter.time > resetTime) {
                filter.time = 0;
                filter.center = [
                    Math.random() * app.screen.width,
                    Math.random() * app.screen.height
                ];
            }
        }
    }
}


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
    const headerLink = document.querySelector('.header-link');

    if (scrollPosition >= 151) {
        headerLink.classList.remove('hidden-mobile');
        headerLink.classList.add('hidden-mobile--delay');
    }
    if (scrollPosition <= 151) {
        headerLink.classList.add('hidden-mobile');
        headerLink.classList.remove('hidden-mobile--delay');
    }

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
const gotoMenu = document.querySelectorAll('.goto-menu');
menuOpen.addEventListener('click', onMenuOpen);
menuClose.addEventListener('click', onMenuClose)

function onMenuOpen() {
    menuWindow.classList.add('visible');
    toggleBodyScrollLock(true);
}


function onMenuClose() {
    menuWindow.classList.remove('visible');
    toggleBodyScrollLock(false);
}

const modalMenu = document.querySelector('.modal-menu');
modalMenu.addEventListener('click', (e) => {
    if (e.target === modalMenu) {
        onMenuClose();
    }
});

function toggleBodyScrollLock(lock) {
    const body = document.querySelector('body');
    if (lock) {
        body.classList.add('body-scroll-lock');
    } else {
        body.classList.remove('body-scroll-lock');
    }
}

gotoMenu.forEach((btn) => {
    btn.addEventListener('click', onMenuClose)
})
console.log('Hello')
// ______________________________________________
// Скролл ап
document.addEventListener("DOMContentLoaded", function () {
    const scrollToTopButton = document.getElementById("scroll-to-top");
    const scrollTgBot = document.getElementById("tg-bot");

    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 100) {
            scrollToTopButton.style.display = "block";
            scrollTgBot.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
            scrollTgBot.style.display = "none";
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

const cartPriceValue = document.querySelector('.cart-price');
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

const inputs = document.querySelectorAll("input:required");

document.querySelector("form").addEventListener("submit", function (event) {

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];

        if (input.value.trim() === "") {
            input.classList.add("invalid");
        } else {
            input.classList.remove("invalid");
        }
    }

    // Если хотя бы один обязательный и пустой input найден, предотвращаем отправку формы
    const invalidInputs = document.querySelectorAll("input:required.invalid");
    if (invalidInputs.length > 0) {
        event.preventDefault();
    }
});

function openNextModal(e) {
    currentModalIndex++;
    if (currentModalIndex <= modals.length - 1) {
        const currentModal = modals[currentModalIndex];

        if (currentModal.id === 'modal-item') {
            getValueGoodFields(e, currentModal);
        }
        if (currentModal.id === 'modal-order-in-cart') {
            console.log(currentModal);
            setTimeout(() => {
                closeAllModals();
                currentModalIndex = -1;
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
    blurModalOClose();
}

// openModalBtns.forEach((button) => {
//     button.addEventListener('click', (e) => {
//         e.stopPropagation();
//         e.preventDefault();
//         closeAllModals();
//         openNextModal(e);
//     });
// });
openModalBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        closeAllModals();
        blurModalOpen();
        if (button.classList.contains('item-btn')) {
            currentModalIndex = -1;
        }
        if (button.classList.contains('general-wrapper__btn')) {
            currentModalIndex = 2;
        }
        openNextModal(e);
    });
});

headerCartBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    closeAllModals();
    blurModalOpen();
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
        blurModalOClose();
    });
});
const blur = document.querySelector('.blur');

function blurModalOpen() {
    blur.classList.add('blur-visible');
}

function blurModalOClose() {
    blur.classList.remove('blur-visible');
}

blur.addEventListener('click', () => {
    closeAllModals();
    currentModalIndex = -1;
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
        if (Number(counterValue.textContent) > 0) {
            counterValue.style.color = 'black'
        }
        if (Number(counterValue.textContent) < 1) {
            counterValue.style.color = '#949CBE'
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
        if (Number(counterValue.textContent) > 0) {
            counterValue.style.color = 'black'
        }
        if (Number(counterValue.textContent) < 1) {
            counterValue.style.color = '#949CBE'
        }
    });
});

function updateCounterBtns() {
    // const currentValue = parseInt(counterInput.value);
    // minusBtn.style.color = currentValue > 0 ? '#949CBE' : '#D4D8EB';
    // plusBtn.style.color = '#949CBE';
}

function getValueGoodFields({target}, modal) {
    if (modal.id === 'modal-item') {
        const itemTitle = target.parentElement.querySelector('.good-title').textContent;
        const itemImage = target.parentElement.querySelector('.good-image img').src;
        const itemCount = target.parentElement.querySelector('.good-value').textContent;
        const itemPrice = parseFloat(target.parentElement.querySelector('.good-price').textContent);
        console.log(itemPrice);

        const imageName = itemImage.split('/').pop();
        const imagePath = `../../assets/images/${imageName}`;
        console.log(imagePath);

        modal.querySelector('.modal-title').textContent = itemTitle;
        modal.querySelector('.modal-image').src = imagePath;
        modal.querySelector('.modal-value').textContent = itemCount;
        modal.querySelector('.modal-price').textContent = `${itemPrice} ${currencySymbol}`;
    }
}

const readMore = document.querySelector('.read-more');
const readBox = document.querySelector('.read-box');

readMore.addEventListener('click', onReadMoreClick);
let bool = true;

function onReadMoreClick() {
    readBox.classList.toggle('read-height');
    bool = !bool;
    if (readMore.textContent === "Читати більше" || "Читати менше") {
        console.log('укр')
        if (bool === false) {
            readMore.textContent = "Читати менше";
            console.log(bool)
            return;
        }
        if (bool === true) {
            readMore.textContent = "Читати бiльше";
            console.log(bool)
        }
    } else {
        console.log('рус')
        if (bool === false) {
            readMore.textContent = "Читать меньше";
            console.log(bool)
            return;
        }
        if (bool === true) {
            readMore.textContent = "Читать больше";
            console.log(bool)
        }
    }
}

// ________________________________________________
// Add scroll to section Point
const buttonToPointLink = document.getElementById('btn_to-point');
const sectionPointLink = document.getElementById('point-link');

buttonToPointLink.addEventListener('click', function (e) {
    e.preventDefault();
    const sectionTop = sectionPointLink.offsetTop;
    let headerHeight = 170;

    if (window.innerWidth >= 992) {
        headerHeight = 200;
    } else if (window.innerWidth >= 375) {
        headerHeight = 120;
    } else {
        headerHeight = 100;
    }

    window.scrollTo({
        top: sectionTop - headerHeight,
        behavior: 'smooth'
    });
});

// ______________________________________________________________
// Calendar (section Order)
const calendarOrderContact = new AirDatepicker('#datepicker_order-contact', {
    isMobile: true,
    autoClose: true,

    buttons: ['today', 'clear'],
    locale: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        daysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        daysMin: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'dd.MM.yyyy',
        timeFormat: 'hh:mm aa',
        firstDay: 0
    },
    onSelect: function (formattedDate, date, inst) {
        // Какие нужны действия при выборе даты
        console.log(formattedDate);
        selectedDate = formattedDate;

        // Отправка выбранной даты на бэкенд
        // Дополнительный код для отправки данных на бэкенд
    },
    onShow: () => {
        $('.air-datepicker-global-container').css('z-index', '1001');
    },
    onHide: () => {
        $('.air-datepicker-global-container').css('z-index', '');
    }
});

// ______________________________________________________________
// Calendar (modal Order)

const calendarModalContact = new AirDatepicker('#datepicker_modal-contact', {
    isMobile: true,
    autoClose: true,

    buttons: ['today', 'clear'],
    locale: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        daysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        daysMin: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'dd.MM.yyyy',
        timeFormat: 'hh:mm aa',
        firstDay: 0
    },
    onSelect: function (formattedDate, date, inst) {
        // Какие нужны действия при выборе даты
        console.log(formattedDate);
        selectedDate = formattedDate;

        // Отправка выбранной даты на бэкенд
        // Дополнительный код для отправки данных на бэкенд
    },
    onShow: () => {
        $('.air-datepicker-global-container').css('z-index', '1001');
    },
    onHide: () => {
        $('.air-datepicker-global-container').css('z-index', '');
    }
});

$('datepicker_modal-contact').on('click', function () {
    $('.air-datepicker-global-container').css('z-index', '1001');
});

$('datepicker_modal-contact').on('focusout', function () {
    $('.air-datepicker-global-container').css('z-index', '');
});
const videoOpen = document.querySelector('.video-open');
const videoClose = document.querySelector('.video-close');
const video = document.querySelector('.video');
const iframe = document.querySelector('.video iframe');

videoOpen.addEventListener('click', onVideoOpen);
videoClose.addEventListener('click', onVideoClose);
video.addEventListener('click', function (event) {
    if (!event.target.closest('iframe')) {
        this.classList.remove('video-visible');
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
});

function onVideoOpen() {
    video.classList.add('video-visible')
}

function onVideoClose() {
    video.classList.remove('video-visible');
    iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
}