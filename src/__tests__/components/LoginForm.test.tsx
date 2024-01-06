import { LoginForm } from '@/app/components/LoginForm';
import { en } from '@/locales/locale';
import { render, screen } from '@testing-library/react';

describe('Login Form', () => {
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

  it('should render the basic fields', () => {
    render(<LoginForm />);
    expect(screen.getByTestId('email')).not.toBeNull();
    expect(screen.getByTestId('password')).not.toBeNull();
    expect(screen.getByTestId('password')).not.toBeNull();
  });
});
