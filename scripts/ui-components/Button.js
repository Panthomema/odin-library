import { addTooltip } from "../functions.js";
import SVG from "./SVG.js";

function Button(className, pathData, tooltipText) {
  const svg = new SVG(pathData).node;

  this.htmlElement = document.createElement('button');
  this.htmlElement.classList.add(className);
  this.htmlElement.appendChild(svg);

  addTooltip(this.htmlElement, tooltipText);
}

Button.prototype.addListener = function (event, callback) {
  this.htmlElement.addEventListener(event, callback);
}

export default Button;
