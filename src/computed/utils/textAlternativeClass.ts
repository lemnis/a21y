
import Roletype from "../../role/Roletype";
import allowedRoles from "./allowsNameFromContent";
import getPseudoContent from "./getPseudoContent";

import tooltip from "./textAlternative/tooltip";
import text from "./textAlternative/text";
import label from "./textAlternative/label";
import references from './textAlternative/references';
import nativeTextAlternative from './textAlternative/nativeTextAlternative';

import * as rules from "./../../utils/data";

export default class textAlternative{

	private traversedElements: Element[] = [];

	constructor(private root: Roletype, private computedTextAlternative: 'name' | 'description'){
		return this.get(root, null);
	}

	public async get(current: Roletype, origin: Roletype){

		let role = await current.computed.role();
		
		if(this.validatesAgainstStepA(current, origin)){
			// console.log('2a', current.element);
			return this.stepA(current, origin);
		}
		if(this.validatesAgainstStepB(current, origin)){
			// console.log('2b');
			return await this.stepB(current, origin);
		}
		if(this.validatesAgainstStepC(current, origin, this.computedTextAlternative)){
			// console.log('2c');
			return this.stepC(current, origin);
		}
		if(this.validatesAgainstStepD(current, origin, role)){
			// console.log('2d');
			return await this.stepD(current, origin);
		}
		if(this.validatesAgainstStepE(current, origin, role)){
			// console.log('2e');
			return this.stepE(current, origin, role);
		}
		if(this.validatesAgainstStepF(current, origin, role)){
			// console.log('2f');
			return this.stepF(current, origin);
		}
		if(this.validatesAgainstStepG(current, origin)){
			// console.log('2g');
			return this.stepG(current, origin);
		}
		if(this.validatesAgainstStepH(current, origin)){
			// console.log('2h');
			return this.stepH(current, origin);
		}
		if(this.validatesAgainstStepI(current, origin)){
			// console.log('2i');
			return this.stepI(current, origin);
		}

		return null;
	}

	// if the current node is hidden and is not directly referenced by aria-labelledby or
	// aria-describedby, nor directly referenced by a native host language text alternative element
	// (e.g. label in HTML) or attribute, return the empty string.
	private stepA(current: Roletype, origin: Roletype){
		return null;
	}
	private validatesAgainstStepA(current: Roletype, origin: Roletype){
		return current.computed.hidden() &&
			!references.byOrigin(current, origin) &&
			!references.nativelyByOrigin(current, origin);
	}

	// some missing description
	private async stepB(current: Roletype, origin: Roletype){
		return Promise.all(
				references
					.get(current, this.traversedElements, this.computedTextAlternative)
					.map(roletype => {
						this.traversedElements.push(roletype.element);
						return this.get(roletype, current);
					})
			).then(arrayOfStrings => arrayOfStrings.filter(str => str).join(' ') || null);
	}
	private validatesAgainstStepB(current: Roletype, origin: Roletype){
		return references.has(current, this.traversedElements, this.computedTextAlternative);
	}

	// if computing a name, and if the current node has an aria - label attribute whose value is not
	// the empty string, nor, when trimmed of white space, is not the empty string: If traversal of
	// the current node is due to recursion and the current node is an embedded control as defined
	// in step 2E, ignore aria-label and skip to rule 2E. Otherwise, return the value of aria-label.
	/** @todo: Skip to 2E if recursion & current is embedded control */
	private stepC(current: Roletype, origin: Roletype){
		return label.get(current);
	}
	private validatesAgainstStepC(current: Roletype, origin: Roletype, type: string){
		return label.has(current)  && type === 'name';
	}

	// if the current node's native markup provides an attribute (e.g. title) or element (e.g. HTML
	// label) that defines a text alternative, return that alternative in the form of a flat string
	// as defined by the host language, unless the element is marked as presentational
	// (role="presentation" or role="none").
	private async stepD(current: Roletype, origin: Roletype){
		const result = nativeTextAlternative.get(current, this.traversedElements);
		const self = this;

		if(typeof result === 'string'){
			return result;
		} else if(Array.isArray(result)){

			this.traversedElements.push(current.element);

			return Promise.all(
				result.map(element => {
					const roletype = new Roletype(element);
					self.traversedElements.push(roletype.element);
					return self.get(roletype, current);
				})
			).then(arrayOfStrings => arrayOfStrings.filter(str => str).join(' ')) || null;
		}
	}
	private validatesAgainstStepD(current: Roletype, origin: Roletype, role: string){
		return nativeTextAlternative.has(current, this.traversedElements)
			&& rules.check(role, 'allowsNameFromAuthor', true);
	}

	// if the current node is a control embedded within the label(e.g.the label element in
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
	private stepE(current: Roletype, origin: Roletype, role: string){
		switch (role) {
			case 'textbox':
				// case 'searchbox': // check if descendant roles also should taken into account
				/** @todo: support native & aria elements */
				return (current.element as HTMLInputElement).value;

			case 'button':
				// return current.computed.children

				if (current.element instanceof HTMLInputElement) {
					if (current.element.value) {
						return current.element.value;
					} else if (current.element.type === 'reset') {
						return 'Reset';
					} else if (current.element.type === 'button') {
						return 'Button';
					} else if (current.element.type === 'submit') {
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
					if (current.valueText) {
						return current.valueText;
					} else if (current.valueNow) {
						return current.valueNow.toString();
					} else if ((current.element as any).value) {
						return (current.element as any).value;
					}
				}
		}		
	}
	private validatesAgainstStepE(current: Roletype, origin: Roletype, role: string){		
		return (
			label.isEmbeddedWithin(current, origin) ||
			references.byOrigin(current, origin) ||
			references.nativelyByOrigin(current, origin)
		)
		&& rules.isInstanceOf(role, 'widget')
	}

	// if the current node's role allows name from content, or if the current node is referenced by
	// aria-labelledby, aria-describedby, or is a native host language text alternative element 
	// (e.g. label in HTML), or is a descendant of a native host language text alternative element:
	private async stepF(current: Roletype, origin: Roletype){
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

		/** @todo: add documentation why null */
		} else if (current.element instanceof HTMLSelectElement) {
			return null;
		}

		return [
			await getPseudoContent(current.element, '::before'),
			await Promise.all(
				Array.from(current.element.childNodes)
					.map(node => {
						if (text.is(node)) {
							return text.get(node);
						} else {
							return this.get(new Roletype(node as Element), current);
						}
					})
			).then(arrayOfStrings => arrayOfStrings.filter(string => string).join(' ')) || null,
			await getPseudoContent(current.element, '::after')
		].filter(text => text).join(' ') || null;
	}
	private validatesAgainstStepF(current: Roletype, origin: Roletype, role: string){
		return rules.check(role, 'allowsNameFromContent', true) ||
			references.byOrigin(current, origin) ||
			references.nativelyByOrigin(current, origin) // ||
	}

	// if the current node is a Text node, return its textual contents.
	private stepG(current: Roletype, origin: Roletype){
		return text.get(current.element);
	}
	private validatesAgainstStepG(current: Roletype, origin: Roletype){
		return text.is(current.element);
	}

	private stepH(current: Roletype, origin: Roletype){

	}
	private validatesAgainstStepH(current: Roletype, origin: Roletype){

	}

	// If the current node has a Tooltip attribute, return its value.
	private validatesAgainstStepI(current: Roletype, origin: Roletype){
		return tooltip.has(current);
	}
	private stepI(current: Roletype, origin: Roletype){
		return tooltip.get(current);
	}

}