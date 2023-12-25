'use client';

import { IntrospectionSchema } from '@/lib/utils/gql/introspectionImportedTypes';
import { GqlSchemaIntrospection } from '@/lib/utils/gql/GqlSchemaIntrospection';
import { IntrospectionTypeComponent } from './IntrospectionTypeComponent';

interface IGetFieldWrapperProps {
  kind: string;
  name: string;
  schema: IntrospectionSchema;
}

export function GetFieldWrapper({ schema, kind, name }: IGetFieldWrapperProps) {
  if (!schema || !kind || !name) {
    return;
  }

  const gqlSchemaIntrospection = new GqlSchemaIntrospection(schema);

  const type = gqlSchemaIntrospection.getType(kind, name);

  if (!type) {
    return;
  }

  return <IntrospectionTypeComponent type={type} schema={schema} />;
}
