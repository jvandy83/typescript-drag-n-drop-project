// METHOD DECORATOR
export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const modifiedDescriptor = {
    congfigurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return modifiedDescriptor;
}
