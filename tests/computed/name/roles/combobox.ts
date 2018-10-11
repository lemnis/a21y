/// <reference path='../../../../node_modules/@types/chai/index.d.ts' />
import Roletype from './../../../../src/role/Roletype';

export default () => {
	describe('combobox', () => {
		let node: HTMLElement;

		beforeEach(() => {
			node = document.createElement('input');
			node.id = 'test';
			document.body.appendChild(node);
		});

		afterEach(() => {
			document.body.removeChild(node);
        });
        
        it('1.0 focusable', async () => {
			document.body.removeChild(node);

			node = document.createElement('div');
			node.setAttribute('role', 'combobox');
			node.tabIndex = 0;
			node.title = 'Choose your language.';
			document.body.appendChild(node);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();
			chai.expect(name).to.equal('Choose your language.');
		});
		
		it('1.0 focusable alternative', async () => {
			node.setAttribute('role', 'combobox');
			(node as HTMLInputElement).value = 'English';
			node.title = 'Choose your language';

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();
			chai.expect(name).to.equal('Choose your language');
		});
		
        it('embedded within label', async () => {
			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
				Flash the screen
				<div role="combobox">
					<div role="textbox"></div>
					<ul role="listbox" style="list-style-type: none;">
						<li role="option" aria-selected="true">1</li>
						<li role="option">2</li>
						<li role="option">3</li>
					</ul>
				</div>
				times.
			`;
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('Flash the screen 1 times.');
        });
		
        it('embedded within label from file input', async () => {
			(node as HTMLInputElement).type = 'file';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
				Flash the screen
				<div role="combobox">
					<div role="textbox"></div>
					<ul role="listbox" style="list-style-type: none;">
						<li role="option" aria-selected="true">1</li>
						<li role="option">2</li>
						<li role="option">3</li>
					</ul>
				</div>
				times.
			`;
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('Flash the screen 1 times.');
        });
    });
};