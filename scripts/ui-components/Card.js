import Button from "./Button.js";

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

const SVG_DELETE_PATH_D = 'M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-' +
  '47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83' +
  ' 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Z' +
  'm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-74' +
  '0v553.33V-740Z';

const SVG_PENDING_PATH_D = 'M270-80q-45 0-77.5-29.92Q160-139.85 160-184v-562q' +
  '0-37.04 22.58-66.29 22.58-29.24 59.09-37.04l385-78.67v626.67l-366.34 76.66' +
  'q-14.43 3.13-24.04 14.86-9.62 11.73-9.62 25.81 0 16.33 13 26.83t30.33 10.5' +
  'h463.33V-800H800v720H270Zm76.67-229.67L560-354v-492l-213.33 43v493.33ZM280' +
  '-295.79V-789l-18.33 3.67q-15 3.33-25 13.71-10 10.39-10 25.62v466.33q7.7-4.' +
  '13 16.18-7.23 8.48-3.1 17.48-4.77l19.67-4.12ZM226.67-781v501.33V-781Z';

const SVG_COMPLETED_PATH_D = 'M240-80q-50 0-85-35t-35-85v-560q0-50 35-85t85-3' +
  '5h426.67v626.67H240q-22.67 0-38 15.33-15.33 15.33-15.33 38T202-162q15.33 1' +
  '5.33 38 15.33h533.33V-800H840v720H240Zm106.67-240H600v-493.33H346.67V-320Z' +
  'M280-320v-493.33h-40q-23 0-38.17 15.33-15.16 15.33-15.16 38v453.67q12-6.34' +
  ' 25.09-10Q224.84-320 240-320h40Zm-93.33-493.33v507-507Z';

export default Card;