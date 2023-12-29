import { SimpleBlockComponent } from './SimpleBlockComponent';

interface IIsDeprecatedFieldComponentProps {
  isDeprecated: boolean | undefined | null;
}

export function IsDeprecatedFieldComponent({
  isDeprecated,
}: IIsDeprecatedFieldComponentProps) {
  if (!isDeprecated) {
    return;
  }

  return (
    <SimpleBlockComponent
      title={<b>isDeprecated</b>}
      inside={String(isDeprecated)}
    />
  );
}
