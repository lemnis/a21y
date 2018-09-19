import Roletype from "../role/Roletype";

declare global {
	interface Window {
		getComputedAccessibleNode: (node: Element) => Promise<any>
	}
}

export default async function (roletype: Roletype): Promise<string> {
	if (window.getComputedAccessibleNode) {
		const {role} = await window.getComputedAccessibleNode(roletype.element);
		return (roletype.element as any).computedRole || role;
	}	
}