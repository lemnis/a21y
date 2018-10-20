import Roletype from '../role/Roletype';
import * as rules from './../utils/data';

function flattenDeep(arr: any[]): any[] {
  return arr.reduce(
    (acc, val) => (Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val)),
    []
  );
}

export default async function children(
  current: Roletype,
  ignoreSelf: boolean = false
): Promise<Roletype[]> {
  const currentRole = await current.computed.role();
  const allChildren: Roletype[] = [
    ...Array.from(current.element.children, node => new Roletype(node)),
    ...Array.from(current.owns)
  ];

  // never return children for a element that only allows presentational children
  if (!ignoreSelf && currentRole && rules.check(currentRole, 'childrenPresentational', true)) {
    return [];
  }

  // removed hidden children
  const visibleChildren = allChildren.filter(child => !child.computed.hidden());

  return await Promise.all(
    flattenDeep(
      visibleChildren.map(child =>
        (child.computed.role() as any).then((role: string) => {
          // retrieve children from non-rendered elements
          if (role === 'presentation' || role === 'none') {
            return children(child, true);
          }
          return child;
        })
      )
    )
  );
}
