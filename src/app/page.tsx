import {Suspense} from 'react';
import RequestField from './components/RequestField';
import {InputForm} from './components/InputForm';
import StoreProvider from '@/lib/redux/StoreProvider';
import {Details} from './components/Details';

export default async function Home({searchParams}: {searchParams: {[key: string]: string | string[] | undefined}}) {
  return (
    <StoreProvider>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <h2 className='text-4xl mb-5 font-extrabold dark:text-white'>From</h2>
        <div className='flex min-w-full justify-center gap-10'>
          <InputForm />
          <Suspense fallback={<span className="loading loading-dots loading-sm"></span>}>
            <RequestField searchParams={searchParams} />
          </Suspense>
        </div>
        <Details />
      </main>
    </StoreProvider>
  );
}
