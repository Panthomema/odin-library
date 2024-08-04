import Button from "./Button.js";
import { SVG_COMPLETED_PATH_D } from "../svgData.js";
import { addTooltip } from "../functions.js";

// Binds 2 buttons to replace one for each on click
class CustomCheckbox {
  constructor(selector) {
    this.htmlElement = document.querySelector(selector);
    this.buttons = [
      this.htmlElement.querySelector('.book-pending'),
      new Button('book-completed', SVG_COMPLETED_PATH_D, 'notRead.').htmlElement
    ];

    addTooltip(this.buttons[0], 'read.');

    this.addIconToggle();
  }

  // Adds click event to the buttons so they perform the replacement
  addIconToggle() {
    this.buttons.forEach((button, _, allButtons) => {
      button.addEventListener('click', () => {
        const otherButton = allButtons.find(other => button !== other);
        this.htmlElement.replaceChild(otherButton, button);
      });
    });
  }
}

export default CustomCheckbox;