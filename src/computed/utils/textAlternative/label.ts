import Roletype from "../../../role/Roletype";

export function has(current: Roletype) {
	return !!current.label;
}

export function get(current: Roletype) {
	return current.label.trim();
}

export function isEmbeddedWithin(current: Roletype, origin: Roletype) {

	if (
		origin && origin.element &&
		origin.element.contains(current.element) &&
		origin.element instanceof HTMLLabelElement
	) {
		return true;
	}

	return false;
}

export default { has, get, isEmbeddedWithin };