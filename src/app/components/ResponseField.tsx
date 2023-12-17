import { ResponseFieldError } from './ResponseFieldError';
import { ResponseFieldBox } from './ResponseFieldBox';
import { gqlFetchApi } from '@/lib/utils/gql-fetch';

const getGraphQLData = async (req: string | null = null) => {
  if (!req) {
    return undefined;
  }

  const resp = await gqlFetchApi(
    'https://spacex-production.up.railway.app/',
    req
  );

  return { ...resp };
};

interface IResponseFieldProps {
  searchParams: { [key: string]: string | Array<string> | undefined };
}

export async function ResponseField({ searchParams }: IResponseFieldProps) {
  let gqlRequest = '';

  if (searchParams) {
    if (searchParams.data && typeof searchParams.data === 'string') {
      gqlRequest = searchParams.data;
    }
  }

  const resp = await getGraphQLData(gqlRequest);

  if (resp?.error) {
    return <ResponseFieldError error={resp.error} />;
  }

  return <ResponseFieldBox resp={resp?.resp} />;
}
