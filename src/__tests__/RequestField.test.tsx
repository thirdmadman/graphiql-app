import { render, screen } from '@testing-library/react';
import RequestField from '@/app/components/RequestField';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}));

const searchParamsMock = {};

describe('RequstField', () => {
  it("renders", async () => {
    render(await (RequestField({searchParams:searchParamsMock}))
    );

    await screen.findByText('Server response');
  });
})