import { TypeGlobalsAny } from '../types/TypeGlobalsAny.js';
import { TypeCreateContextParams } from '../types/TypeCreateContextParams.js';

export function setGlobalActions(
  globals: TypeGlobalsAny,
  globalActions: TypeCreateContextParams['globalActions']
) {
  Object.entries(globalActions).forEach(([actionGroupName, actionGroup]) => {
    if (!globals.actions[actionGroupName]) globals.actions[actionGroupName] = {};

    Object.entries(actionGroup).forEach(([actionName, action]) => {
      // @ts-ignore
      globals.actions[actionGroupName][actionName] = globals.createWrappedAction(action);
    });
  });
}
