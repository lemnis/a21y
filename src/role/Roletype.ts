import Interface from './RoletypeInterface';
import {
  string,
  boolean,
  number,
  roletype,
  RoletypeList
} from '../utils/types';
import enumerable from '../utils/enumerable';

import hidden from '../computed/hidden';
import name from '../computed/name';
import description from '../computed/description';
import role from '../computed/role';
import value from '../computed/value';
import selectedOptions from '../computed/selectedOptions';
import parent from '../computed/parent';
import children from '../computed/children';

export default class Roletype implements Interface {
  constructor(public element: Element) {}

  @enumerable(true)
  get role(): null | string {
    return string.get(this, 'role');
  }
  set role(value: null | string) {
    string.set(this, 'role', value);
  }

  @enumerable(true)
  get roleDescription(): null | string {
    return string.get(this, 'aria-roledescription');
  }
  set roleDescription(value: null | string) {
    string.set(this, 'aria-roledescription', value);
  }

  @enumerable(true)
  get label(): null | string {
    return string.get(this, 'aria-label');
  }
  set label(value: null | string) {
    string.set(this, 'aria-label', value);
  }

  @enumerable(true)
  get current(): null | string {
    return string.get(this, 'aria-current', 'false');
  }
  set current(value: null | string) {
    string.set(this, 'aria-current', value);
  }

  @enumerable(true)
  get autoComplete(): null | string {
    return string.get(this, 'aria-autocomplete', 'none');
  }
  set autoComplete(value: null | string) {
    string.set(this, 'aria-autocomplete', value);
  }

  @enumerable(true)
  get hidden(): null | boolean {
    return boolean.get(this, 'aria-hidden');
  }
  set hidden(value: null | boolean) {
    boolean.set(this, 'aria-hidden', value);
  }

  @enumerable(true)
  get keyShortcuts(): null | string {
    return string.get(this, 'aria-keyshortcuts');
  }
  set keyShortcuts(value: null | string) {
    string.set(this, 'aria-keyshortcuts', value);
  }

  @enumerable(true)
  get modal(): null | boolean {
    return boolean.get(this, 'aria-modal', false);
  }
  set modal(value: null | boolean) {
    boolean.set(this, 'aria-modal', value);
  }

  @enumerable(true)
  get multiLine(): null | boolean {
    return boolean.get(this, 'aria-multiline', false);
  }
  set multiLine(value: null | boolean) {
    boolean.set(this, 'aria-multiline', value);
  }

  @enumerable(true)
  get multiSelectable(): null | boolean {
    return boolean.get(this, 'aria-multiselectable', false);
  }
  set multiSelectable(value: null | boolean) {
    boolean.set(this, 'aria-multiselectable', value);
  }

  @enumerable(true)
  get orientation(): null | string {
    return string.get(this, 'aria-orientation');
  }
  set orientation(value: null | string) {
    string.set(this, 'aria-orientation', value);
  }

  @enumerable(true)
  get readOnly(): null | boolean {
    return boolean.get(this, 'aria-readonly', false);
  }
  set readOnly(value: null | boolean) {
    boolean.set(this, 'aria-readonly', value);
  }

  @enumerable(true)
  get required(): null | boolean {
    return boolean.get(this, 'aria-required', false);
  }
  set required(value: null | boolean) {
    boolean.set(this, 'aria-required', value);
  }

  @enumerable(true)
  get selected(): null | boolean {
    return boolean.get(this, 'aria-selected');
  }
  set selected(value: null | boolean) {
    boolean.set(this, 'aria-selected', value);
  }

  @enumerable(true)
  get sort(): null | string {
    return string.get(this, 'aria-sort', 'none');
  }
  set sort(value: null | string) {
    string.set(this, 'aria-sort', value);
  }

  @enumerable(true)
  get checked(): null | string {
    return string.get(this, 'aria-checked');
  }
  set checked(value: null | string) {
    string.set(this, 'aria-checked', value);
  }

  @enumerable(true)
  get expanded(): null | boolean {
    return boolean.get(this, 'aria-expanded');
  }
  set expanded(value: null | boolean) {
    boolean.set(this, 'aria-expanded', value);
  }

  @enumerable(true)
  get disabled(): null | boolean {
    return boolean.get(this, 'aria-disabled', false);
  }
  set disabled(value: null | boolean) {
    boolean.set(this, 'aria-disabled', value);
  }

  @enumerable(true)
  get invalid(): null | string {
    return string.get(this, 'aria-invalid', 'false');
  }
  set invalid(value: null | string) {
    string.set(this, 'aria-invalid', value);
  }

  @enumerable(true)
  get hasPopup(): null | string {
    return string.get(this, 'aria-haspopup', 'false');
  }
  set hasPopup(value: null | string) {
    string.set(this, 'aria-haspopup', value);
  }

  @enumerable(true)
  get pressed(): null | string {
    return string.get(this, 'aria-pressed');
  }
  set pressed(value: null | string) {
    string.set(this, 'aria-pressed', value);
  }

  @enumerable(true)
  get valueText(): null | string {
    return string.get(this, 'aria-valuetext');
  }
  set valueText(value: null | string) {
    string.set(this, 'aria-valuetext', value);
  }

  @enumerable(true)
  get valueNow(): null | number {
    return number.get(this, 'aria-valuenow');
  }
  set valueNow(value: null | number) {
    number.set(this, 'aria-valuenow', value);
  }

  @enumerable(true)
  get valueMin(): null | number {
    return number.get(this, 'aria-valuemin');
  }
  set valueMin(value: null | number) {
    number.set(this, 'aria-valuemin', value);
  }

  @enumerable(true)
  get valueMax(): null | number {
    return number.get(this, 'aria-valuemax');
  }
  set valueMax(value: null | number) {
    number.set(this, 'aria-valuemax', value);
  }

  @enumerable(true)
  get atomic(): null | boolean {
    return boolean.get(this, 'aria-atomic', false);
  }
  set atomic(value: null | boolean) {
    boolean.set(this, 'aria-atomic', value);
  }

  @enumerable(true)
  get busy(): null | boolean {
    return boolean.get(this, 'aria-busy', false);
  }
  set busy(value: null | boolean) {
    boolean.set(this, 'aria-busy', value);
  }

  @enumerable(true)
  get live(): null | string {
    return string.get(this, 'aria-live', 'off');
  }
  set live(value: null | string) {
    string.set(this, 'aria-live', value);
  }

  @enumerable(true)
  get relevant(): null | string {
    return string.get(this, 'aria-relevant');
  }
  set relevant(value: null | string) {
    string.set(this, 'aria-relevant', value);
  }

  @enumerable(true)
  get activeDescendant(): null | Roletype {
    return roletype.get(this, 'aria-activedescendant');
  }
  set activeDescendant(value: null | Roletype) {
    roletype.set(this, 'aria-activedescendant', value);
  }

  @enumerable(true)
  get details(): null | Roletype {
    return roletype.get(this, 'aria-details');
  }
  set details(value: null | Roletype) {
    roletype.set(this, 'aria-details', value);
  }

  @enumerable(true)
  get errorMessage(): null | Roletype {
    return roletype.get(this, 'aria-errormessage');
  }
  set errorMessage(value: null | Roletype) {
    roletype.set(this, 'aria-errormessage', value);
  }

  @enumerable(true)
  get colCount(): null | number {
    return number.get(this, 'aria-colcount');
  }
  set colCount(value: null | number) {
    number.set(this, 'aria-colcount', value);
  }

  @enumerable(true)
  get colIndex(): null | number {
    return number.get(this, 'aria-colindex');
  }
  set colIndex(value: null | number) {
    number.set(this, 'aria-colindex', value);
  }

  @enumerable(true)
  get colSpan(): null | number {
    return number.get(this, 'aria-colspan');
  }
  set colSpan(value: null | number) {
    number.set(this, 'aricolspanin', value);
  }

  @enumerable(true)
  get posInSet(): null | number {
    return number.get(this, 'aria-posinset');
  }
  set posInSet(value: null | number) {
    number.set(this, 'aria-posinset', value);
  }

  @enumerable(true)
  get rowCount(): null | number {
    return number.get(this, 'aria-rowcount');
  }
  set rowCount(value: null | number) {
    number.set(this, 'aria-rowCcunt', value);
  }

  @enumerable(true)
  get rowIndex(): null | number {
    return number.get(this, 'aria-rowindex');
  }
  set rowIndex(value: null | number) {
    number.set(this, 'aria-rowindex', value);
  }

  @enumerable(true)
  get rowSpan(): null | number {
    return number.get(this, 'aria-rowspan');
  }
  set rowSpan(value: null | number) {
    number.set(this, 'aria-rowspan', value);
  }

  @enumerable(true)
  get setSize(): null | number {
    return number.get(this, 'aria-setSize');
  }
  set setSize(value: null | number) {
    number.set(this, 'aria-setsize', value);
  }

  @enumerable(true)
  get level(): null | number {
    return number.get(this, 'aria-level');
  }
  set level(value: null | number) {
    number.set(this, 'aria-level', value);
  }

  @enumerable(true)
  get labelledBy(): Set<Roletype> {
    return this._.attributes['aria-labelledby'];
  }

  @enumerable(true)
  get describedBy(): Set<Roletype> {
    return this._.attributes['aria-describedby'];
  }

  @enumerable(true)
  get controls(): Set<Roletype> {
    return this._.attributes['aria-controls'];
  }

  @enumerable(true)
  get flowTo(): Set<Roletype> {
    return this._.attributes['aria-flowTo'];
  }

  @enumerable(true)
  get owns(): Set<Roletype> {
    return this._.attributes['aria-owns'];
  }

  @enumerable(true)
  get placeholder(): null | string {
    return string.get(this, 'aria-placeholder');
  }
  set placeholder(value: null | string) {
    string.set(this, 'aria-placeholder', value);
  }

  public computed = {
    role: () => role(this),
    name: () => name(this, null),
    hidden: () => hidden(this),
    autoComplete: null,

    parent: () => parent(this),
    children: () => children(this),

    multiSelectable: null,
    multiLine: null,
    placeholder: null,

    readOnly: null,
    required: null,
    selected: null,
    selectedOptions: () => selectedOptions(this),

    checked: null,
    expanded: null,
    disabled: null,

    hasPopup: null,

    value: () => value(this),
    valueMin: null,
    valueMax: null,

    colSpan: null,
    posInSet: null,

    rowSpan: null,
    setSize: null,
    level: null,
    description: () => description(this, null),
    controls: null,

    owns: null
  };

  public _ = {
    attributes: {
      role: null as string,
      'aria-roledescription': null as string,
      'aria-labelledby': (() => new RoletypeList(this, 'aria-labelledby')).call(
        this
      ),
      'aria-describedby': (() =>
        new RoletypeList(this, 'aria-describedby')).call(this),
      'aria-controls': (() => new RoletypeList(this, 'aria-controls')).call(
        this
      ),
      'aria-flowto': (() => new RoletypeList(this, 'aria-flowto')).call(this),
      'aria-owns': (() => new RoletypeList(this, 'aria-owns')).call(this)
    }
  };

  public get _id() {
    if (!this.element.id) {
      this.element.id = 'ay-' + Math.round(Math.random() * 10000);
    }

    return this.element.id;
  }
}
