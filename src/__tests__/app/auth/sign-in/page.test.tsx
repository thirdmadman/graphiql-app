import SignIn from '@/app/auth/sign-in/page';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('@/app/components/Login', async () => {
  const actual = await vi.importActual('@/app/components/Login');
  return {
    ...actual,
    signInWithGoogle: vi.fn(),
  };
});

describe('SignIn page', () => {
  beforeAll(() => {
    beforeEach(() => {
      vi.clearAllMocks();
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
    const { container } = render(SignIn());
    expect(container.firstElementChild).not.toBeNull();
  });

  it('should contain form title', () => {
    render(SignIn());
    expect(screen.getByText('Sign in')).not.toBeNull();
  });

  it('should contain email adress field', () => {
    render(SignIn());
    expect(screen.getByText('Email address')).not.toBeNull();
  });

  it('should contain password field', () => {
    render(SignIn());
    expect(screen.getByText('Password')).not.toBeNull();
  });

  it('should contain sign in button', () => {
    render(SignIn());
    expect(screen.getByText('Sign in')).not.toBeNull();
  });

  it('should render errors on pressing submit', async () => {
    render(SignIn());
    await userEvent.click(screen.getByText('Sign in'));
    expect(screen.getByText('Must be 8 or more characters')).not.toBeNull();
    expect(screen.getAllByText('Required field')).not.toBeNull();
  });

  it('should render errors on pressing submit', async () => {
    render(SignIn());
    await userEvent.click(screen.getByText('Sign in'));
    expect(screen.getByText('Must be 8 or more characters')).not.toBeNull();
    expect(screen.getAllByText('Required field')).not.toBeNull();
  });

  it('should render errors typing email', async () => {
    render(SignIn());
    await userEvent.type(screen.getByTestId('email'), 'test');
    expect(
      screen.getByText('Please enter a valid email address')
    ).not.toBeNull();
  });

  it('should render errors typing password', async () => {
    render(SignIn());
    await userEvent.type(screen.getByTestId('password'), 'test');
    expect(screen.getByText('Must be 8 or more characters')).not.toBeNull();
  });
});
