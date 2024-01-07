import Welcome from '@/app/page';
import { render, screen } from '@testing-library/react';

const mocks = vi.hoisted(() => {
  return {
    getUser: vi.fn(() => null),
  };
});

vi.mock('@/lib/firebase/getUser', () => {
  return {
    getUser: mocks.getUser,
  };
});

vi.mock('@/app/components/shared/header/Header', () => ({
  Header: () => <div>HEADER</div>,
}));

describe('Welcome page', () => {
  it('should render without failing', async () => {
    const { container } = render(await Welcome());
    expect(container.firstElementChild).not.toBeNull();
  });

  it('should contain sign in button title', async () => {
    render(await Welcome());
    expect(screen.getByText('Sign In')).not.toBeNull();
  });

  it('should contain sign in button title', async () => {
    render(await Welcome());
    expect(screen.getByText('Sign Up')).not.toBeNull();
  });

  it('should contain welcome section text', async () => {
    render(await Welcome());
    expect(
      screen.getByText(
        'Our app easily allows you to make requests to the variety of open GraphQL APIs'
      )
    ).not.toBeNull();
  });

  it('should contain benefits section title', async () => {
    render(await Welcome());
    expect(screen.getByText('Why do people prefer our app?')).not.toBeNull();
  });

  it('should contain benefits section text', async () => {
    render(await Welcome());
    expect(screen.getByText('Extra fast performance')).not.toBeNull();
  });

  it('should contain motivation section title', async () => {
    render(await Welcome());
    expect(screen.getByText('Our motivation')).not.toBeNull();
  });

  it('should contain our team section title', async () => {
    render(await Welcome());
    expect(screen.getByText('Our team')).not.toBeNull();
  });

  it('should contain our team section text', async () => {
    render(await Welcome());
    expect(screen.getByText('iamnkt')).not.toBeNull();
  });

  it('should contain main button title when user is authenticated', async () => {
    mocks.getUser.mockReturnValueOnce({} as unknown as null);
    render(await Welcome());
    expect(screen.getByText('Main')).not.toBeNull();
  });
});
