import Home from '@/app/page';
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

describe('Home page', () => {
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

    vi.mock('../../app/components/ResponseField.tsx', async () => {
      const { ResponseField } = await vi.importActual<
        typeof import('../../app/components/ResponseField')
      >('../../app/components/ResponseField');

      const RF = await ResponseField({ searchParams: { data: '' } });

      return {
        ResponseField: () => RF,
      };
    });
  });

  it('should render without failing', () => {
    const { container } = render(Home({ searchParams: { data: '' } }));
    expect(container.firstElementChild).not.toBeNull();
  });

  it('should contain header', () => {
    render(Home({ searchParams: { data: '' } }));
    expect(screen.getByText('Form')).not.toBeNull();
  });

  it('should contain input from', () => {
    render(Home({ searchParams: { data: '' } }));
    expect(screen.getByText('Write your query')).not.toBeNull();
  });

  it('should contain request box', () => {
    render(Home({ searchParams: { data: '' } }));
    expect(screen.getByText('Server response')).not.toBeNull();
  });

  it('should contain controls', () => {
    render(Home({ searchParams: { data: '' } }));
    expect(
      screen.getByText('Submit button blocked?', { exact: false })
    ).not.toBeNull();
  });
});
