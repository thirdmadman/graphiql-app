import {
  IntrospectionScalarType,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { SimpleBlockComponent } from '../shared/SimpleBlockComponent';
import { FoldableBlockComponent } from '../shared/FoldableBlockComponent';

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
          {type.specifiedByURL && (
            <SimpleBlockComponent
              title={<b>specifiedByURL: </b>}
              inside={type.specifiedByURL}
            />
          )}
        </>
      }
    />
  );
}
