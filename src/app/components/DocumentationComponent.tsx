import { getGqlIntrospection } from '@/lib/utils/gql/introspection';
import { IntrospectionRoot } from './introspection/IntrospectionRoot';
import { getParsedQueryParam } from '@/lib/utils/getParsedQueryParam';
import { LocaleByNameExtractor } from '@/locales/LocaleByNameExtractor';
import { ISearchParams } from '@/types/interfaces/ISearchParams';

interface IDocumentationComponentProps {
  searchParams: ISearchParams;
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
        data-testid="no-url"
      >
        <LocaleByNameExtractor localeName="documentationExplorerErrorUrl" />
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
        data-testid="error"
      >
        <LocaleByNameExtractor localeName="documentationExplorerErrorNoSchema" />
      </div>
    );
  }

  return <IntrospectionRoot schema={schema.__schema} />;
}
