import { DescriptionFieldComponent } from '@/app/components/introspection/shared/DescriptionFieldComponent';
import { render, screen } from '@testing-library/react';

describe('DescriptionFieldComponent', () => {
  it('should render component and not fail', () => {
    const { container } = render(
      <DescriptionFieldComponent description={'some description'} />
    );

    expect(container.firstChild).not.toBeNull();
  });

  it('should not render component if description undef', () => {
    const { container } = render(
      <DescriptionFieldComponent description={undefined} />
    );

    expect(container.childNodes.length).toBe(0);
  });

  it('should render description text', () => {
    render(<DescriptionFieldComponent description={'some description'} />);

    expect(screen.getByText('some description')).not.toBeNull();
  });
});
