function Book({ title, author, publishYear, genre, numPages, isRead }) {
  this.unknown = 'N/D';
  this.title = title || this.unknown;
  this.author = author || this.unknown;
  this.publishYear = publishYear || this.unknown;
  this.genre = genre || this.unknown;
  this.numPages = numPages || this.unknown;
  this.isRead = isRead ?? false;
}

Book.prototype.toggleReadState = function () {
  this.isRead = ! this.isRead;
}

export default Book;