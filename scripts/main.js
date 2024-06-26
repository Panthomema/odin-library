import Book from "./controllers/Book.js";
import Library from "./controllers/Library.js";
import LibraryDisplay from "./ui-components/LibraryDisplay.js";
import Card from "./ui-components/Card.js";
import DialogPresenter from "./ui-components/DialogPresenter.js";
import CustomCheckbox from "./ui-components/CustomCheckbox.js";
import FormHandler from "./controllers/FormHandler.js";

document.addEventListener('DOMContentLoaded', () => {
  const myLibrary = new Library;
  
  /*
    Need to initialize listeners here for out-of-scope reasons
    Cards re-render every action, so i need to make use of the
    library instance in some card methods
  */
  Card.prototype.addButtonListeners = function () {
    this.deleteButton.addListener('click', () => {
      myLibrary.remove(this.htmlElement.dataset.index);
      myMain.render(myLibrary.sort());
    });

    [this.completedButton, this.pendingButton].forEach(button => {
      button.addListener('click', () => {
        const targetBook = myLibrary.get(this.htmlElement.dataset.index);
        targetBook.toggleReadState();
        myMain.render(myLibrary.sort());
      })
    });
  }

  // Default books

  const book1 = new Book({
    title: 'Phänomenologie des Geistes',
    author: 'G.W.F. Hegel',
    publishYear: 1807,
    genre: 'Philosophy',
    numPages: '589',
    isRead: false
  });

  const book2 = new Book({
    title: 'Kritik der Reinen Vernunft',
    author: 'Inmanuel Kant',
    publishYear: 1781,
    genre: 'Philosophy',
    numPages: '796',
    isRead: true
  });

  const book3 = new Book({
    title: 'Der Antichrist',
    author: 'Friedrich Nieztsche',
    publishYear: 1895,
    genre: 'Philosophy',
    numPages: '47',
    isRead: true
  });

  [book1, book2, book3].forEach(book => {
    myLibrary.add(book);
  });

  const myMain = new LibraryDisplay('main');
  myMain.render(myLibrary.sort());

  const addButton = document.querySelector('#library-add');
  const dialogPresenter = new DialogPresenter('dialog');

  addButton.addEventListener('click', () => {
    dialogPresenter.show();
  });

  
  const dynamicLabel = new CustomCheckbox('label[for=isRead]');

  const formHandler = new FormHandler('form');

  formHandler.addListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = {};
    formData.entries().forEach(([field, value]) => {
      data[field] = value.trim() || '-';
    });

    this.reset();
    dialogPresenter.hide();

    if (! data['isRead']) data['isRead'] = false;
    const book = new Book(data);
    myLibrary.add(book);
    myMain.render(myLibrary.sort());
  });
});

