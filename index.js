import { DateTime } from './luxon.js';
import addNavListeners from './modules/addNavListeners.js';
import addBooksListener from './modules/addBooksListener.js';
import displayAllBooksListener from './modules/displayAllBooksListener.js';
// Select main elements

const dateElem = document.getElementById('time');

// Select section
const bookListSection = document.querySelector('.book-list');

// show bookList
bookListSection.classList.toggle('show');
addNavListeners();
addBooksListener();
displayAllBooksListener();
// show date
dateElem.innerHTML = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
