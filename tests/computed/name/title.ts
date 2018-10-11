/// <reference path='../../../node_modules/@types/chai/index.d.ts' />
import Roletype from './../../../src/role/Roletype';

export default () => {
	describe('title', () => {
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
        
        it('with input as checkbox', async () => {
            node.title = 'foo';

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();
            
			chai.expect(name).to.equal('foo');
		});	
		
        it('with input as file', async () => {
			node.title = 'foo';
			node.type = 'file';

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();
            
			chai.expect(name).to.equal('foo');
        });
    });
};