/// <reference path='../../../../node_modules/@types/chai/index.d.ts' />
import Roletype from './../../../../src/role/Roletype';

export default () => {
	describe('textbox', () => {
		let node: HTMLInputElement;

		beforeEach(() => {
			node = document.createElement('input');
			node.id = 'test';
			node.type = 'checkbox';
			document.body.appendChild(node);
		});

		afterEach(() => {
			document.body.removeChild(node);
        });
        
        it('embedded within label', async () => {
			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
                Flash the screen
                <div role="textbox" contenteditable>1</div>
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