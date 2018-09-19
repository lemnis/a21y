/// <reference path="../../../../node_modules/@types/chai/index.d.ts" />
import Roletype from "./../../../../src/role/Roletype";

export default () => {
	describe('with a element', () => {

		let node: HTMLAnchorElement;

		beforeEach(() => {
			node = document.createElement("a");
			node.id = "test";
			node.innerHTML = "bar";
			node.href = '#';
			document.body.appendChild(node);
		});

		afterEach(() => {
			document.body.removeChild(node);
		});

		it('with aria-labelledby - 603', async () => {
			node.setAttribute('aria-labelledby', 'ID1');
			node.innerHTML = 'ABC';

			var labelledbyNode = document.createElement('span');
			labelledbyNode.id = 'ID1';
			labelledbyNode.innerHTML = 'foo';
			document.body.appendChild(labelledbyNode);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(labelledbyNode);
			chai.expect(name).to.equal('foo');
		});

		it('with aria-label - 604', async () => {
			node.setAttribute('aria-label', 'Tag');

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			chai.expect(name).to.equal('Tag');
		});

		it('with aria-label & aria-labelledby - 605', async () => {
			node.setAttribute('aria-label', 'Tag');
			node.setAttribute('aria-labelledby', 'ID1');
			node.innerHTML = 'foo';

			var labelledbyNode = document.createElement('p');
			labelledbyNode.id = 'ID1';
			labelledbyNode.innerHTML = 'bar';
			document.body.appendChild(labelledbyNode);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(labelledbyNode);
			chai.expect(name).to.equal('bar');
		});

		it('with aria-label & linked to its self & external element to aria-labelledby - 606', async () => {
			node.setAttribute('aria-label', 'Tag');
			node.setAttribute('aria-labelledby', 'test ID1');
			node.innerHTML = '';

			var labelledbyNode = document.createElement('p');
			labelledbyNode.id = 'ID1';
			labelledbyNode.innerHTML = 'foo';
			document.body.appendChild(labelledbyNode);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(labelledbyNode);
			chai.expect(name).to.equal('Tag foo');
		});

		it('with inner content - 607', async () => {
			node.innerHTML = 'ABC';

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();
			chai.expect(name).to.equal('ABC');
		});

		it('with title - 608', async () => {
			node.title = 'Tag';
			node.innerHTML = '';

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();
			chai.expect(name).to.equal('Tag');
		});
	});
}