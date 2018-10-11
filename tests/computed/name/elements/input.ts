/// <reference path="../../../../node_modules/@types/chai/index.d.ts" />
import Roletype from './../../../../src/role/Roletype';

export default () => {
	describe('with input element', () => {

		let node: HTMLInputElement;

		beforeEach(() => {
			node = document.createElement('input');
			node.id = 'test';
			node.type = 'text';
			document.body.appendChild(node);
		});

		afterEach(() => {
			document.body.removeChild(node);
		});

		it('with aria-label - 539', async () => {
			node.type = 'button';
			node.setAttribute('aria-label', 'Rich');

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			chai.expect(name).to.equal('Rich');
		});

		it('with aria-labelledby - 540', async () => {
			node.type = "button";
			node.setAttribute('aria-labelledby', 'ID1');

			let labelledbyNode = document.createElement('div');
			labelledbyNode.id = 'ID1';
			labelledbyNode.innerHTML = 'Rich\'s button';
			document.body.appendChild(labelledbyNode);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();
			
			document.body.removeChild(labelledbyNode);
			chai.expect(name).to.equal('Rich\'s button');
		});

		it('with aria-labelledby & aria-label - 541', async () => {
			node.type = "button";
			node.setAttribute('aria-labelledby', 'ID1');
			node.setAttribute('aria-label', 'Rich');

			let labelledbyNode = document.createElement('div');
			labelledbyNode.id = 'ID1';
			labelledbyNode.innerHTML = 'Rich\'s button';
			document.body.appendChild(labelledbyNode);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(labelledbyNode);
			chai.expect(name).to.equal('Rich\'s button');
		});

		it('as type reset - 543', async () => {
			node.type = 'reset';

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			chai.expect(name).to.equal('Reset');
		});

		it('as type button - 544', async () => {
			node.type = "button";
			node.value = 'foo';

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			chai.expect(name).to.equal('foo');
		});

		it('as type image - 545', async () => {
			node.type = 'image';
			node.alt = 'foo';
			node.src = '#';

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			chai.expect(name).to.equal('foo');
		});

		it('with native linked label element - 546', async () => {
			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'States:';
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('States:');
		});
		
		it('with native linked label element - 611', async () => {

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'foo';
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('foo');
		});
		
		it('as password field with native linked label element - 612', async () => {
			node.type = 'password';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'foo';
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('foo');
		});

		it('as checkbox field with native linked label element - 613', async () => {
			node.type = 'checkbox';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'foo';
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('foo');
		});

		it('as radio field with native linked label element - 614', async () => {
			node.type = 'radio';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'foo';
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('foo');
		});

		it('as file input with native linked label element - 615', async () => {
			node.type = 'file';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'foo';
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('foo');
		});

		it('as img input with native linked label element - 616', async () => {
			node.type = 'img';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'foo';
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('foo');
		});

		it('as checkbox input with native linked label element - 617', async () => {
			node.type = 'checkbox';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'foo<input type="text" value="bar">baz';
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('foo bar baz');
		});

		it('with native linked label element with input as child - 618', async () => {

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'foo<input type="text" value="bar">baz';
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('foo bar baz');
		});

		it('as password with native linked label element with input as child - 619', async () => {
			node.type = 'password';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'foo<input type="text" value="bar">baz';
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('foo bar baz');
		});

		it('as radio with native linked label element with input as child - 620', async () => {
			node.type = 'password';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'foo<input type="text" value="bar">baz';
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('foo bar baz');
		});

		it('as file with native linked label element with input as child - 621', async () => {
			node.type = 'file';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'foo<input type="text" value="bar">baz';
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('foo bar baz');
		});

		it('with native linked label element with children - 547', async () => {
			node.value = 'baz';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'foo <input type=\'text\' value=\'David\' />';
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('foo David');
		});

		it('with native linked label element with select element as child - 548', async () => {
			node.value = 'baz';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
				crazy
				<select name='member' size='1' role='menu' tabindex='0'>
					<option role='menuitem' value='beard' selected='true'>clown</option>
					<option role='menuitem' value='scuba'>rich</option>
				</select>
			`;
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('crazy');
		});

		it('with native linked label element with spinbutton[aria-valuetext] as child - 549', async () => {
			node.value = 'baz';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
				crazy
				<div role='spinbutton' aria-valuetext='Monday' aria-valuemin='1'
				aria-valuemax='7' aria-valuenow='4'>
			`;
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('crazy Monday');
		});

		it('with native linked label element with spinbutton[aria-valuenow] as child - 550', async () => {
			node.value = 'baz';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
				crazy
				<div role='spinbutton' aria-valuemin='1' aria-valuemax='7' aria-valuenow='4'>
			`;
			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('crazy 4');
		});

		it('with a title - 551', async () => {
			node.title = 'crazy';
			node.value = 'baz';

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			chai.expect(name).to.equal('crazy');
		});

		it('with native linked label element with pseudo element - 552', async () => {
			node.value = 'baz';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `fruit`;
			document.body.appendChild(label);

			let style = document.createElement('style');
			style.innerHTML = `label:before { content: 'fancy '; }`;
			document.head.appendChild(style);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			document.head.removeChild(style);

			chai.expect(name).to.equal('fancy fruit');
		});

		it('with native linked label element with pseudo element using a attribute as content - 553', async () => {
			node.value = 'baz';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.setAttribute('data-after', 'test content');
			document.body.appendChild(label);
			
			let style = document.createElement('style');
			style.innerHTML = `[data-after]:after { content: attr(data-after); }`;
			document.head.appendChild(style);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			document.head.removeChild(style);
			chai.expect(name).to.equal('test content');
		});

		it('with multiple elements inside aria-labelledby - 609', async () => {
			node.setAttribute('aria-labelledby', 'ID1 ID2 ID3')

			let labelledbyNode1 = document.createElement('p');
			labelledbyNode1.id = 'ID1';
			labelledbyNode1.innerHTML = 'foo';
			document.body.appendChild(labelledbyNode1);

			let labelledbyNode2 = document.createElement('p');
			labelledbyNode2.id = 'ID2';
			labelledbyNode2.innerHTML = 'bar';
			document.body.appendChild(labelledbyNode2);

			let labelledbyNode3 = document.createElement('p');
			labelledbyNode3.id = 'ID3';
			labelledbyNode3.innerHTML = 'baz';
			document.body.appendChild(labelledbyNode3);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(labelledbyNode1);
			document.body.removeChild(labelledbyNode2);
			document.body.removeChild(labelledbyNode3);
			chai.expect(name).to.equal('foo bar baz');
		});

		it('with multiple elements inside aria-labelledby & aria-label - 610', async () => {
			node.setAttribute('aria-labelledby', 'ID1 test')
			node.setAttribute('aria-label', 'bar')

			let labelledbyNode = document.createElement('p');
			labelledbyNode.id = 'ID1';
			labelledbyNode.innerHTML = 'foo';
			document.body.appendChild(labelledbyNode);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(labelledbyNode);
			chai.expect(name).to.equal('foo bar');
		});

		it('inside label with pseudo elements - 659', async () => {
			node.name = 'text';
			node.title = 'bar';

			const form = document.createElement('form');

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.title = 'bar';

			const style = document.createElement('style');
			style.innerHTML = `label:before { content: "foo"; } label:after { content: "baz"; }`;

			document.body.appendChild(form);
			form.appendChild(label);
			label.appendChild(node);
			document.head.appendChild(style);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(form);
			document.body.appendChild(node);
			document.head.removeChild(style);
			chai.expect(name).to.equal('foo bar baz');
		});

		it('as password inside label with pseudo elements - 660', async () => {
			node.name = 'test';
			node.title = 'bar';
			node.type = 'password';

			const form = document.createElement('form');

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.title = "bar";

			const style = document.createElement('style');
			style.innerHTML = `label:before { content: "foo"; } label:after { content: "baz"; }`;

			document.body.appendChild(form);
			form.appendChild(label);
			label.appendChild(node);
			document.head.appendChild(style);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(form);
			document.body.appendChild(node);
			document.head.removeChild(style);
			chai.expect(name).to.equal('foo bar baz');
		});

		it('as checkbox inside label with pseudo elements - 661', async () => {
			node.name = 'test';
			node.title = '  bar ';
			node.type = 'checkbox';

			const form = document.createElement('form');

			const label = document.createElement('label');
			label.setAttribute('for', 'test');

			const style = document.createElement('style');
			style.innerHTML = `label:before { content: "foo"; } label:after { content: "baz"; }`;

			document.body.appendChild(form);
			form.appendChild(label);
			label.appendChild(node);
			document.head.appendChild(style);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(form);
			document.body.appendChild(node);
			document.head.removeChild(style);
			chai.expect(name).to.equal('foo bar baz');
		});

		it('as radio inside label with pseudo elements - 662', async () => {
			node.name = 'test';
			node.title = '  bar ';
			node.type = 'radio';

			const form = document.createElement('form');

			const label = document.createElement('label');
			label.setAttribute('for', 'test');

			const style = document.createElement('style');
			style.innerHTML = `label:before { content: "foo"; } label:after { content: "baz"; }`;

			document.body.appendChild(form);
			form.appendChild(label);
			label.appendChild(node);
			document.head.appendChild(style);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(form);
			document.body.appendChild(node);
			document.head.removeChild(style);
			chai.expect(name).to.equal('foo bar baz');
		});

		it('as radio inside label with pseudo elements - 663a', async () => {
			node.name = 'test';
			node.title = 'bar';
			node.type = 'img';
			node.src = '#';

			const form = document.createElement('form');

			const label = document.createElement('label');
			label.setAttribute('for', 'test');

			const style = document.createElement('style');
			style.innerHTML = `label:before { content: "foo"; } label:after { content: "baz"; }`;

			document.body.appendChild(form);
			form.appendChild(label);
			label.appendChild(node);
			document.head.appendChild(style);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(form);
			document.body.appendChild(node);
			document.head.removeChild(style);
			chai.expect(name).to.equal('foo bar baz');
		});

		it('as password with linked label - 721', async () => {
			node.type = 'password';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'States:';

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('States:');
		});

		it('as checkbox with linked label - 723', async () => {
			node.type = 'checkbox';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'States:';

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('States:');
		});

		it('as radio with linked label - 724', async () => {
			node.type = 'radio';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'States:';

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('States:');
		});

		it('as file with linked label - 725', async () => {
			node.type = 'file';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'File:';

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('File:');
		});

		it('as img with linked label - 726', async () => {
			node.type = 'image';
			node.src = '#';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'States:';

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('States:');
		});

		it('as password with linked label - 727', async () => {
			node.type = 'password';
			node.value = 'baz';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'foo <input type="text" value="David"/>';

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('foo David');
		});

		it('as checkbox with linked label - 728', async () => {
			node.type = 'checkbox';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'foo <input type="text" value="David"/>';

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('foo David');
		});

		it('as radio with linked label - 729', async () => {
			node.type = 'radio';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'foo <input type="text" value="David"/>';

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('foo David');
		});

		it('as file with linked label - 730', async () => {
			node.type = 'file';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'foo <input type="text" value="David"/>';

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('foo David');
		});

		it('as image with linked label - 731', async () => {
			node.type = 'image';
			node.src = '#';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'foo <input type="text" value="David"/>';

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('foo David');
		});

		it('as password with linked label who has a select element as child - 733', async () => {
			node.type = 'password';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
				crazy
				<select name="member" size="1" role="menu" tabindex="0">
					<option role="menuitem" value="beard" selected="true">clown</option>
					<option role="menuitem" value="scuba">rich</option>
				</select>			
			`;

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('crazy');
		});

		it('as checkbox with linked label who has a select element as child - 734', async () => {
			node.type = 'checkbox';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
				crazy
				<select name="member" size="1" role="menu" tabindex="0">
					<option role="menuitem" value="beard" selected="true">clown</option>
					<option role="menuitem" value="scuba">rich</option>
				</select>			
			`;

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('crazy');
		});

		it('as radio with linked label who has a select element as child - 735', async () => {
			node.type = 'radio';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
				crazy
				<select name="member" size="1" role="menu" tabindex="0">
					<option role="menuitem" value="beard" selected="true">clown</option>
					<option role="menuitem" value="scuba">rich</option>
				</select>			
			`;

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('crazy');
		});

		it('as file with linked label who has a select element as child - 736', async () => {
			node.type = 'file';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
				crazy
				<select name="member" size="1" role="menu" tabindex="0">
					<option role="menuitem" value="beard" selected="true">clown</option>
					<option role="menuitem" value="scuba">rich</option>
				</select>			
			`;

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('crazy');
		});

		it('as image with linked label who has a select element as child - 737', async () => {
			node.type = 'image';
			node.src = '#';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
				crazy
				<select name="member" size="1" role="menu" tabindex="0">
					<option role="menuitem" value="beard" selected="true">clown</option>
					<option role="menuitem" value="scuba">rich</option>
				</select>			
			`;

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('crazy');
		});

		it('as password with linked label who has a spinbutton as child - 738', async () => {
			node.type = 'password';
			node.value = 'baz';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
				crazy
				<div role="spinbutton" aria-valuetext="Monday" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">		
			`;

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('crazy Monday');
		});

		it('as checkbox with linked label who has a spinbutton as child - 739', async () => {
			node.type = 'checkbox';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
				crazy
				<div role="spinbutton" aria-valuetext="Monday" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">		
			`;

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('crazy Monday');
		});

		it('as radio with linked label who has a spinbutton as child - 740', async () => {
			node.type = 'radio';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
				crazy
				<div role="spinbutton" aria-valuetext="Monday" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">		
			`;

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('crazy Monday');
		});

		it('as file with linked label who has a spinbutton as child - 741', async () => {
			node.type = 'file';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
				crazy
				<div role="spinbutton" aria-valuetext="Monday" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">		
			`;

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('crazy Monday');
		});

		it('as image with linked label who has a spinbutton as child - 742', async () => {
			node.type = 'image';
			node.src = '#';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
				crazy
				<div role="spinbutton" aria-valuetext="Monday" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">		
			`;

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('crazy Monday');
		});

		it('as password with linked label who has a spinbutton as child - 743', async () => {
			node.type = 'password';
			node.value = 'baz';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
				crazy
				<div role="spinbutton" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">		
			`;

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('crazy 4');
		});

		it('as checkbox with linked label who has a spinbutton as child - 744', async () => {
			node.type = 'checkbox';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
				crazy
				<div role="spinbutton" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">		
			`;

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('crazy 4');
		});

		it('as radio with linked label who has a spinbutton as child - 745', async () => {
			node.type = 'radio';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
				crazy
				<div role="spinbutton" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">		
			`;

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('crazy 4');
		});

		it('as file with linked label who has a spinbutton as child - 746', async () => {
			node.type = 'file';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
				crazy
				<div role="spinbutton" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">		
			`;

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('crazy 4');
		});

		it('as image with linked label who has a spinbutton as child - 747', async () => {
			node.type = 'image';
			node.src = '#';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `
				crazy
				<div role="spinbutton" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">		
			`;

			document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			chai.expect(name).to.equal('crazy 4');
		});

		it('as password with title - 748', async () => {
			node.type = 'password';
			node.title = 'crazy';
			node.value = 'baz';

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			chai.expect(name).to.equal('crazy');
		});

		it('as checkbox with title - 749', async () => {
			node.type = 'checkbox';
			node.title = 'crazy';

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			chai.expect(name).to.equal('crazy');
		});

		it('as radio with title - 750', async () => {
			node.type = 'radio';
			node.title = 'crazy';

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			chai.expect(name).to.equal('crazy');
		});

		it('as file with title - 751', async () => {
			node.type = 'file';
			node.title = 'crazy';

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			chai.expect(name).to.equal('crazy');
		});

		it('as image with title - 751', async () => {
			node.type = 'image';
			node.title = 'crazy';
			node.src = '#';

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			chai.expect(name).to.equal('crazy');
		});

		it('as password with native linked label element with ::before element - 753', async () => {
			node.type = 'password';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `fruit`;
			document.body.appendChild(label);

			let style = document.createElement('style');
			style.innerHTML = `label:before { content: 'fancy '; }`;
			document.head.appendChild(style);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			document.head.removeChild(style);

			chai.expect(name).to.equal('fancy fruit');
		});

		it('as checkbox with native linked label element with ::before element - 754', async () => {
			node.type = 'checkbox';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `fruit`;
			document.body.appendChild(label);

			let style = document.createElement('style');
			style.innerHTML = `label:before { content: 'fancy '; }`;
			document.head.appendChild(style);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			document.head.removeChild(style);

			chai.expect(name).to.equal('fancy fruit');
		});

		it('as radio with native linked label element with ::before element - 755', async () => {
			node.type = 'radio';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `fruit`;
			document.body.appendChild(label);

			let style = document.createElement('style');
			style.innerHTML = `label:before { content: 'fancy '; }`;
			document.head.appendChild(style);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			document.head.removeChild(style);

			chai.expect(name).to.equal('fancy fruit');
		});

		it('as file with native linked label element with ::before element - 756', async () => {
			node.type = 'file';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `fruit`;
			document.body.appendChild(label);

			let style = document.createElement('style');
			style.innerHTML = `label:before { content: 'fancy '; }`;
			document.head.appendChild(style);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			document.head.removeChild(style);

			chai.expect(name).to.equal('fancy fruit');
		});

		it('as image with native linked label element with ::before element - 757', async () => {
			node.type = 'image';
			node.src = '#';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `fruit`;
			document.body.appendChild(label);

			let style = document.createElement('style');
			style.innerHTML = `label:before { content: 'fancy '; }`;
			document.head.appendChild(style);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			document.head.removeChild(style);

			chai.expect(name).to.equal('fancy fruit');
		});

		it('as password with native linked label element with ::after element - 758', async () => {
			node.type = 'password';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `fancy`;
			document.body.appendChild(label);

			let style = document.createElement('style');
			style.innerHTML = `label:after { content: ' fruit'; }`;
			document.head.appendChild(style);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			document.head.removeChild(style);

			chai.expect(name).to.equal('fancy fruit');
		});

		it('as checkbox with native linked label element with ::after element - 759', async () => {
			node.type = 'checkbox';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `fancy`;
			document.body.appendChild(label);

			let style = document.createElement('style');
			style.innerHTML = `label:after { content: ' fruit'; }`;
			document.head.appendChild(style);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			document.head.removeChild(style);

			chai.expect(name).to.equal('fancy fruit');
		});

		it('as radio with native linked label element with ::after element - 760', async () => {
			node.type = 'radio';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `fancy`;
			document.body.appendChild(label);

			let style = document.createElement('style');
			style.innerHTML = `label:after { content: ' fruit'; }`;
			document.head.appendChild(style);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			document.head.removeChild(style);

			chai.expect(name).to.equal('fancy fruit');
		});

		it('as file with native linked label element with ::after element - 761', async () => {
			node.type = 'file';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `fancy`;
			document.body.appendChild(label);

			let style = document.createElement('style');
			style.innerHTML = `label:after { content: ' fruit'; }`;
			document.head.appendChild(style);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			document.head.removeChild(style);

			chai.expect(name).to.equal('fancy fruit');
		});

		it('as image with native linked label element with ::after element - 762', async () => {
			node.type = 'image';
			node.src = '#';

			let label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `fancy`;
			document.body.appendChild(label);

			let style = document.createElement('style');
			style.innerHTML = `label:after { content: ' fruit'; }`;
			document.head.appendChild(style);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
			document.head.removeChild(style);

			chai.expect(name).to.equal('fancy fruit');
		});
	});
};