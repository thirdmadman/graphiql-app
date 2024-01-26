import { IIntrospectionEnumValue } from '@/types/introspectionImportedTypes';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { IsDeprecatedFieldComponent } from '../shared/IsDeprecatedFieldComponent';
import { DeprecationReasonComponent } from '../shared/DeprecationReasonComponent';
import { FoldableBlockComponent } from '../shared/FoldableBlockComponent';

interface IIntrospectionEnumValueComponentProps {
  value: IIntrospectionEnumValue | undefined | null;
}

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
