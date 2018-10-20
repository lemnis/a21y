/// <reference path='../node_modules/@types/chai/index.d.ts' />
import getPseudoContent from '../src/computed/utils/getPseudoContent';

export default () => {
  describe('psuedo content', () => {
    let testElement: HTMLDivElement;
    let style: HTMLStyleElement;

    beforeEach(() => {
      testElement = document.createElement('div');
      testElement.setAttribute('data-string', 'foo');
      testElement.setAttribute('role', 'link');
      testElement.tabIndex = 0;
      style = document.createElement('style');
      document.body.appendChild(testElement);
      document.body.appendChild(style);
    });

    afterEach(() => {
      document.body.removeChild(testElement);
      document.body.removeChild(style);
    });

    it('should be null when no content is set', async () => {
      chai.expect(await getPseudoContent(testElement, '::before')).to.equal(null);
    });

    it('should be null when set to normal', async () => {
      style.innerHTML = `div:before { content: normal; }`;
      chai.expect(await getPseudoContent(testElement, '::before')).to.equal(null);
    });

    it('with a single string', async () => {
      style.innerHTML = `div:before { content: 'foo'; }`;
      chai.expect(await getPseudoContent(testElement, '::before')).to.equal('foo');
    });

    it('should support multiple strings', async () => {
      style.innerHTML = `div:before { content: 'foo ' 'bar' 'baz'; }`;
      chai.expect(await getPseudoContent(testElement, '::before')).to.equal('foo barbaz');
    });

    it('with string from attribute', async () => {
      style.innerHTML = `div:before { content: attr(data-string); }`;
      chai.expect(await getPseudoContent(testElement, '::before')).to.equal('foo');
    });

    it('should ignore images', async () => {
      style.innerHTML = `div:before { content: 'foo' url(//lorempixel.com/20/20); }`;
      chai.expect(await getPseudoContent(testElement, '::before')).to.equal('foo');
    });

    // only supported when AOM is enabled
    if (!window.getComputedAccessibleNode) {
      it('should ignore counters', async () => {
        style.innerHTML = `div:before { content: 'foo ' counter(bar) "baz" }`;
        chai.expect(await getPseudoContent(testElement, '::before')).to.equal('foo baz');
      });

      it('should ignore quotes', async () => {
        style.innerHTML = `div:before { content: open-quote }`;
        chai.expect(await getPseudoContent(testElement, '::before')).to.equal(null);
      });
    }

    it('should ignore other content', async () => {
      style.innerHTML = `div:before { content: 'foo' url(//lorempixel.com/20/20); }`;
      testElement.innerHTML = 'some <span> text </span>';
      chai.expect(await getPseudoContent(testElement, '::before')).to.equal('foo');
    });

    it('should ignore other psuedo elements', async () => {
      style.innerHTML = `div:before, div:after { content: 'foo';`;
      chai.expect(await getPseudoContent(testElement, '::before')).to.equal('foo');
    });

    it("should ignore other psuedo elements when it isn't rendered", async () => {
      chai.expect(await getPseudoContent(testElement, '::before')).to.equal(null);
    });
  });
};
