/// <reference path='../../../../node_modules/@types/chai/index.d.ts' />
import Roletype from './../../../../src/role/Roletype';

export default () => {
	describe('slider', () => {
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
			    foo
			    <input role="slider" type="range" value="5" min="1"
			    max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10">
			    baz
			`;
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('foo 5 baz');
        });
        
        it('embedded within label from file input', async () => {
			(node as HTMLInputElement).type = 'file';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
			    foo
			    <input role="slider" type="range" value="5" min="1"
			    max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10">
			    baz
			`;
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('foo 5 baz');
        });
    });
};