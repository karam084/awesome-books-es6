const elements = {
  form: document.querySelector('#book-form'),
  bookTitle: document.querySelector('#title'),
  bookAuthor: document.querySelector('#author'),
  bookSection: document.querySelector('.list'),
  dateElem: document.getElementById('date'),
  // Select sections
  bookListSection: document.querySelector('.book-list'),
  addBookSection: document.querySelector('.add-book'),
  contactSection: document.querySelector('.contact'),
  // Select nav anchor tags
  listBtn: document.getElementById('listNav'),
  addBookBtn: document.getElementById('addBookNav'),
  contactBtn: document.getElementById('contactNav'),
};

export default elements;
