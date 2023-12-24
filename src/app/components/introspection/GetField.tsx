'use client';

import { IntrospectionSchema } from '@/lib/utils/gql/introspectionImportedTypes';
import { GqlSchemaIntrospection } from '@/lib/utils/gql/GqlSchemaIntrospection';
import { IntrospectionTypeComponent } from './IntrospectionTypeComponent';

interface IGetFieldProps {
  kind: string;
  name: string;
  schema: IntrospectionSchema;
}

export function GetField({ schema, kind, name }: IGetFieldProps) {
  if (!schema || !kind || !name) {
    return;
  }

  const gqlSchemaIntrospection = new GqlSchemaIntrospection(schema);

  const type = gqlSchemaIntrospection.getType(kind, name);

  if (!type) {
    return;
  }

  return (
    <div className="">
      <IntrospectionTypeComponent type={type} schema={schema} />
    </div>
  );
}
