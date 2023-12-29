import { SimpleBlockComponent } from './SimpleBlockComponent';

interface IDeprecationReasonComponentProps {
  isDeprecated: boolean | undefined | null;
  deprecationReason: string | undefined | null;
}

export function DeprecationReasonComponent({
  isDeprecated,
  deprecationReason,
}: IDeprecationReasonComponentProps) {
  if (!isDeprecated || !deprecationReason) {
    return;
  }

  return (
    <SimpleBlockComponent
      title={<b>deprecationReason</b>}
      inside={<i className="block max-w-[300px]">{deprecationReason}</i>}
    />
  );
}
