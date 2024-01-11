import { SimpleBlockComponent } from '@/app/components/introspection/shared/SimpleBlockComponent';
import { render, screen } from '@testing-library/react';

describe('SimpleBlockComponent', () => {
  it('should render component and not fail', () => {
    const { container } = render(<SimpleBlockComponent title="block title" />);

    expect(container.firstChild).not.toBeNull();
  });

  it('should not render component if title undef or null', () => {
    const { container } = render(<SimpleBlockComponent title={undefined} />);

    expect(container.childNodes.length).toBe(0);
  });

  it('should render title text', () => {
    render(<SimpleBlockComponent title="block title" />);

    expect(screen.getByText('block title')).not.toBeNull();
  });

  it('should render title JSX', () => {
    render(<SimpleBlockComponent title={<p>block p title</p>} />);

    expect(screen.getByText('block p title')).not.toBeNull();
  });

  it('should not render inside if title undef or null', () => {
    const { container } = render(
      <SimpleBlockComponent title="title" inside={undefined} />
    );

    expect(container.childNodes.length).toBe(1);
  });

  it('should render title text', () => {
    render(<SimpleBlockComponent title="block title" inside="inside" />);

    expect(screen.getByText('inside')).not.toBeNull();
  });

  it('should render title JSX', () => {
    render(
      <SimpleBlockComponent title="block title" inside={<p>p inside</p>} />
    );

    expect(screen.getByText('p inside')).not.toBeNull();
  });
});
