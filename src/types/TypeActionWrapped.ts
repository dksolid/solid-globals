import { TypeFnState } from '@dksolid/solid-stateful-fn';

import { TypeSkipFirstArg } from './TypeSkipFirstArg.js';
import { TypeActionGenerator } from './TypeActionGenerator.js';

export type TypeActionWrapped = TypeSkipFirstArg<TypeActionGenerator<any, any>> & TypeFnState;
