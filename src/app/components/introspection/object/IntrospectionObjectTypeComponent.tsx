import {
  IIntrospectionObjectType,
  IIntrospectionSchema,
} from '@/types/introspectionImportedTypes';
import { IntrospectionFieldComponent } from '../IntrospectionFieldComponent';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { InterfaceFieldComponent } from '../shared/InterfaceFieldComponent';
import { SimpleBlockComponent } from '../shared/SimpleBlockComponent';
import { FoldableBlockComponent } from '../shared/FoldableBlockComponent';

interface IIntrospectionObjectTypeComponentProps {
  type: IIntrospectionObjectType | undefined | null;
  schema: IIntrospectionSchema;
  isOpenedSet?: boolean;
}

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
                key={`${type.name}_${field.name}`}
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
                  key={`${type.name}_${interfaceType.name}`}
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
