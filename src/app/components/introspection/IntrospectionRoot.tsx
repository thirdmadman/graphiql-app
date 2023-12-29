'use client';

import { IntrospectionSchema } from '@/lib/utils/gql/introspectionImportedTypes';

import { IntrospectionFieldsCollection } from './IntrospectionFieldsCollection';
import { GqlSchemaIntrospection } from '@/lib/utils/gql/GqlSchemaIntrospection';
import { AllFieldsTypeFieldComponent } from './AllFieldsTypeFieldComponent';
import { AllDirectivesFieldComponent } from './AllDirectivesFieldComponent';

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
    <div className="pl-2 border-l-4 border-indigo-500 max-w-full overflow-y-auto">
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
      <AllFieldsTypeFieldComponent fields={schema.types} schema={schema} />
      <AllDirectivesFieldComponent fields={schema.directives} schema={schema} />
    </div>
  );
}
