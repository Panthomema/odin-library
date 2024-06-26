import Card from "./Card.js";

function LibraryDisplay (selector) {
  this.htmlElement = document.querySelector(selector);
  this.defaultContent = document.querySelector('#default-content');
}

LibraryDisplay.prototype.render = function (books) { 
  const cards = books
    .map((book, index) => new Card(book).setDataIndex(index).htmlElement);
  
  if (cards.length) {
    this.htmlElement.replaceChildren(...cards);
    return;
  }

  this.htmlElement.replaceChildren(this.defaultContent);
}


export default LibraryDisplay;