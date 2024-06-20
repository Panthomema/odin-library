function Button(className, pathData) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathData);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); // Optional
  svg.setAttribute('viewBox', '0 -960 960 960');
  svg.appendChild(path);

  this.htmlElement = document.createElement('button');
  this.htmlElement.classList.add(className);
  this.htmlElement.appendChild(svg);
}

Button.prototype.addListener = function (event, callback) {
  this.htmlElement.addEventListener(event, callback);
}

export default Button;
