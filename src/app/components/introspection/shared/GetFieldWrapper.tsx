import { IIntrospectionSchema } from '@/types/introspectionImportedTypes';
import { GqlSchemaIntrospection } from '@/lib/utils/gql/GqlSchemaIntrospection';
import { IntrospectionTypeComponent } from './IntrospectionTypeComponent';

interface IGetFieldWrapperProps {
  kind: string;
  name: string;
  schema: IIntrospectionSchema;
  isOpenedSet?: boolean;
}

export function GetFieldWrapper({
  schema,
  kind,
  name,
  isOpenedSet = false,
}: IGetFieldWrapperProps) {
  if (!schema || !kind || !name) {
    return;
  }

  const gqlSchemaIntrospection = new GqlSchemaIntrospection(schema);

  const type = gqlSchemaIntrospection.getType(kind, name);

  if (!type) {
    return;
  }

  return (
    <IntrospectionTypeComponent
      type={type}
      schema={schema}
      isOpenedSet={isOpenedSet}
    />
  );
}
