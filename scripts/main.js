import Book from "./controllers/Book.js";
import Library from "./controllers/Library.js";
import LibraryDisplay from "./ui-components/LibraryDisplay.js";
import Card from "./ui-components/Card.js";
import DialogPresenter from "./ui-components/DialogPresenter.js";
import CustomCheckbox from "./ui-components/CustomCheckbox.js";
import FormHandler from "./controllers/FormHandler.js";
import { addTooltip } from "./functions.js";

document.addEventListener('DOMContentLoaded', () => {
  // Initialize library first (stores temporally & via localStorage API)
  const myLibrary = new Library;

  /*
    Need to initialize listeners here for out-of-scope reasons
    Cards re-render every action, and i need to make use of the
    library instance in some card button methods
  */
  Card.prototype.addButtonListeners = function () {
    this.deleteButton.addListener('click', () => {
      myLibrary.remove(this.htmlElement.dataset.index);
      myMain.render(myLibrary.books);
    });

    [this.completedButton, this.pendingButton].forEach(button => {
      button.addListener('click', () => {
        const targetBook = myLibrary.get(this.htmlElement.dataset.index);
        targetBook.toggleReadState();
        myMain.render(myLibrary.books);
      })
    });
  }

  // Manages dialog actions (opening / closing)
  const dialogPresenter = new DialogPresenter('dialog');

  // Listeners for opening dialog
  const dialogTriggers = document.querySelectorAll('.dialog-open');
  dialogTriggers.forEach(button => {
    button.addEventListener('click', () => {
      dialogPresenter.show();
    });
  });

  // Custom checkbox for read-state in the form dialog
  new CustomCheckbox('label[for=isRead]');

  const myMain = new LibraryDisplay('main');
  myMain.render(myLibrary.sort());

  const formHandler = new FormHandler('form');

  formHandler.addListener('submit', function(event) {
    // 'this' here refers to the element that triggers the submit event (form)

    event.preventDefault();

    if (! formHandler.validate()) {
      return;
    }

    // Handle the data after validation (format -> create new Book)

    const formData = new FormData(this);
    const data = formData.entries().reduce((data, [field, value]) => {
      data[field] = value.trim();
      return data;
    }, {});
    const book = new Book(data);

    // Handle UI and add the book

    this.reset();
    dialogPresenter.hide();

    myLibrary.add(book);
    myMain.render(myLibrary.books);
  });

  const saveButton = document.querySelector('.library-save');
  saveButton.addEventListener('click', () => {
    myLibrary.save();
    myMain.render(myLibrary.sort());
  });

  // Adding tooltips

  addTooltip(saveButton, 'save.');

  document.querySelectorAll('.library-add').forEach(button => {
    addTooltip(button, 'add.');
  });
});

