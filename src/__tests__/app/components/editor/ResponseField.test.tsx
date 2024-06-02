import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResponseWrapper } from '@/app/components/ResponseWrapper';
import { StoreProvider } from '@/lib/redux/StoreProvider';

describe('Response Wrapper', () => {
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
        {await ResponseWrapper({ searchParams: { data: '' } })}
      </StoreProvider>
    );

    expect(screen.findByText('No data to show')).not.toBeNull();
  });
});
