'use client';

import {
  IIntrospectionDirective,
  IIntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { IntrospectionDirectiveComponent } from './directive/IntrospectionDirectiveComponent';
import { FoldableBlockComponent } from './shared/FoldableBlockComponent';

interface IAllDirectivesFieldComponentProps {
  fields: Array<IIntrospectionDirective> | undefined | null;
  schema: IIntrospectionSchema;
}

export function AllDirectivesFieldComponent({
  fields,
  schema,
}: IAllDirectivesFieldComponentProps) {
  if (!fields || fields.length === 0 || !schema) {
    return;
  }

  return (
    <FoldableBlockComponent
      title={<b>directives</b>}
      inside={fields.map((directive) => (
        <IntrospectionDirectiveComponent
          directive={directive}
          key={directive.name}
          schema={schema}
        />
      ))}
    />
  );
}
