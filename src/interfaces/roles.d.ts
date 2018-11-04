// Abstracts
import Command from '../role/abstract/Command';
import Input from '../role/abstract/Input';
import Landmark from '../role/abstract/Landmark';
import Roletype from "../role/abstract/Roletype";
import Section from '../role/abstract/Section';
import Sectionhead from '../role/abstract/Sectionhead';
import Select from '../role/abstract/Select';
import Structure from '../role/abstract/Structure';
import Widget from '../role/abstract/Widget';
import Window from '../role/abstract/Window';

import Alert from '../role/Alert';
import Alertdialog from '../role/Alertdialog';
import Application from '../role/Application';
import Article from '../role/Article';
import Banner from '../role/Banner';
import Blockquote from '../role/Blockquote';
import Button from '../role/Button';
import Caption from '../role/Caption';
import Cell from '../role/Cell';
import Checkbox from '../role/Checkbox';
import Columnheader from '../role/Columnheader';

import Group from '../role/Group';

// needed unfortanely because only mapped objects are supported as key for declarations
export interface roleNamesAsObject {
  alert: any; alertdialog: any; application: any; article: any; banner: any; blockquote: any;
  button: any; caption: any; cell: any; checkbox: any; columnheader: any; combobox: any;
  command: any; complementary: any; composite: any; contentinfo: any; definition: any; dialog: any;
  directory: any; document: any; feed: any; figure: any; form: any; grid: any; gridcell: any;
  group: any; heading: any; img: any; input: any; landmark: any; link: any; list: any; listbox: any;
  listitem: any; log: any; main: any; marquee: any; math: any; menu: any; menubar: any;
  menuitem: any; menuitemcheckbox: any; menuitemradio: any; navigation: any; none: any; note: any;
  option: any; paragraph: any; presentation: any; progressbar: any; radio: any; radiogroup: any;
  range: any; region: any; roletype: any; row: any; rowgroup: any; rowheader: any; scrollbar: any;
  search: any; searchbox: any; section: any; sectionhead: any; select: any; separator: any;
  slider: any; spinbutton: any; status: any; structure: any; switch: any; tab: any; table: any;
  tablist: any; tabpanel: any; term: any; textbox: any; timer: any; toolbar: any; tooltip: any;
  tree: any; treegrid: any; treeitem: any; widget: any; window: any;
}

export type roleNames = keyof roleNamesAsObject;

export type roleClasses = typeof Roletype | typeof Widget | typeof Section | typeof Structure
  | typeof Group | typeof Landmark | typeof Application;

type roles = roleNamesAsObject & {
  [role: string]: roleClasses
};
export default roles;