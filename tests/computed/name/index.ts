import input from './elements/input';
import img from './elements/img';
import div from './elements/div';
import a from './elements/a';

// import spinbutton from './roles/spinbutton';

export default () => {
	describe('name', () => {
		// elements
		input();
		img();
		div();
		a();

		// roles
		// spinbutton();
	});
}