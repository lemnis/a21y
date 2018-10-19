/// <reference path='../../../node_modules/@types/chai/index.d.ts' />
import Roletype from '../../../src/role/Roletype';
import { html, render } from '../../../node_modules/lit-html/lit-html';

export default () => {
  describe('native text alternatives', () => {
    let container: HTMLDivElement;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it('table with caption', async () => {
      const source = html`
        <table id='test'>
          <caption>foo</caption>
        </table>
      `;
      render(source, container);
      const roletype = new Roletype(container.querySelector('#test'));
      const name = await roletype.computed.name();
      chai.expect(name).to.equal('foo');
    });

    it('figure with figcaption', async () => {
      const source = html`
        <figure id='test'>
          <figcaption>foo</figcaption>
        </figure>
      `;
      render(source, container);
      const roletype = new Roletype(container.querySelector('#test'));
      const name = await roletype.computed.name();
      chai.expect(name).to.equal('foo');
    });

    it('fieldset with legend', async () => {
      const source = html`
        <form>
          <fieldset id='test'>
            <legend>foo</legend>
          </fieldset>
        </form>
      `;
      render(source, container);
      const roletype = new Roletype(container.querySelector('#test'));
      const name = await roletype.computed.name();
      chai.expect(name).to.equal('foo');
    });

    it('img with alt', async () => {
      const source = html`<img id='test' src='#' alt='foo' />`;
      render(source, container);
      const roletype = new Roletype(container.querySelector('#test'));
      const name = await roletype.computed.name();
      chai.expect(name).to.equal('foo');
    });

    it('input type image with alt - 545', async () => {
      const source = html`<input id="test" type="image" alt="foo" src="#">`;
      render(source, container);
      const roletype = new Roletype(container.querySelector('#test'));
      const name = await roletype.computed.name();
      chai.expect(name).to.equal('foo');
    });

    // it('svg with title', async () => {
    //   const source = html`
    //     <svg id='test'>
    //       <title>foo</title>
    //     </svg>
    //   `;
    //   render(source, container);
    //   const roletype = new Roletype(container.querySelector('#test'));
    //   const name = await roletype.computed.name();
    //   chai.expect(name).to.equal('foo');
    // });
  });
};
