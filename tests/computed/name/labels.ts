/// <reference path='../../../node_modules/@types/chai/index.d.ts' />
import Roletype from './../../../src/role/Roletype';

export default () => {
	describe('labels', () => {
		let node: HTMLInputElement;

		beforeEach(() => {
			node = document.createElement('input');
			node.id = 'test';
            node.type = 'checkbox';
			document.body.appendChild(node);
		});

		afterEach(() => {
			// document.body.removeChild(node);
        });
        
        it('multiple', async () => {  
            const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `a test`;
            
            const wrappedLabel = document.createElement('label');
            const beginText = document.createTextNode('This ');
            const endText = document.createTextNode(' is');
            
            wrappedLabel.appendChild(beginText);
            wrappedLabel.appendChild(node);
            wrappedLabel.appendChild(endText);

            document.body.appendChild(wrappedLabel);
            document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

            document.body.removeChild(wrappedLabel);
            document.body.removeChild(label);
            
			chai.expect(name).to.equal('This is a test');
        });		
        
        it('multiple - alternative', async () => {  
            const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = `a test`;
            
            const wrappedLabel = document.createElement('label');
            const beginText = document.createTextNode('This ');
            const endText = document.createTextNode(' is');
            
            wrappedLabel.appendChild(beginText);
            wrappedLabel.appendChild(node);
            wrappedLabel.appendChild(endText);

            document.body.appendChild(label);
            document.body.appendChild(wrappedLabel);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

			document.body.removeChild(label);
            document.body.removeChild(wrappedLabel);
            
			chai.expect(name).to.equal('a test This is');
        });
        
        it('inline block elements', async () => {
            (node as HTMLInputElement).type = 'file';

            const label = document.createElement('label');
			label.setAttribute('for', 'test');
            label.innerHTML = `
                W<i>h<b>a</b></i>t<br>
                is
                <div>
                    your
                    <div>name<b>?</b></div>
                </div>
            `;

            document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

            document.body.removeChild(label);
            document.body.removeChild(node);
            
			chai.expect(name).to.equal('What is your name?');
        });
        
        it('inline block elements', async () => {
            (node as HTMLInputElement).type = 'file';

            const label = document.createElement('label');
			label.setAttribute('for', 'test');
            label.innerHTML = `
                W<i>h<b>a</b></i>t<br>
                is
                <div>
                    your
                    <div>name<b>?</b></div>
                </div>
            `;

            document.body.appendChild(label);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();

            document.body.removeChild(label);
            document.body.removeChild(node);
            
			chai.expect(name).to.equal('What is your name?');
        });

		it('inline block styles', async () => {
            (node as HTMLInputElement).type = 'file';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
			label.innerHTML = 'is a test';

			const style = document.createElement('style');
            style.innerHTML = `
                label:before { content: "This"; display: block; }
                label:after { content: "."; }
            `;

			document.body.appendChild(label);
			document.head.appendChild(style);

			const roletype = new Roletype(node);
			const name = await roletype.computed.name();
            
			document.head.removeChild(style);
            document.body.removeChild(label);
            document.body.removeChild(node);

			chai.expect(name).to.equal('This is a test.');
		});

		it('hidden elements', async () => {
            (node as HTMLInputElement).type = 'file';

			const label = document.createElement('label');
			label.setAttribute('for', 'test');
            label.innerHTML = `
                <span class="hidden">1</span><span>2</span>
                <span style="visibility: hidden;">3</span><span>4</span>
                <span hidden>5</span><span>6</span>
                <span aria-hidden="true">7</span><span>8</span>
                <span aria-hidden="false" class="hidden">9</span><span>10</span>
            `;

			const style = document.createElement('style');
            style.innerHTML = `.hidden { display: none; }`;

			document.body.appendChild(label);
			document.head.appendChild(style);

			const roletype = new Roletype(node);
            const name = await roletype.computed.name();

			document.head.removeChild(style);
            document.body.removeChild(label);
            document.body.removeChild(node);

			chai.expect(name).to.equal('2 4 6 8 10');
		});
    });
};