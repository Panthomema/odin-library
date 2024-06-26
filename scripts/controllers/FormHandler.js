function FormHandler(selector) {
  this.htmlElement = document.querySelector(selector);

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
}

FormHandler.prototype.addListener = function (event, callback) {
  this.htmlElement.addEventListener(event, callback);
}

export default FormHandler;