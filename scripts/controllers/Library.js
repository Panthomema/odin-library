function Library() {
  this.books = JSON.parse(localStorage.getItem('books')) ?? [];
}

Library.prototype.get = function (index) {
  return this.books[index];
}

Library.prototype.add = function (book) {
  this.books.push(book);
}

Library.prototype.remove = function (index) {
  this.books.splice(index, 1);
}

Library.prototype.sort = function () {
  return this.books.sort((a, b) => {
    if (a.isRead === b.isRead) return 0;
    return (a.isRead) ? 1 : -1;
  });
}

Library.prototype.save = function () {
  localStorage.setItem('books', JSON.stringify(this.books));
}

export default Library;
 
