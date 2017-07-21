"use strict";

(function() {

  var mainNav = document.querySelector('.main-nav');
  var menuOpenBtn = document.querySelector('.main-nav__burger-icon-open');
  var menuCloseBtn = document.querySelector('.main-nav__burger-icon-close');
  var menuItems = document.querySelector('.main-nav__items--opened');

  var followUs = document.querySelector('.follow-us__soc-link');
  var followUsPlus = document.querySelector('.follow-us__plus');
  var socIconsBox = document.querySelector('.follow-us .social-links');

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



  window.addEventListener('DOMContentLoaded', function (e) {
    if (menuItems.classList.contains('main-nav__items--opened')) {
      menuItems.classList.remove('main-nav__items--opened');
    }

    menuOpenBtn.addEventListener('click', mouseClickHandler);
    menuCloseBtn.addEventListener('click', mouseClickHandler);
    followUs.addEventListener('click', followUsHandler);
  });

  /*document.addEventListener('DOMContentLoaded', function (e) {
    BackgroundCheck.init({
      targets: '.main-toggler__toggle'
    });
    BackgroundCheck.refresh();
  });*/

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
