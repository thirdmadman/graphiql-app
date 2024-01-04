import {
  IIntrospectionDirective,
  IIntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';

import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { IntrospectionInputValueComponent } from '../input/IntrospectionInputValueComponent';
import { SimpleBlockComponent } from '../shared/SimpleBlockComponent';
import { FoldableBlockComponent } from '../shared/FoldableBlockComponent';

interface IIntrospectionDirectiveComponentProps {
  directive: IIntrospectionDirective | undefined | null;
  schema: IIntrospectionSchema;
}

export function IntrospectionDirectiveComponent({
  directive,
  schema,
}: IIntrospectionDirectiveComponentProps) {
  if (!directive) {
    return;
  }

  return (
    <FoldableBlockComponent
      title={<b>{directive.name}</b>}
      inside={
        <>
          <DescriptionFieldComponent description={directive.description} />
          {directive.isRepeatable && (
            <SimpleBlockComponent
              title={
                <>
                  <b>isRepeatable:</b> {String(directive.isRepeatable)}
                </>
              }
            />
          )}
          {directive.args && directive.args.length > 0 && (
            <SimpleBlockComponent
              title={`locations: ${directive.locations.length}`}
              inside={directive.locations.map((location) => (
                <div key={`${directive.name}_${location}`}>
                  <b>{location}</b>
                </div>
              ))}
            />
          )}
          {directive.args && directive.args.length > 0 && (
            <SimpleBlockComponent
              title={`args: ${directive.args.length}`}
              inside={directive.args.map((inputValue) => (
                <IntrospectionInputValueComponent
                  schema={schema}
                  key={`${directive.name}_${inputValue.name}`}
                  inputValue={inputValue}
                />
              ))}
            />
          )}
        </>
      }
    />
  );
}
