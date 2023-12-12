import { Suspense } from 'react';
import { RequestForm } from './components/RequestForm';
import { StoreProvider } from '@/lib/redux/StoreProvider';
import { Details } from './components/Details';
import { LanguageSelector } from './components/LanguageSelector';
import { ResponseField } from './components/ResponseField';
import { LocaleProvider } from '@/locales/localeProvider';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const susKey = searchParams.data ? searchParams.data.toString() : '';

  return (
    <StoreProvider>
      <LocaleProvider>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <LanguageSelector />
          <h2 className="text-4xl mb-5 font-extrabold dark:text-white">Form</h2>
          <div className="flex flex-wrap min-w-full justify-center gap-10 relative">
            <RequestForm />
            <Suspense key={susKey} fallback={<div>Loading...</div>}>
              <ResponseField searchParams={searchParams} />
            </Suspense>
          </div>
          <Details />
        </main>
      </LocaleProvider>
    </StoreProvider>
  );
}
