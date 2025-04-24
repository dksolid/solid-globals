import { TypeGlobalsAny } from './types/TypeGlobalsAny.js';
import { TypeActionWrapped } from './types/TypeActionWrapped.js';
import { isModularGroup } from './actions/isModularGroup.js';

export function getPlainActions(actions: TypeGlobalsAny['actions']): Array<TypeActionWrapped> {
  return Object.values(actions)
    .map((actionGroup) => {
      return isModularGroup(actionGroup)
        ? getPlainActions(actionGroup as any)
        : Object.values(actionGroup);
    })
    .flat(Infinity) as any;
}
