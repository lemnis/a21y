/// <reference path='../../node_modules/@types/chai/index.d.ts' />
import Roletype from './../../src/role/Roletype';
import { html, render } from '../../node_modules/lit-html/lit-html';

export default () => {
  describe.only('description', () => {
    let container: HTMLDivElement;
    let style: HTMLStyleElement;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      style = document.createElement('style');
      style.innerHTML = `.hidden { display: none; }`;
      document.head.appendChild(style);
    });

    afterEach(() => {
      document.body.removeChild(container);
      document.head.removeChild(style);
    });

    it('1.0 combobox focusable', async () => {
      const source = html`
        <div id='test' role='combobox' tabindex='0'
        title='Choose your language.'></div>
		  `;
      render(source, container);
      const roletype = new Roletype(container.querySelector('#test'));
      const description = await roletype.computed.description();
      chai.expect(description).to.equal(null);
    });

    it('from content of describedby element', async () => {
      const source = html`
        <div id='test' aria-label='Important stuff' aria-describedby='ID1'></div>
        <div id='ID1'>
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
        </div>
		  `;
      render(source, container);
      const roletype = new Roletype(container.querySelector('#test'));
      const description = await roletype.computed.description();
      chai
        .expect(description)
        .to.equal('My name is Eli the weird. (QED) Where are my marbles?');
    });

    it('with label', async () => {
      const source = html`
        <a id='test' href='#' aria-label='California' title='San Francisco'>
          United States
        </a>
		  `;
      render(source, container);
      const roletype = new Roletype(container.querySelector('#test'));
      const description = await roletype.computed.description();
      chai.expect(description).to.equal('San Francisco');
    });

    it('with alt, title and label - 557', async () => {
      const source = html`
        <img id='test' src='#' alt='a' title='t' aria-label='1' />
		  `;
      render(source, container);
      const roletype = new Roletype(container.querySelector('#test'));
      const description = await roletype.computed.description();
      chai.expect(description).to.equal('t');
    });

    it('with reference - 664', async () => {
      const source = html`
        <img id='test' src='#' aria-describedby='ID1' />
        <div id='ID1'>foo</div>
		  `;
      render(source, container);
      const roletype = new Roletype(container.querySelector('#test'));
      const description = await roletype.computed.description();
      chai.expect(description).to.equal('foo');
    });

    it('with hidden reference - 665', async () => {
      const source = html`
        <img id='test' src='#' aria-describedby='ID1' />
        <div id='ID1' style='display: none'>foo</div>
		  `;
      render(source, container);
      const roletype = new Roletype(container.querySelector('#test'));
      const description = await roletype.computed.description();
      chai.expect(description).to.equal('foo');
    });

    it('with presentational reference - 666', async () => {
      const source = html`
        <img id='test' src='#' aria-describedby='ID1' />
        <div id='ID1' role='presentation'>foo</div>
		  `;
      render(source, container);
      const roletype = new Roletype(container.querySelector('#test'));
      const description = await roletype.computed.description();
      chai.expect(description).to.equal('foo');
    });

    it('with alt and reference - 772', async () => {
      const source = html`
        <img id='test' src='#' alt='test' aria-describedby='t1' />
        <div id='t1'>foo</div>
		  `;
      render(source, container);
      const roletype = new Roletype(container.querySelector('#test'));
      const description = await roletype.computed.description();
      chai.expect(description).to.equal('foo');
    });

    it('with alt and hidden reference - 773', async () => {
      const source = html`
        <img src="#" id="test" alt="test" aria-describedby="t1">
        <div id="t1" style="display:none">foo</div>
		  `;
      render(source, container);
      const roletype = new Roletype(container.querySelector('#test'));
      const description = await roletype.computed.description();
      chai.expect(description).to.equal('foo');
    });

    it('with alt and presentational reference - 774', async () => {
      const source = html`
        <img src="#" id="test" alt="test" aria-describedby="t1">
        <span id="t1" role="presentation">foo</span>
		  `;
      render(source, container);
      const roletype = new Roletype(container.querySelector('#test'));
      const description = await roletype.computed.description();
      chai.expect(description).to.equal('foo');
    });

    it('with alt and visually hidden reference - 838', async () => {
      const source = html`
        <img src="#" id="test" alt="test" aria-describedby="t1">
        <div id="t1" style="visibility:hidden">foo</div>
		  `;
      render(source, container);
      const roletype = new Roletype(container.querySelector('#test'));
      const description = await roletype.computed.description();
      chai.expect(description).to.equal('foo');
    });

    it('with broken reference', async () => {
      const source = html`
        <img src="#" id="test" alt="test" aria-describedby="t1">
		  `;
      render(source, container);
      const roletype = new Roletype(container.querySelector('#test'));
      const description = await roletype.computed.description();
      chai.expect(description).to.equal(null);
    });

    it('with one valid reference', async () => {
      const source = html`
        <img src="#" id="test" alt="test" aria-describedby="t1 t2 t3">
        <div id="t2">foo</div>
		  `;
      render(source, container);
      const roletype = new Roletype(container.querySelector('#test'));
      const description = await roletype.computed.description();
      chai.expect(description).to.equal('foo');
    });

    it('with title and reference', async () => {
      const source = html`
        <div>
          <input aria-label="Name" id="test" title="Title"
            aria-describedby="ID1" type="text">
        </div>
        <div id="ID1">Description</div>
		  `;
      render(source, container);
      const roletype = new Roletype(container.querySelector('#test'));
      const description = await roletype.computed.description();
      chai.expect(description).to.equal('Description');
    });
  });
};
