class SVG {
  constructor(pathData) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);

    this.node = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.node.setAttribute("xmlns", "http://www.w3.org/2000/svg"); // Optional
    this.node.setAttribute("viewBox", "0 -960 960 960");
    this.node.appendChild(path);
  }
}

export default SVG;
