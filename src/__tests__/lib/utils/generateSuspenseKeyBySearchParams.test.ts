import { generateSuspenseKeyBySearchParams } from '@/lib/utils/generateSuspenseKeyBySearchParams';

describe('generateSuspenseKeyBySearchParams', () => {
  it('should return empty string if searchParams not present', () => {
    const result = generateSuspenseKeyBySearchParams(
      undefined as unknown as { a: string }
    );

    expect(result).toBe('');
  });

  it('should return empty string if searchParams not object with at least 1 key', () => {
    const resultArray = generateSuspenseKeyBySearchParams(
      [] as unknown as { a: string }
    );

    expect(resultArray).toBe('');

    const resultObjectEmpty = generateSuspenseKeyBySearchParams(
      {} as unknown as { a: string }
    );

    expect(resultObjectEmpty).toBe('');
  });

  it('should return correct string for one field', () => {
    const result = generateSuspenseKeyBySearchParams({ data: 'welldone' });

    expect(result).toBe('welldone');
  });

  it('should return correct string for more fields', () => {
    const result = generateSuspenseKeyBySearchParams({
      data: 'welldone',
      url: 'http://a.com',
    });

    expect(result).toBe('welldone_http://a.com');
  });

  it('should return correct string with include array', () => {
    const result = generateSuspenseKeyBySearchParams(
      {
        data: 'welldone',
        url: 'http://a.com',
      },
      ['url']
    );

    expect(result).toBe('http://a.com');
  });
});
