import storageAvailable from './modules/localStorage.js';
import Book from './modules/book.js';

class BookManager {
  constructor() {
    this.books = [];
    this.id = 0;
  }
  addBook(book) {
    if (book instanceof Book) {
      book.id = this.id;
      this.books.push(book);
      this.id += 1;
      this.updateStoreFormData();
      return book;
  }
  throw Error(`${book} is not a Book`);
  }

  createBook = (title, author) => {
    const newItem = new Book(title, author);
    this.addBook(newItem);
  }

  deleteBook = (id) => {
    this.books = this.books.filter(book => book.id !== id);
    this.updateStoreFormData();
  }

  getStoreFormData = () => {
    const object = JSON.parse(localStorage.getItem('dataBooks'));
    if (object) {
      this.books = object?.books;
      this.id = object?.id;
    }
  }

  updateStoreFormData = () => {
    if (!storageAvailable()) return;
    localStorage.setItem('dataBooks', JSON.stringify(this));
  }

  startStorage = () => {
    if (storageAvailable()) {
      this.getStoreFormData();
    }
  }
}

export default BookManager;