import { SimpleBlockComponent } from './SimpleBlockComponent';

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
    <SimpleBlockComponent
      title={<b>description</b>}
      inside={<i className="block max-w-[300px]">{description}</i>}
    />
  );
}
