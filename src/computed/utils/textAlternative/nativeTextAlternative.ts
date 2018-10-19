import Roletype from '../../../role/Roletype';
import getLabels from '../../../utils/getLabels';

function hasLabels(current: Roletype, traversedElements: Element[]): Boolean {
  return (
    getLabels(current.element) &&
    getLabels(current.element).length > 0 &&
    traversedElements.indexOf(current.element) === -1
  );
}

function tableHasCaption(current: Roletype) {
  return !!(current.element as HTMLTableElement).caption;
}

function imageHasAlt(current: Roletype) {
  return !!(current.element as HTMLImageElement | HTMLInputElement).alt;
}

function hasTitle(current: Roletype) {
  return !!(current.element as HTMLElement).title;
}

function has(current: Roletype, traversedElements: Element[]): Boolean {
  if (
    hasLabels(current, traversedElements) ||
    tableHasCaption(current) ||
    imageHasAlt(current)
  ) {
    return true;
  }

  if (
    current.element.tagName === 'FIGURE' &&
    !!current.element.querySelector(
      ':scope > figcaption:first-child, :scope > figcaption:last-child'
    )
  ) {
    return true;
  }

  if (
    current.element instanceof HTMLFieldSetElement &&
    !!current.element.querySelector(':scope > legend')
  ) {
    return true;
  }

  if (
    current.element instanceof SVGElement &&
    !!current.element.querySelector(':scope > title')
  ) {
    return true;
  }

  if (hasTitle(current)) {
    return true;
  }

  return false;
}

function get(
  current: Roletype,
  traversedElements: Element[]
): String | Element[] {
  if (hasLabels(current, traversedElements)) {
    return Array.from(getLabels(current.element)).filter(
      element => traversedElements.indexOf(element) === -1
    );
  }

  if (tableHasCaption(current)) {
    return [(current.element as HTMLTableElement).caption];
  }

  if (
    current.element.tagName === 'FIGURE' &&
    current.element.querySelector(
      ':scope > figcaption:first-child, :scope > figcaption:last-child'
    )
  ) {
    return [
      current.element.querySelector(
        ':scope > figcaption:first-child, :scope > figcaption:last-child'
      )
    ];
  }

  if (
    current.element instanceof HTMLFieldSetElement &&
    current.element.querySelector(':scope > legend')
  ) {
    return [current.element.querySelector(':scope > legend')];
  }

  if (
    current.element instanceof SVGElement &&
    !!current.element.querySelector(':scope > title')
  ) {
    return [current.element.querySelector(':scope > title')];
  }

  if (imageHasAlt(current)) {
    return (current.element as HTMLImageElement).alt;
  }

  if (hasTitle(current)) {
    return (current.element as HTMLElement).title.trim();
  }
}

export default { has, get };
