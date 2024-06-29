import InputValidator from "./InputValidator.js";
import { addTooltip } from "../functions.js";

function FormHandler(selector) {
  this.htmlElement = document.querySelector(selector);
  this.errorIcon = document.querySelector('form .card-control .library-danger');
  this.repeatedBookMessage = 'already existing book.';
  addTooltip(this.errorIcon, this.repeatedBookMessage);

  this.htmlElement.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const submitEvent = new Event('submit', {
        bubbles: true, 
        cancelable: true 
      });

      this.htmlElement.dispatchEvent(submitEvent);
    }  
  });

  const inputs = this.htmlElement.querySelectorAll('input:not([type=checkbox])');
  this.validators = [...inputs].map(element => new InputValidator(element));
}

FormHandler.prototype.addListener = function (event, callback) {
  this.htmlElement.addEventListener(event, callback);
}

FormHandler.prototype.validate = function () {
  return this.validators.every(validator => validator.validate());
}

FormHandler.prototype.showRepeatedError = function () {
  this.errorIcon.classList.remove('invisible');
  this.errorIcon.addEventListener('transitionend', () => {
    this.errorIcon.style.visibility = 'visible';
  }, { once: true });
}

FormHandler.prototype.hideRepeatedError = function () {
  this.errorIcon.classList.add('invisible');
  this.errorIcon.addEventListener('transitionend', () => {
    this.errorIcon.style.visibility = 'hidden';
  }, { once: true });
}



export default FormHandler;