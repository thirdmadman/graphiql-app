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

describe('getGraphQLData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return undef if gql query not present', async () => {
    const result = await getGraphQLData({ data: undefined });

    expect(result).not.toBeNull();
  });

  it('should parse in gql query only sting', async () => {
    await getGraphQLData({ data: {} as string });

    expect(mocks.gqlFetchApi).toBeCalledWith(
      'https://spacex-production.up.railway.app/',
      '',
      null,
      null
    );
  });

  it('should return error on invalid variables', async () => {
    const result = await getGraphQLData({ data: '{}', variables: 'no' });

    expect(result?.resp).toBeUndefined();
    expect(result?.error).not.toBeUndefined();
  });

  it('should return error on invalid headers', async () => {
    const result = await getGraphQLData({ data: '{}', headers: 'no' });

    expect(result?.resp).toBeUndefined();
    expect(result?.error).not.toBeUndefined();
  });

  it('should pass all parameters correctly', async () => {
    await getGraphQLData({
      data: '{}',
      headers: '{"field": "headers"}',
      variables: '{"field": "variables"}',
    });

    expect(mocks.gqlFetchApi).toBeCalledWith(
      'https://spacex-production.up.railway.app/',
      '{}',
      { field: 'headers' },
      { field: 'variables' }
    );
  });
});
