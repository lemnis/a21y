import Quotes from './quotes';

/** @todo: remove async */
export default async function(node: Element, psuedo: '::before' | '::after') : Promise<string> {
	let computedStyles = window.getComputedStyle(node, psuedo);
	let rawContent: string = computedStyles.content;

	if(rawContent === 'normal' || rawContent === 'none') {
		/** @todo: more full featured return of normal & none; or better documentation why they
		 * why they both got null.
		*/
		return null;
	}

	// // temporary
	// if(rawContent && (window as any).getComputedAccessibleNode){
	// 	const parentAccessibleNode = await (window as any).getComputedAccessibleNode(node);
	// 	let current = psuedo === '::before' ? parentAccessibleNode.firstChild : parentAccessibleNode.lastChild;
		
	// 	// Check if element is exposed
	// 	if(current){

	// 		// If the only element
	// 		if (!current.firstChild) {
	// 			return current.name.trim();
	// 		}

	// 		let result = [];
	// 		while (current) {
	// 			result.push(current.name.trim());
	// 			current = current.nextSibling;
	// 		}
	// 		return result.filter(text => text).join(' ');
	// 	}
	// }

	/** @todo: Improve splittedContext */
	let regex = /(".*?[^\\]")/g;
	let firstIndex = 0;
	let splittedTextContent = [];
	
	while (regex.exec(rawContent) !== null) {
		splittedTextContent.push(rawContent.substring(firstIndex, regex.lastIndex));
		firstIndex = regex.lastIndex;
	}
	if (firstIndex !== rawContent.length) splittedTextContent.push(rawContent.substring(firstIndex));

	let splittedContent = [];
	splittedTextContent.forEach(str => {
		if (str.startsWith('"')) {
			splittedContent.push(str);
		} else {
			splittedContent = splittedContent.concat(str.trim().split(" "));
		}
	});

	function convertString(string:string) {

		let quotes = new Quotes(computedStyles.quotes);
		if(quotes.is(string)){
			return quotes.get(string);
		}
	
		// check for images
		if(string.match(/^url\((.*)\)$/g)){
			
		}

		// check for strings
		if(string.match(/^"(.*)"$/g)){
			return string.substring(1, string.length - 1).trim();
		} 
	}
	
	return splittedContent.map(convertString).join(" ") || null;
}
