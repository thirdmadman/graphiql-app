import { UrlInput } from '@/app/components/editor/UrlInput';
import { fireEvent, render, screen } from '@testing-library/react';

const mocks = vi.hoisted(() => {
  return {
    push: vi.fn(() => ({})),
  };
});

describe('UrlInput', () => {
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
            push: mocks.push,
          };
        },
        useSearchParams() {
          return {
            ...actual,
            get(value: string) {
              return value;
            },
            entries: () => [],
          };
        },
        usePathname() {
          return 'https://main.com';
        },
      };
    });
  });

  it('should render component and not fail', () => {
    const { container } = render(<UrlInput />);

    expect(container.firstChild).not.toBeNull();
  });

  it('should render input and button', () => {
    render(<UrlInput />);

    expect(screen.getByTestId('input')).not.toBeNull();
    expect(screen.getByTestId('button')).not.toBeNull();
  });

  it('should render input and button', () => {
    render(<UrlInput />);

    const input = screen.getByTestId('input');
    const button = screen.getByTestId('button');

    fireEvent.change(input, { target: { value: 'https://a.com' } });
    fireEvent.click(button);

    expect(mocks.push).toBeCalledWith(
      'https://main.com?url=https%3A%2F%2Fa.com',
      { scroll: false }
    );
  });
});
