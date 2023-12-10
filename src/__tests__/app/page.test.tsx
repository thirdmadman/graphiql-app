import Home from '@/app/page';
import '@testing-library/jest-dom';

import {render, screen} from '@testing-library/react';

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

    vi.mock('../../app/components/RequestField.tsx', async () => {
      const actual = await vi.importActual<typeof import('../../app/components/RequestField')>('../../app/components/RequestField');

      const RF = await actual.RequestField({searchParams: {data: ''}});

      return {
        RequestField: () => (RF),
      };
    });
  });

  it('should render without failing', async () => {
    const {container} = render(await Home({searchParams: {data: ''}}));
    expect(container.firstElementChild).not.toBeNull();
  });

  it('should contain header', async () => {
    render(await Home({searchParams: {data: ''}}));
    expect(screen.getByText('Form')).not.toBeNull();
  });

  it('should contain input from', async () => {
    render(await Home({searchParams: {data: ''}}));
    expect(screen.getByText('Write your query')).not.toBeNull();
  });

  it('should contain request box', async () => {
    render(await Home({searchParams: {data: ''}}));
    expect(screen.getByText('Server response')).not.toBeNull();
  });

  it('should contain controls', async () => {
    render(await Home({searchParams: {data: ''}}));
    expect(screen.getByText('Submit button blocked?', { exact: false })).not.toBeNull();
  });
});
