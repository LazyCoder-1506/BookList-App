class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {

  // function to fetch books from local storage
  static fetchBooks() {
    const storeBooks = [
      {
        title: 'Book One',
        author: 'Author One',
        isbn: '64436546545616'
      },
      {
        title: 'Book Two',
        author: 'Author Two',
        isbn: '6846552163'
      }
    ]

    const booklist = storeBooks;

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

    const newBook = new Book(title, author, isbn);
    UI.showBooks(newBook);

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  // function to delete book
  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }
}

// event listener to show present books when page loads
document.addEventListener('DOMContentLoaded', UI.fetchBooks());

// event listener to add new book
document.getElementById('book_entry_form').addEventListener('submit', (e) => UI.addBook(e));

// event listener to delete book
document.getElementById('book_list').addEventListener('click', (e) => UI.deleteBook(e.target))