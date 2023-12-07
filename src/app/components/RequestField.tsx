import {request, gql, ClientError} from 'graphql-request';
import {Locale} from '@/locales/locale';
import {RequestFieldError} from './RequestFieldError';
import {RequestFieldBox} from './RequestFieldBox';

const getGraphQLData = async (req: string | null = null) => {
  // let document = gql`
  //   {
  //     company {
  //       ceo
  //     }
  //   }
  // `;

  if (!req) {
    return {resp: null};
  }

  try {
    const resp = (await request('https://spacex-production.up.railway.app/', req)) as string;
    return {resp};
  } catch (error) {
    console.error(error);
    return {error, resp: null};
  }
};

export type TGetGraphQLData = Awaited<ReturnType<typeof getGraphQLData>>;

type RequestFieldProps = {
  searchParams: {[key: string]: string | string[] | undefined};
};

export default async function RequestField({searchParams}: RequestFieldProps) {
  let gqlRequest = '';

  if (searchParams) {
    if (searchParams.data && typeof searchParams.data === 'string') {
      gqlRequest = searchParams.data;
    }
  }

  const resp = await getGraphQLData(gqlRequest);

  if (resp.error) {
    return <RequestFieldError error={resp.error as ClientError} />;
  }

  return <RequestFieldBox resp={resp.resp} />;
}
