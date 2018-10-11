/// <reference path='../../../../node_modules/@types/chai/index.d.ts' />
import Roletype from './../../../../src/role/Roletype';

export default () => {
	describe('as select element', () => {
		let node: HTMLInputElement;

		beforeEach(() => {
			node = document.createElement('input');
			node.id = 'test';
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
                <select size="1">
                    <option selected="selected">1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
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