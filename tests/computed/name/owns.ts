/// <reference path='../../../node_modules/@types/chai/index.d.ts' />
import Roletype from './../../../src/role/Roletype';

export default () => {
	describe('owns', () => {
		let node: HTMLInputElement;

		beforeEach(() => {
			node = document.createElement('input');
			node.id = 'test';
            node.type = 'file';
			document.body.appendChild(node);
		});

		afterEach(() => {
			document.body.removeChild(node);
        });
        
		it('combobox', async () => {
			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'Flash <span aria-owns="id1">the screen</span> times.';

            const owns = document.createElement('div');
            owns.id = 'id1';
            owns.innerHTML = `
            <div role="combobox">
                <div role="textbox"></div>
                <ul role="listbox" style="list-style-type: none;">
                    <li role="option" aria-selected="true">1 </li>
                    <li role="option">2 </li>
                    <li role="option">3 </li>
                </ul>
            </div>
            `;

			document.body.appendChild(label);
			document.body.appendChild(owns);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();
            
			document.body.removeChild(owns);
            document.body.removeChild(label);

			chai.expect(name).to.equal('Flash the screen 1 times.');
		});
        
		it('combobox who owns listbox', async () => {
			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'Flash <span aria-owns="id1">the screen</span> times.';

            const owns1 = document.createElement('div');
            owns1.id = 'id1';
            owns1.setAttribute('role', 'combobox');
            owns1.setAttribute('aria-owns', 'id2');
            owns1.innerHTML = `<div role="textbox"></div>`;

            const owns2 = document.createElement('ul');
            owns2.id = 'id2';
            owns2.setAttribute('role', 'listbox');
            owns2.innerHTML = `
                <li role="option" >1 </li>
                <li role="option" aria-selected="true">2 </li>
                <li role="option">3 </li>
            `;

			document.body.appendChild(label);
			document.body.appendChild(owns1);
			document.body.appendChild(owns2);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();
            
			document.body.removeChild(owns1);
			document.body.removeChild(owns2);
            document.body.removeChild(label);

			chai.expect(name).to.equal('Flash the screen 2 times.');
		});
    });
};