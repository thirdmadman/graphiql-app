/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react';
import {RequestField} from './RequestField';

it('should render RequestField', async () => {
  render(await RequestField({searchParams: {data: ''}}));
  expect(screen.getAllByText('Server response')).not.toBeNull();
});
