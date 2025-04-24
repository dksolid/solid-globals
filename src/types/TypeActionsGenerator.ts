import { TypeFnState } from '@dksolid/solid-stateful-fn';

import { TypeActionAny } from './TypeActionAny.js';
import { TypeSkipFirstArg } from './TypeSkipFirstArg.js';

export type TypeActionsGenerator<TActions extends Record<string, Record<string, TypeActionAny>>> = {
  [Group in keyof TActions]: {
    [FnName in keyof TActions[Group]]: TypeSkipFirstArg<TActions[Group][FnName]> & TypeFnState;
  };
};
