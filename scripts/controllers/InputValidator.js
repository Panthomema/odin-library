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

  // Validate singular fields when they lose focus
  this.htmlElement.addEventListener('blur', () => {
    this.validate();
  });
}

InputValidator.prototype.addListener = function (event, callback) {
  this.htmlElement.addEventListener(event, callback);
}

InputValidator.prototype.removeListener = function (event, callback) {
  this.htmlElement.removeEventListener(event, callback);
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
      
      this.errorIcon.style.visibility = 'visible';
      this.errorIcon.classList.remove('invisible');
      break;
    }
  } 
}

InputValidator.prototype.removeError = function() {
  this.htmlElement.classList.remove(this.invalidClass);
  removeTooltip(this.errorIcon);

  this.errorIcon.classList.add('invisible');

  /*
    Quick fix: can't use transitionend cause removeError is called when valid,
    so transitionend event is set for a non-displayed icon
    This causes the icon to hide after completing the show transition if
    this sequence is performed:
    1. Complete valid field (transitionend event is set)
    2. Fail the validation on the same field (icon is shown, transition occurs)
    3. transitionend event is fired, hiding the icon
  */
  const transitionTime = getComputedStyle(this.errorIcon).transitionDuration
    .replace(/\D/g, '') * 1000;

  setTimeout(() => {
    this.errorIcon.style.visibility = 'hidden';
  }, transitionTime);
}

export default InputValidator;