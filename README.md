## solid-globals

[![npm](https://img.shields.io/npm/v/@dksolid/solid-globals)](https://www.npmjs.com/package/@dksolid/solid-globals)
![coverage](https://github.com/dksolid/solid-globals/blob/main/assets/coverage.svg)
![size-esm](https://github.com/dksolid/solid-globals/blob/main/assets/esm.svg)
![size-cjs](https://github.com/dksolid/solid-globals/blob/main/assets/cjs.svg)

I CURRENTLY WRITE THIS DOCUMENTATION, IT'S NOT READY YET

This library is intended to be used in SSR projects with a layered architecture. For SPA it's not
helpful because you can directly import all the layers where needed as Singletones. But in SSR
the only way to configure DI is to use a context. So, this library helps with that.

### Setup (SSR)

This example is based on the documentation of
[@dksolid/solid-router](https://github.com/dksolid/solid-router).
But you may use any routing library that supports async loaded page chunks.

The setup consists of two parts:
- TypeGlobals: TS-model which describes global and modular layers
- Global object: an object representing TypeGlobals

1. Install `@dksolid/solid-globals`, `dk-localize` and `dk-request`
2. Create `models/TypeGlobals.ts`

```typescript
import { getLn } from 'dk-localize';
import { TypeGlobalsGenerator } from '@dksolid/solid-globals';

import { RouterStore } from '../stores/routerStore';

export type TypeGlobals = TypeGlobalsGenerator<
  any,
  { routerStore: typeof RouterStore },
  any,
  any,
  any,
  typeof getLn
>;
```

3. Create `globals.ts`

```typescript
import { createContextProps } from '@dksolid/solid-globals';

import { RouterStore } from './stores/routerStore';
import { TypeGlobals } from './models/TypeGlobals';

const globals = createContextProps<TypeGlobals>({
  api: {},
  request: () => Promise.resolve(),
  staticStores: { routerStore: RouterStore },
  apiValidators: {},
  globalActions: {},
});

export { globals };
```