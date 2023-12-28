'use client';

import { IntrospectionSchema } from '@/lib/utils/gql/introspectionImportedTypes';

import { IntrospectionQueries } from './IntrospectionQueries';
import { GqlSchemaIntrospection } from '@/lib/utils/gql/GqlSchemaIntrospection';

interface IIntrospectionRootProps {
  schema: IntrospectionSchema;
}

export function IntrospectionRoot({ schema }: IIntrospectionRootProps) {
  const schemaIntrospection = new GqlSchemaIntrospection(schema);

  console.error(schema);

  const allQueryFields = schemaIntrospection.getAllQueries();

  if (!allQueryFields) {
    return;
  }

  return (
    <div className="flex flex-col pl-2 border-l-4 border-indigo-500 self-start">
      <div className="text-lg mb-4">Documentation Explorer</div>
      <IntrospectionQueries
        schema={schema}
        fields={allQueryFields}
        name={schemaIntrospection?.queryName ?? 'query'}
      />
    </div>
  );
}
