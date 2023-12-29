'use client';

import {
  IntrospectionDirective,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { IntrospectionDirectiveComponent } from './directive/IntrospectionDirectiveComponent';
import { FoldableBlockComponent } from './shared/FoldableBlockComponent';

interface IAllDirectivesFieldComponentProps {
  fields: Array<IntrospectionDirective> | undefined | null;
  schema: IntrospectionSchema;
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
