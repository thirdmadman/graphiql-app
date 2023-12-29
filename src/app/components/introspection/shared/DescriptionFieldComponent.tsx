interface IDescriptionFieldComponentProps {
  description: string | undefined | null;
}

export function DescriptionFieldComponent({
  description,
}: IDescriptionFieldComponentProps) {
  if (!description) {
    return;
  }

  return (
    <div className="pl-2 mb-2 border-l-4 border-indigo-500">
      <div className="mb-1">
        <b>description</b>
      </div>
      <div>
        <i>{description}</i>
      </div>
    </div>
  );
}
