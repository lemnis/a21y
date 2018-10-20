/** Very limited implementation of the CSS Level 2 specification */

interface contentType {
  [name: string]: {
    regex: string;
    amountOfGroups: number;
    number: number;
  };
}

const contentList: contentType = {
  string: { regex: '(^|[^\\(])"(.*?[^\\\\])"', amountOfGroups: 2, number: 2 },
  attribute: { regex: 'attr\\((.+?)\\)', amountOfGroups: 1, number: 1 }
};

const innerRegex = Object.keys(contentList).reduce(
  (acc, key) => (acc += contentList[key].regex + '|'),
  ''
);
const regex = new RegExp(`(${innerRegex})`, 'g');

export default async function(
  node: Element,
  pseudo: '::before' | '::after'
): Promise<string | null> {
  const rawContent: string | null = window.getComputedStyle(node, pseudo).content;

  // with 'normal' the psuedo element is not generated.
  // 'none' computes to 'normal' within psuedo elements.
  if (!rawContent || rawContent === 'normal' || rawContent === 'none') return null;

  // more extended implementation for browser who support it
  if (rawContent && window.getComputedAccessibleNode) {
    const parentAccessibleNode = await window.getComputedAccessibleNode(node);
    const pseudoAccessibleNode =
      pseudo === '::before' ? parentAccessibleNode.firstChild : parentAccessibleNode.lastChild;

    // check if element is exposed
    if (pseudoAccessibleNode) {
      // check if doesn't have multiple accessible children.
      if (!pseudoAccessibleNode.firstChild) return pseudoAccessibleNode.name;

      let current = pseudoAccessibleNode.firstChild;
      let result = [];

      while (current) {
        result.push(current.name);
        current = current.nextSibling;
      }

      return result.filter(text => text).join('');
    }
  }

  const result = [];
  let match;

  while ((match = regex.exec(rawContent)) !== null) {
    // this is necessary to avoid infinite loops with zero-width matches
    if (match.index === regex.lastIndex) regex.lastIndex++;

    let previousLength = 1; // start at 1, because full regex is encapsultated by one group
    for (let key in contentList) {
      const index = previousLength + contentList[key].number;

      if (match[index]) {
        switch (key) {
          case 'string':
            result.push(match[index]);
            break;
          case 'attribute':
            result.push(node.getAttribute(match[index]));
            break;
          default:
            break;
        }
      }

      previousLength += contentList[key].amountOfGroups;
    }
  }

  return result.join('') || null;
}
