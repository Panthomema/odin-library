import Card from "./Card.js";

function LibraryDisplay (selector) {
  this.htmlElement = document.querySelector(selector);
}

LibraryDisplay.prototype.render = function (books) {
  const cards = books
    .map((book, index) => new Card(book).setDataIndex(index).htmlElement);
  this.htmlElement.replaceChildren(...cards);
}


export default LibraryDisplay;