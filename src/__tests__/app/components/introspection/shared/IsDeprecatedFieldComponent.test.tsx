import { IsDeprecatedFieldComponent } from '@/app/components/introspection/shared/IsDeprecatedFieldComponent';
import { render } from '@testing-library/react';

describe('IsDeprecatedFieldComponent', () => {
  it('should render component and not fail', () => {
    const { container } = render(
      <IsDeprecatedFieldComponent isDeprecated={true} />
    );

    expect(container.firstChild).not.toBeNull();
  });

  it('should not render component if isDeprecated false', () => {
    const { container } = render(
      <IsDeprecatedFieldComponent isDeprecated={false} />
    );

    expect(container.childNodes.length).toBe(0);
  });
});
