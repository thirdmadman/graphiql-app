import {
  IntrospectionSchema,
  IntrospectionUnionType,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { useState } from 'react';
import { PossibleTypeFieldComponent } from '../shared/PossibleTypeFieldComponent';

interface IIntrospectionUnionTypeComponentProps {
  type: IntrospectionUnionType | undefined | null;
  schema: IntrospectionSchema;
  isOpenedSet?: boolean;
}

// interface IntrospectionUnionType {
//   kind: 'UNION';
//   name: string;
//   description?: Maybe<string>;
//   possibleTypes: Array<IntrospectionNamedTypeRef<IntrospectionObjectType>>;
// }

export function IntrospectionUnionTypeComponent({
  type,
  schema,
  isOpenedSet = false,
}: IIntrospectionUnionTypeComponentProps) {
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
        {type.possibleTypes && type.possibleTypes.length > 0 && (
          <div className="pl-2 mb-2 border-l-4 border-indigo-500">
            <div className="mb-1">possible types:</div>
            {type.possibleTypes?.map((possibleType) => (
              <PossibleTypeFieldComponent
                key={possibleType.name}
                type={possibleType}
                schema={schema}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
