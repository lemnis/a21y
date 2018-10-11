import input from './elements/input';
import img from './elements/img';
import div from './elements/div';
import a from './elements/a';
import select from './elements/select';

import combobox from './roles/combobox';
import listbox from './roles/listbox';
import menu from './roles/menu';
import slider from './roles/slider';
import spinbutton from './roles/spinbutton';
import textbox from './roles/textbox';

import labels from './labels';
import title from './title';
import owns from './owns';

export default () => {
	describe('name', () => {
		// elements
		div();
		input();
		img();
		a();
		select();

		// roles
		combobox();
		listbox();
		menu();
		slider();
		spinbutton();
		textbox();

		labels();
		title();
		owns();
	});
}