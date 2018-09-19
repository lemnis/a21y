import allowsNameFromContent from "../computed/utils/allowsNameFromContent";

interface dataObject {
	[name: string]: {
		extends: string | string[],
		allowsNameFromContent?: boolean,
		allowsNameFromAuthor: boolean
	}
}

const data : dataObject = {
	roletype: {
		extends: null,
		allowsNameFromAuthor: true,
	},

	widget: {
		extends: 'roletype',
		allowsNameFromAuthor: true,
	},
	structure: {
		extends: 'roletype',
		allowsNameFromAuthor: true,
	},
	window: {
		extends: 'roletype',
		allowsNameFromAuthor: true,
	},

	range: {
		extends: 'widget',
		allowsNameFromAuthor: true,
	},
	input: {
		extends: 'widget',
		allowsNameFromAuthor: true,
	},
	composite: {
		extends: 'widget',
		allowsNameFromAuthor: true,
	},
	comand: {
		extends: 'widget',
		allowsNameFromAuthor: true,
	},
	seperator: {
		extends: ['widget', 'structure'],
		allowsNameFromAuthor: true,
	},
	section: {
		extends: 'structure',
		allowsNameFromAuthor: true,
	},
	application: {
		extends: 'structure',
		allowsNameFromAuthor: true,
	},
	presentation: {
		extends: 'structure',
		allowsNameFromAuthor: false
	},
	none: {
		extends: 'structure',
		allowsNameFromAuthor: false
	},
	rowgroup: {
		extends: 'structure',
		allowsNameFromAuthor: true,
		allowsNameFromContent: true
	},
	document: {
		extends: 'structure',
		allowsNameFromAuthor: true,
	},
	sectionhead: {
		extends: 'structure',
		allowsNameFromAuthor: true,
	},
	dialog: {
		extends: 'window',
		allowsNameFromAuthor: true,
	},

	article: {
		extends: 'document',
		allowsNameFromAuthor: true,
	},

	progressbar: {
		extends: 'range',
		allowsNameFromAuthor: true,
	},
	scrollbar: {
		extends: 'range',
		allowsNameFromAuthor: true,
	},
	spinbutton: {
		extends: ['range', 'composite'],
		allowsNameFromAuthor: true,
	},
	slider: {
		extends: ['range', 'input'],
		allowsNameFromAuthor: true,
	},
	textbox: {
		extends: 'input',
		allowsNameFromAuthor: true,
	},
	option: {
		extends: 'input',
		allowsNameFromAuthor: true,
		allowsNameFromContent: true
	},
	checkbox: {
		extends: 'input',
		allowsNameFromAuthor: true,
		allowsNameFromContent: true
	},
	tablist: {
		extends: 'composite',
		allowsNameFromAuthor: true,
	},
	menuitem: {
		extends: 'command',
		allowsNameFromAuthor: true,
		allowsNameFromContent: true
	},
	radio: {
		extends: 'input',
		allowsNameFromAuthor: true,
		allowsNameFromContent: true
	},
	button: {
		extends: 'command',
		allowsNameFromAuthor: true,
		allowsNameFromContent: true
	},
	link: {
		extends: 'command',
		allowsNameFromAuthor: true,
		allowsNameFromContent: true
	},
	listitem: {
		extends: 'section',
		allowsNameFromAuthor: true,
	},
	table: {
		extends: 'section',
		allowsNameFromAuthor: true,
	},
	cell: {
		extends: 'section',
		allowsNameFromAuthor: true,
		allowsNameFromContent: true
	},
	list: {
		extends: 'section',
		allowsNameFromAuthor: true,
	},
	group: {
		extends: 'section',
		allowsNameFromAuthor: true,
	},
	img: {
		extends: 'section',
		allowsNameFromAuthor: true,
	},
	figure: {
		extends: 'section',
		allowsNameFromAuthor: true,
	},
	definition: {
		extends: 'section',
		allowsNameFromAuthor: true,
	},
	landmark: {
		extends: 'section',
		allowsNameFromAuthor: true,
	},
	marquee: {
		extends: 'section',
		allowsNameFromAuthor: true,
	},
	math: {
		extends: 'section',
		allowsNameFromAuthor: true,
	},
	note: {
		extends: 'section',
		allowsNameFromAuthor: true,
	},
	log: {
		extends: 'section',
		allowsNameFromAuthor: true,
	},
	status: {
		extends: 'section',
		allowsNameFromAuthor: true,
	},
	tabpanel: {
		extends: 'section',
		allowsNameFromAuthor: true,
	},
	term: {
		extends: 'section',
		allowsNameFromAuthor: true,
	},
	tooltip: {
		extends: 'section',
		allowsNameFromAuthor: true,
		allowsNameFromContent: true
	},
	tab: {
		extends: ['section', 'sectionhead'],
		allowsNameFromAuthor: true,
		allowsNameFromContent: true
	},
	heading: {
		extends: 'sectionhead',
		allowsNameFromAuthor: true,
		allowsNameFromContent: true
	},

	searchbox: {
		extends: 'textbox',
		allowsNameFromAuthor: true,
	},
	switch: {
		extends: 'checkbox',
		allowsNameFromAuthor: true,
		allowsNameFromContent: true
	},
	menuitemcheckbox: {
		extends: ['checkbox', 'menuitem'],
		allowsNameFromAuthor: true,
		allowsNameFromContent: true
	},
	treeitem: {
		extends: ['option', 'listitem'],
		allowsNameFromAuthor: true,
		allowsNameFromContent: true
	},
	select: {
		extends: ['composite', 'group'],
		allowsNameFromAuthor: true,
	},
	grid: {
		extends: ['composite', 'table'],
		allowsNameFromAuthor: true,
	},
	gridcell: {
		extends: ['widget', 'cell'],
		allowsNameFromAuthor: true,
		allowsNameFromContent: true
	},
	directory: {
		extends: 'list',
		allowsNameFromAuthor: true,
	},
	feed: {
		extends: 'list',
		allowsNameFromAuthor: true,
	},
	row: {
		extends: ['widget', 'group'],
		allowsNameFromAuthor: true,
		allowsNameFromContent: true
	},
	toolbar: {
		extends: 'group',
		allowsNameFromAuthor: true,
	},
	banner: {
		extends: 'banner',
		allowsNameFromAuthor: true,
	},
	complementary: {
		extends: 'banner',
		allowsNameFromAuthor: true,
	},
	contentinfo: {
		extends: 'banner',
		allowsNameFromAuthor: true,
	},
	form: {
		extends: 'banner',
		allowsNameFromAuthor: true,
	},
	main: {
		extends: 'banner',
		allowsNameFromAuthor: true,
	},
	navigation: {
		extends: 'banner',
		allowsNameFromAuthor: true,
	},
	region: {
		extends: 'banner',
		allowsNameFromAuthor: true,
	},
	search: {
		extends: 'banner',
		allowsNameFromAuthor: true,
	},
	timer: {
		extends: 'status',
		allowsNameFromAuthor: true,
	},

	menuitemradio: {
		extends: ['menuitemradio', 'radio'],
		allowsNameFromAuthor: true,
		allowsNameFromContent: true
	},
	radiogroup: {
		extends: 'select',
		allowsNameFromAuthor: true,
	},
	combobox: {
		extends: 'select',
		allowsNameFromAuthor: true,
	},
	tree: {
		extends: 'select',
		allowsNameFromAuthor: true,
		allowsNameFromContent: true
	},
	menu: {
		extends: 'select',
		allowsNameFromAuthor: true,
	},
	listbox: {
		extends: 'select',
		allowsNameFromAuthor: true,
	},
	columnheader: {
		extends: ['gridcell', 'cell', 'sectionhead'],
		allowsNameFromAuthor: true,
		allowsNameFromContent: true
	},
	rowheader: {
		extends: ['gridcell', 'cell', 'sectionhead'],
		allowsNameFromAuthor: true,
		allowsNameFromContent: true
	},
	alertdialog: {
		extends: ['alert', 'dialog'],
		allowsNameFromAuthor: true,
	},

	treegrid: {
		extends: 'tree',
		allowsNameFromAuthor: true,
	},
	menubar: {
		extends: 'menu',
		allowsNameFromAuthor: true,
	}
}

export function isInstanceOf(currentRole: string, role: string): boolean{

	if(currentRole === role){
		return true;
	}

	let roleObject = data[currentRole];

	if(!roleObject) return false;

	if(roleObject.extends && Array.isArray(roleObject.extends)){
		return !!roleObject.extends.find(newRole => isInstanceOf(newRole, role));
	} else if(typeof roleObject.extends === "string") {
		return isInstanceOf(roleObject.extends, role);
	}

	return false;
}

export function check(role: string, property: string, value: any) : boolean {
	return data.hasOwnProperty(role) && data[role].hasOwnProperty(property) && data[role][property] === value;
}