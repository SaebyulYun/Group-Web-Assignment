/**
 * Name:    Assignmnet 2- GroupAssignment-Blog Platform
 * Group:   3 - Saebyul Yun, Kuang-I Ho, Shang-Yuan Chang
 * Date:    Nov 25, 2023 
 * Section: CST8285 302 
 * 
 * @fileoverview
 * For controlling the page home.html
 *
 * @author Saebyul Yun
 * @version 1.0.0
 * @lastmodified 2023-11-25
 */

// Navigetor button events
// This event in order to handle the event every time the toggle button is clicked
const toggleBtn = document.querySelector('.navbar_toogleBtn');
const menu = document.querySelector('.navbar_menu');
const icons = document.querySelector('.navbar_icons');

// Called this fuction that we are specifying whenever a click is made
toggleBtn.addEventListener('click', () => {
  menu.classList.toggle('active');
  icons.classList.toggle('active');
});


const swiper = new Swiper('.swiper', {

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});