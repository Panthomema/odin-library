import { addTooltip, removeTooltip } from "../functions.js";

function InputValidator(htmlElement) {
  this.htmlElement = htmlElement;
  this.invalidClass = 'invalid';
  this.errorIcon = this.htmlElement.nextElementSibling;

  // Use a Map so the showError function show them in the desired order

  this.errorMessages = new Map([
    ['valueMissing', 'required.'],
    ['tooLong', `${this.htmlElement.minLength} characters max.` ],
    ['rangeUnderflow', `min ${this.htmlElement.min}.`],
    ['rangeOverflow', `max ${this.htmlElement.max}.`],
    ['patternMismatch','needs to be an integer.']
  ]);

  this.htmlElement.addEventListener('blur', () => {
    this.validate();
  });
}

InputValidator.prototype.validate = function () {
  this.htmlElement.value = this.htmlElement.value.trim();

  if (this.htmlElement.checkValidity()) {
    this.removeError();
    return true;
  } else {
    this.showError();
    return false;
  }
}

InputValidator.prototype.showError = function () {
  const { validity } = this.htmlElement;
  
  for (const [type, message] of this.errorMessages) {
    if (validity[type]) {
      this.htmlElement.classList.add(this.invalidClass);
      removeTooltip(this.errorIcon); // if there is one from a previous error
      addTooltip(this.errorIcon, message);

      this.errorIcon.classList.remove('invisible');
      this.errorIcon.addEventListener('transitionend', () => {
        this.errorIcon.style.visibility = 'visible';
      }, { once: true });
      break;
    }
  } 
}

InputValidator.prototype.removeError = function() {
  this.htmlElement.classList.remove(this.invalidClass);
  removeTooltip(this.errorIcon);

  this.errorIcon.classList.add('invisible');
  this.errorIcon.addEventListener('transitionend', () => {
    this.errorIcon.style.visibility = 'hidden';
    
  }, { once: true });
}

export default InputValidator;