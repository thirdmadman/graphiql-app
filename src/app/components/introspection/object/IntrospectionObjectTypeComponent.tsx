import {
  IntrospectionObjectType,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { IntrospectionFieldComponent } from '../IntrospectionFieldComponent';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { InterfaceFieldComponent } from '../shared/InterfaceFieldComponent';
import { SimpleBlockComponent } from '../shared/SimpleBlockComponent';
import { FoldableBlockComponent } from '../shared/FoldableBlockComponent';

interface IIntrospectionObjectTypeComponentProps {
  type: IntrospectionObjectType | undefined | null;
  schema: IntrospectionSchema;
  isOpenedSet?: boolean;
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
  isOpenedSet = false,
}: IIntrospectionObjectTypeComponentProps) {
  if (!type) {
    return;
  }

  return (
    <FoldableBlockComponent
      isOpenedSet={isOpenedSet}
      title={
        <>
          type: {type.kind}: <i>{type.name}</i>
        </>
      }
      inside={
        <>
          <DescriptionFieldComponent description={type.description} />
          <SimpleBlockComponent
            title={'fields:'}
            inside={type.fields?.map((field) => (
              <IntrospectionFieldComponent
                key={field.name}
                field={field}
                schema={schema}
              />
            ))}
          />

          {type.interfaces && type.interfaces.length > 0 && (
            <SimpleBlockComponent
              title={'interfaces:'}
              inside={type.interfaces?.map((interfaceType) => (
                <InterfaceFieldComponent
                  key={interfaceType.name}
                  type={interfaceType}
                  schema={schema}
                />
              ))}
            />
          )}
        </>
      }
    />
  );
}
