import { TypeRequestParams } from 'dk-request';
import { addState } from '@dksolid/solid-stateful-fn';

import { TypeGlobalsAny } from './types/TypeGlobalsAny.js';
import { TypeCreateContextParams } from './types/TypeCreateContextParams.js';
import { setGlobalApi } from './globals/setGlobalApi.js';
import { setGlobalStores } from './globals/setGlobalStores.js';
import { setGlobalActions } from './globals/setGlobalActions.js';
import { TypeActionGenerator } from './types/TypeActionGenerator.js';

export function createContextProps<TGlobals extends TypeGlobalsAny>({
  req,
  res,
  api,
  request,
  staticStores,
  globalActions,
  apiValidators,
}: TypeCreateContextParams): TGlobals {
  const globals: TGlobals = {
    req,
    res,
    api: {},
    getLn: () => false,
    store: {},
    actions: {},
    createWrappedApi: ({ ...configParams }: Omit<TypeRequestParams, 'requestParams'>) => {
      const action: any = addState(
        (requestParams: TypeRequestParams['requestParams'] = {}) =>
          request({ ...configParams, mock: action.state.mock, requestParams }, globals),
        configParams.apiName
      );

      return action;
    },
    createWrappedAction: (fn: TypeActionGenerator<TGlobals, any>) => {
      return addState((fn as any).bind(null, globals), fn.name);
    },
  } as any;

  setGlobalStores(globals, staticStores);
  setGlobalActions(globals, globalActions);
  setGlobalApi(globals, { api, apiValidators });

  return globals;
}
