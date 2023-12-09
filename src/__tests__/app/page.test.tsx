import {expect, test} from 'vitest';
import {render, screen, within} from '@testing-library/react';
import Home from '@/app/page';
import {Suspense} from 'react';

describe('Home page', () => {
  it('Should render component and not fail', async () => {
    const {container} = render(
      <Suspense>
        <Home searchParams={{data: ''}} />
      </Suspense>
    );

    console.log('container :>> ', container.innerHTML);

    expect(container).not.toBeNull();
  });

  it.skip('Should render heading', () => {
    render(<Home searchParams={{}} />);

    const heading = screen.getByText('From');

    expect(heading).not.toBeNull();
  });
});
