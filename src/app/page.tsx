import { Suspense } from 'react';
import { RequestForm } from './components/RequestForm';
import { StoreProvider } from '@/lib/redux/StoreProvider';
import { Details } from './components/Details';
import { LanguageSelector } from './components/LanguageSelector';
import { ResponseField } from './components/ResponseField';
import { LocaleProvider } from '@/locales/localeProvider';
import { Providers } from "./providers";
import { Spinner } from "@nextui-org/react";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const susKey = searchParams.data ? searchParams.data.toString() : '';

  return (
    <StoreProvider>
      <Providers>
        <LocaleProvider>
            <main className="dark flex min-h-screen flex-col items-center justify-between p-24">
              <LanguageSelector />
              <h2 className="text-4xl mb-5 font-extrabold dark:text-white">Form</h2>
              <div className="flex min-w-full h-96 justify-center gap-10 relative">
                <RequestForm />
                <Suspense key={susKey} fallback={<Spinner className='m-auto'/>}>
                  <ResponseField searchParams={searchParams} />
                </Suspense>
              </div>
              <Details />
            </main>
        </LocaleProvider>
      </Providers>
    </StoreProvider>
  );
}
