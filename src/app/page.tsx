
import { Suspense } from 'react';
import { InputForm } from './components/InputForm';
import StoreProvider from '@/lib/redux/StoreProvider';
import { Details } from './components/Details';
import { LocaleProvider } from './localeProvider';
import { Header } from './components/Header';
import RequestFieldWrapper from './components/RequestFieldWrapper';

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <StoreProvider>
      <LocaleProvider>
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
          <h2 className='text-4xl mb-5 font-extrabold dark:text-white'>From</h2>
          <Header />
          <div className='flex min-w-full justify-center gap-10'>
            <InputForm />
            <Suspense fallback={<div>Loading...</div>}>
              <RequestFieldWrapper searchParams={searchParams} />
            </Suspense>
          </div>
          <Details />
        </main>
      </LocaleProvider>
    </StoreProvider>
  );
}
