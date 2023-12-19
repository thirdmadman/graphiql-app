import { ResponseFieldError } from './ResponseFieldError';
import { ResponseFieldBox } from './ResponseFieldBox';
import { getGraphQLData } from '@/lib/utils/getGraphQlData';

interface IResponseFieldProps {
  searchParams: { [key: string]: string | Array<string> | undefined };
}

export async function ResponseField({ searchParams }: IResponseFieldProps) {
  const resp = await getGraphQLData(searchParams);

  if (resp?.error) {
    return <ResponseFieldError error={resp.error} />;
  }

  return <ResponseFieldBox resp={resp?.resp} />;
}
