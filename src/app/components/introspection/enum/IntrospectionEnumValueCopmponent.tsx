import { IntrospectionEnumValue } from '@/lib/utils/gql/introspectionImportedTypes';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { IsDeprecatedFieldComponent } from '../shared/IsDeprecatedFieldComponent';
import { DeprecationReasonComponent } from '../shared/DeprecationReasonComponent';
import { FoldableBlockComponent } from '../shared/FoldableBlockComponent';

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
  if (!value) {
    return;
  }

  return (
    <FoldableBlockComponent
      title={<b>{value.name}</b>}
      inside={
        <>
          <DescriptionFieldComponent description={value.description} />
          <IsDeprecatedFieldComponent isDeprecated={value.isDeprecated} />
          <DeprecationReasonComponent
            isDeprecated={value.isDeprecated}
            deprecationReason={value.deprecationReason}
          />
        </>
      }
    />
  );
}
