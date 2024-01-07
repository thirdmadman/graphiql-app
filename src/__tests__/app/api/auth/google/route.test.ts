import { POST } from '@/app/api/auth/google/route';
import { NextRequest, NextResponse } from 'next/server';

vi.mock('@/lib/firebase/firebase-admin-config', () => ({
  adminAuth: null,
}));

describe('auth with google', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should at least return NextResponse', async () => {
    const req = new NextRequest('http://localhost');

    const result = await POST(req);

    expect(result instanceof NextResponse).toBeTruthy();
  });

  it('should return status code 500 in no firebase admin config', async () => {
    const req = new NextRequest('http://localhost');

    const result = await POST(req);

    expect(result.status).toBe(500);
  });
});
