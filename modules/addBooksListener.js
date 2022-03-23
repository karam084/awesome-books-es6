import elem from './domElements.js';
import Book from './Book.js';

export default () => {
  elem.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const book = new Book(elem.bookTitle.value, elem.bookAuthor.value);
    book.saveBookValues();
    book.displayBookValues();
    // Event listener to remove a book
    document
      .getElementById(`btn-rem-${book.index}`)
      .addEventListener('click', (e) => {
        book.deleteBookValues(e.target);
      });
    // Reset form values and inform successful save
    elem.bookTitle.value = '';
    elem.bookAuthor.value = '';
    const headerElem = document.querySelector('.add-book h2');
    headerElem.textContent = 'Book was successfully added to list!';
    setTimeout(() => {
      headerElem.textContent = 'Add a new book';
    }, 2000);
  });
};
