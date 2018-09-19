/// <reference path="../../../../node_modules/@types/chai/index.d.ts" />
import Roletype from './../../../../src/role/Roletype';

export default () => {
	describe('with img element', () => {

		let node;

		beforeEach(() => {
			node = document.createElement('img');
			node.src = '#';
			node.id = 'test';
			document.body.appendChild(node);
		});

		afterEach(() => {
			document.body.removeChild(node);
		});

		it('with aria-label - 556', async () => {
			node.setAttribute('aria-label', '1');

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			chai.expect(name).to.equal('1');
		});

		it('with aria-label, alt and title - 557', async () => {
			node.setAttribute('aria-label', '1');
			node.alt = 'a';
			node.title = 't';

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();
			
			chai.expect(name).to.equal('1');
		});

		it('with aria-labelledby - 558', async () => {
			node.setAttribute('aria-labelledby', 'test');
			node.id = null;

			let labelledbyNode = document.createElement('input');
			labelledbyNode.id = 'test';
			labelledbyNode.value = 'peanuts';
			labelledbyNode.type = 'text';
			document.body.appendChild(labelledbyNode);

			const roletype = new Roletype(labelledbyNode);
			const name = await roletype.computed.name();
			
			document.body.removeChild(labelledbyNode);
			
			chai.expect(name).to.equal(null);
		});

		it('with aria-labelledby to its own element - 559', async () => {
			node.setAttribute('aria-labelledby', 'test');

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();
			
			chai.expect(name).to.equal(null);
		});

		it('with aria-labelledby & aria-label - 560', async () => {
			node.setAttribute('aria-labelledby', 'test');
			node.setAttribute('aria-label', '1');
			node.id = null;

			let labelledbyNode = document.createElement('input');
			labelledbyNode.type = 'text';
			labelledbyNode.value = 'peanuts';
			labelledbyNode.id = 'test';
			document.body.appendChild(labelledbyNode);
			
			const roletype = new Roletype(labelledbyNode);
			const name = await roletype.computed.name();

			document.body.removeChild(labelledbyNode);
			chai.expect(name).to.equal(null);
		});

		it('with own element linked inside aria-labelledby - 561', async () => {
			node.setAttribute('aria-labelledby', 'test');
			node.setAttribute('aria-label', '1');

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();
			chai.expect(name).to.equal('1');
		});

		it('with multiple elements linked inside aria-labelledby - 562', async () => {
			node.setAttribute('aria-labelledby', 'ID1 ID2 ID3');

			let labelledbyNode1 = document.createElement('input');
			labelledbyNode1.type = 'text';
			labelledbyNode1.value = 'peanuts';
			labelledbyNode1.id = 'ID1';
			document.body.appendChild(labelledbyNode1);

			let labelledbyNode2 = document.createElement('input');
			labelledbyNode2.type = 'text';
			labelledbyNode2.value = 'popcorn';
			labelledbyNode2.id = 'ID2';
			document.body.appendChild(labelledbyNode2);

			let labelledbyNode3 = document.createElement('input');
			labelledbyNode3.type = 'text';
			labelledbyNode3.value = 'apple jacks';
			labelledbyNode3.id = 'ID3';
			document.body.appendChild(labelledbyNode3);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();
		
			document.body.removeChild(labelledbyNode1);
			document.body.removeChild(labelledbyNode2);
			document.body.removeChild(labelledbyNode3);

			chai.expect(name).to.equal('peanuts popcorn apple jacks');
		});

		it('with own element & external linked element inside aria-labelledby - 563', async () => {
			node.setAttribute('aria-labelledby', 'test ID1');
			node.setAttribute('aria-label', '1');

			let labelledbyNode = document.createElement('input');
			labelledbyNode.type = 'text';
			labelledbyNode.value = 'peanuts';
			labelledbyNode.id = 'ID1';
			document.body.appendChild(labelledbyNode);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(labelledbyNode);
			chai.expect(name).to.equal('1 peanuts');
		});

		it('with own element & multiple external linked element inside aria-labelledby - 564', async () => {
			node.setAttribute('aria-labelledby', 'test ID1 ID2');
			node.setAttribute('aria-label', '1');

			let labelledbyNode1 = document.createElement('input');
			labelledbyNode1.type = 'text';
			labelledbyNode1.value = 'peanuts';
			labelledbyNode1.id = 'ID1';
			document.body.appendChild(labelledbyNode1);

			let labelledbyNode2 = document.createElement('input');
			labelledbyNode2.type = 'text';
			labelledbyNode2.value = 'popcorn';
			labelledbyNode2.id = 'ID2';
			document.body.appendChild(labelledbyNode2);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();
		
			document.body.removeChild(labelledbyNode1);
			document.body.removeChild(labelledbyNode2);
			
			chai.expect(name).to.equal('1 peanuts popcorn');
		});

		it('with alt, title, aria-label on own element and own element & external linked elements inside aria-labelledby - 565', async () => {
			node.setAttribute('aria-labelledby', 'test ID1 ID2 ID3');
			node.setAttribute('aria-label', '1');
			node.alt = 'a';
			node.title = 't';

			let labelledbyNode1 = document.createElement('input');
			labelledbyNode1.type = 'text';
			labelledbyNode1.value = 'peanuts';
			labelledbyNode1.id = 'ID1';
			document.body.appendChild(labelledbyNode1);

			let labelledbyNode2 = document.createElement('input');
			labelledbyNode2.type = 'text';
			labelledbyNode2.value = 'popcorn';
			labelledbyNode2.id = 'ID2';
			document.body.appendChild(labelledbyNode2);

			let labelledbyNode3 = document.createElement('input');
			labelledbyNode3.type = 'text';
			labelledbyNode3.value = 'apple jacks';
			labelledbyNode3.id = 'ID3';
			document.body.appendChild(labelledbyNode3);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();
		
			document.body.removeChild(labelledbyNode1);
			document.body.removeChild(labelledbyNode2);
			document.body.removeChild(labelledbyNode3);

			chai.expect(name).to.equal('1 peanuts popcorn apple jacks');
		});

		it('with title and own element & external linked elements inside aria-labelledby - 566', async () => {
			node.setAttribute('aria-labelledby', 'test ID1 ID2 ID3');
			node.setAttribute('aria-label', '');
			node.alt = '';
			node.title = 't';

			let labelledbyNode1 = document.createElement('input');
			labelledbyNode1.type = 'text';
			labelledbyNode1.value = 'peanuts';
			labelledbyNode1.id = 'ID1';
			document.body.appendChild(labelledbyNode1);

			let labelledbyNode2 = document.createElement('input');
			labelledbyNode2.type = 'text';
			labelledbyNode2.value = 'popcorn';
			labelledbyNode2.id = 'ID2';
			document.body.appendChild(labelledbyNode2);

			let labelledbyNode3 = document.createElement('input');
			labelledbyNode3.type = 'text';
			labelledbyNode3.value = 'apple jacks';
			labelledbyNode3.id = 'ID3';
			document.body.appendChild(labelledbyNode3);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();
		
			document.body.removeChild(labelledbyNode1);
			document.body.removeChild(labelledbyNode2);
			document.body.removeChild(labelledbyNode3);

			chai.expect(name).to.equal('t peanuts popcorn apple jacks');
		});
	});
};