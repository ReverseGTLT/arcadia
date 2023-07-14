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
// window.addEventListener('load', function () {
//     setTimeout(function () {
//         const preloader = document.getElementById('preloader');
//         preloader.style.display = 'none';
//     }, 1500); // Задержка в миллисекундах (здесь 2000 мс = 2 секунды)
// });

// _____________________________________

// Анимация главного экрана
const Application = PIXI.Application;

const app = new Application({
    // width: window.innerWidth,
    // height: window.innerHeight,
    resizeTo: window,
    transparent: true
});
document.body.appendChild(app.view);

const loader = PIXI.Loader.shared;
loader.add('backgroundImage', 'assets/images/main.png').load(setup);

function setup(loader, resources) {
    const backgroundImage = PIXI.Sprite.from(resources.backgroundImage.texture);
    backgroundImage.anchor.set(0.5);
    const container = new PIXI.Container();
    backgroundImage.x = app.renderer.width /2;
    backgroundImage.y = app.renderer.height /2;
    backgroundImage.alpha = 0;

    container.addChild(backgroundImage);
    app.stage.addChild(container);

    // const style = new PIXI.TextStyle({
    //     fontFamily: "Segoe UI",
    //     fontSize: 20 + window.innerWidth * 0.06,
    //     fill: "#ffffff",
    //     dropShadow: true,
    //     dropShadowDistance: 2,
    //     dropShadowAngle: Math.PI / 2,
    //     dropShadowBlur: 3,
    //     dropShadowColor: "#000000"
    // });

    // window.addEventListener("resize", function () {
    //     style.fontSize = 20 + window.innerWidth * 0.06;
    // });
    //
    // const myText = new PIXI.Text("ARCADIA", style);
    //
    // container.addChild(myText);
    // myText.anchor.set(0.5);
    // myText.x = app.screen.width / 2;
    // myText.y = app.screen.height / 2;

    const displacementSprite = PIXI.Sprite.from("assets/images/waterTemp.jpg");
    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    displacementSprite.scale.set(0.5);
    app.stage.addChild(displacementSprite);
    // container.addChild(displacementSprite);

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

    const bg = PIXI.Sprite.from('assets/images/main.png');
    bg.width = app.renderer.width;
    bg.height = app.renderer.height;
    bg.alpha = 0.5;
    container.addChild(bg);

    app.stage.on('mousemove', onPointerMove)
        .on('touchmove', onPointerMove);

    app.ticker.add(function(delta) {
        displacementSprite.rotation += 0.001 * delta;
    });
    function onPointerMove(eventData){
        displacementSprite.position.set(eventData.data.global.x , eventData.data.global.y);
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


// const canvas = document.querySelector("#canvas")
//
// const app = new PIXI.Application({
//     view: canvas,
//     width: window.innerWidth,
//     height: window.innerHeight,
//     transparent: true
// });
// document.body.appendChild(app.view);
//
// // var container = new PIXI.Container();
// // app.stage.addChild(container);
//
//
//
// const bg = PIXI.Sprite.from('assets/images/main.png');
// app.stage.addChild(bg);
//
// var renderer = new PIXI.autoDetectRenderer();
// var ripples = [];
//
//
// const displacementSprite = PIXI.Sprite.fromImage('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1600187/waterTemp.jpg');
//
//
//
// displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
// displacementSprite.scale.set(1);
// displacementSprite.anchor.set(0);
//
// const loadSprite = PIXI.Sprite.fromImage('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1600187/waterTemp.jpg');
// loadSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
// loadSprite.scale.set(0.99);
// loadSprite.anchor.set(0.2);
//
// const loadFilter = new PIXI.filters.DisplacementFilter(loadSprite)
// loadFilter.scale.x = 0;
// loadFilter.scale.y = 0;
//
// container.filters = [loadFilter]
//
//
// var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
// displacementFilter.scale.x = 10;
// displacementFilter.scale.y = 10;
// const filters = []
//
// filters.push(displacementFilter);
//
// for (let i = 0; i < 10; i++) {
//
//     const ripple = new PIXI.Sprite.fromImage('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1600187/ripple.png');
//
//     ripple.anchor.set(0.5);
//
//     ripple.scale.set(0);
//
//     app.stage.addChild(ripple);
//
//     const filter = new PIXI.filters.DisplacementFilter(ripple)
//     filters.push(filter)
//     ripples.push(ripple)
// }
//
// app.stage.filters = filters;
//
// bg.anchor.set(0.5);
// bg.position.set(200, 356.5);
// bg.width = app.renderer.width;
// bg.height = app.renderer.height;
//
// container.addChild(bg);
//
//
// const waves = TweenMax.to(displacementSprite.anchor, 44, {
//     y: "-2",
//     x: "-1",
//     ease: Power0.easeNone,
//     repeat: -1,
//     paused: true
// })
//
//
// let i = -1;
// app.view.addEventListener('mouseover', function(ev) {
//     i++
//     if (i > 9) {
//         i = 0;
//     }
//     MakeWaves((ev.clientX - canvas.offsetLeft), (ev.clientY - canvas.offsetTop), i);
// }, false)
//
//
// function MakeWaves(x, y, i) {
//
//     console.log(ripples)
//     ripples[i].position.set(x, y);
//     runTweens(ripples[i], filters[i + 1]);
// }
//
// runTweens = (ripple, filter) => {
//     TweenMax.fromTo(ripple.scale, 4,{ x: .1, y: .1 }, { x: 1.5, y: 1.5 })
//     TweenMax.fromTo(filter.scale, 4, { x: 50, y: 50 },{ x: 0, y: 0 })
// }
//
// TweenMax.from(container, 1, {
//     alpha: 0,
//     repeatDelay: 4,
//     ease: Power3.easeOut,
//     yoyo: true,
//     delay: 2,
// })
//
// TweenMax.from(loadSprite.anchor, 1, {
//     y: 0.35,
//     x: 0.25,
//     ease: Power1.easeOut,
//     repeatDelay: 4,
//     yoyo: true,
//     delay: 2,
//     onComplete: () => {waves.play()}
// })
// TweenMax.from(loadFilter.scale, 1, {
//     x: 900,
//     y: 9500,
//     ease: Power1.easeOut,
//     delay: 2,
// })


// gsap.from('.general-bg', {
//     opacity: 0,
//     scale: 1.1,
//     duration: 2,
//     ease: 'power3.out',
//     onComplete: function() {
//         // Запуск анимации капель и ряби
//         startDropsAnimation();
//         startRipplesAnimation();
//     }
// });
// Капли
function startDropsAnimation() {
    // const dropsTimeline = gsap.timeline({ repeat: -1 });
    // dropsTimeline.set('.drop', { scale: 0, opacity: 0 });
    // dropsTimeline.to('.drop', {
    //     opacity: 1,
    //     scale: 1,
    //     duration: 0.8,
    //     stagger: 0.1
    // });
    // dropsTimeline.to('.drop', {
    //     opacity: 0,
    //     scale: 0,
    //     duration: 0.8,
    //     stagger: 0.1
    // });
}

// Рябь
function startRipplesAnimation() {
    // gsap.to('.general-bg', {
    //     backgroundPosition: '0px -10px',
    //     ease: 'sine.inOut',
    //     duration: 2,
    //     repeat: -1,
    //     yoyo: true
    // });
}


// Движение воды при движении курсора
// document.addEventListener('mousemove', function(e) {
//     const mouseX = e.clientX;
//     const mouseY = e.clientY;
//
//     gsap.to('.general-bg', {
//         x: (window.innerWidth / 2 - mouseX) * 0.03,
//         y: (window.innerHeight / 2 - mouseY) * 0.03,
//         duration: 0.5,
//         ease: 'power2.out'
//     });
// });

//
// const circleDrop = document.querySelector(".circle-drop");
// document.addEventListener("mousemove", function(e) {
//     gsap.to(circleDrop, {
//         x: e.clientX,
//         y: e.clientY,
//         duration: 0.5
//     });
// });


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


