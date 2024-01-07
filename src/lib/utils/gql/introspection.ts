import { gqlIntrospectionQuery } from '@/constants';
import { gqlFetchApi } from './fetchGraphQl';
import { IIntrospectionResponse } from './introspectionImportedTypes';

export const getGqlIntrospection = async (url: string, headers = {}) => {
  const resp = await gqlFetchApi(url, gqlIntrospectionQuery, headers);

  if (resp.error) {
    return { error: resp.error };
  }

  return { schema: resp.resp as IIntrospectionResponse };
};
