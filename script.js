document.addEventListener('DOMContentLoaded', () => {
  const myLibrary = new Library;
  const book1 = new Book(
    'Phenomenlogie des Geistes',
    'G.W.F. Hegel',
    'Philosophy',
    '567',
    false
  );

  const book2 = new Book(
    'Kritik der Reinen Vernunft',
    'Inmanuel Kant',
    'Philosophy',
    '786',
    true
  );

  const book3 = new Book(
    'El Crepúsculo de los Ídolos',
    'Friedrich Nietzsche',
    'Philosophy',
    '345',
    false
  );

  [book1, book2, book3].forEach(book => {
    myLibrary.add(book);
  });

  console.log(myLibrary.sort());
});

function Book(title, author, genre, numPages, isRead) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.numPages = numPages;
  this.isRead = isRead;
}

function Library() {
  this.books = [];
}

Library.prototype.add = function(book) {
  this.books.push(book);
}

Library.prototype.remove = function(book) {
  // find the book
  // remove it
}

Library.prototype.sort = function() {
  return this.books.sort((a, b) => {
    if (a.isRead === b.isRead) return 0;
    return (a.isRead) ? 1 : -1;
  })
}

function containsObject(arr, target) {
  return arr.find(obj => JSON.stringify(obj) === JSON.stringify(target)) !== undefined;
}