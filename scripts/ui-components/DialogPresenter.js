function DialogPresenter (selector) {
  this.htmlElement = document.querySelector(selector);
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
  this.htmlElement.showModal();
  
  requestAnimationFrame(() => {
    this.htmlElement.classList.add('active');
    this.htmlElement.addEventListener('transitionend', () => {
      document.addEventListener('click', this.clickOutsideHandler);
    }, { once: true });
  });
}

DialogPresenter.prototype.hide = function () {
  document.removeEventListener('click', this.clickOutsideHandler);

  this.htmlElement.classList.remove('active');
  this.htmlElement.addEventListener('transitionend', event => {
    event.currentTarget.close();
  }, { once: true });
}

export default DialogPresenter;