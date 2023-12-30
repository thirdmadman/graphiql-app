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
    'https://spacex-production.up.railway.app',

    headers?.resp ?? {}
  );

  const { schema, error } = schemaResponse;

  if (!schema || error) {
    return (
      <div
        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <span className="font-medium">We are sorry,</span> but documentation is
        not available at the moment
      </div>
    );
  }

  return <IntrospectionRoot schema={schema.__schema} />;
}
