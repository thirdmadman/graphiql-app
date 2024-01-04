import {
  IIntrospectionInputObjectType,
  IIntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { IntrospectionInputValueComponent } from './IntrospectionInputValueComponent';
import { SimpleBlockComponent } from '../shared/SimpleBlockComponent';
import { FoldableBlockComponent } from '../shared/FoldableBlockComponent';

interface IIntrospectionInputObjectTypeComponentProps {
  type: IIntrospectionInputObjectType | undefined | null;
  schema: IIntrospectionSchema;
  isOpenedSet: boolean;
}

export function IntrospectionInputObjectTypeComponent({
  type,
  schema,
  isOpenedSet = false,
}: IIntrospectionInputObjectTypeComponentProps) {
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
            title={'input fields:'}
            inside={type.inputFields?.map((inputValue) => (
              <IntrospectionInputValueComponent
                key={`${type.name}_${inputValue.name}`}
                inputValue={inputValue}
                schema={schema}
              />
            ))}
          />
        </>
      }
    />
  );
}
