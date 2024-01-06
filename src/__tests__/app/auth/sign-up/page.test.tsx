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

describe('Sign-up page', () => {
  it('should render without failing', () => {
    const { container } = render(SignUp());
    expect(container.firstElementChild).not.toBeNull();
  });

  it('should contain form title', () => {
    render(SignUp());
    expect(screen.getByText('Create an account')).not.toBeNull();
  });

  it('should contain login link', () => {
    render(SignUp());
    expect(screen.getByText('Login here')).not.toBeNull();
  });

  it('should contain name field', () => {
    render(SignUp());
    expect(screen.getByText('Name')).not.toBeNull();
  });

  it('should contain email adress field', () => {
    render(SignUp());
    expect(screen.getByText('Email address')).not.toBeNull();
  });

  it('should contain password field', () => {
    render(SignUp());
    expect(screen.getByText('Password')).not.toBeNull();
  });

  it('should contain confirm password field', () => {
    render(SignUp());
    expect(screen.getByText('Confirm password')).not.toBeNull();
  });

  it('should contain terms and conditions field', () => {
    render(SignUp());
    expect(screen.getByText('Terms and Conditions')).not.toBeNull();
  });

  it('should contain sign up button', () => {
    render(SignUp());
    expect(screen.getByText('Sign up')).not.toBeNull();
  });

  it('should render errors on pressing submit', async () => {
    render(SignUp());
    await userEvent.click(screen.getByText('Sign up'));
    expect(screen.getByText('Must be 2 or more characters')).not.toBeNull();
    expect(screen.getAllByText('Required field')).not.toBeNull();
    expect(
      screen.getByText('You should accept terms and conditions')
    ).not.toBeNull();
  });

  it('should render errors typing name', async () => {
    render(SignUp());
    await userEvent.type(screen.getByTestId('name'), 't');
    expect(screen.getByText('Must be 2 or more characters')).not.toBeNull();
  });

  it('should render errors typing email', async () => {
    render(SignUp());
    await userEvent.type(screen.getByTestId('email'), 'test');
    expect(
      screen.getByText('Please enter a valid email address')
    ).not.toBeNull();
  });

  it('should render errors typing password', async () => {
    render(SignUp());
    await userEvent.type(screen.getByTestId('password'), 'test');
    expect(screen.getByText('Must be 8 or more characters')).not.toBeNull();
  });

  it('should render errors typing password confimation', async () => {
    render(SignUp());
    await userEvent.type(screen.getByTestId('confirm-password'), 'test');
    expect(screen.getByText('Passwords do not match')).not.toBeNull();
  });

  it('should render errors unclicking terms and conditions field', async () => {
    render(SignUp());
    await userEvent.dblClick(screen.getByTestId('terms'));
    expect(
      screen.getByText('You should accept terms and conditions')
    ).not.toBeNull();
  });

  it('should render weak password message', async () => {
    render(SignUp());
    await userEvent.type(screen.getByTestId('password'), 'test');
    expect(screen.getByText('weak')).not.toBeNull();
  });

  it('should render okay password message', async () => {
    render(SignUp());
    await userEvent.type(screen.getByTestId('password'), 'test123!');
    expect(screen.getByText('okay')).not.toBeNull();
  });

  it('should render good password message', async () => {
    render(SignUp());
    await userEvent.type(screen.getByTestId('password'), 'test123!te');
    expect(screen.getByText('good')).not.toBeNull();
  });

  it('should render strong password message', async () => {
    render(SignUp());
    await userEvent.type(screen.getByTestId('password'), 'test123!test');
    expect(screen.getByText('strong')).not.toBeNull();
  });
});
