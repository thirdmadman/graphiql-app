import {
  IntrospectionField,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { IntrospectionFieldComponent } from './IntrospectionFieldComponent';
import { FoldableBlockComponent } from './shared/FoldableBlockComponent';
interface IIntrospectionFieldsCollectionProps {
  schema: IntrospectionSchema;
  fields: Array<IntrospectionField> | undefined | null;
  name: string;
}

export function IntrospectionFieldsCollection({
  schema,
  fields,
  name,
}: IIntrospectionFieldsCollectionProps) {
  if (!fields || fields.length === 0) {
    return;
  }

  return (
    <FoldableBlockComponent
      title={<b>{name}</b>}
      inside={fields?.map((field) => (
        <IntrospectionFieldComponent
          key={`${field.type.kind}_${field.name}`}
          field={field}
          schema={schema}
        />
      ))}
    />
  );
}
