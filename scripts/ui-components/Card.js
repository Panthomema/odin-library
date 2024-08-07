import Button from "./Button.js";
import {
  SVG_COMPLETED_PATH_D,
  SVG_DELETE_PATH_D,
  SVG_PENDING_PATH_D,
} from "../svgData.js";

class Card {
  constructor(book) {
    this.htmlElement = document.createElement("div");
    this.htmlElement.classList.add("book-card");

    // Render content
    const content = Array.from({ length: 4 }, () =>
      document.createElement("p")
    );
    content[0].textContent = book.title;
    content[0].classList.add("book-title");
    content[1].textContent =
      `${book.author || "Unknown author"}` +
      `${book.publishYear ? ", " + book.publishYear : ""}`;
    content[2].textContent = book.category || "Uncathegorized";
    content[3].textContent = `${book.numPages || "N/D"} pages`;

    content.forEach((line) => {
      this.htmlElement.appendChild(line);
    });

    // Create buttns
    this.deleteButton = new Button(
      "library-danger",
      SVG_DELETE_PATH_D,
      "delete."
    );
    this.pendingButton = new Button(
      "book-pending",
      SVG_PENDING_PATH_D,
      "read."
    );
    this.completedButton = new Button(
      "book-completed",
      SVG_COMPLETED_PATH_D,
      "notRead."
    );

    const controlArea = document.createElement("div");
    controlArea.classList.add("card-control");

    controlArea.appendChild(
      book.isRead
        ? this.completedButton.htmlElement
        : this.pendingButton.htmlElement
    );
    controlArea.appendChild(this.deleteButton.htmlElement);

    // Add listeners on creation (method defined on main)
    this.addButtonListeners();

    this.htmlElement.appendChild(controlArea);
  }

  setDataIndex(index) {
    this.htmlElement.dataset.index = index;
    return this;
  }
}

export default Card;
