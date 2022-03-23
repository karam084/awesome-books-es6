import elem from './domElements.js';
import checkAndDisplayEmptyList from './checkAndDisplayList.js';

export default () => {
  elem.listBtn.addEventListener('click', () => {
    elem.bookListSection.classList.add('show');
    elem.addBookSection.classList.remove('show');
    elem.contactSection.classList.remove('show');
    checkAndDisplayEmptyList();
  });

  elem.addBookBtn.addEventListener('click', () => {
    elem.addBookSection.classList.add('show');
    elem.bookListSection.classList.remove('show');
    elem.contactSection.classList.remove('show');
  });

  elem.contactBtn.addEventListener('click', () => {
    elem.contactSection.classList.add('show');
    elem.addBookSection.classList.remove('show');
    elem.bookListSection.classList.remove('show');
  });
};
