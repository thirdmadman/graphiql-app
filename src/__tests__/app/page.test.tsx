import Home from '@/app/editor/page';
import { StoreProvider } from '@/lib/redux/StoreProvider';
import { en } from '@/locales/locale';
import { ISearchParams } from '@/types/interfaces/ISearchParams';
import { render, screen } from '@testing-library/react';

const renderHome = (props: ISearchParams) => {
  return render(<StoreProvider>{Home({ searchParams: props })}</StoreProvider>);
};

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

    vi.mock('@/app/components/shared/header/Header', () => ({
      Header: () => <div>HEADER</div>,
    }));
  });

  it('should render without failing', () => {
    const { container } = renderHome({ data: '' });
    expect(container.firstElementChild).not.toBeNull();
  });

  it('should contain header', () => {
    renderHome({ data: '' });
    expect(screen.getByText(en.editorTitle)).not.toBeNull();
  });

  it('should contain input from', () => {
    renderHome({ data: '' });
    expect(screen.getByText(en.requestFieldLabel)).not.toBeNull();
  });

  it('should contain request box', () => {
    renderHome({ data: '' });
    expect(screen.getByText(en.responseFieldLabel)).not.toBeNull();
  });
});
