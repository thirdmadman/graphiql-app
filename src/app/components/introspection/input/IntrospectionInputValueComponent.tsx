import {
  IntrospectionInputValue,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';

import { IntrospectionInputValueTypeComponent } from './IntrospectionInputValueTypeComponent';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { IsDeprecatedFieldComponent } from '../shared/IsDeprecatedFieldComponent';
import { DeprecationReasonComponent } from '../shared/DeprecationReasonComponent';
import { SimpleBlockComponent } from '../shared/SimpleBlockComponent';
import { FoldableBlockComponent } from '../shared/FoldableBlockComponent';

interface IIntrospectionInputValueComponentProps {
  inputValue: IntrospectionInputValue | undefined | null;
  schema: IntrospectionSchema;
}

// interface IntrospectionInputValue {
//   name: string;
//   description?: Maybe<string>;
//   type: IntrospectionInputTypeRef;
//   defaultValue: Maybe<string>;
//   isDeprecated?: boolean;
//   deprecationReason?: Maybe<string>;
// }

export function IntrospectionInputValueComponent({
  inputValue,
  schema,
}: IIntrospectionInputValueComponentProps) {
  if (!inputValue) {
    return;
  }

  if (inputValue.type.kind === 'LIST' || inputValue.type.kind === 'NON_NULL') {
    return (
      <FoldableBlockComponent
        title={<b>{inputValue.name}</b>}
        inside={
          <SimpleBlockComponent
            title={`of type: ${inputValue.type.kind}:`}
            inside={
              <IntrospectionInputValueTypeComponent
                type={inputValue.type.ofType}
                schema={schema}
              />
            }
          />
        }
      />
    );
  }

  return (
    <FoldableBlockComponent
      title={<b>{inputValue.name}</b>}
      inside={
        <>
          <DescriptionFieldComponent description={inputValue.description} />
          <IntrospectionInputValueTypeComponent
            type={inputValue.type}
            schema={schema}
          />
          {inputValue.defaultValue && (
            <SimpleBlockComponent
              title={`defaultValue: ${inputValue.defaultValue}`}
            />
          )}
          <IsDeprecatedFieldComponent isDeprecated={inputValue.isDeprecated} />
          <DeprecationReasonComponent
            isDeprecated={inputValue.isDeprecated}
            deprecationReason={inputValue.deprecationReason}
          />
        </>
      }
    />
  );
}
