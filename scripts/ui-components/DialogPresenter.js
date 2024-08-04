class DialogPresenter {
  constructor(selector) {
    this.htmlElement = document.querySelector(selector);

    // Detects if the event is outside/inside of the dialog, in order to close it
    this.clickOutsideHandler = (event) => {
      event.stopPropagation();

      const rect = this.htmlElement.getBoundingClientRect();
      const isInDialog =
        rect.left <= event.clientX &&
        event.clientX <= rect.right &&
        rect.top <= event.clientY &&
        event.clientY <= rect.bottom;

      if (!isInDialog) {
        this.hide();
      }
    };
  }

  // Shows the modal with transition (prevents getting fired by bubbling events)
  show() {
    const handler = (event) => {
      if (event.target === this.htmlElement) {
        document.addEventListener("click", this.clickOutsideHandler);
        this.htmlElement.removeEventListener("transitionend", handler);
      }
    };
    this.htmlElement.addEventListener("transitionend", handler);

    this.htmlElement.showModal();
    this.htmlElement.classList.remove("invisible");
  }

  // Hides the modal with transition (prevents getting fired by bubbling events)
  hide() {
    const handler = (event) => {
      if (event.target === this.htmlElement) {
        event.currentTarget.close();
        this.htmlElement.removeEventListener("transitionend", handler);
      }
    };

    this.htmlElement.addEventListener("transitionend", handler);

    document.removeEventListener("click", this.clickOutsideHandler);
    this.htmlElement.classList.add("invisible");
  }
}

export default DialogPresenter;
