import { IVariables, gqlFetchApi } from './gql-fetch';

export const getGraphQLData = async (searchParams: {
  [key: string]: string | Array<string> | undefined;
}) => {
  let gqlRequest = '';
  let variables: IVariables | null = null;

  if (!searchParams) {
    return undefined;
  }

  if (searchParams.data && typeof searchParams.data === 'string') {
    gqlRequest = searchParams.data;
  }

  if (searchParams.variables && typeof searchParams.variables === 'string') {
    try {
      variables = JSON.parse(
        decodeURIComponent(searchParams.variables)
      ) as IVariables;
    } catch (err) {
      return {
        error:
          err instanceof Error
            ? err.message
            : 'Failed to parse variables string',
        resp: undefined,
      };
    }
  }

  const resp = await gqlFetchApi(
    'https://spacex-production.up.railway.app/',
    gqlRequest,
    null,
    variables
  );

  return { ...resp };
};
