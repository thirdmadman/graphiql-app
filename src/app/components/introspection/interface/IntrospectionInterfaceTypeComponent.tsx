import {
  IntrospectionInterfaceType,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { useState } from 'react';
import { IntrospectionFieldComponent } from '../IntrospectionFieldComponent';
import { InterfaceFieldComponent } from '../shared/InterfaceFieldComponent';
import { PossibleTypeFieldComponent } from '../shared/PossibleTypeFieldComponent';
import { SimpleBlockComponent } from '../shared/SimpleBlockComponent';

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
  const [isOpened, setIsOpened] = useState(isOpenedSet);

  if (!type) {
    return;
  }

  return (
    <div className="pl-2 mb-2 border-l-4 border-indigo-500">
      <div
        className="mb-1 cursor-pointer"
        onClick={() => setIsOpened(!isOpened)}
      >
        type: {type.kind}: <i>{type.name}</i>
      </div>
      <div className={isOpened ? '' : 'hidden'}>
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
      </div>
    </div>
  );
}
