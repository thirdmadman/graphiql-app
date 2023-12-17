import { ResponseFieldError } from './ResponseFieldError';
import { ResponseFieldBox } from './ResponseFieldBox';
import { IVariables, gqlFetchApi } from '@/lib/utils/gql-fetch';

const getGraphQLData = async (
  req: string | null = null,
  variables: IVariables | null = null
) => {
  if (!req) {
    return undefined;
  }

  const resp = await gqlFetchApi(
    'https://spacex-production.up.railway.app/',
    req,
    null,
    variables
  );

  return { ...resp };
};

interface IResponseFieldProps {
  searchParams: { [key: string]: string | Array<string> | undefined };
}

export async function ResponseField({ searchParams }: IResponseFieldProps) {
  let gqlRequest,
    variablesString = '';

  if (searchParams) {
    if (searchParams.data && typeof searchParams.data === 'string') {
      gqlRequest = searchParams.data;
    }
    if (searchParams.variables && typeof searchParams.variables === 'string') {
      variablesString = searchParams.variables;
    }
  }

  let variables: IVariables | null = null;

  if (variablesString) {
    try {
      variables = JSON.parse(decodeURIComponent(variablesString)) as IVariables;
    } catch (err) {
      let errorMsg = 'Failed to parse variables string';
      if (err instanceof Error) {
        errorMsg = err.message;
      }

      return <ResponseFieldError error={errorMsg} />;
    }
  }

  const resp = await getGraphQLData(gqlRequest, variables);

  if (resp?.error) {
    return <ResponseFieldError error={resp.error} />;
  }

  return <ResponseFieldBox resp={resp?.resp} />;
}
