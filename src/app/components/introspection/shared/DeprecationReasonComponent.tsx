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
    <div className="pl-2 mb-2 border-l-4 border-indigo-500">
      <div className="mb-1">
        <b>deprecationReason</b>
      </div>
      <div>{deprecationReason}</div>
    </div>
  );
}
