import {expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {RequestField} from '@/app/components/RequestField';

describe('RequestField', () => {
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
    render(await RequestField({searchParams: {data: ''}}));

    expect(screen.getByText('No data to show')).not.toBeNull();
  });
});
