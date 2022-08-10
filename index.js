import { DateTime } from './modules/luxon.js';
import BookManager from './modules/bookManager.js';

const bookManager = new BookManager();
const listBooks = document.querySelector('#book_list');

const deleteItem = (container, id) => {
  listBooks.removeChild(container);
  bookManager.deleteBook(id);
};

const createItem = (title, author, id) => {
  const divContainer = document.createElement('div');
  const titleAuthorElement = document.createElement('p');
  const deleteButton = document.createElement('button');

  divContainer.id = `book_${id}`;
  divContainer.classList.add('book-details');

  titleAuthorElement.innerText = `${title} by "${author}`;
  titleAuthorElement.classList.add('text-author');
  titleAuthorElement.classList.add('text-title');

  deleteButton.innerText = 'Remove';
  deleteButton.classList.add('delete-button');

  deleteButton.addEventListener('click', () => {
    deleteItem(divContainer, id);
  });

  divContainer.appendChild(titleAuthorElement);
  divContainer.appendChild(deleteButton);
  return divContainer;
};

const addItem = (book) => {
  listBooks.appendChild(createItem(book.title, book.author, book.id));
};

const createBookList = () => {
  bookManager.books.forEach((book) => {
    addItem(book);
  });
};

const addForm = document.getElementById('books__add');
const titleForm = document.getElementById('title');
const authorForm = document.getElementById('author');

const addingBook = (e) => {
  e.preventDefault();
  const title = titleForm.value;
  const author = authorForm.value;
  bookManager.createBook(title, author);
  addItem(bookManager.books[bookManager.books.length - 1]);
  titleForm.value = '';
  authorForm.value = '';
};

const addButtonListener = () => {
  addForm.addEventListener('submit', addingBook);
};

const updateTime = () => {
  const showTime = document.getElementById('date');
  showTime.innerText = DateTime.local().toLocaleString(DateTime.DATETIME_MED);
};

const startTime = () => {
  updateTime();
  setInterval(updateTime, 1000);
};

const queryBookList = document.getElementById('book_list');
const queryBookAdd = document.getElementById('books__add');
const queryBookContact = document.querySelector('.contact');

const queryMenuList = document.getElementById('list');
const queryMenuAdd = document.getElementById('add-book');
const queryMenuContact = document.getElementById('contact');

const deleteMenu = () => {
  queryMenuList.classList.remove('active');
  queryMenuAdd.classList.remove('active');
  queryMenuContact.classList.remove('active');
};

const clickList = (e) => {
  e.preventDefault();
  deleteMenu();
  e.target.classList.add('active');
  queryBookList.style.display = 'block';
  queryBookAdd.style.display = 'none';
  queryBookContact.style.display = 'none';
};

const clickAdd = (e) => {
  e.preventDefault();
  deleteMenu();
  e.target.classList.add('active');
  queryBookList.style.display = 'none';
  queryBookAdd.style.display = 'flex';
  queryBookContact.style.display = 'none';
};

const clickContact = (e) => {
  e.preventDefault();
  deleteMenu();
  e.target.classList.add('active');
  queryBookList.style.display = 'none';
  queryBookAdd.style.display = 'none';
  queryBookContact.style.display = 'block';
};

const addListenersMenu = () => {
  queryMenuList.addEventListener('click', clickList);
  queryMenuAdd.addEventListener('click', clickAdd);
  queryMenuContact.addEventListener('click', clickContact);
};

const start = () => {
  bookManager.startStorage();
  createBookList();
  addListenersMenu();
  addButtonListener();
  startTime();
};

window.addEventListener('load', start);
