'use client';

import { useSearchParams } from 'next/navigation';
import { TextareaField } from './TextareaField';
import { prettifyGQLQuery } from '@/lib/utils/formatter/prettifier';
import { Mode } from './TextareaField';

export function RequestWrapper() {
  const searchParams = useSearchParams();

  const inputSource = searchParams.get('data');
  const initialSearchParams = inputSource
    ? decodeURIComponent(inputSource)
    : '';

  const variablesUri = searchParams.get('variables');
  const initialVariablesParams = variablesUri
    ? decodeURIComponent(variablesUri)
    : '';

  const headersUri = searchParams.get('headers');
  const initialHeadersParams = headersUri ? decodeURIComponent(headersUri) : '';

  return (
    <TextareaField
      mode={Mode.Edit}
      data={{
        textareaData: { content: prettifyGQLQuery(initialSearchParams).query },
        headers: initialHeadersParams,
        variables: initialVariablesParams,
      }}
    />
  );
}
