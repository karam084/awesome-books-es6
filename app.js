import data from './data.js';

const form = document.querySelector('#book-form');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookSection = document.querySelector('.books');

class Book {
  constructor(title, author) {
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
    return `btn-rem-${this.index}`;
  }

  deleteBookValues(target) {
    data.splice(this.bookIndex, 1);
    console.log(target.dataset.index);
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

  displayAllBooksValues() {}
}

window.allData = data;

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

// Remove book function helper
// const removeBook = (event) => {
// const bookIndex = event.target.dataset.index;
// data.splice(bookIndex, 1);
// preserveBookData();
// event.target.parentElement.remove();
// // replace all button data values to reset their index
// const remBookBtns = document.querySelectorAll('.btn-remove');
// if (remBookBtns.length > 0) {
//   remBookBtns.forEach((btn, i) => {
//     btn.dataset.index = i;
//   });
// }
// };

// const preserveBookData = () => {
//   const booksData = JSON.stringify(data);
//   window.localStorage.setItem('books', booksData);
// };

// const addBook = (author, title) => {
//   data.push({ author, title });
//   preserveBookData();
//   return data.length - 1;
// };

// const displayBook = (author, title, indx) => {
//   const bookCard = `
//     <div class="book-card">
//       <h2 class="book">${title}</h2>
//       <h3 class="author">${author}</h3>
//       <button class="btn-remove" id="btn-rem-${indx}" data-index="${indx}"
//       type="button">Remove</button>
//       <hr />
//     </div>
//   `;
//   bookSection.insertAdjacentHTML('beforeend', bookCard);
//   return `btn-rem-${indx}`;
// };

// Add event listeners to remove buttons
// const addListenerToRemBtns = () => {
//   const remBookBtns = document.querySelectorAll('.btn-remove');
//   if (remBookBtns.length > 0) {
//     remBookBtns.forEach((btn) => btn.addEventListener('click', removeBook));
//   }
// };

// // Event lister to add books and save them
// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const title = bookTitle.value;
//   const author = bookAuthor.value;
//   const bookIndex = addBook(title, author);
//   const btnRemId = displayBook(title, author, bookIndex);
//   // Event listener to remove a book
//   document.getElementById(btnRemId).addEventListener('click', removeBook);
// });

// // Helper to print all books on DOM
// const showAllBooks = () => {
//   data.push(...JSON.parse(localStorage.getItem('books')));
//   data.forEach((book, i) => {
//     const { title, author } = book;
//     displayBook(author, title, i);
//   });
// };

// // Event listener to display all saved books and add event listeners to each remove button
// window.addEventListener('DOMContentLoaded', () => {
//   if (localStorage.getItem('books')) {
//     showAllBooks();
//     addListenerToRemBtns();
//   }
// });
