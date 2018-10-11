/// <reference path='../../node_modules/@types/chai/index.d.ts' />
import Roletype from './../../src/role/Roletype';

export default () => {
	describe('hidden', () => {
		let node: HTMLDivElement;

		beforeEach(() => {
			node = document.createElement('div');
			node.innerHTML = 'foo';
			document.body.appendChild(node);
		});

		afterEach(() => {
			document.body.removeChild(node);
		});

		it('should be hidden with a hidden attribute', async () => {
			node.setAttribute('hidden', '');

			const roletype = new Roletype(node);
			const hidden = roletype.computed.hidden();

			chai.expect(hidden).to.be.true;
		});

		it('should be hidden with a display set to none within', async () => {
			node.style.display = 'none';

			const roletype = new Roletype(node);
			const hidden = roletype.computed.hidden();

			chai.expect(hidden).to.be.true;
		});

		it('should be hidden with a visibility set to hidden within css', async () => {
			node.style.visibility = 'hidden';

			const roletype = new Roletype(node);
			const hidden = roletype.computed.hidden();

			chai.expect(hidden).to.be.true;
		});

		it('should be hidden with a aria-hidden set true', async () => {
			node.setAttribute('aria-hidden', 'true');

			const roletype = new Roletype(node);
			const hidden = roletype.computed.hidden();

			chai.expect(hidden).to.be.true;
		});

		it('should be exposed with a aria-hidden set false', async () => {
			node.setAttribute('aria-hidden', 'false');

			const roletype = new Roletype(node);
			const hidden = roletype.computed.hidden();

			chai.expect(hidden).to.be.false;
		});

		it('should be exposed with a incorrect aria-hidden value', async () => {
			node.setAttribute('aria-hidden', 'fake');

			const roletype = new Roletype(node);
			const hidden = roletype.computed.hidden();

			chai.expect(hidden).to.be.false;
		});

		it('should be hidden with a incorrect aria-hidden value and display set to none within css', async () => {
			node.setAttribute('aria-hidden', 'fake');
			node.style.display = 'none';

			const roletype = new Roletype(node);
			const hidden = roletype.computed.hidden();

			chai.expect(hidden).to.be.true;
		});

		it('should be hidden with a aria-hidden set false and display set to none within css', async () => {
			node.setAttribute('aria-hidden', 'false');
			node.style.display = 'none';

			const roletype = new Roletype(node);
			const hidden = roletype.computed.hidden();

			chai.expect(hidden).to.be.true;
		});

		it('should be exposed with css who hides the element contents', async () => {
			node.style.width = '0';
			node.style.height = '0';
			node.style.overflow = 'hidden';

			const roletype = new Roletype(node);
			const hidden = roletype.computed.hidden();

			chai.expect(hidden).to.be.false;
		});

		it('should be exposed with negative text-indent with as result the text is not painted on the screen', async () => {
			node.style.textIndent = '-1000px';

			const roletype = new Roletype(node);
			const hidden = roletype.computed.hidden();

			chai.expect(hidden).to.be.false;
		});

		it('should be exposed with a css clip with as result the text is not painted on the screen', async () => {
			node.style.clip = 'rect(1px, 1px, 1px, 1px);';
			node.style.position = 'absolute';

			const roletype = new Roletype(node);
			const hidden = roletype.computed.hidden();

			chai.expect(hidden).to.be.false;
		});

		it('should be exposed with negative position with as result the text is not painted on the screen', async () => {
			node.style.left = '-9999px';
			node.style.position = 'absolute';

			const roletype = new Roletype(node);
			const hidden = roletype.computed.hidden();

			chai.expect(hidden).to.be.false;
		});
	});
}