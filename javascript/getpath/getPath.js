/**
 * Function for generate unique query selector for HTMLElement object.
 *
 * @param    {Object}   element   HTMLElement
 * @returns  {String}             Unique query selector
 */
function getPath(element) {
  if (element.id) {
    return '#' + element.id;
  }

  const elements = [];
  if(element instanceof HTMLElement) {
    elements.push(element);
  }

  let parent = element.parentElement
  while (parent) {
    elements.push(parent);
    parent = parent.parentElement;
  }

  elements.reverse();
  return elements.map((elem) => {
    let index = Array.from(elem.parentNode.children).indexOf(elem) + 1;
    return `${elem.tagName}:nth-child(${index})`;
  }).join(' > ');
}
