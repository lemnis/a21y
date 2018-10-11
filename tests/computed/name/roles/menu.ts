/// <reference path='../../../../node_modules/@types/chai/index.d.ts' />
import Roletype from './../../../../src/role/Roletype';

export default () => {
	describe('menu', () => {
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
			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
                Flash the screen
                <span role="menu">
                    <span role="menuitem" aria-selected="true">1</span>
                    <span role="menuitem" hidden>2</span>
                    <span role="menuitem" hidden>3</span>
                </span>
                times.
			`;
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('Flash the screen times.');
        });
        
        it('embedded within label from file input', async () => {
			(node as HTMLInputElement).type = 'file';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
                Flash the screen
                <span role="menu">
                    <span role="menuitem" aria-selected="true">1</span>
                    <span role="menuitem" hidden>2</span>
                    <span role="menuitem" hidden>3</span>
                </span>
                times.
			`;
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('Flash the screen times.');
        });
    });
};