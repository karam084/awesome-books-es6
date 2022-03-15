import data from './data.js';

const form = document.querySelector('#book-form');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookSection = document.querySelector('.books');

const preserveBookData = () => {
  const booksData = JSON.stringify(data);
  window.localStorage.setItem('books', booksData);
};

const addBook = (author, title) => {
  data.push({ author, title });
  preserveBookData();
  return data.length - 1;
};

const displayBook = (author, title, indx) => {
  const bookCard = `
    <div class="book-card">
      <h2 class="book">${title}</h2>
      <h3 class="author">${author}</h3>
      <button class="btn-remove" id="btn-rem-${indx}" data-index="${indx}" type="button">Remove</button>
      <hr />
    </div>
  `;
  bookSection.insertAdjacentHTML('beforeend', bookCard);
  return `btn-rem-${indx}`;
};

// Remove book function helper
const removeBook = (event) => {
  const bookIndex = event.target.dataset.index;
  data.splice(bookIndex, 1);
  preserveBookData();
  event.target.parentElement.remove();
};

// Event lister to add books and save them
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = bookTitle.value;
  const author = bookAuthor.value;
  const bookIndex = addBook(title, author);
  const btnRemId = displayBook(title, author, bookIndex);
  // Event listener to remove a book
  document.getElementById(btnRemId).addEventListener('click', removeBook);
});

// Helper to print all books on DOM
const showAllBooks = () => {
  data.push(...JSON.parse(localStorage.getItem('books')));
  data.forEach((book, i) => {
    const { title, author } = book;
    displayBook(author, title, i);
  });
};

// Event listener to display all saved books
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('books')) showAllBooks();
});
// Event listener for all remove buttons aften DOMCONTENTLOADED
window.addEventListener('DOMContentLoaded', () => {
  const remBookBtns = document.querySelectorAll('.btn-remove');
  if (remBookBtns.length > 0) {
    remBookBtns.forEach((btn) => btn.addEventListener('click', removeBook));
  }
});
