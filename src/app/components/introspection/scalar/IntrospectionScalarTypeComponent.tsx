import {
  IntrospectionScalarType,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { useState } from 'react';
import { SimpleBlockComponent } from '../shared/SimpleBlockComponent';

interface IIntrospectionScalarTypeComponentProps {
  type: IntrospectionScalarType | undefined | null;
  schema: IntrospectionSchema;
  isOpenedSet?: boolean;
}

// interface IntrospectionScalarType {
//   kind: 'SCALAR';
//   name: string;
//   description?: Maybe<string>;
//   specifiedByURL?: Maybe<string>;
// }

export function IntrospectionScalarTypeComponent({
  type,
  // schema,
  isOpenedSet = false,
}: IIntrospectionScalarTypeComponentProps) {
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
        {type.specifiedByURL && (
          <SimpleBlockComponent
            title={<b>specifiedByURL: </b>}
            inside={type.specifiedByURL}
          />
        )}
      </div>
    </div>
  );
}
