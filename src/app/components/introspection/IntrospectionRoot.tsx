'use client';

import { IntrospectionSchema } from '@/lib/utils/gql/introspectionImportedTypes';

import { IntrospectionFieldsCollection } from './IntrospectionFieldsCollection';
import { GqlSchemaIntrospection } from '@/lib/utils/gql/GqlSchemaIntrospection';

interface IIntrospectionRootProps {
  schema: IntrospectionSchema;
}

export function IntrospectionRoot({ schema }: IIntrospectionRootProps) {
  const schemaIntrospection = new GqlSchemaIntrospection(schema);

  console.error(schema);

  const allQueryFields = schemaIntrospection.getAllQueries();
  const allMutationFields = schemaIntrospection.getAllMutations();
  const allSubscriptionFields = schemaIntrospection.getAllSubscriptions();

  if (!allQueryFields) {
    return;
  }

  return (
    <div className="flex flex-col pl-2 border-l-4 border-indigo-500 self-start">
      <div className="text-lg mb-4">Documentation Explorer</div>
      <IntrospectionFieldsCollection
        schema={schema}
        fields={allQueryFields}
        name={schemaIntrospection?.queryName ?? 'query'}
      />
      <IntrospectionFieldsCollection
        schema={schema}
        fields={allMutationFields}
        name={schemaIntrospection?.mutationName ?? 'mutation'}
      />
      <IntrospectionFieldsCollection
        schema={schema}
        fields={allSubscriptionFields}
        name={schemaIntrospection?.subscriptionName ?? 'subscription'}
      />
    </div>
  );
}
