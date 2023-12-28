import {
  IntrospectionObjectType,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { IntrospectionFieldComponent } from './IntrospectionFieldComponent';
import { DescriptionFieldComponent } from './shared/DescriptionFieldComponent';

interface IIntrospectionObjectTypeComponentProps {
  type: IntrospectionObjectType | undefined | null;
  schema: IntrospectionSchema;
}

// interface IntrospectionObjectType {
//   kind: 'OBJECT';
//   name: string;
//   description?: Maybe<string>;
//   fields: Array<IntrospectionField>;
//   interfaces: Array<IntrospectionNamedTypeRef<IntrospectionInterfaceType>>;
// }

export function IntrospectionObjectTypeComponent({
  type,
  schema,
}: IIntrospectionObjectTypeComponentProps) {
  if (!type) {
    return;
  }

  return (
    <>
      <DescriptionFieldComponent description={type.description} />
      <div className="pl-2 mb-2 border-l-4 border-indigo-500">
        <div className="mb-1">fields:</div>
        {type.fields?.map((field) => (
          <IntrospectionFieldComponent
            key={field.name}
            field={field}
            schema={schema}
          />
        ))}
      </div>
    </>
  );
}
