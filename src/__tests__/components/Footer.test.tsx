import { Footer } from '@/app/components/Footer';
import { render, screen } from '@testing-library/react';

describe('Footer', () => {
  it('should render component and not fail', () => {
    const { container } = render(<Footer />);

    expect(container.firstChild).not.toBeNull();
  });

  it('should render year', () => {
    render(<Footer />);

    expect(screen.getByText('Established in 2023')).not.toBeNull();
  });

  it('should contain team links', () => {
    render(<Footer />);

    expect(screen.getByText('nvalkovich')).not.toBeNull();
    expect(
      screen
        .getByText<HTMLAnchorElement>('nvalkovich')
        .href.includes('nvalkovich')
    ).to.be.true;

    expect(screen.getByText('thirdmadman')).not.toBeNull();
    expect(
      screen
        .getByText<HTMLAnchorElement>('thirdmadman')
        .href.includes('thirdmadman')
    ).to.be.true;

    expect(screen.getByText('iamnkt')).not.toBeNull();
    expect(
      screen.getByText<HTMLAnchorElement>('iamnkt').href.includes('iamnkt')
    ).to.be.true;
  });

  it('should contain course link', () => {
    render(<Footer />);

    expect(screen.getByTestId('rss-logo')).not.toBeNull();
    expect(screen.getByTestId<HTMLAnchorElement>('rss-link').href).to.be.equal(
      'https://rs.school/'
    );
  });
});
