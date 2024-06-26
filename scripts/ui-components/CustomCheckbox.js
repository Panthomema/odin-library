import Button from "./Button.js";
import { SVG_COMPLETED_PATH_D } from "../svgData.js";
import { addTooltip } from "../functions.js";

// Binds 2 buttons to replace one for each on click
function CustomCheckbox(selector) {
  this.htmlElement = document.querySelector(selector);
  this.buttons = [
    this.htmlElement.querySelector('.book-pending'),
    new Button('book-completed', SVG_COMPLETED_PATH_D, 'notRead.').htmlElement
  ];

  addTooltip(this.buttons[0], 'read.');

  this.addIconToggle();
}

// Adds click event to the buttons so they perform the replacement
CustomCheckbox.prototype.addIconToggle = function () {
  this.buttons.forEach((button, _, allButtons) => {
    button.addEventListener('click', () => {
      const otherButton = allButtons.find(other => button !== other);
      this.htmlElement.replaceChild(otherButton, button);
    });
  });
}

/*
document.querySelector('[for=read-state] button').addEventListener('click', event => {
  console.log(event.currentTarget);
  event.preventDefault();
})
*/

export default CustomCheckbox;