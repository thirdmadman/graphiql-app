'use client';

import { IntrospectionEnumValue } from '@/lib/utils/gql/introspectionImportedTypes';
import { useState } from 'react';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { IsDeprecatedFieldComponent } from '../shared/IsDeprecatedFieldComponent';
import { DeprecationReasonComponent } from '../shared/DeprecationReasonComponent';

interface IIntrospectionEnumValueComponentProps {
  value: IntrospectionEnumValue | undefined | null;
}

// IntrospectionEnumValue {
//   name: string;
//   description?: Maybe<string>;
//   isDeprecated: boolean;
//   deprecationReason: Maybe<string>;
// }

export function IntrospectionEnumValueComponent({
  value,
}: IIntrospectionEnumValueComponentProps) {
  const [isOpened, setIsOpened] = useState(false);

  if (!value) {
    return;
  }

  return (
    <div className="pl-2 mb-2 border-l-4 border-indigo-500">
      <div
        className="mb-1 cursor-pointer"
        onClick={() => setIsOpened(!isOpened)}
      >
        <b>{value.name}</b>
      </div>
      <div className={isOpened ? '' : 'hidden'}>
        <DescriptionFieldComponent description={value.description} />
        <IsDeprecatedFieldComponent isDeprecated={value.isDeprecated} />
        <DeprecationReasonComponent
          isDeprecated={value.isDeprecated}
          deprecationReason={value.deprecationReason}
        />
      </div>
    </div>
  );
}
