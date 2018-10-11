import Roletype from '../role/Roletype';

export default function parent(current: Roletype): Roletype {
  const ownsParent = document.querySelector(`[aria-owns~=${current._id}]`);

  if (current._id && ownsParent) return new Roletype(ownsParent);

  if (current.element.parentElement) {
    return new Roletype(current.element.parentNode as Element);
  }
}
