import {
  IntrospectionSchema,
  IntrospectionUnionType,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { PossibleTypeFieldComponent } from '../shared/PossibleTypeFieldComponent';
import { SimpleBlockComponent } from '../shared/SimpleBlockComponent';
import { FoldableBlockComponent } from '../shared/FoldableBlockComponent';

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
          {type.possibleTypes && type.possibleTypes.length > 0 && (
            <SimpleBlockComponent
              title={'possible types:'}
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
