import data from './data.js'

const form = document.querySelector('#book-form')
const bookTitle = document.querySelector('#title')
const bookAuthor = document.querySelector('#author')
const bookSection = document.querySelector('.books')

const addBook = (author, title) => {
  data.push({ author, title })
  return data.findIndex((book) => book.author === author)
}

const deleteBook = () => {
  //delete book
}

const displayBook = (author, title, indx) => {
  const bookCard = `
    <div class="book-card">
      <h2 class="book">${title}</h2>
      <h3 class="author">${author}</h3>
      <button class="btn-remove" data-index="${indx}" type="button">Remove</button>
      <hr />
    </div>
  `
  bookSection.insertAdjacentHTML('beforeend', bookCard)
}

const preserveBookData = () => {
  const booksData = JSON.stringify(data)
  window.localStorage.setItem('books', booksData)
}
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const title = bookTitle.value
  const author = bookAuthor.value
  const bookIndex = addBook(title, author)
  preserveBookData()
  displayBook(title, author, bookIndex)
})
