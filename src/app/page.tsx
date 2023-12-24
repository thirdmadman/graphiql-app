import { Suspense } from 'react';
import { StoreProvider } from '@/lib/redux/StoreProvider';
import { Details } from './components/Details';
import { LanguageSelector } from './components/LanguageSelector';
import { LocaleProvider } from '@/locales/localeProvider';
import { TextareaField } from './components/TextareaField';
import { ResponseWrapper } from './components/ResponseWrapper';
import { RequestWrapper } from './components/RequestWrapper';

enum Mode {
  Edit,
  Readonly,
}

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | Array<string> | undefined };
}) {
  const susKey = searchParams.data ? searchParams.data.toString() : '';

  return (
    <StoreProvider>
      <LocaleProvider>
        <main className="flex min-h-screen flex-col items-center p-24">
          <LanguageSelector />
          <h2 className="text-4xl mb-5 font-extrabold dark:text-white">Form</h2>
          <div className="flex flex-wrap min-w-full justify-center relative">
            <RequestWrapper />
            <Suspense
              key={susKey}
              fallback={<TextareaField mode={Mode.Readonly} isLoading={true} />}
            >
              <ResponseWrapper searchParams={searchParams} />
            </Suspense>
          </div>
          <Details />
        </main>
      </LocaleProvider>
    </StoreProvider>
  );
}
