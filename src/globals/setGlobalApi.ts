import { TypeGlobalsAny } from '../types/TypeGlobalsAny.js';
import { TypeCreateContextParams } from '../types/TypeCreateContextParams.js';

export function setGlobalApi(
  globals: TypeGlobalsAny,
  {
    api,
    apiValidators,
  }: {
    api: TypeCreateContextParams['api'];
    apiValidators: TypeCreateContextParams['apiValidators'];
  }
) {
  // eslint-disable-next-line guard-for-in
  for (const apiName in api) {
    const { url, headers, omitResponseValidation, method, disableCredentials } = api[apiName];

    globals.api[apiName] = globals.createWrappedApi({
      url,
      method,
      apiName,
      headers,
      validatorRequest: apiValidators[apiName]?.TypeRequest,
      validatorResponse: apiValidators[apiName]?.TypeResponse,
      disableCredentials,
      omitResponseValidation,
    });
  }
}
