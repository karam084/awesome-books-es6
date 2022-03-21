import data from './modules/book.js';
import { DateTime } from './node_modules/luxon/build/es6/luxon.js';
// Select main elements
const form = document.querySelector('#book-form');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookSection = document.querySelector('.list');
const dateElem = document.getElementById('date');

// Select sections
const bookListSection = document.querySelector('.book-list');
const addBookSection = document.querySelector('.add-book');
const contactSection = document.querySelector('.contact');

// Select nav anchor tags
const listBtn = document.getElementById('listNav');
const addBookBtn = document.getElementById('addBookNav');
const contactBtn = document.getElementById('contactNav');

// show bookList
bookListSection.classList.toggle('show');

// Add eventlisteners to nav buttons
listBtn.addEventListener('click', () => {
  addBookSection.classList.add('show');
  addBookSection.classList.remove('show');
  contactSection.classList.remove('show');
});

addBookBtn.addEventListener('click', () => {
  bookListSection.classList.remove('show');
  contactSection.classList.remove('show');
});

contactBtn.addEventListener('click', () => {
  contactSection.classList.add('show');
  addBookSection.classList.remove('show');
  bookListSection.classList.remove('show');
});

class Book {
  constructor(title = '', author = '') {
    this.title = title;
    this.author = author;
    this.index = null;
  }

  #displayBackground(target, idx = this.index) {
    if (idx % 2 === 0) {
      target.style.backgroundColor = 'lightgray';
    } else {
      target.style.backgroundColor = 'white';
    }
  }

  #preserveBookData() {
    this.booksData = JSON.stringify(data);
    window.localStorage.setItem('books', this.booksData);
  }

  saveBookValues() {
    data.push({ author: this.author, title: this.title });
    this.#preserveBookData();
    this.index = data.length - 1;
  }

  displayBookValues() {
    this.bookCard = document.createElement('div');
    this.bookCard.classList.add('book-card');
    this.bookCard.innerHTML = `
      <h3 class="book">"${this.title} by ${this.author}"</h3>
      <button class="btn-remove" id="btn-rem-${this.index}" data-index="${this.index}"
      type="button">Remove</button>
  `;
    bookSection.appendChild(this.bookCard);
    this.#displayBackground(this.bookCard);
  }

  deleteBookValues(target) {
    data.splice(this.bookIndex, 1);
    this.#preserveBookData();
    target.parentElement.remove();
    // replace all button data values to reset their index
    const remBookBtns = document.querySelectorAll('.btn-remove');
    const allBooks = document.querySelectorAll('.book-card');
    if (remBookBtns.length > 0) {
      remBookBtns.forEach((btn, i) => {
        btn.dataset.index = i;
        this.#displayBackground(allBooks[i], i);
      });
    }
  }

  displayAllBooksValues() {
    data.push(...JSON.parse(localStorage.getItem('books')));
    data.forEach((storedBook) => {
      this.book = new Book(storedBook.title, storedBook.author);
      this.book.displayBookValues();
    });
    const allBooksElem = document.querySelectorAll('.book-card');
    allBooksElem.forEach((bookElem, idx) => {
      this.#displayBackground(bookElem, idx);
    });
  }
}

// Event lister to add books and save them
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const book = new Book(bookTitle.value, bookAuthor.value);
  book.saveBookValues();
  book.displayBookValues();
  // Event listener to remove a book
  document
    .getElementById(`btn-rem-${book.index}`)
    .addEventListener('click', (e) => {
      book.deleteBookValues(e.target);
    });
});

// Event listener to display all saved books and add event listeners to each remove button
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('books')) {
    new Book().displayAllBooksValues();
    const remBookBtns = document.querySelectorAll('.btn-remove');
    remBookBtns.forEach((btn, i) => {
      btn.dataset.index = i;
      btn.addEventListener('click', (e) => {
        new Book().deleteBookValues(e.target);
      });
    });
  }
  // show date
  time.innerHTML = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
});
