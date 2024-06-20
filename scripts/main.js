import Book from "./controllers/Book.js";
import Library from "./controllers/Library.js";
import LibraryDisplay from "./ui-components/LibraryDisplay.js";
import Card from "./ui-components/Card.js";

document.addEventListener('DOMContentLoaded', () => {
  const myLibrary = new Library;

  /*
    Need to initialize listeners here for out-of-scope reasons
    Cards re-render every action, so i need to make use of the
    library instance
  */
  Card.prototype.addButtonListeners = function () {
    this.deleteButton.addListener('click', () => {
      myLibrary.remove(this.htmlElement.dataset.index);
      myMain.render(myLibrary.sort());
    });

    [this.completedButton, this.pendingButton].forEach(button => {
      button.addListener('click', () => {
        const targetBook = myLibrary.get(this.htmlElement.dataset.index);
        console.log(targetBook);
        targetBook.toggleReadState();
        myMain.render(myLibrary.sort());
      })
    });
  }

  // Default books

  const book1 = new Book(
    'Phenomenlogie des Geistes',
    'G.W.F. Hegel',
    '1812',
    'Philosophy',
    '567',
    false
  );

  const book2 = new Book(
    'Kritik der Reinen Vernunft',
    'Inmanuel Kant',
    '1789',
    'Philosophy',
    '786',
    true
  );

  const book3 = new Book(
    'El Crepúsculo de los Ídolos',
    'Friedrich Nietzsche',
    '1887',
    'Philosophy',
    '345',
    false
  );

  [book1, book2, book3].forEach(book => {
    myLibrary.add(book);
  });

  // Need to define this functions here, for the same out-of-scope reason

  const myMain = new LibraryDisplay('main');

  myMain.render(myLibrary.sort());
});

