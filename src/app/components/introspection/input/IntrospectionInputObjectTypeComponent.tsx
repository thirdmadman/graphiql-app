import {
  IntrospectionInputObjectType,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { IntrospectionInputValueComponent } from './IntrospectionInputValueComponent';
import { useState } from 'react';

interface IIntrospectionInputObjectTypeComponentProps {
  type: IntrospectionInputObjectType | undefined | null;
  schema: IntrospectionSchema;
  isOpenedSet: boolean;
}

// interface IntrospectionInputObjectType {
//   kind: 'INPUT_OBJECT';
//   name: string;
//   description?: Maybe<string>;
//   inputFields: Array<IntrospectionInputValue>;
// }

export function IntrospectionInputObjectTypeComponent({
  type,
  schema,
  isOpenedSet = false,
}: IIntrospectionInputObjectTypeComponentProps) {
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
          <div className="mb-1">input fields:</div>
          {type.inputFields?.map((inputValue) => (
            <IntrospectionInputValueComponent
              key={inputValue.name}
              inputValue={inputValue}
              schema={schema}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
