/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import RequestField from '@/app/components/RequestField';

const searchParamsMock = {};

describe('RequestField', () => {
  it('renders a heading', async () => {
    render(await RequestField({searchParams: searchParamsMock}))

    screen.debug();

    expect('Server response').toBeInTheDocument()
  })
})