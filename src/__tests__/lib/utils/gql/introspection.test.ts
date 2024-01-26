import { getGqlIntrospection } from '@/lib/utils/gql/introspection';

const mocks = vi.hoisted(() => {
  return {
    gqlFetchApi: vi.fn(() => ({})),
  };
});

describe('getGqlIntrospection', () => {
  beforeAll(() => {
    vi.mock('@/lib/utils/gql/fetchGraphQl', () => {
      return {
        gqlFetchApi: mocks.gqlFetchApi,
      };
    });
  });

  it('should return error if no url present', async () => {
    mocks.gqlFetchApi.mockResolvedValue({ error: 'error' });
    const result = await getGqlIntrospection(undefined as unknown as string);

    expect(result.error).not.toBeUndefined();
    expect(result.error).toBe('error');
  });

  it('should result correctly', async () => {
    mocks.gqlFetchApi.mockResolvedValue({ resp: 'resp' });
    const result = await getGqlIntrospection(undefined as unknown as string);

    expect(result.schema).not.toBeUndefined();
    expect(result.schema).toBe('resp');
  });
});
