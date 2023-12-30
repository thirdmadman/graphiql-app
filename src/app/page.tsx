import { Suspense } from 'react';
import { StoreProvider } from '@/lib/redux/StoreProvider';
import { Details } from './components/Details';
import { LanguageSelector } from './components/LanguageSelector';
import { LocaleProvider } from '@/locales/localeProvider';
import { TextareaField } from './components/TextareaField';
import { ResponseWrapper } from './components/ResponseWrapper';
import { RequestWrapper } from './components/RequestWrapper';
import { generateSuspenseKeyBySearchParams } from '@/lib/utils/generateSuspenseKeyBySearchParams';
import { UrlInput } from './components/UrlInput';

enum Mode {
  Edit,
  Readonly,
}

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | Array<string> | undefined };
}) {
  return (
    <StoreProvider>
      <LocaleProvider>
        <main className="flex min-h-screen flex-col items-center p-24">
          <LanguageSelector />
          <h2 className="text-4xl mb-5 font-extrabold dark:text-white">Form</h2>
          <UrlInput
            urlOverwrite={searchParams?.url && String(searchParams?.url)}
          />
          <div className="flex flex-wrap min-w-full justify-center gap-10 relative">
            <RequestWrapper />
            <Suspense
              key={generateSuspenseKeyBySearchParams(searchParams)}
              fallback={<TextareaField mode={Mode.Readonly} isLoading={true} />}
            >
              <ResponseWrapper searchParams={searchParams} />
            </Suspense>
          </div>
          <div className="py-10 w-full flex">
            <Suspense key={susKey} fallback={<div>Loading...</div>}>
              <DocumentationComponent searchParams={searchParams} />
            </Suspense>
          </div>
          <Details />
        </main>
      </LocaleProvider>
    </StoreProvider>
  );
}
