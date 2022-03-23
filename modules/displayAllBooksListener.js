import Book from './Book.js';
import checkAndDisplayEmptyList from './checkAndDisplayList.js';

export default () => {
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
    checkAndDisplayEmptyList();
  });
};
