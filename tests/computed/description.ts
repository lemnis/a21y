/// <reference path='../../node_modules/@types/chai/index.d.ts' />
import Roletype from './../../src/role/Roletype';

export default () => {
	describe('description', () => {
		let node: HTMLDivElement;

		beforeEach(() => {
			node = document.createElement('div');
			node.innerHTML = 'foo';
			document.body.appendChild(node);
		});

		afterEach(() => {
			document.body.removeChild(node);
		});

		it('1.0 combobox-focusable', async () => {
			node.setAttribute('role', 'combobox');
			node.tabIndex = 0;
			node.title = 'Choose your language.';

			const roletype = new Roletype(node);
			const description = await roletype.computed.description();
			chai.expect(description).to.equal(null);
		});

		it(' from content of describedby element', async () => {
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

			const roletype = new Roletype(node);
			const description = await roletype.computed.description();

			document.body.removeChild(descElement);
			console.log(Array.from(roletype.describedBy));

			chai.expect(description).to.equal('My name is Eli the weird. (QED) Where are my marbles?');
		});
	});
}