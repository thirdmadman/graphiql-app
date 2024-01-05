import { getGraphQLData } from '@/lib/utils/getGraphQLData';

const mocks = vi.hoisted(() => {
  return {
    gqlFetchApi: vi.fn(() => ({})),
  };
});

beforeAll(() => {
  vi.mock('@/lib/utils/fetchGraphQl', () => {
    return { gqlFetchApi: mocks.gqlFetchApi };
  });
});

const mockUrl = 'https://spacex-production.up.railway.app/';

describe('getGraphQLData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return undef if url not present', async () => {
    const result = await getGraphQLData({ url: undefined });

    expect(result).toBeUndefined();
  });

  it('should return undef if gql query not present', async () => {
    const result = await getGraphQLData({ data: undefined });

    expect(result).toBeUndefined();
  });

  it('should parse in gql query only sting', async () => {
    await getGraphQLData({ data: {} as string, url: mockUrl });

    expect(mocks.gqlFetchApi).toBeCalledWith(mockUrl, '', null, null);
  });

  it('should return error on invalid variables', async () => {
    const result = await getGraphQLData({
      data: '{}',
      variables: 'no',
      url: mockUrl,
    });

    expect(result?.resp).toBeUndefined();
    expect(result?.error).not.toBeUndefined();
  });

  it('should return error on invalid headers', async () => {
    const result = await getGraphQLData({
      data: '{}',
      headers: 'no',
      url: mockUrl,
    });

    expect(result?.resp).toBeUndefined();
    expect(result?.error).not.toBeUndefined();
  });

  it('should pass all parameters correctly', async () => {
    await getGraphQLData({
      data: '{}',
      headers: '{"field": "headers"}',
      variables: '{"field": "variables"}',
      url: mockUrl,
    });

    expect(mocks.gqlFetchApi).toBeCalledWith(
      mockUrl,
      '{}',
      { field: 'headers' },
      { field: 'variables' }
    );
  });
});
