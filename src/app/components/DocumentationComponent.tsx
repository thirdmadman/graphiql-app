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

  if (!searchParams?.url) {
    return (
      <div
        className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
        role="alert"
      >
        In order to access Documentation Explorer, provide correct url to
        graphql endpoint.
      </div>
    );
  }

  const schemaResponse = await getGqlIntrospection(
    String(searchParams.url),
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
