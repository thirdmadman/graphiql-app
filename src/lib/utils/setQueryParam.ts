import { getMinifiedString } from './minifyQueryString';

export const setQueryParam = (
  currentParams: URLSearchParams,
  paramName: string,
  value: string | undefined
) => {
  if (value) {
    const paramsStringMinified = getMinifiedString(value);
    currentParams.set(paramName, paramsStringMinified);
  } else if (currentParams.has(paramName)) {
    currentParams.delete(paramName);
  } else return;
};
