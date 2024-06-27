function containsObject(arr, target) {
  return arr.find(obj => JSON.stringify(obj) === JSON.stringify(target)) !== undefined;
}

function addTooltip(elem, text) {
  elem.classList.add('tooltip-container');

  const label = document.createElement('div');
  label.classList.add('tooltip-text');
  label.textContent = text;

  const icon = elem.querySelector('svg');

  icon.addEventListener('transitionend', () => {
    const color = window.getComputedStyle(icon).fill;
    label.style.backgroundColor = color;
  });

  elem.appendChild(label);
}

export { containsObject, addTooltip };