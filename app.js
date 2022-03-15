import data from './data.js';

const form = document.querySelector('#book-form');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookSection = document.querySelector('.books');

class Book {
  constructor(title = '', author = '') {
    this.title = title;
    this.author = author;
    this.index = null;
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
    this.bookCard = `
    <div class="book-card">
      <h2 class="book">${this.title}</h2>
      <h3 class="author">${this.author}</h3>
      <button class="btn-remove" id="btn-rem-${this.index}" data-index="${this.index}"
      type="button">Remove</button>
      <hr />
    </div>
  `;
    bookSection.insertAdjacentHTML('beforeend', this.bookCard);
  }

  deleteBookValues(target) {
    data.splice(this.bookIndex, 1);
    this.#preserveBookData();
    target.parentElement.remove();
    // replace all button data values to reset their index
    const remBookBtns = document.querySelectorAll('.btn-remove');
    if (remBookBtns.length > 0) {
      remBookBtns.forEach((btn, i) => {
        btn.dataset.index = i;
      });
    }
  }

  displayAllBooksValues() {
    data.push(...JSON.parse(localStorage.getItem('books')));
    data.forEach((storedBook) => {
      this.book = new Book(storedBook.title, storedBook.author);
      this.book.displayBookValues();
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
});
