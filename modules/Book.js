import data from './data.js';
import elem from './domElements.js';

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
    elem.bookSection.appendChild(this.bookCard);
    this.#displayBackground(this.bookCard);
  }

  deleteBookValues(target) {
    data.splice(this.bookIndex, 1);
    this.#preserveBookData();
    target.parentElement.remove();
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

export default Book;
