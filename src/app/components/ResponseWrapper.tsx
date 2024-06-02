import { getGraphQLData } from '@/lib/utils/gql/getGraphQLData';
import { TextareaField } from './editor/TextareaField';
import { Mode } from './types';
import { ISearchParams } from '@/types/interfaces/ISearchParams';

interface IResponseFieldProps {
  searchParams: ISearchParams;
}

export async function ResponseWrapper({ searchParams }: IResponseFieldProps) {
  const resp = await getGraphQLData(searchParams);
  return (
    <TextareaField
      mode={Mode.Readonly}
      data={{
        textareaData: {
          content: resp?.resp,
          error: resp?.error,
        },
      }}
    />
  );
}
