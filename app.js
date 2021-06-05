class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class LocalStore {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    }
    else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = LocalStore.getBooks();
    let book_present = false;
    books.forEach((storeBook) => {
      if (storeBook.isbn === book.isbn) {
        UI.showAlert('ISBN Number must be unique', 'danger');
        book_present = true;
      }
    });
    if (!book_present) {
      books.push(book);
      UI.showBooks(Book);
      UI.showAlert('Book successfully added', 'success');
      localStorage.setItem('books', JSON.stringify(books));
    }
  }

  static removeBook(isbn) {
    const books = LocalStore.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

class UI {

  // function to fetch books from local storage
  static fetchBooks() {
    const booklist = LocalStore.getBooks();

    booklist.forEach((book) => UI.showBooks(book));
  }

  // function to show books to UI
  static showBooks(book) {
    const list = document.querySelector('#book_list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><button class="btn btn-sm btn-danger delete">&times;</button></td>
    `;

    list.appendChild(row);
  }

  // function to add new book
  static addBook(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // validate for empty input
    if (title === '' || author === '' || isbn === '') {
      UI.showAlert('Please fill all fields', 'danger');
    }
    else {
      const newBook = new Book(title, author, isbn);
      LocalStore.addBook(newBook);
    }

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  // function to delete book
  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
      UI.showAlert('Book successfully deleted', 'success');
      LocalStore.removeBook(el.parentElement.previousElementSibling.textContent);
    }
  }

  static showAlert(message, classname) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${classname}`;
    alert.appendChild(document.createTextNode(message));
    const column = document.querySelector('.col-12');
    const form = document.getElementById('book_entry_form');
    column.insertBefore(alert, form);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }
}

// event listener to show present books when page loads
document.addEventListener('DOMContentLoaded', UI.fetchBooks());

// event listener to add new book
document.getElementById('book_entry_form').addEventListener('submit', (e) => UI.addBook(e));

// event listener to delete book
document.getElementById('book_list').addEventListener('click', (e) => UI.deleteBook(e.target))