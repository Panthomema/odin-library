function Book(title, author, publishYear, genre, numPages, isRead) {
  this.title = title;
  this.author = author;
  this.publishYear = publishYear;
  this.genre = genre;
  this.numPages = numPages;
  this.isRead = isRead;
}

Book.prototype.toggleReadState = function () {
  this.isRead = ! this.isRead;
}

export default Book;