function InputValidator(htmlElement) {
  this.htmlElement = htmlElement;
  // this.errorDisplay = document.querySelector(`${selector} + .error`);

  // Use a Map so the showError function show them in the desired order

  this.errorMessages = new Map([
    [
      'valueMissing', 'required.'
    ],
    [
      'tooLong', `${this.htmlElement.minLength} characters max.` 
    ],
    [
      'rangeUnderflow', 
      `min ${this.htmlElement.min}, max ${this.htmlElement.max}.`
    ],
    [
      'rangeOverflow', 
      `min ${this.htmlElement.min}, max ${this.htmlElement.max}.`
    ],
    [
      'patternMismatch',
      'needs to be an integer.'
    ]
  ]);

  this.htmlElement.addEventListener('blur', () => {
    this.validate();
  });
}

InputValidator.prototype.validate = function () {
  if (! this.htmlElement.checkValidity()) {
    this.showError();
  } else {
    this.removeError();
  }
}

InputValidator.prototype.showError = function () {
  const { validity } = this.htmlElement;
  
  for (const [type, message] of this.errorMessages) {
    if (validity[type]) {
      console.log(type, message);
      break;
    }
  } 
}

InputValidator.prototype.removeError = function() {
  console.log( this.htmlElement.name, 'valid');
}

export default InputValidator;