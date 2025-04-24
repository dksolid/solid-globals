import { TypeGlobalsAny } from '../types/TypeGlobalsAny.js';

export function isModularGroup(
  group: TypeGlobalsAny['actions'][Extract<keyof TypeGlobalsAny['actions'], string>]
): boolean {
  return Object.values(group).some((groupOrFunction) => typeof groupOrFunction !== 'function');
}
