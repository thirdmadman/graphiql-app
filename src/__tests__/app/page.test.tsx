import Home from '@/app/page';
import { en } from '@/locales/locale';
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

    vi.mock('../../app/components/ResponseWrapper.tsx', async () => {
      const { ResponseWrapper } = await vi.importActual<
        typeof import('../../app/components/ResponseWrapper')
      >('../../app/components/ResponseWrapper');

      const { StoreProvider } = await vi.importActual<
        typeof import('@/lib/redux/StoreProvider')
      >('@/lib/redux/StoreProvider');

      const RF = await ResponseWrapper({ searchParams: { data: '' } });

      return {
        ResponseWrapper: () => <StoreProvider>{RF}</StoreProvider>,
      };
    });

    vi.mock('../../app/components/DocumentationComponent.tsx', async () => {
      const { DocumentationComponent } = await vi.importActual<
        typeof import('../../app/components/DocumentationComponent')
      >('../../app/components/DocumentationComponent');

      const { StoreProvider } = await vi.importActual<
        typeof import('@/lib/redux/StoreProvider')
      >('@/lib/redux/StoreProvider');

      const DC = await DocumentationComponent({ searchParams: { data: '' } });

      return {
        DocumentationComponent: () => <StoreProvider>{DC}</StoreProvider>,
      };
    });
  });

  it('should render without failing', () => {
    const { container } = render(Home({ searchParams: { data: '' } }));
    expect(container.firstElementChild).not.toBeNull();
  });

  it('should contain header', () => {
    render(Home({ searchParams: { data: '' } }));
    expect(screen.getByText(en.editorTitle)).not.toBeNull();
  });

  it('should contain input from', () => {
    render(Home({ searchParams: { data: '' } }));
    expect(screen.getByText('Write your query')).not.toBeNull();
  });

  it('should contain request box', () => {
    render(Home({ searchParams: { data: '' } }));
    expect(screen.getByText('Server response')).not.toBeNull();
  });
});
