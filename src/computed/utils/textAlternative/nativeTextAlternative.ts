import Roletype from '../../../role/Roletype';

// First linked element with e.g. labels
// then strings

function has(current: Roletype, traversedElements: Element[]): Boolean {
  if (
    (current.element as any).labels &&
    (current.element as any).labels.length > 0 &&
    traversedElements.indexOf(current.element) === -1
  ) {
    return true;
  }

  if (current.element instanceof HTMLElement && !!current.element.title) {
    return true;
  }

  return false;
}

function get(
  current: Roletype,
  traversedElements: Element[]
): String | Element[] {
  if (
    (current.element as any).labels &&
    (current.element as any).labels.length > 0 &&
    traversedElements.indexOf(current.element) === -1
  ) {
    return Array.from((current.element as any).labels as Element[]).filter(
      element => traversedElements.indexOf(element) === -1
    );
  }

  if (current.element instanceof HTMLElement && !!current.element.title) {
    return current.element.title.trim();
  }
}

export default { has, get };
