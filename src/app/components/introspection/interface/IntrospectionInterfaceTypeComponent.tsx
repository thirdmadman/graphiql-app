import {
  IIntrospectionInterfaceType,
  IIntrospectionSchema,
} from '@/types/introspectionImportedTypes';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { IntrospectionFieldComponent } from '../IntrospectionFieldComponent';
import { InterfaceFieldComponent } from '../shared/InterfaceFieldComponent';
import { PossibleTypeFieldComponent } from '../shared/PossibleTypeFieldComponent';
import { SimpleBlockComponent } from '../shared/SimpleBlockComponent';
import { FoldableBlockComponent } from '../shared/FoldableBlockComponent';

interface IIntrospectionInterfaceTypeComponentProps {
  type: IIntrospectionInterfaceType | undefined | null;
  schema: IIntrospectionSchema;
  isOpenedSet?: boolean;
}

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
            title="fields:"
            inside={type.fields?.map((inputValue) => (
              <IntrospectionFieldComponent
                key={`${type.name}_${inputValue.name}`}
                field={inputValue}
                schema={schema}
              />
            ))}
          />
          {type.interfaces && type.interfaces.length > 0 && (
            <SimpleBlockComponent
              title="interfaces:"
              inside={type.interfaces?.map((interfaceType) => (
                <InterfaceFieldComponent
                  key={`${type.name}_${interfaceType.name}`}
                  type={interfaceType}
                  schema={schema}
                />
              ))}
            />
          )}

          {type.possibleTypes && type.possibleTypes.length > 0 && (
            <SimpleBlockComponent
              title="possible types:"
              inside={type.possibleTypes?.map((possibleType) => (
                <PossibleTypeFieldComponent
                  key={`${type.name}_${possibleType.name}`}
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
