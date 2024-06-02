import SignUp from '@/app/auth/sign-up/page';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

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
  };
});

vi.mock('@/app/components/shared/header/Header', () => ({
  Header: () => <div>HEADER</div>,
}));

describe('Sign-up page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(SignUp());
  });

  it('should render without failing', () => {
    const { container } = render(SignUp());
    expect(container.firstElementChild).not.toBeNull();
  });

  it('should contain form title', () => {
    expect(screen.getByText('Create an account')).not.toBeNull();
  });

  it('should contain login link', () => {
    expect(screen.getByText('Login here')).not.toBeNull();
  });

  it('should contain name field', () => {
    expect(screen.getByText('Name')).not.toBeNull();
  });

  it('should contain email adress field', () => {
    expect(screen.getByText('Email address')).not.toBeNull();
  });

  it('should contain password field', () => {
    expect(screen.getByText('Password')).not.toBeNull();
  });

  it('should contain confirm password field', () => {
    expect(screen.getByText('Confirm password')).not.toBeNull();
  });

  it('should contain terms and conditions field', () => {
    expect(screen.getByText('Terms and Conditions')).not.toBeNull();
  });

  it('should contain sign up button', () => {
    expect(screen.getByText('Sign up')).not.toBeNull();
  });

  it('should render errors on pressing submit', async () => {
    await userEvent.click(screen.getByText('Sign up'));
    expect(screen.getByText('Must be 2 or more characters')).not.toBeNull();
    expect(screen.getAllByText('Required field')).not.toBeNull();
    expect(
      screen.getByText('You should accept terms and conditions')
    ).not.toBeNull();
  });

  it('should render errors typing name', async () => {
    await userEvent.type(screen.getByTestId('name'), 't');
    expect(screen.getByText('Must be 2 or more characters')).not.toBeNull();
  });

  it('should render errors typing email', async () => {
    await userEvent.type(screen.getByTestId('email'), 'test');
    expect(
      screen.getByText('Please enter a valid email address')
    ).not.toBeNull();
  });

  it('should render errors typing password', async () => {
    await userEvent.type(screen.getByTestId('password'), 'test');
    expect(screen.getByText('Must be 8 or more characters')).not.toBeNull();
  });

  it('should render errors typing password confimation', async () => {
    await userEvent.type(screen.getByTestId('confirm-password'), 'test');
    expect(screen.getByText('Passwords do not match')).not.toBeNull();
  });

  it('should render errors unclicking terms and conditions field', async () => {
    await userEvent.dblClick(screen.getByTestId('terms'));
    expect(
      screen.getByText('You should accept terms and conditions')
    ).not.toBeNull();
  });

  it('should render weak password message', async () => {
    await userEvent.type(screen.getByTestId('password'), 'test');
    expect(screen.getByText('weak')).not.toBeNull();
  });

  it('should render okay password message', async () => {
    await userEvent.type(screen.getByTestId('password'), 'test123!');
    expect(screen.getByText('okay')).not.toBeNull();
  });

  it('should render good password message', async () => {
    await userEvent.type(screen.getByTestId('password'), 'test123!te');
    expect(screen.getByText('good')).not.toBeNull();
  });

  it('should render strong password message', async () => {
    await userEvent.type(screen.getByTestId('password'), 'test123!test');
    expect(screen.getByText('strong')).not.toBeNull();
  });
});
