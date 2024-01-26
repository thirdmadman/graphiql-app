import { getMinifiedString } from '@/lib/utils/minifyQueryString';

const query = `
{
  ds: {
    data: null
  }
}
`;

describe('minifyQueryString', () => {
  it('should return minified string', () => {
    const result = getMinifiedString(query);

    expect(result).toBe('{ds:{data:null}}');
  });
});
