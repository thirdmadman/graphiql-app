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
    <div className="pl-2 mb-2 border-l-4 border-indigo-500">
      <div className="mb-1">
        <b>isDeprecated</b>
      </div>
      <div>{isDeprecated}</div>
    </div>
  );
}
