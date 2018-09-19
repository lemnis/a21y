/// <reference path="../../../../node_modules/@types/chai/index.d.ts" />
import Roletype from "./../../../../src/role/Roletype";

export default () => {
	describe('with div element', () => {

		let node: HTMLDivElement;

		beforeEach(() => {
			node = document.createElement('div');
			node.id = 'test';
			node.innerHTML = 'foo';
			document.body.appendChild(node);
		});

		afterEach(() => {
			document.body.removeChild(node);
		});

		it('with element linked inside aria-labelledby - 596', async () => {
			node.setAttribute('aria-labelledby', 'ID1');

			const labelledbyNode = document.createElement('span');
			labelledbyNode.id = 'ID1';
			labelledbyNode.innerHTML = 'bar';
			document.body.appendChild(labelledbyNode);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(labelledbyNode);
			chai.expect(name).to.equal('bar');
		});

		it('with aria-label - 597', async () => {
			node.setAttribute('aria-label', 'Tag');

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			chai.expect(name).to.equal('Tag');
		});

		it('with aria-label & aria-labelledby - 598', async () => {
			node.setAttribute('aria-labelledby', 'ID1');
			node.setAttribute('aria-label', 'Tag');

			const labelledbyNode = document.createElement('span');
			labelledbyNode.id = 'ID1';
			labelledbyNode.innerHTML = 'bar';
			document.body.appendChild(labelledbyNode);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(labelledbyNode);
			chai.expect(name).to.equal('bar');
		});

		it('with aria-label & multiple elements linked inside aria-labelledby - 599', async () => {
			node.setAttribute('aria-labelledby', 'ID0 ID1');
			node.setAttribute('aria-label', 'Tag');

			const labelledbyNode1 = document.createElement('span');
			labelledbyNode1.id = 'ID0';
			labelledbyNode1.innerHTML = 'bar';
			document.body.appendChild(labelledbyNode1);

			const labelledbyNode2 = document.createElement('span');
			labelledbyNode2.id = 'ID1';
			labelledbyNode2.innerHTML = 'baz';
			document.body.appendChild(labelledbyNode2);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(labelledbyNode1);
			document.body.removeChild(labelledbyNode2);
			chai.expect(name).to.equal('bar baz');
		});

		it('with inline content - 600', async () => {
			node.innerHTML = 'Div with text';

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			chai.expect(name).to.equal(null);
		});

		it('as role button and inline content - 601', async () => {
			node.setAttribute('role', 'button');
			node.innerHTML = 'foo';

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			chai.expect(name).to.equal('foo');
		});

		it('as role button with title - 602', async () => {
			node.setAttribute('role', 'button');
			node.title = 'Tag';
			node.setAttribute("style", "outline:medium solid black; width:2em; height:1em;");

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			chai.expect(name).to.equal('Tag');
		});
	});
};