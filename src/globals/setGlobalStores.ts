import { autoBind } from '../utils/autoBind.js';
import { TypeGlobalsAny } from '../types/TypeGlobalsAny.js';
import { TypeCreateContextParams } from '../types/TypeCreateContextParams.js';

export function setGlobalStores(
  globals: TypeGlobalsAny,
  staticStores: TypeCreateContextParams['staticStores']
) {
  Object.entries(staticStores).forEach(
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ([storeName, StoreClass]) => {
      globals.store[storeName] = new StoreClass();

      autoBind(globals.store[storeName]);

      return globals.store[storeName];
    }
  );
}
