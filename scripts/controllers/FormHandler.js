import InputValidator from "./InputValidator.js";

function FormHandler(selector) {
  this.htmlElement = document.querySelector(selector);
  this.errorIcon = this.htmlElement.querySelector('.library-danger');

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
  let validity = true;
  this.validators.forEach(inputValidator => {
    validity = inputValidator.validate();
  });

  return validity;
}

export default FormHandler;