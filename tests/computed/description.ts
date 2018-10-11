/// <reference path='../../node_modules/@types/chai/index.d.ts' />
import Roletype from './../../src/role/Roletype';

export default () => {
	describe('description', () => {
		let node: HTMLElement;

		beforeEach(() => {
			node = document.createElement('div');
			node.innerHTML = 'foo';
			document.body.appendChild(node);
		});

		afterEach(() => {
			document.body.removeChild(node);
		});

		it('1.0 combobox focusable', async () => {
			node.setAttribute('role', 'combobox');
			node.tabIndex = 0;
			node.title = 'Choose your language.';

			const roletype = new Roletype(node);
			const description = await roletype.computed.description();
			chai.expect(description).to.equal(null);
		});

		it('from content of describedby element', async () => {
			node.setAttribute('aria-label', 'Important stuff');
			node.setAttribute('aria-describedby', 'ID1');

			const descElement = document.createElement('div');
			descElement.id = 'ID1';
			descElement.innerHTML = `
				<span aria-hidden="true"><i> Hello, </i></span>
				<span>My</span> name is
				<div><img src="#" title="Bryan" alt="" role="presentation" /></div>
				<span role="presentation" aria-label="Eli">
					<span aria-label="Garaventa">Zambino</span>
				</span>
				<span>the weird.</span>
				(QED)
				<span class="hidden"><i><b>and don't you forget it.</b></i></span>
				<table>
					<tr>
						<td>Where</td>
						<td style="visibility:hidden;"><div>in</div></td>
						<td><div style="display:none;">the world</div></td>
						<td>are my marbles?</td>
					</tr>
				</table>
			`;
			document.body.appendChild(descElement);

			const style = document.createElement('style');
			style.innerHTML = `.hidden { display: none; }`;
			document.head.appendChild(style);

			const roletype = new Roletype(node);
			const description = await roletype.computed.description();

			document.body.removeChild(descElement);
			document.head.removeChild(style);

			chai.expect(description).to.equal('My name is Eli the weird. (QED) Where are my marbles?');
		});

		it('with label', async () => {
			document.body.removeChild(node);

			node = document.createElement('a');
			(node as HTMLAnchorElement).href = '#';
			node.title = 'San Francisco';
			node.setAttribute('aria-label', 'California');
			node.innerHTML = 'United States';
			document.body.appendChild(node);

			const roletype = new Roletype(node);
			const description = await roletype.computed.description();

			chai.expect(description).to.equal('San Francisco');
		});

		it('with alt, title and label - 557', async () => {
			document.body.removeChild(node);

			node = document.createElement('img');
			(node as HTMLImageElement).src = '#';
			(node as HTMLImageElement).alt = 'a';
			node.title = 't';
			node.setAttribute('aria-label', '1');
			document.body.appendChild(node);

			const roletype = new Roletype(node);
			const description = await roletype.computed.description();

			chai.expect(description).to.equal('t');
		});

		it('with reference - 664', async () => {
			document.body.removeChild(node);

			node = document.createElement('img');
			(node as HTMLImageElement).src = '#';
			node.setAttribute('aria-describedby', 'ID1');
			document.body.appendChild(node);

			const descElement = document.createElement('div');
			descElement.id = 'ID1';
			descElement.innerHTML = `foo`;
			document.body.appendChild(descElement);

			const roletype = new Roletype(node);
			const description = await roletype.computed.description();

			document.body.removeChild(descElement);

			chai.expect(description).to.equal('foo');
		});

		it('with hidden reference - 665', async () => {
			document.body.removeChild(node);

			node = document.createElement('img');
			(node as HTMLImageElement).src = '#';
			node.setAttribute('aria-describedby', 'ID1');
			document.body.appendChild(node);

			const descElement = document.createElement('div');
			descElement.id = 'ID1';
			descElement.innerHTML = `foo`;
			descElement.style.display = 'none';
			document.body.appendChild(descElement);

			const roletype = new Roletype(node);
			const description = await roletype.computed.description();

			document.body.removeChild(descElement);

			chai.expect(description).to.equal('foo');
		});

		it('with presentational reference - 666', async () => {
			document.body.removeChild(node);

			node = document.createElement('img');
			(node as HTMLImageElement).src = '#';
			node.setAttribute('aria-describedby', 'ID1');
			document.body.appendChild(node);

			const descElement = document.createElement('div');
			descElement.id = 'ID1';
			descElement.innerHTML = `foo`;
			descElement.setAttribute('role', 'presentation');
			document.body.appendChild(descElement);

			const roletype = new Roletype(node);
			const description = await roletype.computed.description();

			document.body.removeChild(descElement);

			chai.expect(description).to.equal('foo');
		});

		it('with alt and reference - 772', async () => {
			document.body.removeChild(node);

			node = document.createElement('img');
			(node as HTMLImageElement).src = '#';
			(node as HTMLImageElement).alt = 'test';
			node.setAttribute('aria-describedby', 't1');
			document.body.appendChild(node);

			const descElement = document.createElement('div');
			descElement.id = 't1';
			descElement.innerHTML = `foo`;
			document.body.appendChild(descElement);

			const roletype = new Roletype(node);
			const description = await roletype.computed.description();

			document.body.removeChild(descElement);

			chai.expect(description).to.equal('foo');
		});

		it('with alt and hidden reference - 773', async () => {
			document.body.removeChild(node);

			node = document.createElement('img');
			(node as HTMLImageElement).alt = 'test';
			(node as HTMLImageElement).src = '#';
			node.setAttribute('aria-describedby', 'ID1');
			document.body.appendChild(node);

			const descElement = document.createElement('div');
			descElement.id = 'ID1';
			descElement.innerHTML = `foo`;
			descElement.style.display = 'none';
			document.body.appendChild(descElement);

			const roletype = new Roletype(node);
			const description = await roletype.computed.description();

			document.body.removeChild(descElement);

			chai.expect(description).to.equal('foo');
		});

		it('with alt and presentational reference - 774', async () => {
			document.body.removeChild(node);

			node = document.createElement('img');
			(node as HTMLImageElement).alt = 'test';
			(node as HTMLImageElement).src = '#';
			node.setAttribute('aria-describedby', 'ID1');
			document.body.appendChild(node);

			const descElement = document.createElement('div');
			descElement.id = 'ID1';
			descElement.innerHTML = `foo`;
			descElement.style.display = 'none';
			document.body.appendChild(descElement);

			const roletype = new Roletype(node);
			const description = await roletype.computed.description();

			document.body.removeChild(descElement);

			chai.expect(description).to.equal('foo');
		});

		it('with alt and visually hidden reference - 838', async () => {
			document.body.removeChild(node);

			node = document.createElement('img');
			(node as HTMLImageElement).alt = 'test';
			(node as HTMLImageElement).src = '#';
			node.setAttribute('aria-describedby', 'ID1');
			document.body.appendChild(node);

			const descElement = document.createElement('div');
			descElement.id = 'ID1';
			descElement.innerHTML = `foo`;
			descElement.style.visibility = 'hidden';
			document.body.appendChild(descElement);

			const roletype = new Roletype(node);
			const description = await roletype.computed.description();

			document.body.removeChild(descElement);

			chai.expect(description).to.equal('foo');
		});

		it('with broken reference', async () => {
			document.body.removeChild(node);

			node = document.createElement('img');
			(node as HTMLImageElement).alt = 'test';
			(node as HTMLImageElement).src = '#';
			node.setAttribute('aria-describedby', 't1');
			document.body.appendChild(node);

			const roletype = new Roletype(node);
			const description = await roletype.computed.description();

			chai.expect(description).to.equal(null);
		});

		it('with one valid reference', async () => {
			document.body.removeChild(node);

			node = document.createElement('img');
			(node as HTMLImageElement).alt = 'test';
			(node as HTMLImageElement).src = '#';
			node.setAttribute('aria-describedby', 't1 t2 t3');
			document.body.appendChild(node);

			const descElement = document.createElement('div');
			descElement.id = 't2';
			descElement.innerHTML = `foo`;
			document.body.appendChild(descElement);

			const roletype = new Roletype(node);
			const description = await roletype.computed.description();

			document.body.removeChild(descElement);

			chai.expect(description).to.equal('foo');
		});

		it('with title and reference', async () => {
			document.body.removeChild(node);

			node = document.createElement('input');
			node.title = 'Title';
			node.setAttribute('aria-label', 'Name');
			node.setAttribute('aria-describedby', 'ID1');
			document.body.appendChild(node);

			const descElement = document.createElement('div');
			descElement.id = 'ID1';
			descElement.innerHTML = `Description`;
			document.body.appendChild(descElement);

			const roletype = new Roletype(node);
			const description = await roletype.computed.description();

			document.body.removeChild(descElement);

			chai.expect(description).to.equal('Description');
		});
	});
}