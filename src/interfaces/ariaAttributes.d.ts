import Class from '../role/abstract/Roletype';
import { RoletypeList } from '../utils/types';
import { roleNames } from 'roles';

export type ariaAttributesOfTypeString = {
  'role': roleNames | null;
  'aria-autocomplete': string | null;
  'aria-current': string | null;
  'aria-checked': string | null;
  'aria-haspopup': string | null;
  'aria-invalid': string | null;
  'aria-keyshortcuts': string | null;
  'aria-label': string | null;
  'aria-live': string | null;
  'aria-orientation': string | null;
  'aria-placeholder': string | null;
  'aria-pressed': string | null;
  'aria-relevant': string | null;
  'aria-roledescription': string | null;
  'aria-sort': string | null;
  'aria-valuetext': string | null;
};

export type ariaAttributesOfTypeBoolean = {
  'aria-atomic': boolean | null;
  'aria-busy': boolean | null;
  'aria-disabled': boolean | null;
  'aria-expanded': boolean | null;
  'aria-hidden': boolean | null;
  'aria-modal': boolean | null;
  'aria-multiline': boolean | null;
  'aria-multiselectable': boolean | null;
  'aria-readonly': boolean | null;
  'aria-required': boolean | null;
  'aria-selected': boolean | null;
};

export type ariaAttributesOfTypeNumber = {
  'aria-colcount': number | null;
  'aria-colindex': number | null;
  'aria-colspan': number | null;
  'aria-level': number | null;
  'aria-posinset': number | null;
  'aria-rowcount': number | null;
  'aria-rowindex': number | null;
  'aria-rowspan': number | null;
  'aria-setsize': number | null;
  'aria-valuemax': number | null;
  'aria-valuemin': number | null;
  'aria-valuenow': number | null;
};

export type ariaAttributesOfTypeRoletype = {
  'aria-activedescendant': Class | null;
  'aria-details': Class | null;
  'aria-errormessage': Class | null;
};

export type ariaAttributesOfTypeRoletypeList = {
  'aria-controls': RoletypeList;
  'aria-describedby': RoletypeList;
  'aria-flowto': RoletypeList;
  'aria-labelledby': RoletypeList;
  'aria-owns': RoletypeList;
};

export type ariaAttributes = ariaAttributesOfTypeString &
  ariaAttributesOfTypeBoolean &
  ariaAttributesOfTypeNumber &
  ariaAttributesOfTypeRoletype &
  ariaAttributesOfTypeRoletypeList;

export default ariaAttributes;