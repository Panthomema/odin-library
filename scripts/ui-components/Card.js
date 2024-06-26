import Button from "./Button.js";
import { 
  SVG_COMPLETED_PATH_D, SVG_DELETE_PATH_D, SVG_PENDING_PATH_D 
} from "../svgData.js";

function Card(book) {
  this.htmlElement = document.createElement('div');
  this.htmlElement.classList.add('book-card');

  const content = Array.from({ length: 4 }, () => document.createElement('p'));
  content[0].textContent = book.title;
  content[0].classList.add('book-title');
  content[1].textContent = `${book.author}, ${book.publishYear}`;
  content[2].textContent = book.genre;
  content[3].textContent = `${book.numPages} pages`;

  content.forEach(line => {
    this.htmlElement.appendChild(line);
  });

  this.deleteButton = new Button('book-delete', SVG_DELETE_PATH_D);
  this.pendingButton = new Button('book-pending', SVG_PENDING_PATH_D);
  this.completedButton = new Button('book-completed', SVG_COMPLETED_PATH_D);

  const controlArea = document.createElement('div');
  controlArea.classList.add('card-control');

  controlArea.appendChild((book.isRead) 
    ? this.completedButton.htmlElement 
    : this.pendingButton.htmlElement
  );
  controlArea.appendChild(this.deleteButton.htmlElement);

  this.addButtonListeners();

  this.htmlElement.appendChild(controlArea);
}

Card.prototype.setDataIndex = function (index) {
  this.htmlElement.dataset.index = index;
  return this;
}

Card.prototype.destroy = function () {
  // destroy object?
}

export default Card;