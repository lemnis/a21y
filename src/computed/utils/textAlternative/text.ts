import Roletype from "../../../role/Roletype";

export function is(node: Node) {
	return node instanceof Text;
}

export function get(node: Node){
	return (node as any).textContent.trim() || null;
}

export default { is, get };