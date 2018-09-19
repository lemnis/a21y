import Roletype from "../../../role/Roletype";
import textAlternative from './../textAlternative';

export function has(current: Roletype) {
	return (current.element instanceof HTMLElement && (current.element as HTMLElement).title) ||
		(current.element instanceof SVGElement && current.element.querySelector(":scope > title"));
}

export function get(current: Roletype) : String {
	if(current.element instanceof HTMLElement){
		return (current.element as HTMLElement).title.trim();
	} else if(current.element instanceof SVGElement) {
		const title = current.element.querySelector(":scope > title");
		return Array.prototype
			.map.call(title.childNodes, node => textAlternative(node, current))
			.reduce((prev, current) => current ? prev + current : prev, '');;
	}
}

export default { has, get };