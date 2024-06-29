function addTooltip(elem, text) {
  elem.classList.add('tooltip-container');

  const label = document.createElement('div');
  label.classList.add('tooltip-text');
  label.textContent = text;

  const icon = elem.querySelector('svg');

  // Get the final color (after the hover transition)
  icon.addEventListener('transitionend', event => {
    const color = window.getComputedStyle(icon).fill;
    label.style.backgroundColor = color;
  }, { once: true });

  elem.appendChild(label);
}

function removeTooltip(elem) {
  elem.classList.remove('tooltip-container');
  const tooltip = elem.querySelector('.tooltip-text');
  if (tooltip) elem.removeChild(tooltip);
}

export { addTooltip, removeTooltip };