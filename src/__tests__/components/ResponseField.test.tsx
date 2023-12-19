import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResponseField } from '@/app/components/ResponseField';
import { StoreProvider } from '@/lib/redux/StoreProvider';

describe('ResponseField', () => {
  beforeAll(() => {
    vi.mock('next/navigation', async () => {
      const actual = await vi.importActual('next/navigation');
      return {
        ...actual,
        useRouter() {
          return {
            route: '/',
            pathname: '',
            query: '',
            asPath: '',
          };
        },
        useSearchParams() {
          return {
            get(value: string) {
              return value;
            },
          };
        },
      };
    });
  });

  it('Should render component and not fail', async () => {
    render(
      <StoreProvider>
        {await ResponseField({ searchParams: { data: '' } })}
      </StoreProvider>
    );

    expect(screen.getByText('No data to show')).not.toBeNull();
  });
});
