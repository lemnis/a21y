import Roletype from '../../role/Roletype';
import allowedRoles from './allowsNameFromContent';
import getPseudoContent from './getPseudoContent';

import tooltip from './textAlternative/tooltip';
import text from './textAlternative/text';
import label from './textAlternative/label';
import references from './textAlternative/references';
import nativeTextAlternative from './textAlternative/nativeTextAlternative';

import * as rules from './../../utils/data';
import * as inline from './../../utils/inlineElements';
import { roletype } from '../../utils/types';
import role from '../role';

type spacedString =
  | {
      text: string;
      roletype?: Roletype;
      element?: Element;
      step?: any;
      space?: { before: boolean; after: boolean };
    }
  | {
      children: spacedString[];
      roletype?: Roletype;
      element?: Element;
      step?: any;
      space?: { before: boolean; after: boolean };
    };

export default class textAlternative {
  private traversedElements: Element[] = [];

  constructor(
    private root: Roletype,
    private computedTextAlternative: 'name' | 'description'
  ) {
    return (this.get(root, null) as any).then(array => this.toString(array));
  }

  private async get(
    current: Roletype,
    origin: Roletype,
    start = 1,
    end = 9
  ): Promise<spacedString> {
    // if(this.traversedElements.indexOf(current.element) > -1){
    // 	console.log('already traveresed', current.element);
    // }

    let role = await current.computed.role();
    // console.log('get', current.element);

    for (let number = start; number <= end; number++) {
      if (await this[`validatesAgainstStep${number}`](current, origin, role)) {
        // console.log('step', number);
        return await this[`step${number}`](current, origin, role);
      }
    }
    // console.log('end');

    return { text: null, roletype: current, step: 'none' };
  }

  // if the current node is hidden and is not directly referenced by aria-labelledby or
  // aria-describedby, nor directly referenced by a native host language text alternative element
  // (e.g. label in HTML) or attribute, return the empty string.
  private step1(
    current: Roletype,
    origin: Roletype,
    role: string
  ): spacedString {
    return { text: null, roletype: current, step: 1 };
  }
  private validatesAgainstStep1(
    current: Roletype,
    origin: Roletype,
    role: string
  ) {
    return (
      current.computed.hidden() &&
      !references.by.labelledby(current, origin) &&
      !references.by.describedby(current, origin) &&
      !references.is.native(current)
    );
  }

  // if computing a description, and the current node has an aria-describedby attribute or
  // if computing a name, and the current node has an aria-labelledby attribute that contains at
  // least one valid reference, and the current node is not already part of an traversal
  private async step2(
    current: Roletype,
    origin: Roletype,
    role: string
  ): Promise<spacedString> {
    return await this.getTextOfChildren(
      references
        .get(current, this.traversedElements, this.computedTextAlternative)
        .map(roletype => roletype.element),
      current
    ).then(result => {
      result.step = 2;
      return result;
    });
  }
  private validatesAgainstStep2(
    current: Roletype,
    origin: Roletype,
    role: string
  ) {
    return this.computedTextAlternative === 'name' ? 
      references.has.labelledBy(current, this.traversedElements) :
      references.has.describedBy(current, this.traversedElements);
  }

  // if computing a name, and if the current node has an aria-label attribute whose value is not
  // the empty string, nor, when trimmed of white space, is not the empty string: If traversal of
  // the current node is due to recursion and the current node is an embedded control as defined
  // in step 2E, ignore aria-label and skip to rule 2E. Otherwise, return the value of aria-label.
  /** @todo: Skip to 2E if recursion & current is embedded control */
  private step3(
    current: Roletype,
    origin: Roletype,
    role: string
  ): spacedString {
    if (
      this.root !== current &&
      this.validatesAgainstStep5(current, origin, role)
    ) {
      console.log('GO TO STEP 3, IMPLEMENT STEP 3 !!!!!!!!!!!!!!!!!!!!!!');
    }

    return {
      text: label.get(current),
      roletype: current,
      step: 3,
      space: { before: true, after: true }
    };
  }
  private validatesAgainstStep3(
    current: Roletype,
    origin: Roletype,
    role: string
  ) {
    return label.has(current) && this.computedTextAlternative === 'name';
  }

  // if the current node's native markup provides an attribute (e.g. title) or element (e.g. HTML
  // label) that defines a text alternative, return that alternative in the form of a flat string
  // as defined by the host language, unless the element is marked as presentational
  // (role="presentation" or role="none").
  private async step4(
    current: Roletype,
    origin: Roletype,
    role: string
  ): Promise<spacedString> {
    const result = nativeTextAlternative.get(current, this.traversedElements);

    // if(rules.check(role, 'allowsNameFromAuthor', false)){
    // 	return null;
    // }

    if (typeof result === 'string') {
      /** @todo check desired behavior with widgets */
      // if(await current.computed.value()){
      // 	return {text: await current.computed.value(), step: 4, roletype: current};
      // }

      return {
        text: result,
        roletype: current,
        step: 4,
        space: { before: true, after: true }
      };
    } else if (Array.isArray(result)) {
      return this.getTextOfChildren(result, current).then(result => {
        result.step = 4;
        return result;
      });
    }
  }
  private validatesAgainstStep4(
    current: Roletype,
    origin: Roletype,
    role: string
  ) {
    return (
      nativeTextAlternative.has(current, this.traversedElements) &&
      rules.check(role, 'allowsNameFromAuthor', true)
    );
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
  private async step5(current: Roletype, origin: Roletype, role: string) {
    switch (role) {
      case 'range':
      case 'progressbar':
      case 'scrollbar':
      case 'spinbutton':
      case 'slider':
      case 'textbox':
        // case 'searchbox': // check if descendant roles also should taken into account
        /** @todo: support native & aria elements */
        return {
          text: await current.computed.value(),
          space: { before: true, after: true },
          roletype: current,
          step: 5
        };

      case 'button':
        // return current.computed.children

        if (current.element instanceof HTMLInputElement) {
          if (current.element.value) {
            return { text: current.element.value, roletype: current, step: 5 };
          } else if (current.element.type === 'reset') {
            return { text: 'Reset', roletype: current, step: 5 };
          } else if (current.element.type === 'button') {
            return { text: 'Button', roletype: current, step: 5 };
          } else if (current.element.type === 'submit') {
            return { text: 'Submit', roletype: current, step: 5 };
          }
        }
        break;

      case 'combobox':
      case 'listbox':
        const selectedOptions = await current.computed.selectedOptions();
        return await Promise.all(
          selectedOptions.map(option =>
            this.get(new Roletype(option), current, 2)
          )
        ).then(i => ({ children: i, roletype: current, step: 5 })
      );
      default:
        return { text: null, roletype: current, step: 5 };
    }
  }
  private validatesAgainstStep5(
    current: Roletype,
    origin: Roletype,
    role: string
  ) {
    return (
      (label.isEmbeddedWithin(current, origin) ||
        references.by.labelledby(current, origin) ||
        references.by.describedby(current, origin) ||
        references.within.native(current)) &&
      [
        'range',
        'progressbar',
        'scrollbar',
        'spinbutton',
        'slider',
        'textbox',
        'button',
        'combobox',
        'listbox',
        'menu'
      ].indexOf(role) > -1
    );
  }

  // if the current node's role allows name from content, or if the current node is referenced by
  // aria-labelledby, aria-describedby, or is a native host language text alternative element
  // (e.g. label in HTML), or is a descendant of a native host language text alternative element:
  private async step6(
    current: Roletype,
    origin: Roletype,
    role: string
  ): Promise<spacedString> {
    if (current.element instanceof HTMLInputElement) {
      if (role === 'checkbox' || role === 'radio') {
        return { text: null, roletype: current, step: 6 };
      } else if (await current.computed.value()) {
        return { text: await current.computed.value() };
      } else if (current.element.type === 'reset') {
        return { text: 'Reset', roletype: current, step: 6 };
      } else if (current.element.type === 'button') {
        return { text: 'Button', roletype: current, step: 6 };
      } else if (current.element.type === 'submit') {
        return { text: 'Submit', roletype: current, step: 6 };
      } else if (current.element.type === 'image') {
        return { text: current.element.alt, roletype: current, step: 6 };
      }

      /** @todo: add documentation why null */
    } else if (current.element instanceof HTMLSelectElement) {
      return { text: null, roletype: current, step: 6 };
    }

    let children: spacedString[] = [];

    const beforeText = await getPseudoContent(current.element, '::before');
    if (beforeText) {
      let beforeStyles = window.getComputedStyle(current.element, '::before');
      children.push({
        text: beforeText.trim() || null,
        step: '6::before',
        space: {
          before: /\s/.test(beforeText[0]) || beforeStyles.display === 'block',
          after:
            /\s/.test(beforeText[beforeText.length - 1]) ||
            beforeStyles.display === 'block'
        }
      });
    }

    children = children.concat(
      await this.getTextOfChildren(
        [
          ...Array.from(current.element.childNodes as NodeListOf<Element>),
          ...Array.from(current.owns).map(roletype => roletype.element)
        ],
        current
      ).then(spacedString => (spacedString as any).children)
    );

    const afterText = await getPseudoContent(current.element, '::after');
    if (afterText) {
      let afterStyles = window.getComputedStyle(current.element, '::after');
      children.push({
        text: afterText.trim() || null,
        step: '6::after',
        space: {
          before: /\s/.test(afterText[0]) || afterStyles.display === 'block',
          after:
            /\s/.test(afterText[afterText.length - 1]) ||
            afterStyles.display === 'block'
        }
      });
    }

    return (
      {
        step: 6,
        children,
        space: {
          before:
            !inline.is(current.element.tagName) ||
            references.by.labelledby(current, origin) ||
            references.by.describedby(current, origin) ||
            references.is.native(current),
          after:
            !inline.is(current.element.tagName) ||
            references.by.labelledby(current, origin) ||
            references.by.describedby(current, origin) ||
            references.is.native(current)
        },
        roletype: current
      } || { text: null, roletype: current, step: 6 }
    );
  }
  private validatesAgainstStep6(
    current: Roletype,
    origin: Roletype,
    role: string
  ) {
    return (
      rules.check(role, 'allowsNameFromContent', true) ||
      references.by.labelledby(current, origin) ||
      references.by.describedby(current, origin) ||
      references.is.native(current) ||
      references.within.native(current)
    );
  }

  // if the current node is a Text node, return its textual contents.
  private step7(
    current: Roletype,
    origin: Roletype,
    role: string
  ): spacedString {
    return {
      text: text.get(current.element),
      roletype: current,
      step: 7
    };
  }
  private validatesAgainstStep7(
    current: Roletype,
    origin: Roletype,
    role: string
  ) {
    return text.is(current.element);
  }

  // If the current node is a descendant of an element whose Accessible Name or Accessible
  // Description is being computed, and contains descendants, proceed to 2F.i.
  private async step8(
    current: Roletype,
    origin: Roletype,
    role: string
  ): Promise<spacedString> {
    return await this.getTextOfChildren(
      [
        ...Array.from(current.element.childNodes as NodeListOf<Element>),
        ...Array.from(current.owns).map(roletype => roletype.element)
      ],
      current
    ).then(result => {
      result.step = 8;
      return result;
    });
  }
  private validatesAgainstStep8(
    current: Roletype,
    origin: Roletype,
    role: string
  ) {
    return current.element.childNodes.length > 0 && this.root !== current;
  }

  // If the current node has a Tooltip attribute, return its value.
  private step9(
    current: Roletype,
    origin: Roletype,
    role: string
  ): spacedString {
    return { text: tooltip.get(current), roletype: current, step: 9 };
  }
  private validatesAgainstStep9(
    current: Roletype,
    origin: Roletype,
    role: string
  ) {
    // return tooltip.has(current);
  }

  private async getTextOfChildren(
    children: Element[],
    origin: Roletype
  ): Promise<spacedString> {
    return await Promise.all(
      children.map((node, index) => {
        this.traversedElements.push(node);

        if (text.is(node)) {
          const string = node.textContent;
          return {
            text: text.get(node),
            space: {
              before: /\s/.test(string[0]),
              after: /[^\s]\s+$/.test(string)
            },
            roletype: null,
            element: node,
            step: 'loop > text'
          };
        }

        if (node instanceof Element) {
          const roletype = new Roletype(node as Element);

          if (node instanceof HTMLBRElement) {
            return {
              text: null,
              roletype: roletype,
              space: { after: true, before: false }
            };
          }

          return this.get(roletype, origin);
        }
      })
    ).then(array => ({ children: array, roletype: origin, step: 10 }));
  }

  private toString({ children, text }): string {
    let previous;
    const temp = (accumulatedText, item, index, array) => {
      if (!item) return accumulatedText;
      let { text, children, roletype, element, step, space } = item;

      // // if(space){
      // 	console.log(item, item.text);
      // // }
      // if(previous){
      // 	console.warn(previous);
      // }

      if (
        space &&
        space.before &&
        previous &&
        previous.space &&
        !previous.space.after
      ) {
        accumulatedText += ' ';
        previous.space.after = true;
      }

      if (children) {
        accumulatedText += children.reduce(temp, '');
      } else if (text) {
        accumulatedText += text;
        previous = item;

        if (space && space.after) {
          accumulatedText += ' ';
        }
      } else if (
        space &&
        space.after &&
        (!previous || (previous.space && !previous.space.after))
      ) {
        accumulatedText += ' ';
        previous = item;
      }

      return accumulatedText;
    };

    // return if string is a string or null
    if (!children) {
      return text;
    }

    // console.error('started', string);
    return children.reduce(temp, '').trim() || null;
  }
}
