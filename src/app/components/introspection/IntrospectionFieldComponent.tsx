import {
  IIntrospectionField,
  IIntrospectionSchema,
} from '@/types/introspectionImportedTypes';
import { IntrospectionOutputTypeComponent } from './IntrospectionOutputTypeComponent';

import { IntrospectionInputValueComponent } from './input/IntrospectionInputValueComponent';
import { DescriptionFieldComponent } from './shared/DescriptionFieldComponent';
import { IsDeprecatedFieldComponent } from './shared/IsDeprecatedFieldComponent';
import { DeprecationReasonComponent } from './shared/DeprecationReasonComponent';
import { SimpleBlockComponent } from './shared/SimpleBlockComponent';
import { FoldableBlockComponent } from './shared/FoldableBlockComponent';

interface IIntrospectionFieldProps {
  field: IIntrospectionField | undefined | null;
  schema: IIntrospectionSchema;
}

export function IntrospectionFieldComponent({
  schema,
  field,
}: IIntrospectionFieldProps) {
  if (!field) {
    return;
  }

  return (
    <FoldableBlockComponent
      title={<b>{field.name}</b>}
      inside={
        <>
          <DescriptionFieldComponent description={field.description} />
          {field.args && field.args.length > 0 && (
            <SimpleBlockComponent
              title={`args: ${field.args.length}`}
              inside={field.args.map((inputValue) => (
                <IntrospectionInputValueComponent
                  schema={schema}
                  key={`${field.name}_${inputValue.name}`}
                  inputValue={inputValue}
                />
              ))}
            />
          )}
          <IntrospectionOutputTypeComponent type={field.type} schema={schema} />
          <IsDeprecatedFieldComponent isDeprecated={field.isDeprecated} />
          <DeprecationReasonComponent
            isDeprecated={field.isDeprecated}
            deprecationReason={field.deprecationReason}
          />
        </>
      }
    />
  );
}
