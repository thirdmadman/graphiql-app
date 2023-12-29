import {
  IntrospectionObjectType,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { IntrospectionFieldComponent } from '../IntrospectionFieldComponent';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { useState } from 'react';
import { InterfaceFieldComponent } from '../shared/InterfaceFieldComponent';

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

        {type.interfaces && type.interfaces.length > 0 && (
          <div className="pl-2 mb-2 border-l-4 border-indigo-500">
            <div className="mb-1">interfaces:</div>
            {type.interfaces?.map((interfaceType) => (
              <InterfaceFieldComponent
                key={interfaceType.name}
                type={interfaceType}
                schema={schema}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
