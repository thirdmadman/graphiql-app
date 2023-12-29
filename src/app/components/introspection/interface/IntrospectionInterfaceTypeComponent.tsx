import {
  IntrospectionInterfaceType,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { IntrospectionFieldComponent } from '../IntrospectionFieldComponent';
import { InterfaceFieldComponent } from '../shared/InterfaceFieldComponent';
import { PossibleTypeFieldComponent } from '../shared/PossibleTypeFieldComponent';
import { SimpleBlockComponent } from '../shared/SimpleBlockComponent';
import { FoldableBlockComponent } from '../shared/FoldableBlockComponent';

interface IIntrospectionInterfaceTypeComponentProps {
  type: IntrospectionInterfaceType | undefined | null;
  schema: IntrospectionSchema;
  isOpenedSet?: boolean;
}

// interface IntrospectionInterfaceType {
//   kind: 'INTERFACE';
//   name: string;
//   description?: Maybe<string>;
//   fields: Array<IntrospectionField>;
//   interfaces: Array<IntrospectionNamedTypeRef<IntrospectionInterfaceType>>;
//   possibleTypes: Array<IntrospectionNamedTypeRef<IntrospectionObjectType>>;
// }

export function IntrospectionInterfaceTypeComponent({
  type,
  schema,
  isOpenedSet = false,
}: IIntrospectionInterfaceTypeComponentProps) {
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
            inside={type.fields?.map((inputValue) => (
              <IntrospectionFieldComponent
                key={inputValue.name}
                field={inputValue}
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

          {type.possibleTypes && type.possibleTypes.length > 0 && (
            <SimpleBlockComponent
              title={'possible types:'}
              inside={type.possibleTypes?.map((possibleType) => (
                <PossibleTypeFieldComponent
                  key={possibleType.name}
                  type={possibleType}
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
