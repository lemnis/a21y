import Roletype from "../role/Roletype";

export default function(ay: Roletype) : Boolean {

	if(typeof ay.hidden === "boolean"){
		return ay.hidden;
	}

	if(ay.element instanceof HTMLElement && !ay.element.offsetParent) {
		return true;
	}

	let boundingRect = ay.element.getBoundingClientRect();

	if(
		!boundingRect.height &&
		!boundingRect.width &&
		!boundingRect.left &&
		!boundingRect.right
	){
		return true;
	}

	return false;
}