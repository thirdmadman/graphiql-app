import Login from '@/app/components/Login';
import { render, screen } from '@testing-library/react';
import { en } from '@/locales/locale';

describe('Login page', () => {
  beforeAll(() => {
    vi.mock('react', async () => {
      const actual = await vi.importActual('react');
      return {
        ...actual,
        useEffect: vi.fn(),
        useContext: vi.fn(() => ({
          state: {
            currentLocale: en,
          },
        })),
      };
    });
    vi.mock('next/navigation', async () => {
      const actual = await vi.importActual('next/navigation');
      return {
        ...actual,
        useRouter() {
          return {
            route: '/auth/sign-in',
            pathname: '',
            query: '',
            asPath: '',
          };
        },
      };
    });
  });

  it('should render without failing', () => {
    const { container } = render(Login());
    expect(container.firstElementChild).not.toBeNull();
  });

  it('should contain singup link', () => {
    render(Login());
    expect(screen.getByRole('link')).not.toBeNull();
    expect(
      screen
        .getByTestId<HTMLAnchorElement>('sign-up-link')
        .href.includes('/auth/sign-up')
    ).to.be.true;
  });

  it('should contain signinWitnGoogle button', () => {
    render(Login());
    expect(screen.getByTestId('login-google-btn')).not.toBeNull();
  });
});
