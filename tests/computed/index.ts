import description from './description';
import hidden from './hidden';
import name from "./name/index";
import children from './children';

export default () => {
  describe("computed", () => {
    name();
    children();
    description();
    hidden();
  });
};
