import {request, gql, ClientError} from 'graphql-request';
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

    if (error instanceof ClientError) {
      return {
        error: {
          type: 'ClientError',
          message: error.message,
        },
        resp: null,
      };
    }

    return {
      error: {
        type: 'UnknownError',
      },
      resp: null,
    };
  }
};

export type TGetGraphQLData = Awaited<ReturnType<typeof getGraphQLData>>;

type RequestFieldProps = {
  searchParams: {[key: string]: string | string[] | undefined};
};

export async function RequestField({searchParams}: RequestFieldProps) {
  let gqlRequest = '';

  if (searchParams) {
    if (searchParams.data && typeof searchParams.data === 'string') {
      gqlRequest = searchParams.data;
    }
  }

  const resp = await getGraphQLData(gqlRequest);

  if (resp.error) {
    return <RequestFieldError error={resp.error} />;
  }

  return <RequestFieldBox resp={resp.resp} />;
}
