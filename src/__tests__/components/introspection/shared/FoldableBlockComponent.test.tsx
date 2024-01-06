import { FoldableBlockComponent } from '@/app/components/introspection/shared/FoldableBlockComponent';
import { fireEvent, render, screen } from '@testing-library/react';

describe('FoldableBlockComponent', () => {
  it('should render component and not fail', () => {
    const { container } = render(<FoldableBlockComponent title={'title'} />);

    expect(container.firstChild).not.toBeNull();
  });

  it('should not render component if title not present', () => {
    const { container } = render(<FoldableBlockComponent title={undefined} />);

    expect(container.firstChild).toBeNull();
  });

  it('should display title string', () => {
    render(<FoldableBlockComponent title={'title'} />);

    expect(screen.getByText('title')).not.toBeNull();
  });

  it('should display title JSX', () => {
    render(<FoldableBlockComponent title={<p>title</p>} />);

    expect(screen.getByText('title')).not.toBeNull();
  });

  it('should hide inside on title click', () => {
    render(<FoldableBlockComponent title={'title'} inside={'inside'} />);

    const title = screen.getByTestId('title');
    const inside = screen.getByTestId('inside');
    const icon = screen.getByTestId('icon');

    expect(icon.textContent).toBe('+');

    expect(inside.classList.toString()).toBe('hidden');

    fireEvent.click(title);

    expect(icon.textContent).toBe('-');
    expect(inside.classList.toString()).toBe('');
  });
});
