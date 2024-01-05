import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DocumentationComponent } from '@/app/components/DocumentationComponent';

const fetchMock = vi.fn(() => ({
  json: () => ({}),
}));

vi.stubGlobal('fetch', fetchMock);

describe('DocumentationComponent', () => {
  it('should render component and not fail', async () => {
    const { container } = render(
      await DocumentationComponent({ searchParams: { url: 'http://a.com' } })
    );

    expect(container).not.toBeNull();
  });

  it('should return info message if url is not valid url', async () => {
    render(await DocumentationComponent({ searchParams: { url: undefined } }));

    expect(screen.getByTestId('no-url')).not.toBeNull();
  });

  it('should return error message if url any errors in request', async () => {
    fetchMock.mockRejectedValueOnce({});

    render(
      await DocumentationComponent({ searchParams: { url: 'http://a.com' } })
    );

    expect(screen.getByTestId('error')).not.toBeNull();
  });
});
