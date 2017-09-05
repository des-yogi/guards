"use strict";

(function() {

  var mainNav = document.querySelector('.main-nav');
  var menuOpenBtn = document.querySelector('.main-nav__burger-icon-open');
  var menuCloseBtn = document.querySelector('.main-nav__burger-icon-close');
  var menuItems = document.querySelector('.main-nav__items--opened');

  var followUsBox = document.querySelector('.follow-us');
  var followUs = document.querySelector('.follow-us__soc-link');
  var followUsPlus = document.querySelector('.follow-us__plus');
  var socIconsBox = document.querySelector('.follow-us .social-links');

  var grBgr = document.querySelector('.gradient-bg');
  if (grBgr && grBgr !== null) {
    var grBgrSourceBottom = grBgr.getBoundingClientRect().bottom + window.pageYOffset;
  }

  window.addEventListener('scroll', function (e) {

    if (grBgrSourceBottom && window.pageYOffset > grBgrSourceBottom - menuOpenBtn.clientHeight) {
      // menuOpenBtn.classList.add('main-nav__burger-icon-open--scrolled');
      menuOpenBtn.style.fill = '#333';
      menuOpenBtn.style.backgroundColor = '#fff';
      menuOpenBtn.style.outline = '3px solid #fff';

    } else if (grBgr.classList.contains('gradient-bg--none')) {
        menuOpenBtn.style.fill = '#333';
        menuOpenBtn.style.backgroundColor = '#fff';
        menuOpenBtn.style.outline = '3px solid #fff';
    } else {
        // menuOpenBtn.classList.remove('main-nav__burger-icon-open--scrolled');
        menuOpenBtn.style.fill = '#fff';
        menuOpenBtn.style.background = 'none';
        menuOpenBtn.style.outline = 'none';
    }
  });

  var followUsHandler = function (e) {
    followUsPlus.classList.toggle('follow-us__plus--open');
    if (socIconsBox.classList.contains('social-links--close')) {
      socIconsBox.classList.remove('social-links--close');
    } else {
      socIconsBox.classList.add('social-links--close');
    }
  };

  var mouseClickHandler = function (e) {
    e.preventDefault();
    if (menuItems.classList.contains('main-nav__items--opened')) {
      menuItems.classList.remove('main-nav__items--opened');
      // menuOpenBtn.classList.add('main-nav__burger-icon-open--visible');
      // menuCloseBtn.classList.add('main-nav__burger-icon-close--hidden');
      menuOpenBtn.style.display = 'block';
      menuCloseBtn.style.display = 'none';
    } else {
      menuItems.classList.add('main-nav__items--opened');
      // menuOpenBtn.classList.remove('main-nav__burger-icon-open--visible');
      // menuCloseBtn.classList.remove('main-nav__burger-icon-close--hidden');
      menuOpenBtn.style.display = 'none';
      menuCloseBtn.style.display = 'block';

    }
  };

  var swiperN = new Swiper('.swiper-container-nav', {

    initialSlide: 0,
    slidesPerView: 4,
    spaceBetween: 20,
    //autoplay: 2000,
    // autoplayDisableOnInteraction: true,
    loop: true,
    grabCursor: true,
    pagination: '.swiper-pagination-nav',
    paginationClickable: true,
    paginationBulletRender: function (swiper, index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    }

  });

  var swiper = new Swiper('.swiper-container', {
    initialSlide: 0,
    slidesPerView: 3,
    spaceBetween: 22,
    autoplay: 3000,
    // autoplayDisableOnInteraction: true,
    loop: true,
    grabCursor: true,
    breakpoints: {
      // when window width is <= 767px
      767: {
        slidesPerView: 'auto',
        spaceBetween: 20
      }
    }
  });

  var swiperMain = new Swiper('.swiper-container-main', {

    initialSlide: 0,
    slidesPerView: 2,
    spaceBetween: 21,
    /*autoplay: 3000,
    autoplayDisableOnInteraction: true,*/
    loop: true,
    grabCursor: true,
    breakpoints: {
      // when window width is <= 767px
      767: {
        slidesPerView: 'auto',
        spaceBetween: 20
      }
    },
    pagination: '.swiper-pagination-main',
    paginationClickable: true,
    paginationBulletRender: function (swiper, index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
    onSlideChangeStart: function (swiper) {
      // console.log('Left: '+ swiper.realIndex + ' Right: ' + swiper.realIndex+1);
      //var slideLeft = swiper.slides[swiper.activeIndex];
      var rightIndex = swiper.realIndex + 1;
      var leftIndex = swiper.realIndex;
      console.log('Left: '+ leftIndex + ' Right: ' + rightIndex);
      var slideLeft = swiper.slides[leftIndex+2];
      var slideRight = swiper.slides[rightIndex+2];

      console.log(slideLeft);
      console.log(slideRight);
      // slideLeft.style.color = 'gray';
      slideLeft.style.transform = 'none';
      slideLeft.childNodes[7].className = 'main-slider__slide-text-wrapper';

      // slideRight.style.color = 'red';
      slideRight.style.transform = 'translateY(' + 35 + 'px)';
      slideRight.childNodes[7].className = 'main-slider__slide-text-wrapper--right';
    }

  });

  var swiperGalery = new Swiper('.guards-gallery__container', {

    initialSlide: 0,
    slidesPerView: 2,
    spaceBetween: 21,
    loop: true,
    grabCursor: true,
    breakpoints: {
      // when window width is <= 767px
      767: {
        slidesPerView: 'auto',
        spaceBetween: 20
      }
    },
    onSlideChangeStart: function (swiper) {
      // console.log('Left: '+ swiper.realIndex + ' Right: ' + swiper.realIndex+1);
      //var slideLeft = swiper.slides[swiper.activeIndex];
      var rightIndex = swiper.realIndex + 1;
      var leftIndex = swiper.realIndex;
      console.log('Left: '+ leftIndex + ' Right: ' + rightIndex);
      var slideLeft = swiper.slides[leftIndex+2];
      var slideRight = swiper.slides[rightIndex+2];

      console.log(slideLeft);
      console.log(slideRight);
      // slideLeft.style.color = 'gray';

      if (document.documentElement.clientWidth > 768) {

          slideRight.style.marginTop = 0;
          slideRight.style.marginBottom = 35 + 'px';

          slideLeft.style.marginTop = 35 + 'px';
          slideLeft.style.marginBottom = 0;
      }
    }

  });

  window.addEventListener('DOMContentLoaded', function (e) {
    if (menuItems.classList.contains('main-nav__items--opened')) {
      menuItems.classList.remove('main-nav__items--opened');
    }

    menuOpenBtn.addEventListener('click', mouseClickHandler);
    menuCloseBtn.addEventListener('click', mouseClickHandler);
    followUs.addEventListener('click', followUsHandler);
  });

  window.addEventListener('keydown', function (e) {
    if(window.utils.isDeactivateEvent(e) && menuItems.classList.contains('main-nav__items--opened')) {
      menuItems.classList.remove('main-nav__items--opened');
      // menuOpenBtn.classList.add('main-nav__burger-icon-open--visible');
      // menuCloseBtn.classList.add('main-nav__burger-icon-close--hidden');
      menuOpenBtn.style.display = 'block';
      menuCloseBtn.style.display = 'none';
    }
  });

})();

window.utils = (function () {

  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  var isKeyboardEvent = function (e) {
    return typeof e.keyCode !== 'undefined';
  };

  return {
    isActivateEvent: function (e) {
      return isKeyboardEvent(e) && e.keyCode === ENTER_KEY_CODE;
    },

    isDeactivateEvent: function (e) {
      return isKeyboardEvent(e) && e.keyCode === ESCAPE_KEY_CODE;
    }
  };

})();
