function Book({ title, author, publishYear, category, numPages, isRead }) {
  this.title = title;
  this.author = author;
  this.publishYear = publishYear;
  this.category = category;
  this.numPages = numPages;
  this.isRead = isRead ?? false;
}

Book.prototype.toggleReadState = function () {
  this.isRead = ! this.isRead;
}

export default Book;