import { TypeFnState } from '@dksolid/solid-stateful-fn';

import { TypeApiItem } from './TypeApiItem.js';

export type TypeApiGenerator<TApi extends TypeApiItem> = {
  [TApiName in keyof TApi]: TypeFnState &
    ((requestParams: TApi[TApiName]['request']) => Promise<TApi[TApiName]['response']>);
};
