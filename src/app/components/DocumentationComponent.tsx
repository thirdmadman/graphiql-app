import { getGqlIntrospection } from '@/lib/utils/gql/introspection';
import { IntrospectionRoot } from './introspection/IntrospectionRoot';
import { getParsedQueryParam } from '@/lib/utils/getParsedQueryParam';

interface IDocumentationComponentProps {
  searchParams: { [key: string]: string | Array<string> | undefined };
}

export async function DocumentationComponent({
  searchParams,
}: IDocumentationComponentProps) {
  const headers = getParsedQueryParam('headers', searchParams.headers);

  const schemaResponse = await getGqlIntrospection(
    'https://countries.trevorblades.com/graphql',
    headers?.resp ?? {}
  );

  const { schema, error } = schemaResponse;

  if (!schema || error) {
    return;
  }

  return <IntrospectionRoot schema={schema.__schema} />;
}
