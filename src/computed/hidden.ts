import Roletype from '../role/Roletype';

export default function(current: Roletype): Boolean {
  if (current.hidden === true) {
    return current.hidden;
  }

  if (current.element instanceof HTMLElement && !current.element.offsetParent) {
    return true;
  }

  let boundingRect = current.element.getBoundingClientRect();

  if (
    !boundingRect.height &&
    !boundingRect.width &&
    !boundingRect.left &&
    !boundingRect.right
  ) {
    return true;
  }

  let computedStyles = getComputedStyle(current.element);

  if (computedStyles.visibility === 'hidden') {
    return true;
  }

  return false;
}
