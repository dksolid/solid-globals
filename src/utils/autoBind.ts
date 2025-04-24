type TypeOptions = {
  readonly include?: ReadonlyArray<string | RegExp>;
  readonly exclude?: ReadonlyArray<string | RegExp>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllProperties = (object: Record<string, any>) => {
  const properties = new Set();

  do {
    for (const key of Reflect.ownKeys(object)) {
      properties.add([object, key]);
    }
    // @ts-ignore
    // eslint-disable-next-line no-cond-assign,no-param-reassign
  } while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);

  return properties;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function autoBind<TSelf extends Record<string, any>>(
  self: TSelf,
  options: TypeOptions = {}
): TSelf {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter = (key: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const match = (pattern: any) => {
      return typeof pattern === 'string' ? key === pattern : pattern.test(key);
    };

    if (options.include) return options.include.some(match);

    if (options.exclude) return !options.exclude.some(match);

    return true;
  };

  // @ts-ignore
  for (const [object, key] of getAllProperties(self.constructor.prototype)) {
    if (key === 'constructor' || !filter(key)) {
      continue;
    }

    const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
    if (descriptor && typeof descriptor.value === 'function') {
      // @ts-ignore
      self[key] = self[key].bind(self);
    }
  }

  return self;
}
