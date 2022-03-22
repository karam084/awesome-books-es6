import data from './data.js';

export default () => {
  const messageEle = document.getElementById('empty-list');
  if (!data.length) {
    messageEle.classList.add('show');
  } else {
    messageEle.classList.remove('show');
  }
};
