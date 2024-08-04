import Card from "./Card.js";

class LibraryDisplay {
  constructor(selector) {
    this.htmlElement = document.querySelector(selector);
    this.defaultContent = document.querySelector("#default-content");
  }

  // Renders books -> cards, set index related to its library array index
  render(books) {
    const cards = books.map(
      (book, index) => new Card(book).setDataIndex(index).htmlElement
    );

    if (cards.length) {
      this.htmlElement.replaceChildren(...cards);
      return;
    }

    // Append the default content (add button) if no cards
    this.htmlElement.replaceChildren(this.defaultContent);
  }
}

export default LibraryDisplay;
