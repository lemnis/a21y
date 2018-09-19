import Roletype from "../../../role/Roletype";

export function byOrigin(current: Roletype, origin: Roletype) {
	return origin && (origin.labelledBy.has(current) || !origin.describedBy.has(current));
}

export function nativelyByOrigin(current: Roletype, origin: Roletype) {
	if (
		origin &&
		// check if referenced by label
		(current.element as any).labels &&
		(Array.prototype as any).includes.call((current.element as any).labels, origin.element)
	) {
		return true;
	}

	return false;

	// maybe: details, fieldset, figure, img, table
}

export function has(current: Roletype, traversedRoletypes: Element[], type: 'name' | 'description') {
	if (type == 'name') {
		return current.labelledBy.size > 0 && traversedRoletypes.indexOf(current.element) === -1
	} else if (type == 'description') {
		return current.describedBy.size > 0 && traversedRoletypes.indexOf(current.element) === -1;
	}
}

export function get(
	current: Roletype,
	traversedRoletypes: Element[],
	type: 'name' | 'description'
): Roletype[] {

	if (type == 'name') {
		return Array.from(current.labelledBy).filter(roletype => traversedRoletypes.indexOf(roletype.element) === -1);
	} else if (type == 'description') {
		return Array.from(current.labelledBy).filter(roletype => traversedRoletypes.indexOf(roletype.element) === -1);
	}
}

export default { byOrigin, nativelyByOrigin, has, get };