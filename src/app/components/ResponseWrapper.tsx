import { getGraphQLData } from '@/lib/utils/getGraphQLData';
import { TextareaField } from './TextareaField';
import { Mode } from './TextareaField';

interface IResponseFieldProps {
  searchParams: { [key: string]: string | Array<string> | undefined };
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
