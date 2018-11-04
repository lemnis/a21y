import Roletype from '../role/abstract/Roletype';
import element from '../element';
import nativeCounterparts, { propertyMapping } from '../attributes';

import {
  ariaAttributesOfTypeString,
  ariaAttributesOfTypeRoletype,
  ariaAttributesOfTypeNumber,
  ariaAttributesOfTypeBoolean,
  ariaAttributesOfTypeRoletypeList,
  ariaAttributes
} from '../interfaces/ariaAttributes';

function getNativeCounterpart(
  current: Roletype,
  name: keyof ariaAttributesOfTypeNumber,
  before: boolean
): propertyMapping<number | null> | undefined;
function getNativeCounterpart(
  current: Roletype,
  name: keyof ariaAttributesOfTypeString,
  before: boolean
): propertyMapping<string | null> | undefined;
function getNativeCounterpart(
  current: Roletype,
  name: keyof ariaAttributesOfTypeBoolean,
  before: boolean
): propertyMapping<boolean | null> | undefined;
function getNativeCounterpart(
  current: Roletype,
  name: keyof ariaAttributes,
  before: boolean
): propertyMapping<any | null> | undefined {
  if (nativeCounterparts.hasOwnProperty(name)) {
    return (nativeCounterparts[name] as Array<propertyMapping<any>>).find(data => {
      return !!data.validate && data.validate(current.element) && data.beforeAria === before;
    });
  }
  return;
}

const string = {
  get(current: Roletype, name: keyof ariaAttributesOfTypeString) {
    var counterpart = getNativeCounterpart(current, name, true);
    if (counterpart)
      return counterpart.value(current.element);

    const string = current._.attributes[name].value || current.element.getAttribute(name);

    if (string) {
      if (current._.attributes[name].allows) {
        if ((current._.attributes[name].allows as any[]).indexOf(string) > -1) {
          return string;
        }
      } else if (string.trim()) {
        return string.trim();
      }
    }

    var counterpart = getNativeCounterpart(current, name, false);
    if (counterpart)
      return counterpart.value(current.element);

    if (current._.attributes[name].default) return current._.attributes[name].default as string;
    return null;
  },
  set(current: Roletype, name: keyof ariaAttributesOfTypeString, value: string | null) {
    if (value == null) {
      current.element.removeAttribute(name);
    } else {
      current.element.setAttribute(name, value);
    }

    current._.attributes[name].value = value;
  }
};

const boolean = {
  /**
   * Returns the value of given attribute as boolean
   */
  get(current: Roletype, name: keyof ariaAttributesOfTypeBoolean): boolean | null {
    var counterpart = getNativeCounterpart(current, name, true);
    if (counterpart)
      return counterpart.value(current.element);

    const value = current._.attributes[name].value || current.element.getAttribute(name);
    if (typeof value === 'boolean') return value;
    else if (value === 'true' || value === 'false') return value === 'true';

    var counterpart = getNativeCounterpart(current, name, false);
    if (counterpart)
      return counterpart.value(current.element);

    if (current._.attributes[name].default != null)
      return current._.attributes[name].default as boolean;
    return null;
  },

  /**
   * Sync the new value to the property
   */
  set(current: Roletype, attributeName: keyof ariaAttributesOfTypeBoolean, status: boolean | null) {
    if (status == undefined) {
      current.element.removeAttribute(attributeName);
    } else {
      current.element.setAttribute(attributeName, status.toString());
    }

    current._.attributes[attributeName].value = status;
  }
};

const number = {
  /**
   * Returns the value of a given attribute as Number
   */
  get(current: Roletype, attributeName: keyof ariaAttributesOfTypeNumber) {
    var counterpart = getNativeCounterpart(current, name, true);
    if (counterpart)
      return counterpart.value(current.element);
    const value =
      current._.attributes[attributeName].value != null
        ? current._.attributes[attributeName].value
        : current.element.hasAttribute(attributeName)
          ? current.element.getAttribute(attributeName)
          : current._.attributes[attributeName].default != null
            ? current._.attributes[attributeName].default
            : null;
    if (value == null) return null;
    return Number(value);
  },

  /**
   * Sync the new value to the DOM
   */
  set(current: Roletype, attributeName: keyof ariaAttributesOfTypeNumber, value: null | number) {
    if (value == undefined) {
      current.element.removeAttribute(attributeName);
    } else {
      current.element.setAttribute(attributeName, value.toString());
    }
    current._.attributes[attributeName].value = value;
  }
};

class RoletypeList extends Set {
  constructor(
    public _self: Roletype,
    public _attributeName: keyof ariaAttributesOfTypeRoletypeList
  ) {
    super();

    this._self = _self;
    this._attributeName = _attributeName;

    const linkedRoletypes = (_self.element.getAttribute(_attributeName) || '')
      .split(' ')
      .filter(id => !!id && !!document.getElementById(id))
      .map(id => {
        if (id === _self.element.id) {
          return _self;
        }

        return element(document.getElementById(id) as Element);
      });

    linkedRoletypes.forEach(roletype => this.add(roletype));
  }

  add(item: Roletype) {
    if (!(item instanceof Roletype)) {
      throw new Error('Only instances of Roletype are allowed to be added.');
    }

    // Only add id when it's a new item
    if (!this.has(item)) {
      const idRefs = this._self.element.getAttribute(this._attributeName) || '';
      const ids = new Set(idRefs.split(' '));
      this._self.element.setAttribute(this._attributeName, Array.from(ids.add(item._id)).join(' '));
    }

    return super.add(item);
  }

  delete(item: Roletype) {
    const successfulRemoval = super.delete(item);

    // Remove ID from attribute
    if (successfulRemoval) {
      const oldIdRefs = (this._self.element.getAttribute(this._attributeName) || '').split(' ');
      const idRefs = oldIdRefs.filter(id => id !== item._id);
      this._self.element.setAttribute(this._attributeName, idRefs.join(' '));
    }

    return successfulRemoval;
  }

  clear() {
    // Remove all IDs from attribute
    this._self.element.removeAttribute(this._attributeName);

    return super.clear();
  }
}

const roletype = {
  get(current: Roletype, attributeName: keyof ariaAttributesOfTypeRoletype): Roletype | null {
    if (current._.attributes[attributeName].value)
      return current._.attributes[attributeName].value;

    if (current.element.hasAttribute(attributeName)) {
      const node = document.getElementById(current.element.getAttribute(attributeName) as string);
      if (node) {
        current._.attributes[attributeName].value = element(node);
        return current._.attributes[attributeName].value;
      }
    }

    return null;
  },
  set(
    current: Roletype,
    attributeName: keyof ariaAttributesOfTypeRoletype,
    roletype: Roletype | null
  ) {
    if (!(roletype instanceof Roletype) && roletype != undefined) {
      throw new Error(
        `Attribute '${attributeName}' only allows a instance of Roletype or null.`
      );
    }

    if (roletype == undefined) {
      current.element.removeAttribute(attributeName);
    } else {
      current.element.setAttribute(attributeName, roletype._id);
    }

    current._.attributes[attributeName].value = roletype;
  }
};

export { string, boolean, number, RoletypeList, roletype };
