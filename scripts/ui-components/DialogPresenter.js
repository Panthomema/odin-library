function DialogPresenter (selector) {
  this.htmlElement = document.querySelector(selector);
  this.formElement = this.htmlElement.querySelector('form');

  this.clickOutsideHandler = event => {
    event.stopPropagation();

    const rect = this.htmlElement.getBoundingClientRect();
    const isInDialog = 
      rect.left <= event.clientX && 
      event.clientX <= rect.right && 
      rect.top <= event.clientY && 
      event.clientY <= rect.bottom;

    if (! isInDialog) {
      this.hide();
    }
  }
}

DialogPresenter.prototype.show = function() {
  const handler = event => {
    if (event.target === this.htmlElement) {
      document.addEventListener('click', this.clickOutsideHandler);
      this.htmlElement.removeEventListener('transitionend', handler);
    }
  };
  this.htmlElement.addEventListener('transitionend', handler);

  this.htmlElement.showModal();
  this.htmlElement.classList.remove('invisible');   
}

DialogPresenter.prototype.hide = function () {
  const handler = event => {
    if (event.target === this.htmlElement) {
      event.currentTarget.close();
      this.htmlElement.removeEventListener('transitionend', handler);
    }
  }

  this.htmlElement.addEventListener('transitionend', handler);

  document.removeEventListener('click', this.clickOutsideHandler);
  this.htmlElement.classList.add('invisible');
}

export default DialogPresenter;