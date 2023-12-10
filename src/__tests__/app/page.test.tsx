import {expect, test} from 'vitest';
import {render, screen, within} from '@testing-library/react';
import Home from '@/app/page';
import {Suspense} from 'react';
import RootLayout from '@/app/layout';

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
      return {
        RequestField: () => (<p></p>),
      };
    });

    vi.mock('next/font/google', async () => {
      return {
        Inter: vi.fn(() => ({className: 'google'})),
      };
    });
  });

  it('Should render component and not fail', async () => {
    const {container} = render(
      <Suspense>
        <RootLayout>
          <Home searchParams={{data: ''}} />
        </RootLayout>
      </Suspense>
    );

    console.log('container :>> ', container.innerHTML);

    expect(container).not.toBeNull();
  });

  it.skip('Should render heading', () => {
    render(<Home searchParams={{}} />);

    const heading = screen.getByText('From');

    expect(heading).not.toBeNull();
  });
});
