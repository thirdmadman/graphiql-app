import { DeprecationReasonComponent } from '@/app/components/introspection/shared/DeprecationReasonComponent';
import { render, screen } from '@testing-library/react';

describe('DeprecationReasonComponent', () => {
  it('should render component and not fail', () => {
    const { container } = render(
      <DeprecationReasonComponent
        isDeprecated
        deprecationReason={'some reason'}
      />
    );

    expect(container.firstChild).not.toBeNull();
  });

  it('should not render component if isDeprecated false', () => {
    const { container } = render(
      <DeprecationReasonComponent
        isDeprecated={false}
        deprecationReason={'some reason'}
      />
    );

    expect(container.childNodes.length).toBe(0);
  });

  it('should not render component if deprecationReason undef', () => {
    const { container } = render(
      <DeprecationReasonComponent
        isDeprecated={false}
        deprecationReason={undefined}
      />
    );

    expect(container.childNodes.length).toBe(0);
  });

  it('should render deprecationReason text', () => {
    render(
      <DeprecationReasonComponent
        isDeprecated={true}
        deprecationReason={'some reason'}
      />
    );

    expect(screen.getByText('some reason')).not.toBeNull();
  });
});
