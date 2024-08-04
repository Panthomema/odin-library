import Book from "./Book.js";

class Library {
  constructor() {
    // Get the data on construction
    const storedData = JSON.parse(localStorage.getItem("books")) ?? [];
    this.books = storedData.map((data) => new Book(data));
  }

  get(index) {
    return this.books[index];
  }

  has(book) {
    return (
      this.books.find((own) => JSON.stringify(own) === JSON.stringify(book)) !==
      undefined
    );
  }

  add(book) {
    this.books.push(book);
  }

  remove(index) {
    this.books.splice(index, 1);
  }

  sort() {
    return this.books.sort((a, b) => {
      if (a.isRead === b.isRead) return 0;
      return a.isRead ? 1 : -1;
    });
  }

  save() {
    localStorage.setItem("books", JSON.stringify(this.books));
  }
}

export default Library;
