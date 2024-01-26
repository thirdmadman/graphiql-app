import {
  IIntrospectionScalarType,
  IIntrospectionSchema,
} from '@/types/introspectionImportedTypes';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { SimpleBlockComponent } from '../shared/SimpleBlockComponent';
import { FoldableBlockComponent } from '../shared/FoldableBlockComponent';

interface IIntrospectionScalarTypeComponentProps {
  type: IIntrospectionScalarType | undefined | null;
  schema: IIntrospectionSchema;
  isOpenedSet?: boolean;
}

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
