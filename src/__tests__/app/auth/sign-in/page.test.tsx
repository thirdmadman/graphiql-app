import SignIn from '@/app/auth/sign-in/page';
import { render } from '@testing-library/react';

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
});
