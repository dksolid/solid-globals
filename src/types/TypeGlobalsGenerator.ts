import { getLn } from 'dk-localize';
import { Request, Response } from 'express';

import { TypeApiItem } from './TypeApiItem.js';
import { TypeActionAny } from './TypeActionAny.js';
import { TypeStoreItem } from './TypeStoreItem.js';
import { TypeApiGenerator } from './TypeApiGenerator.js';
import { TypeSkipFirstArg } from './TypeSkipFirstArg.js';
import { TypeActionWrapped } from './TypeActionWrapped.js';
import { TypeStoreGenerator } from './TypeStoreGenerator.js';
import { TypeActionsGenerator } from './TypeActionsGenerator.js';
import { TypeActionsGeneratorModular } from './TypeActionsGeneratorModular.js';

export type TypeGlobalsGenerator<
  TApi extends TypeApiItem,
  TStaticStores extends TypeStoreItem,
  TModularStores extends Record<string, TypeStoreItem>,
  TActions extends Record<string, Record<string, TypeActionAny>>,
  TModularActions extends Record<string, Record<string, Record<string, TypeActionAny>>>,
  TGetLn extends typeof getLn,
> = {
  req?: Request;
  res?: Response;
  api: TypeApiGenerator<TApi>;
  getLn: TypeSkipFirstArg<TGetLn>;
  store: TypeStoreGenerator<TStaticStores, TModularStores>;
  actions: TypeActionsGenerator<TActions> & TypeActionsGeneratorModular<TModularActions>;
  createWrappedApi: (fn: any) => TypeActionWrapped;
  createWrappedAction: (fn: TypeActionAny) => TypeActionWrapped;
};
