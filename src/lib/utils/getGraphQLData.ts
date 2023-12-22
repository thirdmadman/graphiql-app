import { getParsedQueryParam } from './getParsedQueryParam';
import { IHeaders, IVariables, gqlFetchApi } from './fetchGraphQl';

export const getGraphQLData = async (searchParams: {
  [key: string]: string | Array<string> | undefined;
}) => {
  let gqlRequest = '';

  if (!searchParams.data) {
    return undefined;
  }

  if (searchParams.data && typeof searchParams.data === 'string') {
    gqlRequest = searchParams.data;
  }

  const variables = getParsedQueryParam('variables', searchParams.variables);

  const headers = getParsedQueryParam('headers', searchParams.headers);

  if (variables?.resp === undefined && variables?.error) {
    return {
      resp: undefined,
      error: `Variables are invalid JSON: ${variables?.error}`,
    };
  } else if (headers?.resp === undefined && headers?.error) {
    return {
      resp: undefined,
      error: `Headers are invalid JSON: ${headers?.error}`,
    };
  } else {
    const parsedVariables = variables as IVariables | null;
    const parsedHeaders = headers as IHeaders | null;

    const resp = await gqlFetchApi(
      'https://spacex-production.up.railway.app/',
      gqlRequest,
      parsedHeaders,
      parsedVariables
    );

    return { ...resp };
  }
};
