import {request, gql, ClientError} from 'graphql-request';
import {Disable} from './Disable';

const getGraphQLData = async (req: string | null = null) => {
  let document = gql`
    {
      company {
        ceo
      }
    }
  `;

  if (req) {
    document = req;
  }

  try {
    const resp = await request('https://spacex-production.up.railway.app/', document);
    return {resp};
  } catch (error) {
    console.error(error);
    return {error};
  }
};

export default async function RequestField({searchParams}: {searchParams: {[key: string]: string | string[] | undefined}}) {
  let gqlRequest = '';

  if (searchParams) {
    if (searchParams.data && typeof searchParams.data === 'string') {
      gqlRequest = searchParams.data;
    }
  }

  const resp = await getGraphQLData(gqlRequest);

  if (resp.error) {
    const clientError = resp?.error as ClientError;
    return (
      <div>
        <p>We are sorry, but there were error in processing request.</p>
        <p>Text of error: {clientError.message.slice(0, 100)}...</p>
        <Disable disabled />
      </div>
    );
  }

  let data = JSON.stringify(resp.resp);

  return (
    <div className=''>
      <p className='mb-2'>Server response</p>
      <pre className='p-5 bg-gray-50 '>{data}</pre>
      <Disable disabled={false} />
    </div>
  );
}
