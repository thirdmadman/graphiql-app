import { IntrospectionEnumValueComponent } from '@/app/components/introspection/enum/IntrospectionEnumValueCopmponent';

import { screen, render } from '@testing-library/react';

describe('IntrospectionEnumValueCopmponent', () => {
  it('should not render component if type not present', () => {
    const { container } = render(
      <IntrospectionEnumValueComponent value={undefined} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render and not fail', () => {
    const { container } = render(
      <IntrospectionEnumValueComponent
        value={{
          name: '[NAME]',
          description: '[description]',
          isDeprecated: true,
          deprecationReason: '[deprecationReason]',
        }}
      />
    );

    expect(container.firstChild).not.toBeNull();

    expect(screen.getByText('[NAME]')).not.toBeNull();
    expect(screen.getByText('[description]')).not.toBeNull();
    expect(screen.getByText('[deprecationReason]')).not.toBeNull();
  });
});
