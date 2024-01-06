import { Logout } from '@/app/components/Logout';
import { render, screen } from '@testing-library/react';

describe('Logout page', () => {
  beforeAll(() => {
    vi.mock('next/navigation', async () => {
      const actual = await vi.importActual('next/navigation');
      return {
        ...actual,
        useRouter() {
          return {
            push: vi.fn(() => {}),
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
});
