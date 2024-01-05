interface ISimpleBlockComponentProps {
  title: JSX.Element | Array<JSX.Element> | string | undefined | null;
  inside?: JSX.Element | Array<JSX.Element> | string | undefined | null;
}

export function SimpleBlockComponent({
  title,
  inside,
}: ISimpleBlockComponentProps) {
  if (!title) {
    return;
  }

  return (
    <div className="pl-2 mb-2 border-l-4 border-indigo-400">
      <div className="mb-1">{title}</div>
      {inside !== undefined && inside !== null && <div>{inside}</div>}
    </div>
  );
}
