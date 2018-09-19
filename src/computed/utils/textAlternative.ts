import Roletype from "../../role/Roletype";
import allowedRoles from './allowsNameFromContent';
import getPsuedoContent from './getPsuedoContent';

import tooltip from './textAlternative/tooltip';
import text from './textAlternative/text';
import label from './textAlternative/label';

import * as rules from './../../utils/data';

function isHidden(current: Roletype){
	return current.computed.hidden();
}

function isReferencedByOrigin(current: Roletype, origin: Roletype){
	return origin && (origin.labelledBy.has(current) || !origin.describedBy.has(current));
}

function isNativelyReferencedByOrigin(current: Roletype, origin: Roletype){
	if(
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

function hasReference(current: Roletype, traversedRoletypes: Roletype[], type: 'name' | 'description'){
	if(type == 'name'){
		return current.labelledBy.size > 0 && traversedRoletypes.indexOf(current) === -1
	} else if(type == 'description'){
		return current.describedBy.size > 0 && traversedRoletypes.indexOf(current) === -1;
	}
}

function hasNativeTextAlternative(current: Roletype, traversedRoletypes: Roletype[]) : Boolean {
	// console.log("be")
	// console.log(traversedRoletypes.map(i => i.element), current.element, traversedRoletypes.indexOf(current));
	// console.log("en");
	if(
		current.element instanceof HTMLElement &&
		!!current.element.title
	){
		return true;
	}


	if(
		(current.element as any).labels && (current.element as any).labels.length > 0 &&
		traversedRoletypes.indexOf(current) === -1
	){
		return true;
	}


	return false;
}

async function getNativeTextAlternative(current: Roletype, traversedRoletypes: Roletype[]) : Promise<String>{
	if ((current.element as any).labels && (current.element as any).labels.length > 0) {
		return await Promise.all(
			Array.from((current.element as any).labels)
				.map(node => new Roletype(node as Element))
				.filter(roletype => traversedRoletypes.map(roletype => roletype.element).indexOf(roletype.element) === -1)
				.map(roletype => {
					traversedRoletypes.push(roletype);
					return textAlternative(roletype, current, traversedRoletypes);
			})
		).then(text => text.join(" ")) || null;
	}

	if(
		current.element instanceof HTMLElement &&
		!!current.element.title
	){
		return current.element.title;
	}
}

function isEmbeddedWithinLabel(current: Roletype, origin: Roletype) {
		
	if(
		origin && origin.element &&
		origin.element.contains(current.element) &&
		origin.element instanceof HTMLLabelElement
	) {
		return true;
	}

	return false;
}

async function allowsNameFromContent(current: Roletype){
	const role = await current.computed.role();
	return allowedRoles.hasOwnProperty(role);
}

async function allowsNameFromAuthor(current: Roletype) {
	const role = await current.computed.role();
	return ['presentation', 'none'].indexOf(role) === -1;
}

async function getReferencedText(
	current: Roletype,
	traversedRoletypes: Roletype[],
	type: 'name' | 'description'
) : Promise<String> {
	
	if (type == 'name') {
		let text = await Promise.all(
			Array.from(current.labelledBy)
				.filter(roletype => traversedRoletypes.indexOf(roletype) === -1)
				.map(roletype => {
					traversedRoletypes.push(roletype);
					return textAlternative(roletype, current, traversedRoletypes);
				})
		);
		
		return text.join(" ") || null;
	} else if (type == 'description') {
		return await Promise.all(
			Array.from(current.labelledBy)
				.filter(roletype => traversedRoletypes.indexOf(roletype) === -1)
				.map(roletype => {
					traversedRoletypes.push(roletype);
					return textAlternative(roletype, current, traversedRoletypes);
				})
		).then(names => names.join(" "));
	}
}

export default async function textAlternative(
	current: Roletype,
	origin: Roletype | null,
	traversedRoletypes: Roletype[] = []
) : Promise<String | null> {
	
	// 2.a - if the current node is hidden and is not directly referenced by aria-labelledby or
	// aria-describedby, nor directly referenced by a native host language text alternative element
	// (e.g. label in HTML) or attribute, return the empty string.
	if(
		isHidden(current) && 
		!isReferencedByOrigin(current, origin) && 
		!isNativelyReferencedByOrigin(current, origin)
	){
		return null;
	}

	// console.log('2b', origin ? origin.element.id : null, current.element.id);

	// 2.b
	if(hasReference(current, traversedRoletypes, 'name')){
		return await getReferencedText(current, traversedRoletypes, 'name');
	}

	// console.log('2c', origin ? origin.element.id : null, current.element.id);

	// 2.c
	// If computing a name, and if the current node has an aria-label attribute whose value is not 
	// the empty string, nor, when trimmed of white space, is not the empty string: If traversal of
	// the current node is due to recursion and the current node is an embedded control as defined
	// in step 2E, ignore aria-label and skip to rule 2E. Otherwise, return the value of aria-label.
	if(label.has(current)){
		return label.get(current);
	}

	// console.log('2d', origin ? origin.element.id : null, current.element.id);
	// console.log(1,
	// 	hasNativeTextAlternative(current, traversedRoletypes),
	// 	await allowsNameFromAuthor(current)		
	// );

	// 2.d - If the current node's native markup provides an attribute (e.g. title) or element (e.g.
	// HTML label) that defines a text alternative, return that alternative in the form of a flat
	// string as defined by the host language, unless the element is marked as presentational
	// (role="presentation" or role="none").
	if(
		hasNativeTextAlternative(current, traversedRoletypes) &&
		await allowsNameFromAuthor(current)
	){
		return await getNativeTextAlternative(current, traversedRoletypes);
	}


	let role = await current.computed.role();

	// console.log("2e", origin ? origin.element.id : null, current.element.id);

	// 2.e - if the current node is a control embedded within the label (e.g. the label element in
	// HTML or any element directly referenced by aria-labelledby) for another widget, where the user
	// can adjust the embedded control's value, then include the embedded control as part of the
	// text alternative in the following manner:
	// * If the embedded control has role textbox, return its value.
	// * If the embedded control has role menu button, return the text alternative of the button.
	// * If the embedded control has role combobox or listbox, return the text alternative of the 
	//   chosen option.
	// * If the embedded control has role range(e.g., a spinbutton or slider):
	//   * If the aria-valuetext property is present, return its value,
	//   * Otherwise, if the aria-valuenow property is present, return its value,
	//   * Otherwise, use the value as specified by a host language attribute.
	if(
		(
			isEmbeddedWithinLabel(current, origin) ||
			isReferencedByOrigin(current, origin) ||
			isNativelyReferencedByOrigin(current, origin) 
		)
		&&
		rules.isInstanceOf(role, 'widget')
	) {
		// console.log(role);
		switch (role) {
			case 'textbox':
			// case 'searchbox': // check if descendant roles also should taken into account
				/** @todo: support native & aria elements */
				return (current.element as HTMLInputElement).value;

			case 'button':
				// return current.computed.children

				if(current.element instanceof HTMLInputElement){
					if(current.element.value){
						return current.element.value;
					}  else if(current.element.type === 'reset') {
						return 'Reset';
					}  else if(current.element.type === 'button') {
						return 'Button';
					}  else if(current.element.type === 'submit') {
						return 'Submit';
					}
				}
				break;
			
			case 'combobox':
			case 'listbox':
				break;

			case 'range':
			case 'progressbar':
			case 'scrollbar':
			case 'spinbutton':
			case 'slider':
			{
				/** @todo: support native & aria elements */
				if(current.valueText){
					return current.valueText;
				} else if(current.valueNow){
					return current.valueNow.toString();
				} else if((current.element as any).value) {
					return (current.element as any).value;
				}
			}
		}
	}

	// console.log("2f", origin ? origin.element.id : null, current.element.id);

	// 2.f - If the current node's role allows name from content, or if the current node is
	// referenced by aria-labelledby, aria-describedby, or is a native host language text
	// alternative element (e.g. label in HTML), or is a descendant of a native host language text
	// alternative element:
	if(
		await allowsNameFromContent(current) ||
		isReferencedByOrigin(current, origin) ||
		isNativelyReferencedByOrigin(current, origin) // ||
		// descendantOfNativeTextAlternative
	){
		if (current.element instanceof HTMLInputElement) {
			if (current.element.value) {
				return current.element.value;
			} else if (current.element.type === 'reset') {
				return 'Reset';
			} else if (current.element.type === 'button') {
				return 'Button';
			} else if (current.element.type === 'submit') {
				return 'Submit';
			} else if (current.element.type === 'image') {
				return current.element.alt;
			}
		} else if(current.element instanceof HTMLSelectElement){
			return;
		}

		return [
			await getPsuedoContent(current.element, '::before'),
			await Promise.all(Array.from(current.element.childNodes)
				.map(node => {
					if(text.is(node)){
						return text.get(node);
					} else {
						return textAlternative(new Roletype(node as Element), current, traversedRoletypes);
					}
				})
				.filter(text => text)
			).then(text => text.join(" ")) || null,
			await getPsuedoContent(current.element, '::after')
		].filter(text => text).join(' ') || null;
	}

	// console.log('2g', origin ? origin.element.id : null, current.element.id);

	// 2.g - If the current node is a Text node, return its textual contents.
	if(text.is(current.element)){
		return text.get(current.element);
	}

	// 2.h
	// if()

	// 2.i - If the current node has a Tooltip attribute, return its value.
	if(tooltip.has(current)){
		return tooltip.get(current);
	}

	return null;
};