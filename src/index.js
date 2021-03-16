'use strict';


import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import command from './modules/command';
import handler from './modules/handler';


// Timer
countTimer('22 march 2021');
// menu
toggleMenu();
//popup
togglePopup();
//табы
tabs();
// слайдер
slider();
//калькулятор
calc();
//send-ajax-form
sendForm();
//команда
command();
//обратная связь
handler();
