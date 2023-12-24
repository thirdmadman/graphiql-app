'use client';

import { useSearchParams } from 'next/navigation';
import { TextareaField } from './TextareaField';

enum Mode {
  Edit,
  Readonly,
}

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
        textareaData: { content: initialSearchParams },
        headers: initialHeadersParams,
        variables: initialVariablesParams,
      }}
    />
  );
}
