import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResponseField } from '@/app/components/ResponseField';

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
    render(await ResponseField({ searchParams: { data: '' } }));

    expect(screen.getByText('No data to show')).not.toBeNull();
  });
});
