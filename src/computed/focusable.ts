import Roletype from '../role/Roletype';

export default function children(current: Roletype): boolean {
  return (
    current.element.hasAttribute('tabindex') ||
    (current.element as unknown as HTMLOrSVGElement).tabIndex > -1
  );
}
