import { Suspense } from 'react';
import { StoreProvider } from '@/lib/redux/StoreProvider';
import { LanguageSelector } from './components/shared/LanguageSelector';
import { LocaleProvider } from '@/locales/localeProvider';
import { TextareaField } from './components/editor/TextareaField';
import { ResponseWrapper } from './components/ResponseWrapper';
import { RequestWrapper } from './components/editor/RequestWrapper';
import { generateSuspenseKeyBySearchParams } from '@/lib/utils/generateSuspenseKeyBySearchParams';
import { UrlInput } from './components/editor/UrlInput';
import { DocumentationComponent } from './components/DocumentationComponent';
import { EditorTitle } from './components/editor/EditorTitle';
import { LocaleByNameExtractor } from '@/locales/LocaleByNameExtractor';

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
        <main className="container flex min-h-screen flex-col items-center max-w-screen-xxl mx-auto py-24 px-2 sm:px-8 md:px-12 lg:px-24 xl:px-32 xl:py-32">
          <LanguageSelector />
          <EditorTitle />
          <UrlInput
            urlOverwrite={searchParams?.url && String(searchParams?.url)}
          />
          <div className="flex flex-wrap min-w-full justify-around relative">
            <RequestWrapper />
            <Suspense
              key={generateSuspenseKeyBySearchParams(searchParams)}
              fallback={<TextareaField mode={Mode.Readonly} isLoading={true} />}
            >
              <ResponseWrapper searchParams={searchParams} />
            </Suspense>
          </div>
          <div className="py-10 w-full flex">
            <Suspense
              key={generateSuspenseKeyBySearchParams(searchParams, [
                'url',
                'headers',
              ])}
              fallback={
                <div>
                  <LocaleByNameExtractor localeName="loadingText" />
                </div>
              }
            >
              <DocumentationComponent searchParams={searchParams} />
            </Suspense>
          </div>
        </main>
      </LocaleProvider>
    </StoreProvider>
  );
}
