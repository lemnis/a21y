import Quotes from './quotes';

export default function(node: Element, pseudo: '::before' | '::after'): string {
  let computedStyles = window.getComputedStyle(node, pseudo);
  let rawContent: string = computedStyles.content;

  if (rawContent === 'normal' || rawContent === 'none') {
    /** @todo: more full featured return of normal & none; or better documentation why they
     * why they both got null.
     */
    return null;
  }

  /** @todo: Improve splittedContext */
  let regex = /(".*?[^\\]")/g;
  let firstIndex = 0;
  let splittedTextContent = [];

  while (regex.exec(rawContent) !== null) {
    splittedTextContent.push(rawContent.substring(firstIndex, regex.lastIndex));
    firstIndex = regex.lastIndex;
  }
  if (firstIndex !== rawContent.length)
    splittedTextContent.push(rawContent.substring(firstIndex));

  let splittedContent = [];
  splittedTextContent.forEach(str => {
    if (str.startsWith('"')) {
      splittedContent.push(str);
    } else {
      splittedContent = splittedContent.concat(str.trim().split(' '));
    }
  });

  function convertString(string: string) {
    let quotes = new Quotes(computedStyles.quotes);
    if (quotes.is(string)) {
      return quotes.get(string);
    }

    // check for images
    if (string.match(/^url\((.*)\)$/g)) {
    }

    // check for strings
    if (string.match(/^"(.*)"$/g)) {
      return string.substring(1, string.length - 1);
    }
  }

  return splittedContent.map(convertString).join(' ') || null;
}
