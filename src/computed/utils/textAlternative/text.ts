export function is(node: Node): boolean {
  return node instanceof Text;
}

export function get(node: Node): string {
  return (node as any).textContent.trim() || null;
}

export default { is, get };
