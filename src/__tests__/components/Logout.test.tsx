import { Logout } from '@/app/components/Logout';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const mocks = vi.hoisted(() => {
  return {
    push: vi.fn(() => ({})),
    fetch: vi.fn(() => ({
      json: () => ({}),
      status: 200,
    })),
  };
});

vi.stubGlobal('fetch', mocks.fetch);

describe('Logout page', () => {
  beforeAll(() => {
    vi.mock('next/navigation', async () => {
      const actual = await vi.importActual('next/navigation');
      return {
        ...actual,
        useRouter() {
          return {
            push: mocks.push,
          };
        },
      };
    });
  });

  it('should render without failing', () => {
    const { container } = render(Logout());
    expect(container.firstElementChild).not.toBeNull();
  });

  it('should render logout button', () => {
    render(Logout());
    expect(screen.getByTestId('logout-btn')).not.toBeNull();
  });

  it('should redirect after logout button click', async () => {
    render(Logout());

    const button = screen.getByTestId('logout-btn');

    fireEvent.click(button);
    await waitFor(() => {
      expect(mocks.push).toBeCalledWith('/auth/sign-in');
    });
  });
});
