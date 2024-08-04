import InputValidator from "./InputValidator.js";
import { addTooltip } from "../functions.js";

class FormHandler {
  constructor(selector) {
    this.htmlElement = document.querySelector(selector);
    this.errorIcon = document.querySelector(
      "form .card-control .library-danger"
    );
    this.duplicatedMessage = "duplicated book.";
    addTooltip(this.errorIcon, this.duplicatedMessage);

    // Manually fire the submit event when user presses enter
    this.htmlElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const submitEvent = new Event("submit", {
          bubbles: true,
          cancelable: true,
        });

        this.htmlElement.dispatchEvent(submitEvent);
      }
    });

    // Create all the validators (we don't handle custom messages this way)
    const inputs = this.htmlElement.querySelectorAll(
      "input:not([type=checkbox])"
    );
    this.validators = [...inputs].map((element) => new InputValidator(element));
  }
  addListener(event, callback) {
    this.htmlElement.addEventListener(event, callback);
  }

  // Returns false if one validator misses
  validate() {
    return this.validators.every((validator) => validator.validate());
  }

  showRepeatedError() {
    this.errorIcon.style.visibility = "visible";
    this.errorIcon.classList.remove("invisible");
  }

  hideRepeatedError() {
    this.errorIcon.classList.add("invisible");

    this.errorIcon.addEventListener(
      "transitionend",
      (event) => {
        this.errorIcon.style.visibility = "hidden";
      },
      { once: true }
    );
  }

  addValidatorsListener(event, callbackFn) {
    this.validators.forEach((validator) => {
      validator.addListener(event, callbackFn);
    });
  }

  removeValidatorsListener(event, callbackFn) {
    this.validators.forEach((validator) => {
      validator.removeListener(event, callbackFn);
    });
  }
}

export default FormHandler;
