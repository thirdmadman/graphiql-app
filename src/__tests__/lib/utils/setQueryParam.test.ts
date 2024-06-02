import { setQueryParam } from '@/lib/utils/setQueryParam';

describe('setQueryParam', () => {
  it('should set param', () => {
    const urlSearchParams = new URLSearchParams();

    setQueryParam(urlSearchParams, 'data', 'data');

    expect(urlSearchParams.get('data')).toBe('data');
  });

  it('should remove param if value empty', () => {
    const urlSearchParams = new URLSearchParams();

    urlSearchParams.set('data', 'data');

    expect(urlSearchParams.get('data')).toBe('data');

    setQueryParam(urlSearchParams, 'data', undefined);

    expect(urlSearchParams.get('data')).toBe(null);
  });
});
