/// <reference path='../../node_modules/@types/chai/index.d.ts' />
import Roletype from './../../src/role/Roletype';
import img from './name/elements/img';

export default () => {
	describe('description', () => {
		let node: HTMLElement;

		beforeEach(() => {
			node = document.createElement('div');
			document.body.appendChild(node);
		});

		afterEach(() => {
			document.body.removeChild(node);
        });
        
        it('should return its child inside the DOM', async () => {
            node.innerHTML = `
                <input type='text' value='3' />
            `;

            const roletype = new Roletype(node);
            const children = await roletype.computed.children();
            const DOMnodes = node.querySelectorAll(":scope > *");

            chai.expect(DOMnodes[0]).to.deep.equal(children[0].element);
            chai.expect(children).to.have.length(1);
        });
        
        it('should return its child inside the reference', async () => {
            node.setAttribute('aria-owns', 'id1');

            const child = document.createElement('input');
            child.id = 'id1';
            document.body.appendChild(child);

            const roletype = new Roletype(node);
            const children = await roletype.computed.children();

            document.body.removeChild(child);

            chai.expect(child).to.deep.equal(children[0].element)
            chai.expect(children).to.have.length(1);
        });
        
        // it('should return no children when it is presentational', async () => {
        //     node.innerHTML = `
        //         <input type='text' value='3' />
        //     `;
        //     node.setAttribute('role', 'presentation');

        //     const roletype = new Roletype(node);
        //     const children = await roletype.computed.children();
        //     const DOMnodes = node.querySelectorAll(":scope > *");

        //     chai.expect(children).to.have.length(0);
        // });

        it('should return no children when it as a role whos children are presentational', async () => {
            node.innerHTML = `
                <input type='text' value='3' />
            `;
            node.setAttribute('role', 'button');

            const roletype = new Roletype(node);
            const children = await roletype.computed.children();
            const DOMnodes = node.querySelectorAll(":scope > *");

            chai.expect(children).to.have.length(0);
        });

        it('should skip presentational elements and return there children', async () => {
            node.innerHTML = `
                <div role='none'>
                    <input type='text' value='3' />
                </div>
            `;
            node.setAttribute('role', 'presentation');

            const roletype = new Roletype(node);
            const children = await roletype.computed.children();
            const DOMnodes = node.querySelectorAll("input");

            chai.expect(children).to.have.length(1);
        });

        it('should skip hidden elements', async () => {
            node.innerHTML = `
                <input type='text' value='3' hidden />
            `;

            const roletype = new Roletype(node);
            const children = await roletype.computed.children();
            const DOMnodes = node.querySelectorAll(":scope > *");

            chai.expect(children).to.have.length(0);
        });
    });
};