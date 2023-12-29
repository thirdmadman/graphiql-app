import {
  IntrospectionEnumType,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';

import { IntrospectionEnumValueComponent } from './IntrospectionEnumValueCopmponent';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { SimpleBlockComponent } from '../shared/SimpleBlockComponent';
import { FoldableBlockComponent } from '../shared/FoldableBlockComponent';

interface IIntrospectionEnumTypeComponentProps {
  type: IntrospectionEnumType | undefined | null;
  schema: IntrospectionSchema;
  isOpenedSet?: boolean;
}

// IntrospectionEnumType {
//   kind: 'ENUM';
//   name: string;
//   description?: Maybe<string>;
//   enumValues: Array<IntrospectionEnumValue>;
// }

export function IntrospectionEnumTypeComponent({
  type,
  isOpenedSet = false,
}: IIntrospectionEnumTypeComponentProps) {
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
            title={`ENUM values: ${type.enumValues.length}`}
            inside={type.enumValues.map((value) => (
              <IntrospectionEnumValueComponent
                value={value}
                key={`${type.name}_${value.name}`}
              />
            ))}
          />
        </>
      }
    />
  );
}
