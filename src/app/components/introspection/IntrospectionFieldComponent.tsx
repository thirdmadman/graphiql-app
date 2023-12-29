'use client';

import {
  IntrospectionField,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { IntrospectionOutputTypeComponent } from './IntrospectionOutputTypeComponent';
import { useState } from 'react';
import { IntrospectionInputValueComponent } from './input/IntrospectionInputValueComponent';
import { DescriptionFieldComponent } from './shared/DescriptionFieldComponent';
import { IsDeprecatedFieldComponent } from './shared/IsDeprecatedFieldComponent';
import { DeprecationReasonComponent } from './shared/DeprecationReasonComponent';
import { SimpleBlockComponent } from './shared/SimpleBlockComponent';

interface IIntrospectionFieldProps {
  field: IntrospectionField | undefined | null;
  schema: IntrospectionSchema;
}

// interface IntrospectionField {
//   name: string;
//   description?: Maybe<string>;
//   args: Array<IntrospectionInputValue>;
//   type: IntrospectionOutputTypeRef;
//   isDeprecated: boolean;
//   deprecationReason: Maybe<string>;
// }

export function IntrospectionFieldComponent({
  schema,
  field,
}: IIntrospectionFieldProps) {
  const [isOpened, setIsOpened] = useState(false);

  if (!field) {
    return;
  }

  return (
    <div className="pl-2 mb-2 border-l-4 border-indigo-500">
      <div
        className="mb-1 cursor-pointer"
        onClick={() => setIsOpened(!isOpened)}
      >
        <b>{field.name}</b>
      </div>
      <div className={isOpened ? '' : 'hidden'}>
        <DescriptionFieldComponent description={field.description} />
        {field.args && field.args.length > 0 && (
          <SimpleBlockComponent
            title={`args: ${field.args.length}`}
            inside={field.args.map((inputValue) => (
              <IntrospectionInputValueComponent
                schema={schema}
                key={inputValue.name}
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
      </div>
    </div>
  );
}
