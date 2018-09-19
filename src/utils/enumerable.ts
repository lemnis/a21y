/**
 * @enumerable decorator that sets the enumerable property of a class field to false.
 * @param value true|false
 */
export default function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: any) {
    if (descriptor.enumerable != value && propertyKey) {
      descriptor.enumerable = value;
    }
  };
}