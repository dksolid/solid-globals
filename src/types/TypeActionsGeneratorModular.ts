import { TypeFnState } from '@dksolid/solid-stateful-fn';

import { TypeActionAny } from './TypeActionAny.js';
import { TypeSkipFirstArg } from './TypeSkipFirstArg.js';

export type TypeActionsGeneratorModular<
  TModularActions extends Record<string, Record<string, Record<string, TypeActionAny>>>,
> = {
  [ModularGroup in keyof TModularActions]: {
    [Group in keyof TModularActions[ModularGroup]]: {
      [FnName in keyof TModularActions[ModularGroup][Group]]: TypeSkipFirstArg<
        TModularActions[ModularGroup][Group][FnName]
      > &
        TypeFnState;
    };
  };
};
